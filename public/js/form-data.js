/**
 * Form Data Structure and LocalStorage Management
 * Manages form state and persistence
 */

// Form data structure
const createEmptyFormData = () => ({
  assetTypesSelected: {
    realEstate: false,
    vehicles: false,
    bankAccounts: false,
    otherAssets: false,
    debts: false
  },
  deceased: {
    fullName: '',
    dateOfDeath: '',
    isSimulation: false,
    civilStatus: ''
  },
  marriage: {
    hasMarriage: false,
    spouseName: '',
    marriageRegime: '',
    marriageDate: '',
    spouseDeceased: false
  },
  testament: {
    hasWill: null,  // null, true, or false for radio buttons
    hasPosesionEfectiva: null,  // null, true, or false for radio buttons
    posesionEfectivaDate: '',
    posesionEfectivaInscribedCBR: false,
    cuartaDeMejoras: [],
    cuartaDeLibreDisposicion: []
  },
  heirs: {
    spouse: null, // Will be populated from marriage data if applicable
    children: [],
    parents: [],
    siblings: []
  },
  assets: {
    realEstate: [],
    vehicles: [],
    bankAccounts: [],
    otherAssets: []
  },
  debts: [],
  contact: {
    fullName: '',
    email: '',
    phone: ''
  },
  payment: {
    receiptUrl: '',
    transferDate: '',
    transferAmount: 29990,
    transferReference: ''
  }
});

// LocalStorage key
const STORAGE_KEY = 'heredame_form_data';
const STORAGE_STEP_KEY = 'heredame_current_step';

// Strip PII fields before persisting — names stay server-side and in Firestore
const _stripPiiForStorage = (data) => {
  const d = JSON.parse(JSON.stringify(data)); // deep clone
  // Deceased: keep structural fields, blank name
  if (d.deceased) d.deceased.fullName = '';
  // Heirs: keep counts/types, blank names
  if (d.heirs) {
    if (Array.isArray(d.heirs.children)) d.heirs.children = d.heirs.children.map(c => ({ ...c, fullName: '' }));
    if (Array.isArray(d.heirs.parents)) d.heirs.parents = d.heirs.parents.map(p => ({ ...p, fullName: '' }));
    if (Array.isArray(d.heirs.siblings)) d.heirs.siblings = d.heirs.siblings.map(s => ({ ...s, fullName: '' }));
    if (d.heirs.spouse) d.heirs.spouse = { ...d.heirs.spouse, fullName: '' };
  }
  // Marriage: blank spouse name
  if (d.marriage) d.marriage.spouseName = '';
  // Contact: blank PII
  if (d.contact) { d.contact.fullName = ''; d.contact.email = ''; d.contact.phone = ''; }
  return d;
};

// Save to localStorage
const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_stripPiiForStorage(data)));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Migrate old data structure to new one
const migrateFormData = (data) => {
  const newData = createEmptyFormData();

  // Merge with default structure
  Object.keys(newData).forEach(key => {
    if (data[key]) {
      newData[key] = { ...newData[key], ...data[key] };
    }
  });

  // Ensure testament arrays exist
  if (!newData.testament.cuartaDeMejoras) {
    newData.testament.cuartaDeMejoras = [];
  }
  if (!newData.testament.cuartaDeLibreDisposicion) {
    newData.testament.cuartaDeLibreDisposicion = [];
  }

  // Ensure heirs.spouse exists
  if (!newData.heirs.hasOwnProperty('spouse')) {
    newData.heirs.spouse = null;
  }

  // Ensure children have numberOfHeirs field
  if (newData.heirs.children) {
    newData.heirs.children = newData.heirs.children.map(child => ({
      ...child,
      numberOfHeirs: child.numberOfHeirs !== undefined ? child.numberOfHeirs : null
    }));
  }

  // Migrate real estate items to new HP-search structure
  if (data.assets && data.assets.realEstate) {
    newData.assets.realEstate = data.assets.realEstate.map(property => {
      const defaultHpSearch = { mode: 'address', query: '', commune: '', rol: '', rolCodigoSiiComuna: null, suggestions: [], error: null, loading: false };
      // Already new structure
      if (property.hpPropertyId !== undefined || property.isManual !== undefined) {
        return {
          hpPropertyId: property.hpPropertyId || null,
          displayAddress: property.displayAddress || '',
          commune: property.commune || '',
          region: property.region || '',
          acquisitionDate: property.acquisitionDate || '',
          fiscalValue: property.fiscalValue || null,
          hpValuation: property.hpValuation || null,
          isManual: property.isManual || false,
          manualAddress: property.manualAddress || '',
          manualCommune: property.manualCommune || '',
          manualRegion: property.manualRegion || '',
          hpSearch: property.hpSearch || defaultHpSearch,
        };
      }
      // Old manual structure (street/streetNumber fields) → migrate to manual mode
      const oldAddress = [
        property.street || '',
        property.streetNumber || '',
        property.unit || ''
      ].filter(Boolean).join(' ');
      return {
        hpPropertyId: null,
        displayAddress: '',
        commune: '',
        region: '',
        acquisitionDate: property.acquisitionDate || '',
        fiscalValue: property.fiscalValue || null,
        hpValuation: null,
        isManual: true,
        manualAddress: oldAddress || property.address || '',
        manualCommune: property.comuna || '',
        manualRegion: property.region || '',
        hpSearch: defaultHpSearch,
      };
    });
  }

  return newData;
};

// Load from localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return createEmptyFormData();

    const parsed = JSON.parse(data);
    // Migrate old data to new structure
    return migrateFormData(parsed);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return createEmptyFormData();
  }
};

// Clear localStorage
const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STEP_KEY);
    localStorage.removeItem('heredame_selected_tier');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Save current step
const saveCurrentStep = (step) => {
  try {
    localStorage.setItem(STORAGE_STEP_KEY, step.toString());
    return true;
  } catch (error) {
    console.error('Error saving current step:', error);
    return false;
  }
};

// Load current step
const loadCurrentStep = () => {
  try {
    const step = localStorage.getItem(STORAGE_STEP_KEY);
    return step ? parseInt(step) : 1;
  } catch (error) {
    console.error('Error loading current step:', error);
    return 1;
  }
};

// Calculate summary
const calculateSummary = (formData) => {
  const assets = formData.assets || {};
  const debts = formData.debts || [];

  // Total assets
  let totalAssets = 0;

  (assets.realEstate || []).forEach(property => {
    totalAssets += property.appraisalValue || 0;
  });

  (assets.vehicles || []).forEach(vehicle => {
    totalAssets += vehicle.appraisalValue || 0;
  });

  (assets.bankAccounts || []).forEach(account => {
    totalAssets += account.estimatedBalance || 0;
  });

  (assets.otherAssets || []).forEach(asset => {
    totalAssets += asset.appraisalValue || 0;
  });

  // Total debts
  const totalDebts = debts.reduce((sum, debt) => sum + (debt.outstandingBalance || 0), 0);

  // Net estate value
  const netEstateValue = totalAssets - totalDebts;

  // Count heirs (include spouse if alive)
  const heirs = formData.heirs || {};
  const spouseCount = (heirs.spouse && heirs.spouse.isAlive) ? 1 : 0;
  const heirsCount =
    spouseCount +
    (heirs.children || []).length +
    (heirs.parents || []).length +
    (heirs.siblings || []).length;

  return {
    totalAssets,
    totalDebts,
    netEstateValue,
    heirsCount
  };
};

// Export functions for Node.js (if available)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createEmptyFormData,
    migrateFormData,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    saveCurrentStep,
    loadCurrentStep,
    calculateSummary
  };
}

// Export functions for browser (global window object)
if (typeof window !== 'undefined') {
  window.createEmptyFormData = createEmptyFormData;
  window.migrateFormData = migrateFormData;
  window.saveToStorage = saveToStorage;
  window.loadFromStorage = loadFromStorage;
  window.clearStorage = clearStorage;
  window.saveCurrentStep = saveCurrentStep;
  window.loadCurrentStep = loadCurrentStep;
  window.calculateSummary = calculateSummary;
}
