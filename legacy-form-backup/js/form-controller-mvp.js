/**
 * Form Controller MVP - Main Form Logic
 * Handles multi-step form navigation, validation, and submission for MVP
 */

let _hpDebounceTimer = null;

function _firebaseErrorToSpanish(error) {
  const codes = {
    'functions/unauthenticated': 'Tu sesión ha expirado. Por favor recarga la página e intenta nuevamente.',
    'functions/permission-denied': 'No tienes permiso para realizar esta acción.',
    'functions/not-found': 'No se encontró el recurso solicitado.',
    'functions/already-exists': 'Este formulario ya fue enviado.',
    'functions/resource-exhausted': 'Demasiadas solicitudes. Por favor espera un momento e intenta nuevamente.',
    'functions/internal': 'Ocurrió un error interno. Por favor intenta nuevamente.',
    'functions/unavailable': 'El servicio no está disponible en este momento. Por favor intenta más tarde.',
    'functions/deadline-exceeded': 'La solicitud tomó demasiado tiempo. Por favor intenta nuevamente.',
    'storage/unauthorized': 'No tienes permiso para subir archivos.',
    'storage/quota-exceeded': 'Se superó el límite de almacenamiento.',
    'storage/invalid-checksum': 'El archivo está dañado. Por favor intenta con otro archivo.',
    'storage/retry-limit-exceeded': 'No se pudo subir el archivo. Verifica tu conexión e intenta nuevamente.',
  };
  if (error && error.code && codes[error.code]) return codes[error.code];
  if (error && error.message) return error.message;
  return 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
}

// Initialize Petite-Vue app
function createFormApp(firebaseInstance) {
  console.log('🔧 createFormApp called');
  console.log('Firebase instance:', firebaseInstance ? '✓' : '✗');

  try {
    // Validate required dependencies
    if (typeof SITE_CONFIG === 'undefined') {
      throw new Error('site-config.js no cargado. Por favor verifica que el archivo exista.');
    }
    if (typeof getDefaultTier === 'undefined' || typeof getEnabledTiers === 'undefined' || typeof getTierBySlug === 'undefined') {
      throw new Error('Funciones de tier no disponibles. Verifica site-config.js.');
    }

    const formData = loadFromStorage();
    console.log('Form data loaded:', formData ? '✓' : '✗');

    // Apply simulator prefill if present (sessionStorage, one-time)
    try {
      const simRaw = sessionStorage.getItem('heredame_sim_prefill');
      if (simRaw) {
        const sim = JSON.parse(simRaw);
        sessionStorage.removeItem('heredame_sim_prefill');
        if (sim.deceased) Object.assign(formData.deceased, sim.deceased);
        if (sim.marriage) Object.assign(formData.marriage, sim.marriage);
        if (sim.testament) Object.assign(formData.testament, sim.testament);
        if (sim.heirs) {
          if (sim.heirs.spouse !== undefined) formData.heirs.spouse = sim.heirs.spouse;
          if (sim.heirs.children) formData.heirs.children = sim.heirs.children;
          if (sim.heirs.parents) formData.heirs.parents = sim.heirs.parents;
        }
        if (sim.assetTypesSelected) Object.assign(formData.assetTypesSelected, sim.assetTypesSelected);
        saveToStorage(formData);
        console.log('Simulator prefill applied ✓');
      }
    } catch (e) { /* sessionStorage unavailable or invalid JSON — skip */ }

    const enabledTiers = getEnabledTiers();
    const multiTier = enabledTiers.length > 1;

    // Check URL for cloud resume/view params
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('resume');
    const viewId = urlParams.get('view');

    const rawSavedStep = localStorage.getItem('heredame_current_step');
    const initialStep = resumeId ? 1 : (rawSavedStep ? parseInt(rawSavedStep) : (multiTier ? 0 : 1));
    const savedTierSlug = localStorage.getItem('heredame_selected_tier');
    const initialTier = (multiTier && savedTierSlug && getTierBySlug(savedTierSlug)) ? getTierBySlug(savedTierSlug) : (multiTier ? getDefaultTier() : enabledTiers[0]);

    return {
      // Store firebase instance
      firebase: firebaseInstance,

      // Expose site config
      SITE_CONFIG: SITE_CONFIG,

      // Current state
      currentStep: initialStep,
      _multiTier: multiTier,
      showReview: false,
      viewMode: !!(viewId),
      _resumeId: resumeId || viewId || null,
      _pendingCloudLoad: !!(resumeId || viewId),
      saveDialog: false,
      saveUrl: '',
      isSaving: false,
      isLoading: false,
      errorMessage: '',
      successMessage: '',

      // Phase progress bar data (defined here so v-for avoids inline array in template)
      phases: [
        { label: 'Fallecido/a', steps: [1, 2] },
        { label: 'Herederos', steps: [3, 4] },
        { label: 'Bienes', steps: [5, 6, 7, 8, 9] },
        { label: 'Pago', steps: [10, 11, 12] }
      ],

      // Form data
      formData: formData,

      // Tier selection
      selectedTier: initialTier,

    // File upload for basic tier
    selectedFile: null,
    uploadedFileUrl: null,
    uploadProgress: 0,

    // Multi-file upload for premium/normal tiers
    selectedFiles: [], // Array of files
    uploadedFiles: [], // Array of uploaded file objects {name, url, size}
    uploadingFileIndex: -1,

    // Bank receipt upload
    selectedBankReceipt: null,
    uploadedBankReceipt: null,

    // Validation errors
    errors: {},

    // Terms and conditions acceptance
    termsAccepted: false,
    termsLinkClicked: false,

    // Initialize — petite-vue 0.4.1 does NOT call mounted() on v-scope objects;
    // use @vue:mounted on the element instead if lifecycle hooks are needed.
    mounted() {
      setInterval(() => {
        this.autosave();
      }, 30000);
      // Load from cloud if URL has ?resume or ?view
      if (this._pendingCloudLoad && this._resumeId) {
        this.loadFromCloud(this._resumeId);
      }
    },

    // Dynamic step count: base minus any skipped steps (marriage, asset steps)
    get totalSteps() {
      const base = this._multiTier ? 12 : 11;
      let skipped = 0;
      for (let s = 2; s <= 9; s++) {
        if (this._skipStep(s)) skipped++;
      }
      return base - skipped;
    },

    // Computed: Legal period based on death date
    get legalPeriod() {
      if (!this.formData.deceased.dateOfDeath) return null;

      const deathDate = new Date(this.formData.deceased.dateOfDeath);

      // Before 02/04/1952 - Requires specialized legal advice
      if (deathDate < new Date('1952-04-02')) {
        return {
          code: 'PRE_1952',
          name: 'Anterior a Ley Nº 10.271',
          requiresSpecializedAdvice: true,
          message: 'Esta fecha de fallecimiento requiere asesoría legal especializada debido a las leyes aplicables.'
        };
      }

      // 02/04/1952 - 09/06/1989: Law Nº 10.271
      if (deathDate >= new Date('1952-04-02') && deathDate < new Date('1989-06-09')) {
        return {
          code: 'LAW_10271',
          name: 'Ley Nº 10.271',
          spousePortionName: 'porción conyugal',
          heirPortionName: 'legítimas',
          articles: 'artículos 1178 y 1184 del Código Civil'
        };
      }

      // 09/06/1989 - 26/10/1998: Law Nº 18.802
      if (deathDate >= new Date('1989-06-09') && deathDate < new Date('1998-10-26')) {
        return {
          code: 'LAW_18802',
          name: 'Ley Nº 18.802',
          spousePortionName: 'porción conyugal',
          heirPortionName: 'legítimas',
          articles: 'artículos 1178 y 1184 del Código Civil'
        };
      }

      // After 26/10/1998: Law Nº 19.585
      return {
        code: 'LAW_19585',
        name: 'Ley Nº 19.585',
        spousePortionName: 'legítima',
        heirPortionName: 'legítimas',
        articles: formData.testament.hasWill
          ? 'artículos del Código Civil vigentes'
          : 'artículos 988 y 989 del Código Civil'
      };
    },

    // Get antiquity status of posesión efectiva
    getPosesionEfectivaAntiquity() {
      if (!this.formData.testament.posesionEfectivaDate) return '';

      const decreedDate = new Date(this.formData.testament.posesionEfectivaDate);
      const today = new Date();
      const yearsDiff = (today - decreedDate) / (1000 * 60 * 60 * 24 * 365.25);

      if (yearsDiff < 5) {
        return '⚠️ Posesión efectiva con menos de 5 años de antigüedad - Plazos de prescripción pendientes';
      } else if (yearsDiff < 10) {
        return '⚠️ Posesión efectiva entre 5 y 10 años - Solo restan plazos de prescripción extraordinaria';
      } else {
        return '✅ Posesión efectiva con más de 10 años - Todos los plazos de prescripción están vencidos (posesión firme)';
      }
    },

    buscarPropiedadDebounced(index) {
      clearTimeout(_hpDebounceTimer);
      _hpDebounceTimer = setTimeout(() => this.buscarPropiedad(index), 400);
    },

    // Asset step map: step number → assetTypesSelected key
    _assetStepKey(step) {
      const map = { 5: 'realEstate', 6: 'vehicles', 7: 'bankAccounts', 8: 'otherAssets', 9: 'debts' };
      return map[step] || null;
    },

    _skipStep(step) {
      if (step === 2 && this.formData.deceased.civilStatus !== 'casado') return true;
      const key = this._assetStepKey(step);
      return key ? !this.formData.assetTypesSelected[key] : false;
    },

    // Navigation methods
    nextStep() {
      if (this.validateCurrentStep()) {
        if (this.currentStep === 0) {
          if (this.selectedTier.slug !== 'basico') {
            const enabledTiers = getEnabledTiers();
            this.currentStep = enabledTiers.length > 1 ? 12 : 11;
          } else {
            this.currentStep = 1;
          }
        } else {
          let next = this.currentStep + 1;
          while (next <= 9 && this._skipStep(next)) next++;
          // Show review screen before entering contact step
          if (next === 10 && !this.showReview) {
            this.showReview = true;
            saveCurrentStep(this.currentStep);
            this.autosave();
            window.scrollTo(0, 0);
            return;
          }
          this.currentStep = next;
        }

        saveCurrentStep(this.currentStep);
        this.autosave();
        window.scrollTo(0, 0);
        this._focusStepHeading();
      }
    },

    prevStep() {
      if (this.currentStep === 12) {
        this.currentStep = 0;
      } else if (this.currentStep === 1) {
        const enabledTiers = getEnabledTiers();
        if (enabledTiers.length > 1) this.currentStep = 0;
      } else if (this.currentStep > 1) {
        let prev = this.currentStep - 1;
        while (prev >= 2 && this._skipStep(prev)) prev--;
        this.currentStep = prev;
      }

      saveCurrentStep(this.currentStep);
      window.scrollTo(0, 0);
      this._focusStepHeading();
    },

    confirmReview() {
      this.showReview = false;
      this.currentStep = 10;
      saveCurrentStep(10);
      this.autosave();
      window.scrollTo(0, 0);
      this._focusStepHeading();
    },

    editFromReview(step) {
      this.showReview = false;
      this.currentStep = step;
      saveCurrentStep(step);
      window.scrollTo(0, 0);
      this._focusStepHeading();
    },

    async saveProgressToCloud() {
      this.isSaving = true;
      try {
        if (!this.firebase.auth().currentUser) {
          await this.firebase.auth().signInAnonymously();
        }
        const uid = this.firebase.auth().currentUser.uid;
        const db = this.firebase.firestore();
        const id = this._resumeId || db.collection('savedForms').doc().id;
        const now = this.firebase.firestore.FieldValue.serverTimestamp();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await db.collection('savedForms').doc(id).set({
          formData: this.formData,
          ownerUid: uid,
          createdAt: this._resumeId ? (await db.collection('savedForms').doc(id).get()).data()?.createdAt || now : now,
          updatedAt: now,
          expiresAt
        }, { merge: true });

        this._resumeId = id;
        this.saveUrl = window.location.origin + '/formulario.html?resume=' + id;
        this.saveDialog = true;
      } catch (err) {
        console.error('Error saving to cloud:', err);
        this.errorMessage = 'No se pudo guardar el progreso. Intenta nuevamente.';
      } finally {
        this.isSaving = false;
      }
    },

    async loadFromCloud(id) {
      try {
        if (!this.firebase.auth().currentUser) {
          await this.firebase.auth().signInAnonymously();
        }
        const db = this.firebase.firestore();
        const doc = await db.collection('savedForms').doc(id).get();
        if (!doc.exists) {
          this.errorMessage = 'El enlace de progreso guardado no es válido o ha expirado.';
          return;
        }
        const saved = doc.data();
        Object.assign(this.formData, saved.formData);
        saveToStorage(this.formData);
        if (this.viewMode) {
          this.showReview = true;
        }
      } catch (err) {
        console.error('Error loading from cloud:', err);
        this.errorMessage = 'No se pudo cargar el progreso guardado.';
      }
    },

    getViewUrl() {
      if (!this._resumeId) return '';
      return window.location.origin + '/formulario.html?view=' + this._resumeId;
    },

    goToStep(step) {
      // Allow step 0 (tier selection) if multiple tiers are enabled
      const enabledTiers = getEnabledTiers();
      const minStep = enabledTiers.length > 1 ? 0 : 1;

      if (step >= minStep && step <= this.totalSteps) {
        this.currentStep = step;
        saveCurrentStep(this.currentStep);
        window.scrollTo(0, 0);
        this._focusStepHeading();
      }
    },

    _focusStepHeading() {
      setTimeout(() => {
        const heading = document.querySelector('.form-section.fade-in h2');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        }
      }, 50);
    },

    // Progress calculation
    get progress() {
      return Math.round((this.currentStep / this.totalSteps) * 100);
    },

    validateField(field) {
      switch(field) {
        case 'fullName':
          if (!this.formData.deceased.fullName || this.formData.deceased.fullName.trim().length < 3)
            this.errors.fullName = 'Nombre completo es requerido (mínimo 3 caracteres)';
          else delete this.errors.fullName;
          break;
        case 'contactName':
          if (!this.formData.contact.fullName || this.formData.contact.fullName.trim().length < 3)
            this.errors.contactName = 'Tu nombre completo es requerido';
          else delete this.errors.contactName;
          break;
        case 'email':
          if (!this.formData.contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.contact.email))
            this.errors.email = 'Email válido es requerido';
          else delete this.errors.email;
          break;
        case 'phone':
          if (!this.formData.contact.phone || !/^\+56\s?9\s?\d{4}\s?\d{4}$/.test(this.formData.contact.phone))
            this.errors.phone = 'Teléfono válido es requerido (+56 9 1234 5678)';
          else delete this.errors.phone;
          break;
        case 'spouseName':
          if (!this.formData.marriage.spouseName || this.formData.marriage.spouseName.trim().length < 3)
            this.errors.spouseName = 'Nombre del cónyuge es requerido (mínimo 3 caracteres)';
          else delete this.errors.spouseName;
          break;
        case 'marriageDate':
          if (!this.formData.marriage.marriageDate)
            this.errors.marriageDate = 'Fecha de matrimonio es requerida';
          else delete this.errors.marriageDate;
          break;
      }
    },

    // Validation
    validateCurrentStep() {
      this.errors = {};
      this.errorMessage = '';

      switch(this.currentStep) {
        case 0: return this.validateTierSelection();
        case 1: return this.validateDeceased();
        case 2: return this.validateMarriage();
        case 3: return this.validateTestament();
        case 4: return this.validateHeirs();
        case 5: return this.validateRealEstate();
        case 6: return this.validateVehicles();
        case 7: return this.validateBankAccounts();
        case 8: return this.validateOtherAssets();
        case 9: return this.validateDebts();
        case 10: return this.validateContact();
        case 11: return this.validatePayment(); // For basic tier
        case 12: return this.validateDocumentUpload(); // For premium/normal tiers
        default: return true;
      }
    },

    validateTierSelection() {
      if (!this.selectedTier || !this.selectedTier.slug) {
        this.errorMessage = 'Por favor selecciona un plan antes de continuar';
        return false;
      }
      return true;
    },

    validateDeceased() {
      const d = this.formData.deceased;

      if (!d.fullName || d.fullName.trim().length < 3) {
        this.errors.fullName = 'Nombre completo es requerido (mínimo 3 caracteres)';
      }

      // Validate date only if not simulation
      if (!d.isSimulation) {
        if (!d.dateOfDeath) {
          this.errors.dateOfDeath = 'Fecha de fallecimiento es requerida (o marque como simulación)';
        } else {
          const deathDate = new Date(d.dateOfDeath);
          if (deathDate > new Date()) {
            this.errors.dateOfDeath = 'La fecha no puede ser futura';
          }

          // Check if requires specialized legal advice
          const period = this.legalPeriod;
          if (period && period.requiresSpecializedAdvice) {
            this.errorMessage = period.message;
            return false;
          }
        }
      }

      if (!d.civilStatus) {
        this.errors.civilStatus = 'Estado civil es requerido';
      }

      return Object.keys(this.errors).length === 0;
    },

    validateMarriage() {
      const m = this.formData.marriage;

      // Only validate marriage info if deceased was married
      if (this.formData.deceased.civilStatus === 'casado') {
        if (!m.spouseName || m.spouseName.trim().length < 3) {
          this.errors.spouseName = 'Nombre del cónyuge es requerido';
        }

        if (!m.marriageRegime) {
          this.errors.marriageRegime = 'Régimen matrimonial es requerido';
        }

        if (!m.marriageDate) {
          this.errors.marriageDate = 'Fecha de matrimonio es requerida';
        }
      }

      return Object.keys(this.errors).length === 0;
    },

    validateTestament() {
      const t = this.formData.testament;

      if (t.hasPosesionEfectiva) {
        if (!t.posesionEfectivaDate) {
          this.errors.posesionEfectivaDate = 'Fecha de decreto de posesión efectiva es requerida';
        } else {
          const decreedDate = new Date(t.posesionEfectivaDate);
          if (decreedDate > new Date()) {
            this.errors.posesionEfectivaDate = 'La fecha no puede ser futura';
          }
        }
      }

      return Object.keys(this.errors).length === 0;
    },

    validateHeirs() {
      const h = this.formData.heirs;
      const totalHeirs = (h.children || []).length + (h.parents || []).length + (h.siblings || []).length;

      if (totalHeirs === 0) {
        this.errorMessage = 'Debe agregar al menos un heredero';
        return false;
      }

      for (let i = 0; i < (h.children || []).length; i++) {
        const child = h.children[i];
        if (!child.fullName || child.fullName.trim().length < 3) {
          this.errorMessage = `Hijo ${i + 1}: Nombre completo es requerido`;
          return false;
        }

        // If child is deceased, validate numberOfHeirs
        if (!child.isAlive) {
          if (child.numberOfHeirs === null || child.numberOfHeirs === undefined || child.numberOfHeirs < 0) {
            this.errorMessage = `Hijo ${i + 1} (${child.fullName}): Debe indicar cuántos herederos tiene (ingrese 0 si no tiene)`;
            return false;
          }
        }
      }

      for (let i = 0; i < (h.parents || []).length; i++) {
        const parent = h.parents[i];
        if (!parent.fullName || parent.fullName.trim().length < 3) {
          this.errorMessage = `Padre/Madre ${i + 1}: Nombre completo es requerido`;
          return false;
        }
      }

      for (let i = 0; i < (h.siblings || []).length; i++) {
        const sibling = h.siblings[i];
        if (!sibling.fullName || sibling.fullName.trim().length < 3) {
          this.errorMessage = `Hermano/Hermana ${i + 1}: Nombre completo es requerido`;
          return false;
        }
      }

      // Validate cuarta de mejoras (if testada with posesión efectiva)
      if (this.formData.testament.hasWill && this.formData.testament.hasPosesionEfectiva) {
        const totalMejoras = this.getTotalCuartaMejoras();
        if (totalMejoras > 25) {
          this.errorMessage = `El total de la cuarta de mejoras no puede exceder el 25% (actual: ${totalMejoras.toFixed(2)}%)`;
          return false;
        }

        // Validate each cuarta de mejoras entry
        for (let i = 0; i < (this.formData.testament.cuartaDeMejoras || []).length; i++) {
          const mejora = this.formData.testament.cuartaDeMejoras[i];
          if (!mejora.heirName) {
            this.errorMessage = `Cuarta de mejoras ${i + 1}: Debe seleccionar un heredero`;
            return false;
          }
          if (mejora.percentage === null || mejora.percentage === undefined || mejora.percentage < 0 || mejora.percentage > 25) {
            this.errorMessage = `Cuarta de mejoras ${i + 1}: El porcentaje debe estar entre 0 y 25%`;
            return false;
          }
        }

        const totalLibreDisposicion = this.getTotalCuartaLibreDisposicion();
        if (totalLibreDisposicion > 25) {
          this.errorMessage = `El total de la cuarta de libre disposición no puede exceder el 25% (actual: ${totalLibreDisposicion.toFixed(2)}%)`;
          return false;
        }

        // Validate each cuarta de libre disposición entry
        for (let i = 0; i < (this.formData.testament.cuartaDeLibreDisposicion || []).length; i++) {
          const disposicion = this.formData.testament.cuartaDeLibreDisposicion[i];
          if (!disposicion.beneficiaryName) {
            this.errorMessage = `Cuarta de libre disposición ${i + 1}: Debe seleccionar o ingresar un beneficiario`;
            return false;
          }
          if (disposicion.percentage === null || disposicion.percentage === undefined || disposicion.percentage < 0 || disposicion.percentage > 25) {
            this.errorMessage = `Cuarta de libre disposición ${i + 1}: El porcentaje debe estar entre 0 y 25%`;
            return false;
          }
        }
      }

      return true;
    },

    validateRealEstate() {
      const re = this.formData.assets.realEstate || [];
      for (let i = 0; i < re.length; i++) {
        const property = re[i];
        if (!property.isManual) {
          if (!property.hpPropertyId) {
            this.errorMessage = `Propiedad ${i + 1}: Selecciona la propiedad del buscador o ingresala manualmente`;
            return false;
          }
        } else {
          if (!property.manualAddress?.trim()) {
            this.errorMessage = `Propiedad ${i + 1}: Dirección es requerida`;
            return false;
          }
          if (!property.manualCommune?.trim()) {
            this.errorMessage = `Propiedad ${i + 1}: Comuna es requerida`;
            return false;
          }
        }
        if (!property.acquisitionDate) {
          this.errorMessage = `Propiedad ${i + 1}: Fecha de adquisición es requerida`;
          return false;
        }
      }
      return true;
    },

    validateVehicles() {
      return true;
    },

    validateBankAccounts() {
      return true;
    },

    validateOtherAssets() {
      return true;
    },

    validateDebts() {
      let valid = true;
      this.formData.debts.forEach((debt, i) => {
        if (!debt.creditor || debt.creditor.trim().length < 2) {
          this.errors[`debtCreditor_${i}`] = 'Acreedor es requerido';
          valid = false;
        }
      });
      return valid;
    },

    validateContact() {
      const c = this.formData.contact;

      if (!c.fullName || c.fullName.trim().length < 3) {
        this.errors.contactName = 'Tu nombre completo es requerido';
      }

      if (!c.email || !this.validateEmail(c.email)) {
        this.errors.email = 'Email válido es requerido';
      }

      if (!c.phone || !this.validatePhone(c.phone)) {
        this.errors.phone = 'Teléfono válido es requerido (+56 9 1234 5678)';
      }

      return Object.keys(this.errors).length === 0;
    },

    validatePayment() {
      const p = this.formData.payment;

      if (!this.uploadedFileUrl) {
        this.errorMessage = 'Debe subir el comprobante de transferencia';
        return false;
      }

      if (!p.transferDate) {
        this.errors.transferDate = 'Fecha de transferencia es requerida';
      }

      if (p.transferAmount === null || p.transferAmount === undefined || p.transferAmount <= 0) {
        this.errors.transferAmount = 'Monto de transferencia es requerido';
      }

      if (!this.termsAccepted) {
        this.errorMessage = 'Debes aceptar los términos y condiciones para continuar';
        return false;
      }

      return Object.keys(this.errors).length === 0;
    },

    // RUT validation
    validateRUT(rut) {
      if (!rut) return false;

      const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
      if (cleanRut.length < 8 || cleanRut.length > 9) return false;

      const rutNumber = cleanRut.slice(0, -1);
      const verifier = cleanRut.slice(-1).toLowerCase();

      let sum = 0;
      let multiplier = 2;

      for (let i = rutNumber.length - 1; i >= 0; i--) {
        sum += parseInt(rutNumber[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const calculatedVerifier = 11 - (sum % 11);
      let expectedVerifier;

      if (calculatedVerifier === 11) {
        expectedVerifier = '0';
      } else if (calculatedVerifier === 10) {
        expectedVerifier = 'k';
      } else {
        expectedVerifier = calculatedVerifier.toString();
      }

      return verifier === expectedVerifier;
    },

    // Email validation
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // Phone validation
    validatePhone(phone) {
      const phoneRegex = /^(\+?56)?[\s]?9[\s]?\d{4}[\s]?\d{4}$/;
      return phoneRegex.test(phone);
    },

    // Array management
    addChild() {
      this.formData.heirs.children.push({
        fullName: '',
        isAlive: true,
        dateOfDeath: null,
        isLegalAge: true,
        numberOfHeirs: null  // Number of heirs if deceased (for representation rights)
      });
    },

    removeChild(index) {
      this.formData.heirs.children.splice(index, 1);
    },

    addParent() {
      this.formData.heirs.parents.push({
        fullName: '',
        isAlive: true
      });
    },

    removeParent(index) {
      this.formData.heirs.parents.splice(index, 1);
    },

    addSibling() {
      this.formData.heirs.siblings.push({
        fullName: '',
        isAlive: true
      });
    },

    removeSibling(index) {
      this.formData.heirs.siblings.splice(index, 1);
    },

    addRealEstate() {
      this.formData.assets.realEstate.push({
        hpPropertyId: null,
        displayAddress: '',
        commune: '',
        region: '',
        acquisitionDate: '',
        fiscalValue: null,
        hpValuation: null,
        isManual: false,
        manualAddress: '',
        manualCommune: '',
        manualRegion: '',
        hpSearch: { mode: 'address', query: '', commune: '', rol: '', rolCodigoSiiComuna: null, suggestions: [], error: null, loading: false },
      });
    },

    removeRealEstate(index) {
      this.formData.assets.realEstate.splice(index, 1);
    },

    async buscarPropiedad(index) {
      const property = this.formData.assets.realEstate[index];
      const query = property.hpSearch.query;
      if (!query || query.length < 3) return;
      if (!property.hpSearch.commune || property.hpSearch.commune.trim().length < 2) return;
      property.hpSearch.loading = true;
      property.hpSearch.error = null;
      try {
        const fn = this.firebase.functions().httpsCallable('searchProperty');
        const result = await fn({ query, comuna: property.hpSearch.commune });
        property.hpSearch.suggestions = result.data || [];
        if (property.hpSearch.suggestions.length === 0) {
          property.hpSearch.error = 'No se encontraron resultados. Prueba con otra dirección o ingresa manualmente.';
        }
      } catch (e) {
        property.hpSearch.suggestions = [];
        property.hpSearch.error = 'Búsqueda no disponible. Puedes ingresar la propiedad manualmente.';
      } finally {
        property.hpSearch.loading = false;
      }
    },

    async buscarPorRol(index) {
      const property = this.formData.assets.realEstate[index];
      const rol = (property.hpSearch.rol || '').trim();
      if (!/^\d+-\d+$/.test(rol)) {
        property.hpSearch.error = 'Formato inválido. Usa el formato: 195-67';
        return;
      }
      const codigoSiiComuna = property.hpSearch.rolCodigoSiiComuna;
      if (!codigoSiiComuna || codigoSiiComuna <= 0) {
        property.hpSearch.error = 'Ingresa el Código SII de la Comuna (requerido para búsqueda por Rol)';
        return;
      }
      property.hpSearch.loading = true;
      property.hpSearch.error = null;
      try {
        const fn = this.firebase.functions().httpsCallable('searchProperty');
        const result = await fn({ rol, codigoSiiComuna });
        if (result.data) {
          this.seleccionarPropiedad(index, result.data);
        } else {
          property.hpSearch.error = 'No se encontró la propiedad con ese Rol. Verifica el número o ingresa manualmente.';
        }
      } catch (e) {
        property.hpSearch.error = 'Búsqueda no disponible. Puedes ingresar la propiedad manualmente.';
      } finally {
        property.hpSearch.loading = false;
      }
    },

    seleccionarPropiedad(index, match) {
      const prop = this.formData.assets.realEstate[index];
      prop.hpPropertyId = match.property_id;
      prop.displayAddress = match.address;
      prop.commune = match.commune;
      prop.region = match.region;
      prop.isManual = false;
      prop.hpSearch.suggestions = [];
      prop.hpSearch.error = null;
      prop.hpSearch.query = '';
      prop.hpSearch.rol = '';
    },

    limpiarPropiedad(index) {
      const prop = this.formData.assets.realEstate[index];
      prop.hpPropertyId = null;
      prop.displayAddress = '';
      prop.commune = '';
      prop.region = '';
      prop.hpSearch.query = '';
      prop.hpSearch.commune = '';
      prop.hpSearch.rol = '';
      prop.hpSearch.suggestions = [];
      prop.hpSearch.error = null;
    },

    addVehicle() {
      this.formData.assets.vehicles.push({
        make: '',
        model: '',
        year: null,
        acquisitionDate: ''
      });
    },

    removeVehicle(index) {
      this.formData.assets.vehicles.splice(index, 1);
    },

    addBankAccount() {
      this.formData.assets.bankAccounts.push({
        bankName: '',
        accountType: '',
        estimatedBalance: null
      });
    },

    removeBankAccount(index) {
      this.formData.assets.bankAccounts.splice(index, 1);
    },

    addOtherAsset() {
      this.formData.assets.otherAssets.push({
        description: '',
        type: '',
        acquisitionDate: ''
      });
    },

    removeOtherAsset(index) {
      this.formData.assets.otherAssets.splice(index, 1);
    },

    addDebt() {
      this.formData.debts.push({
        description: '',
        creditor: '',
        outstandingBalance: null
      });
    },

    removeDebt(index) {
      this.formData.debts.splice(index, 1);
    },

    addCuartaMejora() {
      this.formData.testament.cuartaDeMejoras.push({
        heirName: '',
        percentage: null
      });
    },

    removeCuartaMejora(index) {
      this.formData.testament.cuartaDeMejoras.splice(index, 1);
    },

    addCuartaLibreDisposicion() {
      this.formData.testament.cuartaDeLibreDisposicion.push({
        beneficiaryName: '',
        percentage: null,
        isHeir: true
      });
    },

    removeCuartaLibreDisposicion(index) {
      this.formData.testament.cuartaDeLibreDisposicion.splice(index, 1);
    },

    clearBeneficiaryName(index) {
      // Clear beneficiary name when switching between heir/non-heir
      this.formData.testament.cuartaDeLibreDisposicion[index].beneficiaryName = '';
    },

    getTotalCuartaMejoras() {
      return this.formData.testament.cuartaDeMejoras.reduce((sum, mejora) => {
        return sum + (mejora.percentage || 0);
      }, 0);
    },

    getTotalCuartaLibreDisposicion() {
      return this.formData.testament.cuartaDeLibreDisposicion.reduce((sum, disposicion) => {
        return sum + (disposicion.percentage || 0);
      }, 0);
    },

    // Tier management
    getEnabledTiers() {
      return getEnabledTiers();
    },

    selectTier(tierSlug) {
      const tier = getTierBySlug(tierSlug);
      if (tier) {
        this.selectedTier = tier;
        localStorage.setItem('heredame_selected_tier', tierSlug);
      }
    },

    // Get "What happens next" content based on tier
    getWhatHappensNextTitle() {
      return SITE_CONFIG.form.whatHappensNext.title;
    },

    getWhatHappensNextContent() {
      const tierSlug = this.selectedTier?.slug || 'basico';

      if (tierSlug === 'basico') {
        return SITE_CONFIG.form.whatHappensNext.basicPlan;
      } else if (tierSlug === 'completo') {
        return SITE_CONFIG.form.whatHappensNext.completePlan;
      } else if (tierSlug === 'premium') {
        return SITE_CONFIG.form.whatHappensNext.premiumPlan;
      }

      // Fallback
      return {
        title: this.selectedTier?.name || 'Plan',
        text: this.selectedTier?.description || ''
      };
    },

    // File upload
    async handleFileSelect(event) {
      try {
        const file = event.target.files[0];
        if (!file) return;

        // Check if validateFile is available
        if (typeof validateFile === 'undefined') {
          this.errorMessage = 'Error: Validador de archivos no disponible';
          console.error('validateFile function is not defined');
          return;
        }

        const validation = validateFile(file);
        if (!validation.valid) {
          this.errorMessage = validation.errors.join(', ');
          return;
        }

        this.selectedFile = file;
        this.errorMessage = '';
        this.successMessage = '';
      } catch (error) {
        console.error('File select error:', error);
        this.errorMessage = 'Error al seleccionar archivo: ' + error.message;
      }
    },

    async uploadFile() {
      if (!this.selectedFile) {
        this.errorMessage = 'Selecciona un archivo primero';
        return;
      }

      // Check if required function is available
      if (typeof uploadReceiptToStorage === 'undefined') {
        this.errorMessage = 'Error: Función de carga no disponible';
        console.error('uploadReceiptToStorage function is not defined');
        return;
      }

      // Check if firebase is available
      if (!this.firebase) {
        this.errorMessage = 'Error: Firebase no inicializado';
        console.error('Firebase instance is not available');
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      this.uploadProgress = 0;

      try {
        const result = await uploadReceiptToStorage(this.selectedFile, this.firebase);

        if (result.success) {
          this.uploadedFileUrl = result.url;
          this.formData.payment.receiptUrl = result.url;
          this.successMessage = 'Comprobante subido exitosamente';
          this.uploadProgress = 100;
          this.autosave(); // Save the uploaded file URL
        } else {
          this.errorMessage = result.error || 'Error desconocido al subir el archivo';
        }
      } catch (error) {
        console.error('Upload error:', error);
        this.errorMessage = _firebaseErrorToSpanish(error);
      } finally {
        this.isLoading = false;
      }
    },

    // Multi-file upload for premium/normal tiers
    handleMultipleFilesSelect(event) {
      try {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        // Check maximum number of files
        if (this.selectedFiles.length + files.length > 10) {
          this.errorMessage = 'Máximo 10 archivos permitidos';
          return;
        }

        // Validate each file
        const invalidFiles = [];
        const validFiles = [];

        files.forEach(file => {
          // File size validation (10MB = 10 * 1024 * 1024 bytes)
          const maxSize = 10 * 1024 * 1024;
          if (file.size > maxSize) {
            invalidFiles.push(`${file.name} (excede 10MB)`);
            return;
          }

          // File type validation
          const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
          const allowedExtensions = ['.pdf', '.jpeg', '.jpg', '.png'];
          const fileName = file.name.toLowerCase();
          const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
          const hasValidType = allowedTypes.includes(file.type);

          if (!hasValidExtension || !hasValidType) {
            invalidFiles.push(`${file.name} (formato no permitido)`);
            return;
          }

          validFiles.push(file);
        });

        // Show error for invalid files
        if (invalidFiles.length > 0) {
          this.errorMessage = 'Archivos inválidos: ' + invalidFiles.join(', ');
        }

        // Add valid files to selection
        if (validFiles.length > 0) {
          this.selectedFiles.push(...validFiles);
          this.errorMessage = '';
          if (invalidFiles.length === 0) {
            this.successMessage = `${validFiles.length} archivo(s) seleccionado(s)`;
          }
        }
      } catch (error) {
        console.error('Multi-file select error:', error);
        this.errorMessage = 'Error al seleccionar archivos: ' + error.message;
      }
    },

    removeSelectedFile(index) {
      this.selectedFiles.splice(index, 1);
      if (this.selectedFiles.length === 0) {
        this.successMessage = '';
      }
    },

    async uploadMultipleFiles() {
      if (this.selectedFiles.length === 0) {
        this.errorMessage = 'Selecciona al menos un archivo';
        return;
      }

      // Check if required function is available
      if (typeof uploadReceiptToStorage === 'undefined') {
        this.errorMessage = 'Error: Función de carga no disponible';
        console.error('uploadReceiptToStorage function is not defined');
        return;
      }

      // Check if firebase is available
      if (!this.firebase) {
        this.errorMessage = 'Error: Firebase no inicializado';
        console.error('Firebase instance is not available');
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      this.uploadProgress = 0;

      try {
        // Upload files one by one
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const file = this.selectedFiles[i];
          this.uploadingFileIndex = i;

          const result = await uploadReceiptToStorage(file, this.firebase);

          if (result.success) {
            this.uploadedFiles.push({
              name: file.name,
              url: result.url,
              size: file.size
            });
            this.uploadProgress = Math.round(((i + 1) / this.selectedFiles.length) * 100);
          } else {
            throw new Error(`Error al subir ${file.name}: ${result.error}`);
          }
        }

        // Save uploaded files URLs to form data
        this.formData.payment.documentUrls = this.uploadedFiles.map(f => f.url);
        this.successMessage = `${this.uploadedFiles.length} archivo(s) subido(s) exitosamente`;
        this.selectedFiles = []; // Clear selected files
        this.uploadingFileIndex = -1;
        this.autosave();
      } catch (error) {
        console.error('Multi-upload error:', error);
        this.errorMessage = error.message || 'Error al subir archivos';
        this.uploadingFileIndex = -1;
      } finally {
        this.isLoading = false;
      }
    },

    removeUploadedFile(index) {
      this.uploadedFiles.splice(index, 1);
      if (this.formData.payment.documentUrls) {
        this.formData.payment.documentUrls.splice(index, 1);
        this.autosave();
      }
    },

    // Bank receipt handling
    handleBankReceiptSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      const validation = validateFile(file);
      if (!validation.valid) {
        this.errorMessage = validation.errors.join(', ');
        return;
      }

      this.selectedBankReceipt = file;
      this.errorMessage = '';
    },

    async uploadBankReceipt() {
      if (!this.selectedBankReceipt) {
        this.errorMessage = 'Selecciona un comprobante de transferencia';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        const result = await uploadReceiptToStorage(
          this.selectedBankReceipt,
          this.firebase
        );

        if (result.success) {
          this.uploadedBankReceipt = {
            name: this.selectedBankReceipt.name,
            url: result.url,
            size: this.selectedBankReceipt.size
          };

          // Store bank receipt URL in formData
          this.formData.payment.bankReceiptUrl = result.url;

          this.autosave();
          this.successMessage = '✓ Comprobante subido exitosamente';
          setTimeout(() => { this.successMessage = ''; }, 3000);
        } else {
          this.errorMessage = result.error || 'Error desconocido al subir el comprobante';
        }
      } catch (error) {
        console.error('Bank receipt upload error:', error);
        this.errorMessage = 'Error al subir el comprobante: ' + error.message;
      } finally {
        this.isLoading = false;
        this.uploadProgress = 0;
      }
    },

    removeBankReceipt() {
      this.selectedBankReceipt = null;
      this.uploadedBankReceipt = null;
      if (this.formData.payment.bankReceiptUrl) {
        delete this.formData.payment.bankReceiptUrl;
        this.autosave();
      }
    },

    validateDocumentUpload() {
      this.errors = {}; // Clear previous errors

      // For premium/normal tiers, require at least one uploaded document
      if (this.uploadedFiles.length === 0) {
        this.errorMessage = 'Debes subir al menos un documento antes de continuar';
        return false;
      }

      // Require bank receipt upload
      if (!this.uploadedBankReceipt) {
        this.errorMessage = 'Debes subir el comprobante de transferencia bancaria';
        return false;
      }

      // Validate contact information
      const c = this.formData.contact;

      if (!c.fullName || c.fullName.trim().length < 3) {
        this.errors.contactName = 'Tu nombre completo es requerido';
      }

      if (!c.email || !this.validateEmail(c.email)) {
        this.errors.email = 'Email válido es requerido';
      }

      if (!c.phone || !this.validatePhone(c.phone)) {
        this.errors.phone = 'Teléfono válido es requerido (Ejemplo: +56 9 1234 5678)';
      }

      // Validate payment details
      const p = this.formData.payment;

      if (!p.transferDate) {
        this.errors.transferDate = 'Fecha de transferencia es requerida';
      }

      if (!p.transferAmount || p.transferAmount <= 0) {
        this.errors.transferAmount = 'Monto transferido es requerido';
      }

      if (Object.keys(this.errors).length > 0) {
        this.errorMessage = 'Por favor completa todos los campos requeridos';
        return false;
      }

      // Validate terms acceptance
      if (!this.termsAccepted) {
        this.errorMessage = 'Debes aceptar los términos y condiciones para continuar';
        return false;
      }

      return true;
    },

    // Helpers
    getTotalAssetsCount() {
      const a = this.formData.assets;
      return (a.realEstate || []).length +
             (a.vehicles || []).length +
             (a.bankAccounts || []).length +
             (a.otherAssets || []).length;
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    formatDateDDMMYYYY(dateString) {
      if (!dateString) return '';

      // Parse YYYY-MM-DD format manually to avoid Safari/Firefox timezone issues
      if (typeof dateString === 'string' && dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          const year = parts[0];
          const month = parts[1].padStart(2, '0');
          const day = parts[2].padStart(2, '0');
          return `${day}/${month}/${year}`;
        }
      }

      // Fallback to Date object parsing
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    // Autosave
    autosave() {
      saveToStorage(this.formData);
    },

    // Sync spouse data from marriage to heirs
    syncSpouseToHeirs() {
      // If deceased was married, populate spouse in heirs
      if (this.formData.deceased.civilStatus === 'casado' && this.formData.marriage.spouseName) {
        this.formData.heirs.spouse = {
          fullName: this.formData.marriage.spouseName,
          rut: this.formData.marriage.spouseRut || null,
          marriageDate: this.formData.marriage.marriageDate,
          marriageRegime: this.formData.marriage.marriageRegime,
          isAlive: !this.formData.marriage.spouseDeceased,
          dateOfDeath: this.formData.marriage.spouseDeceased ? this.formData.marriage.spouseDateOfDeath : null
        };
      } else {
        this.formData.heirs.spouse = null;
      }
    },

    // Terms and conditions handling
    handleTermsLinkClick() {
      this.termsLinkClicked = true;
    },

    // Form submission
    async submitForm() {
      if (!this.validateCurrentStep()) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Sync spouse data before submission
        this.syncSpouseToHeirs();

        // Add tier information to formData
        this.formData.tier = {
          slug: this.selectedTier.slug,
          name: this.selectedTier.name,
          price: this.selectedTier.price
        };

        // For complete/premium tiers, use bankReceiptUrl as the main receiptUrl
        if (this.selectedTier.slug !== 'basico' && this.formData.payment.bankReceiptUrl) {
          this.formData.payment.receiptUrl = this.formData.payment.bankReceiptUrl;
        }

        // Ensure the user has a Firebase auth session (anonymous sign-in is sufficient)
        const auth = this.firebase.auth();
        if (!auth.currentUser) {
          await auth.signInAnonymously();
        }

        const submitFormMVP = this.firebase.functions().httpsCallable('submitFormMVP');
        const result = await submitFormMVP(this.formData);

        if (result.data.success) {
          const formId = result.data.data.formId;
          const email = result.data.data.contactEmail;
          clearStorage();
          window.location.href = `/confirmacion.html?id=${formId}&email=${encodeURIComponent(email)}`;
        } else {
          this.errorMessage = result.data.message || 'Error al enviar el formulario';
        }
      } catch (error) {
        console.error('Submit error:', error);
        this.errorMessage = _firebaseErrorToSpanish(error);
      } finally {
        this.isLoading = false;
      }
    }
    };
  } catch (error) {
    console.error('❌ Error in createFormApp:', error);
    console.error('Error stack:', error.stack);
    alert('Error al inicializar el formulario:\n' + error.message + '\n\nPor favor recargue la página.');

    // Return minimal safe object
    return {
      firebase: firebaseInstance,
      currentStep: 1,
      totalSteps: 11,
      formData: createEmptyFormData(),
      errorMessage: 'Error al cargar el formulario: ' + error.message,
      mounted() {}
    };
  }
}

// Export function for browser (global window object)
if (typeof window !== 'undefined') {
  window.createFormApp = createFormApp;
}
