/**
 * Herédame - Site Configuration
 *
 * This file contains all centralized configuration for the website.
 * Update these values to change the site name, branding, and content across all pages.
 *
 * Usage in HTML:
 * 1. Include this script: <script src="/js/site-config.js"></script>
 * 2. Use: <span data-content="site.name"></span>
 * 3. Or in Petite-Vue: {{ $siteConfig.site.name }}
 */

const SITE_CONFIG = {
  // ========================================
  // SITE IDENTITY
  // ========================================
  site: {
    name: 'Herédame',
    domain: 'heredame.cl',
    company: 'Herédame SpA',
    tagline: 'Tu Informe de Herencia en tiempo record',
    description: 'Obtén tu informe de herencia completo en tiempo record. Plataforma legal tech especializada en derecho sucesorio en Chile.',
    keywords: 'herencia, derecho sucesorio, informe herencia, Chile, legal tech'
  },

  // ========================================
  // CONTACT INFORMATION
  // ========================================
  contact: {
    phone: '(+56) 9 9397 7894',
    phoneRaw: '+56993977894',
    email: 'contacto@heredame.cl',
    address: 'Santiago, Chile'
  },

  // ========================================
  // CALL TO ACTION BUTTONS
  // ========================================
  cta: {
    primary: 'Comenzar',
    secondary: 'Más Información',
    formUrl: '/formulario.html'
  },

  // ========================================
  // NAVIGATION
  // ========================================
  navigation: {
    menu: [
      { label: 'Beneficios', href: '#beneficios' },
      { label: 'Cómo Funciona', href: '#como-funciona' },
      { label: '¿Porqué Nosotros?', href: '#recursos' },
      { label: 'Sobre Nosotros', href: '#sobre-nosotros' }
    ],
    footer: [
      { label: 'Términos Legales', href: '/terminos-legales.html' },
      { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes.html' },
      { label: 'Asesores Legales', href: '/asesores-legales.html' }
    ]
  },

  // ========================================
  // HERO SECTION
  // ========================================
  hero: {
    title: 'Completa los datos y recibe tu informe de herencia en solo un par de clicks!',
    imageAlt: 'Informe de Herencia'
  },

  // ========================================
  // BENEFITS SECTION
  // ========================================
  benefits: {
    title: 'Hemos descifrado el código.',
    subtitle: 'Tu proceso de herencia simplificado con tecnología de punta',
    items: [
      {
        title: 'Rápido y Eficiente',
        description: 'Obtén tu informe de herencia completo en tiempo record, no en semanas. Nuestro sistema automatizado agiliza todo el proceso.'
      },
      {
        title: 'Seguro y Confidencial',
        description: 'Tus datos están se encuentran protegidos. Tu información permanece privada y segura en todo momento.'
      },
      {
        title: 'Legalmente Preciso',
        description: 'Nuestros reportes han sido elaborados por expertos legales quienes te pueden ayudar en tu proceso de posesión efectiva y trámites posteriores.'
      },
      {
        title: 'Soporte Dedicado',
        description: 'Nuestro equipo está disponible para responder tus preguntas y guiarte en cada paso del camino.'
      }
    ]
  },

  // ========================================
  // HOW IT WORKS SECTION
  // ========================================
  howItWorks: {
    section1: {
      title: 'Ve el Panorama Completo',
      subtitle: 'Nuestro sistema te proporciona una visión integral de todo tu proceso de herencia.',
      items: [
        'Ingresa tus datos y los de quien te hereda de forma sencilla',
        'Nuestro sistema analiza automáticamente toda la información legal',
        'Recibe un informe detallado con todos los pasos a seguir',
        'Accede a documentación personalizada lista para presentar'
      ]
    },
    section2: {
      title: 'Documentación Clara y Fiable',
      subtitle: 'Cada informe incluye toda la documentación que necesitas para proceder con confianza.',
      items: [
        'Reportes personalizados con tu información',
        'Detalle de escenarios para que tomes mejores decisiones',
        'Distribución clara, ara que tú y tu familia no tengan dudas',
        'Formato profesional listo para presentar y pensado para decidir'
      ]
    }
  },

  // ========================================
  // COMPARISON SECTION
  // ========================================
  comparison: {
    title: '¿Por Qué Elegir Herédame?',
    subtitle: 'Compara nuestra solución con el proceso tradicional',
    columns: [
      {
        name: 'Proceso Tradicional',
        highlighted: false,
        features: [
          { text: 'Semanas o meses de espera', available: false },
          { text: 'Depende de un abogado o notario', available: false },
          { text: 'Costos variables y poco claros', available: false },
          { text: 'Pago adicional por cada consulta', available: false },
          { text: 'Solo en horario de oficina', available: false },
          { text: 'Reuniones y trámites presenciales', available: false }
        ]
      },
      {
        name: 'Herédame',
        highlighted: true,
        features: [
          { text: 'Informe listo en minutos, no semanas', available: true },
          { text: '100% en línea — desde donde estés', available: true },
          { text: 'Precio fijo y transparente', available: true },
          { text: 'Todas tus dudas resueltas en un solo documento', available: true },
          { text: 'Disponible 24/7, cualquier día', available: true },
          { text: 'Sin reuniones, sin explicaciones previas', available: true }
        ]
      }
    ]
  },

  // ========================================
  // ABOUT US SECTION
  // ========================================
  about: {
    title: 'Sobre Nosotros',
    description: 'Somos un equipo de abogados especializados en derecho sucesorio con hartos años de experiencia asesorando a familias en los momentos más delicados de sus vidas. A lo largo de nuestra trayectoria, hemos comprendido que los procesos de herencia pueden resultar complejos, lentos y emocionalmente agotadores. Por eso hemos creado Herédame, con el fin de simplificar el proceso, entregar respuestas claras a los herederos sobre los pasos a seguir y además aventurar consejos sobre cómo repartir las herencias entre todos los herederos. Todo en un informe y en tiempo récord. Creemos que la transparencia y la eficiencia no deben ser un lujo, sino un estándar en el servicio legal. Nuestro compromiso es acompañarte con la certeza jurídica que mereces, respaldada por años de práctica profesional y la agilidad que solo la tecnología bien aplicada puede ofrecer.',
    ctaTitle: 'Conecta con Nosotros',
    ctaText: '¿Listo para simplificar tu proceso de herencia? Comienza hoy y experimenta la diferencia que hace la tecnología moderna desarrollada por abogados expertos.'
  },

  // ========================================
  // FOOTER
  // ========================================
  footer: {
    quickLinksTitle: 'Enlaces Rápidos',
    contactTitle: 'Contacto',
    quickLinks: [
      { label: 'Leyes Aplicables', href: '/leyes-aplicables.html' },
      { label: 'Posesión Efectiva - Registro Civil', href: 'https://www.chileatiende.gob.cl/fichas/3364-posesion-efectiva-de-herencias-intestadas-sin-testamento' },
      { label: 'Impuesto a la Herencia', href: 'https://www.sii.cl/preguntas_frecuentes/herencias/001_160_6164.htm' },
      { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes.html' },
      { label: 'Asesores Legales', href: '/asesores-legales.html' }
    ]
  },

  // ========================================
  // FORM CONTENT
  // ========================================
  form: {
    title: 'Formulario de Herencia',
    welcome: {
      title: 'Bienvenido a',
      subtitle: 'Completa este formulario para obtener tu informe de herencia personalizado'
    },
    completion: {
      title: '¡Felicitaciones!',
      message: 'Tu informe será generado y enviado a tu correo en los próximos minutos.'
    },
    whatHappensNext: {
      title: '¿Qué sucede después?',
      basicPlan: {
        title: 'Plan Básico - Formulario Completo',
        text: 'Completarás un formulario detallado con toda la información de la herencia. Luego subirás el comprobante de pago.'
      },
      completePlan: {
        title: 'Informe Completo - Carga de Documentos',
        text: 'Nuestro equipo legal revisará tus documentos y procesará toda la información. Te contactaremos si necesitamos alguna aclaración. Tu informe estará listo en un máximo de 24 horas.'
      },
      premiumPlan: { 
        title: 'Informe Premium - Carga de Documentos + Asesoría',
        text: 'Nuestro equipo legal revisará tus documentos y procesará toda la información. Te contactaremos si necesitamos alguna aclaración. Tu informe estará listo en un máximo de 24 horas y agendaremos una consulta legal dentro de los próximos 3 días hábiles.'
      }
    },
    buttons: {
      next: 'Continuar',
      back: 'Atrás',
      submit: 'Proceder al Pago',
      add: 'Agregar',
      remove: 'Eliminar',
      changePlan: 'Cambiar Plan'
    }
  },

  // ========================================
  // PAYMENT & PRICING
  // ========================================
  payment: {
    title: 'Pago',
    description: 'Completa tu pago para recibir tu informe',
    currency: 'CLP',
    currencySymbol: '$',

    // Report Tiers - Configure each tier's availability, price, and features
    tiers: {
      basic: {
        enabled: true,  // Set to false to hide this tier
        name: 'Informe Básico',
        slug: 'basico',
        price: 9990,
        priceFormatted: '$9.990',
        description: 'Información esencial para iniciar el proceso de regularización de tu herencia',
        badge: 'Mejor Opción General',  // Optional badge text (e.g., "Más Popular")
        processDescription: {
          title: 'Plan Básico - Formulario Completo',
          text: 'Completarás un formulario detallado con toda la información de la herencia. Luego subirás el comprobante de pago.'
        },
        features: [
          'Informe básico en PDF',
          'Tú ingresas toda la información',
          'Cálculo de herederos',
          'Distribución porcentual',
          'Guía de pasos iniciales'
        ],
        benefits: [
          'Entrega de 3 a 4 horas',
          'Revisión legal básica',
          'Soporte por email'
        ],
        limitations: [
          'Requiere de tu lectura y apreciación de la información legal, puede contener errores'
        ]
      },
      normal: {
        enabled: true,
        name: 'Informe Completo',
        slug: 'completo',
        price: 24990,
        priceFormatted: '$24.990',
        description: 'La opción más completa para la mayoría de herencias',
        badge: 'Recomendado',  // Shows a badge on the card
        processDescription: {
          title: 'Informe Completo - Carga de Documentos',
          text: 'Pasarás directamente a cargar tus documentos (hasta 10 archivos, 10MB cada uno). Nuestro equipo procesará la información por ti.'
        },
        features: [
          'Informe completo en PDF',
          'Sube la documentación legal pertinente y nosotros completamos el informe',
          'Cálculo de herederos',
          'Distribución porcentual',
          'Guía de pasos iniciales'
        ],
        benefits: [
          'Entrega en 24 horas',
          'Revisado y completado por abogados expertos',
          'Conforme a legislación chilena',
          'Soporte por email'
        ],
        limitations: [
          'No puedes resolver dudas legales en tiempo real'
        ]  // No limitations for recommended tier
      },
      premium: {
        enabled: true,
        name: 'Informe Premium',
        slug: 'premium',
        price: 79990,
        priceFormatted: '$79.990',
        description: 'Servicio completo con asesoría legal personalizada',
        badge: 'Casos Complejos',
        processDescription: {
          title: 'Informe Premium - Carga de Documentos + Asesoría',
          text: 'Pasarás directamente a cargar tus documentos (hasta 10 archivos, 10MB cada uno). Nuestro equipo procesará la información por ti y agendaremos una consulta legal.'
        },
        features: [
          'Todo lo del Informe Completo',
          'Consulta con abogado (30 min)',
          'Revisión de documentos',
          'Estrategia para tu proceso de herencia',          
        ],
        benefits: [
          'Entrega en 24 horas y reunión para asesoría agendada dentro de los 5 días siguientes',
          'Asesoría legal incluida',
          'Atención prioritaria',
        ],
        limitations: []
      }
    },

    // Default tier (used when no selection is made)
    defaultTier: 'completo',

    // Bank transfer information
    bankTransfer: {
      enabled: true,  // Set to true when ready to accept transfers
      bankName: 'Scotiabank',
      accountType: 'Cuenta Corriente',
      accountNumber: '974876493',
      accountHolder: 'Daniel Velásquez',
      rut: '18.437.462-5',
      email: 'dan.velasquez.gomez@gmail.com',
      instructions: null,
    }
  },

  // ========================================
  // FORM ALERTS & MESSAGES
  // ========================================
  formAlerts: {
    posesionEfectiva: {
      testada: '📌 Información importante: La posesión efectiva testada se tramita en juicio y requiere de una asesoría legal especializada.',
      intestada: '📌 Información importante: La posesión efectiva intestada se puede tramitar gratuitamente ante el Servicio de Registro Civil e Identificación. Si requieres más apoyo no dudes en contactarnos.'
    },
    propertyAcquisitionDate: 'Importante para clasificación de bienes en sociedad conyugal',
    missingData: 'Por favor complete todos los campos requeridos antes de continuar',
    invalidRUT: 'El RUT ingresado no es válido. Por favor verifíquelo.',
    invalidEmail: 'Por favor ingrese un correo electrónico válido',
    loadingError: 'Error al cargar la página.\n\nAlgunas dependencias no se cargaron correctamente.\n\nPor favor:\n1. Abra el inspector (F12)\n2. Vea la pestaña Console\n3. Presione Cmd+Shift+R para refrescar',
    submitSuccess: '¡Formulario enviado exitosamente!',
    submitError: 'Ocurrió un error al enviar el formulario. Por favor intente nuevamente.',
    termsRequired: 'Debe leer y aceptar los Términos de Uso para continuar',
    termsReadFirst: 'Primero debe leer los términos',
    processingPayment: 'Procesando tu pago...',
    paymentSuccess: '¡Pago exitoso! Recibirás tu informe por correo en breve.'
  },

  // ========================================
  // FAQ PAGE
  // ========================================
  faq: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Encuentra respuestas a las preguntas más comunes sobre herencias y nuestro servicio',
    searchPlaceholder: 'Buscar en las preguntas...',
    legalSectionTitle: 'Preguntas Legales',
    serviceSectionTitle: 'Sobre Nuestro Servicio',
    ctaTitle: '¿No encontraste lo que buscabas?',
    ctaSubtitle: 'Nuestro equipo está disponible para ayudarte con cualquier pregunta',
    emailButtonText: 'Enviar un Email',
    advisorButtonText: 'Contactar un Asesor'
  },

  // ========================================
  // LEGAL ADVISORS PAGE
  // ========================================
  legalAdvisors: {
    title: 'Asesores Legales',
    subtitle: 'Conecta con Expertos en Derecho Sucesorio',
    description: 'Si tu caso requiere asesoría legal adicional o prefieres contar con acompañamiento profesional personalizado, podemos conectarte con abogados especializados en derecho sucesorio.',
    processTitle: '¿Cómo Funciona?',
    processSubtitle: 'Proceso simple para conectar con un asesor legal',
    steps: [
      {
        number: 1,
        title: 'Completa el Formulario',
        description: 'Cuéntanos sobre tu caso y tus necesidades específicas'
      },
      {
        number: 2,
        title: 'Te Asignamos un Asesor',
        description: 'Seleccionamos al mejor abogado según tu situación'
      },
      {
        number: 3,
        title: 'Recibe Asesoría Personalizada',
        description: 'El asesor te contactará en menos de 24 horas'
      }
    ],
    formTitle: 'Solicitar Asesoría Legal',
    ctaTitle: '¿Prefieres Contactarnos Directamente?',
    ctaSubtitle: 'También puedes escribirnos o llamarnos directamente'
  },

  // ========================================
  // TERMS & CONDITIONS PAGE
  // ========================================
  legal: {
    title: 'Términos de Uso y Aviso Legal',
    lastUpdated: 'Última actualización: Enero 2024'
  }
};

// ========================================
// PAYMENT HELPER FUNCTIONS
// ========================================

/**
 * Get all enabled payment tiers
 * @returns {Array} Array of enabled tier objects with their keys
 */
function getEnabledTiers() {
  const tiers = [];
  Object.keys(SITE_CONFIG.payment.tiers).forEach(key => {
    const tier = SITE_CONFIG.payment.tiers[key];
    if (tier.enabled) {
      tiers.push({ key, ...tier });
    }
  });
  return tiers;
}

/**
 * Get tier by slug
 * @param {string} slug - The tier slug (basico, completo, premium)
 * @returns {Object|null} Tier object or null if not found/enabled
 */
function getTierBySlug(slug) {
  const tier = Object.values(SITE_CONFIG.payment.tiers).find(t => t.slug === slug && t.enabled);
  return tier || null;
}

/**
 * Get default tier
 * @returns {Object} Default tier object
 */
function getDefaultTier() {
  const defaultSlug = SITE_CONFIG.payment.defaultTier;
  return getTierBySlug(defaultSlug) || getEnabledTiers()[0];
}

/**
 * Format price with currency
 * @param {number} price - Price in CLP
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
  return `${SITE_CONFIG.payment.currencySymbol}${price.toLocaleString('es-CL')} ${SITE_CONFIG.payment.currency}`;
}

// ========================================
// AUTO-REPLACE FUNCTIONALITY
// ========================================

/**
 * Automatically replaces data-content attributes with config values
 * Usage: <span data-content="site.name"></span>
 */
function replaceContentAttributes() {
  const elements = document.querySelectorAll('[data-content]');

  elements.forEach(element => {
    const path = element.getAttribute('data-content');
    const value = getConfigValue(path);

    if (value !== undefined) {
      // Check if element is a meta tag
      if (element.tagName === 'META') {
        element.setAttribute('content', value);
      }
      // Check if element is an input
      else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = value;
      }
      // Regular elements - set text content
      else {
        element.textContent = value;
      }
    }
  });
}

/**
 * Gets a config value by dot notation path
 * Example: getConfigValue('site.name') returns 'Herédame'
 */
function getConfigValue(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], SITE_CONFIG);
}

/**
 * Sets page title with site name
 */
function setPageTitle(pageTitle) {
  if (pageTitle) {
    document.title = `${pageTitle} - ${SITE_CONFIG.site.name}`;
  } else {
    document.title = `${SITE_CONFIG.site.name} - ${SITE_CONFIG.site.tagline}`;
  }
}

/**
 * Sets meta description
 */
function setMetaDescription(description) {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', description || SITE_CONFIG.site.description);
  }
}

// ========================================
// INITIALIZATION
// ========================================

// Auto-run when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceContentAttributes);
  } else {
    replaceContentAttributes();
  }
}

// ========================================
// PETITE-VUE INTEGRATION
// ========================================

/**
 * Creates a global mixin for Petite-Vue
 * Add this to your Petite-Vue apps for easy access
 */
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
  window.getSiteConfig = getConfigValue;
  window.setSiteTitle = setPageTitle;
  window.setSiteDescription = setMetaDescription;
}

// Export helper functions globally
if (typeof window !== 'undefined') {
  window.getEnabledTiers = getEnabledTiers;
  window.getTierBySlug = getTierBySlug;
  window.getDefaultTier = getDefaultTier;
  window.formatPrice = formatPrice;
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}