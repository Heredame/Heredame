// All page copy lives here, keyed by section. Edit these strings directly —
// components just read from this object, they don't hardcode text.
// Spanish (es) is the source of truth / default language; English (en) is a
// straight translation for the language toggle in the header.

export const translations = {
  es: {
    meta: {
      title: "Herédame | Transformamos herencias en tranquilidad",
      description:
        "Plataforma de mediación y gestión de herencias en Chile. Simula tu herencia gratis, resuelve conflictos familiares y evita perder hasta un 50% de tu patrimonio en remates judiciales.",
    },
    nav: {
      quienesSomos: "Quiénes somos",
      beneficios: "Beneficios",
      servicios: "Servicios",
      comoFunciona: "Cómo Funciona",
      nosotros: "Nosotros",
      preguntas: "Preguntas",
      contacto: "Contacto",
      cta: "Simular mi herencia",
    },
    hero: {
      eyebrow: "Mediación y gestión de herencias en Chile",
      title: "Transformamos herencias en tranquilidad",
      subtitle:
        "Acompañamos a familias chilenas a resolver y planificar sus herencias de forma ágil, transparente y humana — sin litigios eternos ni pérdida de valor.",
      ctaPrimary: "Simula tu herencia gratis",
      ctaSecondary: "Agenda una llamada gratuita",
      trustNote: "Sin mínimos. Sin letra chica. Precios fijos desde el día uno.",
    },
    simulador: {
      eyebrow: "Simulador gratuito de sucesión",
      title: "Calcula una distribución orientativa en segundos.",
      subtitle:
        "Cónyuge, hijos, padres, testamento y sociedad conyugal: ingresa los datos principales y visualiza un escenario inicial antes de pedir tu informe completo.",
      noteBrand: "Herédame",
      note: "Solo orientativo · No constituye asesoría legal",
      badges: [
        { value: "1", label: "Propiedad" },
        { value: "3", label: "Personas ingresadas" },
        { value: "Completo", label: "Escenario" },
      ],
      processSteps: ["Inicio", "Verificación", "Análisis", "Documentos", "Cierre"],
      chartTitle: "Ejemplo: esposa y 2 hijos",
      chartHelp: "Distribución orientativa entre esposa e hijos.",
      segments: [
        { label: "Esposa", value: 50 },
        { label: "Hijo 1", value: 25 },
        { label: "Hijo 2", value: 25 },
      ],
      checks: ["Propiedad identificada", "Plan de herederos", "Plan de documentación", "Distribución lista"],
      ctaPrimary: "Obtener mi informe",
      ctaSecondary: "Hablar con un asesor",
      ctaCard: "Abrir Simulador Completo",
    },
    stats: {
      eyebrow: "Por qué existimos",
      title: "La mayoría de las herencias en Chile se reparten sin planificación",
      items: [
        { value: "4,7M", label: "chilenos son dueños de al menos una propiedad" },
        { value: "130.000", label: "personas fallecen cada año en Chile" },
        { value: "7.667", label: "testamentos se registraron en todo el país en 2023" },
        { value: "30–50%", label: "del valor real se pierde en remates judiciales sin acuerdo" },
      ],
    },
    quienesSomos: {
      eyebrow: "Quiénes somos",
      title: "Una nueva forma de resolver herencias en Chile",
      body:
        "Herédame es una plataforma chilena de mediación y gestión de herencias que combina asesoría legal, mediación estratégica y tecnología colaborativa. Acompañamos a las familias desde el primer diagnóstico hasta el cierre del proceso, evitando que el patrimonio quede detenido en trámites eternos o se pierda hasta un 50% de su valor en remates judiciales.",
      highlights: [
        "Mediación familiar",
        "Tecnología colaborativa",
        "Acompañamiento legal de principio a fin",
      ],
      imageAlt: "Equipo de Herédame acompañando a una familia en su proceso de herencia",
      experienceNote: "Más de 10 años de experiencia",
    },
    beneficios: {
      eyebrow: "Beneficios",
      title: "Todo lo que necesitas para avanzar con tranquilidad",
      subtitle: "Cuatro pilares que guían cada caso que gestionamos.",
      items: [
        {
          title: "Liberación del patrimonio",
          body: "Recupera el control de los bienes que te corresponden, sin burocracia ni trámites eternos.",
        },
        {
          title: "Protección de tu patrimonio",
          body: "Evitamos que tu familia pierda entre un 30% y un 50% de su herencia en remates judiciales a valor fiscal.",
        },
        {
          title: "Acuerdos sin discusiones",
          body: "Un espacio digital neutral donde los herederos votan decisiones y firman contratos en línea.",
        },
        {
          title: "Acompañamiento humano",
          body: "Mediación cercana y proactiva, en vez de esperar a que el conflicto termine en juicio.",
        },
      ],
    },
    comoFunciona: {
      eyebrow: "Cómo funciona",
      title: "Un proceso simple, paso a paso",
      steps: [
        { title: "Nos cuentas qué pasó", body: "Partimos con una llamada o el simulador. Revisamos quiénes son los herederos, qué bienes existen y qué dudas tiene la familia." },
        { title: "Ordenamos la información", body: "Preparamos un diagnóstico claro, con los documentos necesarios, los pasos legales y una distribución orientativa fácil de entender." },
        { title: "Buscamos acuerdo familiar", body: "Mediamos la conversación para que todos entiendan sus opciones y puedan decidir sin presión ni discusiones eternas." },
        { title: "Cerramos y acompañamos", body: "Te guiamos en la firma, posesión efectiva, venta, adjudicación o el trámite que corresponda hasta dejar el proceso avanzado." },
      ],
    },
    diferenciadores: {
      eyebrow: "Por qué somos distintos",
      title: "No somos un estudio jurídico tradicional",
      items: [
        {
          title: "De la demanda a la mediación",
          body: "Actuamos de forma proactiva buscando consenso, en vez de esperar a que la familia llegue a juicio.",
        },
        {
          title: "Informe de Impacto Patrimonial",
          body: "Te mostramos, con cifras claras, la diferencia real entre llegar a un acuerdo hoy o rematar en tribunales.",
        },
        {
          title: "Tecnología colaborativa",
          body: "Votaciones internas y firma de contratos 100% en línea, sin importar dónde viva cada heredero.",
        },
        {
          title: "Salida de emergencia financiera",
          body: "Conectamos a quienes necesitan liquidez inmediata con fondos de inversión dispuestos a comprar sus derechos hereditarios.",
        },
      ],
    },
    servicios: {
      eyebrow: "Servicios",
      title: "Un camino claro, con precios fijos desde el día uno",
      subtitle: "Avanza al ritmo que necesites — desde una simulación gratuita hasta la resolución completa del caso.",
      items: [
        { name: "Simulador Gratuito", body: "Calcula la distribución orientativa de tu herencia en minutos, sin costo." },
        { name: "Diagnóstico Automático", body: "Informe automático con el estado general de tu herencia." },
        { name: "Estudio Sucesorio Personalizado", body: "Revisión a fondo de tus documentos oficiales por nuestro equipo." },
        { name: "Consultoría Express", body: "Estudio personalizado + videollamada de 30 minutos con un experto." },
        { name: "Mediación Familiar", body: "Te ayudamos a llegar a acuerdo y a vender el bien a su valor justo." },
        { name: "Planificación de Legado", body: "Diseño, redacción y gestión legal de tu testamento en vida." },
        { name: "Liquidez Inmediata", body: "Conexión directa con fondos de inversión para vender tus derechos hereditarios." },
      ],
      cta: "Ver todos los servicios",
      contactText: "¿No sabes cuál servicio necesitas? Te orientamos sin costo.",
      contactCta: "Contactar a Herédame",
    },
    booking: {
      eyebrow: "Agenda una conversación",
      title: "Hablemos 30 minutos, sin costo",
      subtitle:
        "Una llamada gratuita para entender tu caso y orientarte sobre el mejor camino a seguir — sin compromiso.",
      placeholderNote: "El calendario de reservas se integrará aquí (Cal.com).",
    },
    nosotros: {
      eyebrow: "Sobre nosotros",
      title: "Abogados, mediadores y tecnología al servicio de tu familia",
      body:
        "Heredame es una plataforma de mediación y gestión de herencias que combina asesoría legal, mediación estratégica y tecnología colaborativa para transformar el conflicto familiar en una decisión clara y tranquila.",
      mission: {
        label: "Misión",
        body: "Transformar la gestión de herencias en un proceso fluido, ágil y transparente — evitando el estancamiento de la riqueza familiar y facilitando la libre circulación de los bienes.",
      },
      vision: {
        label: "Visión",
        body: "Ser la empresa con la que la gente identifique la palabra herencia en Chile y Latinoamérica.",
      },
      team: {
        eyebrow: "Nuestro equipo",
        title: "Un equipo multidisciplinario detrás de cada caso",
        subtitle: "Derecho, ingeniería y diseño trabajando juntos para que tu proceso avance sin fricción.",
        members: [
          { name: "Constanza Pérez", role: "Diseñadora UX", bio: "Lorem ipsum dolor sit amet, enfoque humano y diseño claro para acompañar cada etapa del proceso." },
          { name: "Valentina Henríquez", role: "Abogada Corporativa", bio: "Lorem ipsum dolor sit amet, asesoría legal cercana para ordenar documentos, acuerdos y decisiones familiares." },
          { name: "Adrian Lillo", role: "Ingeniero Civil", bio: "Lorem ipsum dolor sit amet, mirada estratégica para convertir casos complejos en pasos simples y medibles." },
          { name: "Fernando Guzmán", role: "Ingeniero en Software", bio: "Lorem ipsum dolor sit amet, tecnología segura y colaborativa para que cada heredero avance sin fricción." },
          { name: "Abogada con experiencia en plataformas legal-tech", role: "Equipo Legal", bio: "Lorem ipsum dolor sit amet, experiencia legal-tech para unir criterio jurídico, procesos digitales y mediación." },
        ],
      },
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas con calma",
      items: [
        {
          q: "¿Qué es la posesión efectiva y por qué es el primer paso?",
          a: "Es el trámite legal que reconoce a los herederos como continuadores del patrimonio del fallecido. Sin ella no se puede vender, hipotecar ni repartir ningún bien de la herencia. Puede ser administrativa (Registro Civil, cuando hay testamento o herederos claros) o judicial (tribunales, en casos más complejos) — te orientamos sobre cuál te corresponde.",
        },
        {
          q: "¿Puedo vender una propiedad heredada antes de terminar todo el papeleo?",
          a: "No. El Artículo 688 del Código Civil exige inscribir la posesión efectiva, el auto de partición (o la adjudicación) y la propiedad a nombre de los herederos antes de poder venderla. Nuestro equipo se encarga de dejar el inmueble en condiciones legales de venta.",
        },
        {
          q: "¿Tengo que pagar impuesto a la herencia?",
          a: "Depende del monto y de tu cercanía con el fallecido. Por ejemplo, cónyuges, hijos y padres (Grupo I) están exentos hasta 50 UTA, cerca de $41.000.000. Muchas herencias familiares quedan bajo ese umbral y no pagan impuesto — lo calculamos en tu diagnóstico inicial.",
        },
        {
          q: "¿Qué pasa si los herederos no se ponen de acuerdo?",
          a: "Para eso existe nuestra Mediación Familiar: buscamos consenso en un espacio neutral antes de llegar a juicio. Un juicio de partición puede tardar años y consumir hasta un 10% del valor de la herencia en costos — por eso siempre recomendamos agotar primero el acuerdo directo.",
        },
        {
          q: "¿El informe reemplaza a un abogado?",
          a: "No. Te entrega claridad inmediata sobre tu situación; para la gestión formal cuentas con nuestro equipo de mediación y abogados especializados que te acompañan de principio a fin.",
        },
        {
          q: "¿Necesito un testamento para que esto funcione?",
          a: "No es obligatorio. Si no hay testamento, la ley chilena define igualmente quiénes son los herederos y en qué proporción (sucesión intestada). Nuestro simulador funciona con o sin testamento.",
        },
        {
          q: "¿Mis datos están seguros?",
          a: "Sí. Tratamos tu información familiar y patrimonial con reserva y cifrado durante todo el proceso.",
        },
        {
          q: "¿Qué incluye la llamada gratuita de 30 minutos?",
          a: "Es una conversación inicial sin costo para entender tu caso puntual y orientarte sobre el mejor camino a seguir, sin compromiso.",
        },
      ],
      itemsExtra: [
        {
          q: "¿Cómo se reparte la herencia si no hay testamento?",
          a: "La ley chilena ya define un orden: primero heredan los hijos junto al cónyuge o conviviente civil, quien recibe el doble de lo que le corresponde a cada hijo, con un mínimo garantizado del 25% de la herencia. Si no hay hijos ni cónyuge, heredan los padres y, después, los hermanos. Te ayudamos a calcular exactamente cuánto te corresponde según tu caso.",
        },
        {
          q: "¿Puedo dejar a un hijo o a mi cónyuge fuera del testamento?",
          a: "No de forma libre. La ley protege a los hijos, al cónyuge y a los padres con las llamadas \"legítimas\", una porción de la herencia que no se puede quitar salvo causas muy específicas y probadas judicialmente. Sí puedes decidir con libertad sobre una parte menor del patrimonio, la \"cuarta de libre disposición\".",
        },
        {
          q: "¿Puedo vender solo mi parte de la herencia sin esperar a que todos estén de acuerdo?",
          a: "Sí. Puedes ceder o vender tu cuota hereditaria a otro heredero o a un tercero sin necesidad de que los demás estén de acuerdo, aunque no puedes vender un bien específico (como \"la mitad de la casa\") hasta que se haga la partición. Es justamente lo que resolvemos en nuestro servicio de Liquidez Inmediata.",
        },
        {
          q: "¿Qué pasa si uno de los herederos vive en el extranjero o no podemos juntarnos todos?",
          a: "No es un problema. Nuestra plataforma permite votar acuerdos y firmar contratos con validez legal 100% en línea, así que los herederos pueden participar desde donde estén, sin viajes ni reuniones presenciales.",
        },
        {
          q: "¿Qué documentos necesito para partir el trámite?",
          a: "Lo básico es el certificado de defunción del causante, los certificados de nacimiento y matrimonio de los herederos, y un listado o inventario de los bienes (propiedades, vehículos, cuentas). Si existe testamento, también se necesita una copia autorizada. Te guiamos paso a paso para reunir todo correctamente.",
        },
        {
          q: "¿Cuánto se demora el proceso de posesión efectiva?",
          a: "Si no hay testamento, el trámite es administrativo ante el Registro Civil y suele tomar entre 30 y 60 días. Si hay testamento, es un proceso judicial que puede tardar entre 3 meses y un año. En ambos casos te ayudamos a evitar los errores más comunes que alargan los plazos.",
        },
        {
          q: "¿Qué pasa si el fallecido dejó deudas?",
          a: "Como heredero, por regla general respondes de las deudas del causante, incluso con tu propio patrimonio. Para evitar ese riesgo, existe la \"aceptación con beneficio de inventario\", que limita tu responsabilidad solo hasta el valor de los bienes que recibes. Te orientamos sobre cuál opción conviene a tu caso.",
        },
        {
          q: "¿Qué pasa si un heredero no quiere aceptar la herencia?",
          a: "Todo heredero tiene el derecho de aceptar o repudiar (rechazar) la herencia; nadie está obligado a recibirla, por ejemplo si las deudas superan el valor de los bienes. Si alguien repudia, su parte se distribuye entre los demás herederos según las reglas legales — te explicamos qué implica en tu caso.",
        },
      ],
      tabLeft: "Lo esencial",
      tabRight: "Trámites y detalles",
    },
    contacto: {
      eyebrow: "Contacto",
      title: "Hablemos de tu caso",
      subtitle: "Cuéntanos tu situación y un asesor te contactará para orientarte, con calma y sin costo.",
      hours: "Lunes a viernes, 9:00 a 18:00 hrs",
      form: {
        name: "Nombre completo",
        phone: "Teléfono",
        email: "Correo electrónico",
        message: "Cuéntanos tu situación",
        messagePlaceholder: "Ej: Mi padre falleció y somos 3 hermanos, no sabemos cómo empezar…",
        submit: "Enviar mensaje",
        note: "Tus datos se usan solo para contactarte sobre tu proceso de herencia.",
      },
    },
    footer: {
      tagline: "Herédame — mediación y gestión de herencias en Chile.",
      rights: "Todos los derechos reservados.",
      legal: "Términos de Uso y Aviso Legal",
      credit: "Diseñado por Devdenilson.com",
    },
    whatsapp: {
      label: "Chatea por WhatsApp",
      message: "Hola, quiero información sobre Herédame",
    },
  },

  en: {
    meta: {
      title: "Herédame | Turning inheritance into peace of mind",
      description:
        "Inheritance mediation and management platform in Chile. Simulate your inheritance for free, resolve family conflicts, and avoid losing up to 50% of your estate in judicial auctions.",
    },
    nav: {
      quienesSomos: "About Us",
      beneficios: "Benefits",
      servicios: "Services",
      comoFunciona: "How It Works",
      nosotros: "About Us",
      preguntas: "FAQ",
      contacto: "Contact",
      cta: "Simulate my inheritance",
    },
    hero: {
      eyebrow: "Inheritance mediation & management in Chile",
      title: "Turning inheritance into peace of mind",
      subtitle:
        "We help Chilean families resolve and plan their inheritance process — agile, transparent, and human, without endless litigation or lost value.",
      ctaPrimary: "Simulate your inheritance for free",
      ctaSecondary: "Book a free call",
      trustNote: "No minimums. No fine print. Fixed pricing from day one.",
    },
    simulador: {
      eyebrow: "Free inheritance simulator",
      title: "Calculate an indicative distribution in seconds.",
      subtitle:
        "Spouse, children, parents, will, and marital property regime: enter the main details and preview an initial scenario before requesting your complete report.",
      noteBrand: "Herédame",
      note: "Indicative only · Not legal advice",
      badges: [
        { value: "1", label: "Property" },
        { value: "3", label: "People entered" },
        { value: "Complete", label: "Scenario" },
      ],
      processSteps: ["Start", "Verification", "Analysis", "Documents", "Close"],
      chartTitle: "Example: wife and 2 sons",
      chartHelp: "Indicative distribution between wife and sons.",
      segments: [
        { label: "Wife", value: 50 },
        { label: "Son 1", value: 25 },
        { label: "Son 2", value: 25 },
      ],
      checks: ["Property identified", "Heir plan", "Documentation plan", "Distribution ready"],
      ctaPrimary: "Get my report",
      ctaSecondary: "Talk to an advisor",
      ctaCard: "Open Full Simulator",
    },
    stats: {
      eyebrow: "Why we exist",
      title: "Most inheritances in Chile are settled with no planning at all",
      items: [
        { value: "4.7M", label: "Chileans own at least one property" },
        { value: "130,000", label: "people pass away in Chile every year" },
        { value: "7,667", label: "wills were registered nationwide in 2023" },
        { value: "30–50%", label: "of real value lost in judicial auctions without an agreement" },
      ],
    },
    quienesSomos: {
      eyebrow: "Who we are",
      title: "A new way to resolve inheritances in Chile",
      body:
        "Herédame is a Chilean inheritance mediation and management platform that combines legal advice, strategic mediation, and collaborative technology. We support families from the first diagnosis through the close of the process, preventing assets from getting stuck in endless paperwork or losing up to 50% of their value in judicial auctions.",
      highlights: [
        "Family mediation",
        "Collaborative technology",
        "End-to-end legal support",
      ],
      imageAlt: "Herédame team supporting a family through their inheritance process",
      experienceNote: "More than 10 years of experience",
    },
    beneficios: {
      eyebrow: "Benefits",
      title: "Everything you need to move forward with peace of mind",
      subtitle: "Four pillars guide every case we handle.",
      items: [
        {
          title: "Unlock your estate",
          body: "Regain control of the assets that belong to you, without endless red tape.",
        },
        {
          title: "Protect your estate's value",
          body: "We prevent your family from losing 30–50% of the inheritance in judicial auctions at tax value.",
        },
        {
          title: "Agreements without arguments",
          body: "A neutral digital space where heirs vote on decisions and sign contracts online.",
        },
        {
          title: "Human, hands-on support",
          body: "Proactive mediation, instead of waiting for the conflict to end up in court.",
        },
      ],
    },
    comoFunciona: {
      eyebrow: "How it works",
      title: "A simple process, step by step",
      steps: [
        { title: "Tell us what happened", body: "We start with a call or the simulator. We review who the heirs are, what assets exist, and what questions the family has." },
        { title: "We organize the information", body: "We prepare a clear diagnosis with the required documents, legal steps, and an easy-to-understand indicative distribution." },
        { title: "We seek family agreement", body: "We mediate the conversation so everyone understands their options and can decide without pressure or endless arguments." },
        { title: "We close and support you", body: "We guide signatures, estate filing, sale, allocation, or the right next step until the process is moving forward." },
      ],
    },
    diferenciadores: {
      eyebrow: "Why we're different",
      title: "We're not a traditional law firm",
      items: [
        {
          title: "From lawsuits to mediation",
          body: "We act proactively to find consensus, instead of waiting for the family to end up in court.",
        },
        {
          title: "Estate Impact Report",
          body: "We show you, with clear numbers, the real difference between reaching an agreement today or a judicial auction.",
        },
        {
          title: "Collaborative technology",
          body: "Internal voting and 100% online contract signing, no matter where each heir lives.",
        },
        {
          title: "Financial emergency exit",
          body: "We connect heirs who need immediate liquidity with investment funds willing to buy their inheritance rights.",
        },
      ],
    },
    servicios: {
      eyebrow: "Services",
      title: "A clear path, with fixed pricing from day one",
      subtitle: "Move at the pace you need — from a free simulation to a fully resolved case.",
      items: [
        { name: "Free Simulator", body: "Get an indicative distribution of your inheritance in minutes, at no cost." },
        { name: "Automatic Diagnosis", body: "Automated report on the general state of your inheritance." },
        { name: "Personalized Estate Study", body: "In-depth review of your official documents by our team." },
        { name: "Express Consulting", body: "Personalized study plus a 30-minute video call with an expert." },
        { name: "Family Mediation", body: "We help you reach agreement and sell the asset at fair value." },
        { name: "Legacy Planning", body: "Design, drafting, and legal management of your will while you're alive." },
        { name: "Immediate Liquidity", body: "Direct connection with investment funds to sell your inheritance rights." },
      ],
      cta: "See all services",
      contactText: "Not sure which service you need? We can guide you at no cost.",
      contactCta: "Contact Herédame",
    },
    booking: {
      eyebrow: "Book a conversation",
      title: "Let's talk for 30 minutes, free",
      subtitle: "A free call to understand your case and guide you toward the best path forward — no obligation.",
      placeholderNote: "The booking calendar will be embedded here (Cal.com).",
    },
    nosotros: {
      eyebrow: "About us",
      title: "Lawyers, mediators, and technology working for your family",
      body:
        "Heredame is an inheritance mediation and management platform that combines legal advice, strategic mediation, and collaborative technology to turn family conflict into a clear, calm decision.",
      mission: {
        label: "Mission",
        body: "To turn inheritance management into a fluid, agile, and transparent process — preventing family wealth from stalling and enabling assets to circulate freely.",
      },
      vision: {
        label: "Vision",
        body: "To be the company people associate with the word 'inheritance' in Chile and Latin America.",
      },
      team: {
        eyebrow: "Our team",
        title: "A multidisciplinary team behind every case",
        subtitle: "Law, engineering, and design working together so your process moves forward without friction.",
        members: [
          { name: "Constanza Pérez", role: "UX Designer", bio: "Lorem ipsum dolor sit amet, human-centered design and clear guidance for every stage of the process." },
          { name: "Valentina Henríquez", role: "Corporate Lawyer", bio: "Lorem ipsum dolor sit amet, approachable legal support for documents, agreements, and family decisions." },
          { name: "Adrian Lillo", role: "Civil Engineer", bio: "Lorem ipsum dolor sit amet, strategic thinking to turn complex cases into simple, measurable steps." },
          { name: "Fernando Guzmán", role: "Software Engineer", bio: "Lorem ipsum dolor sit amet, secure collaborative technology so every heir can move forward smoothly." },
          { name: "Lawyer with legal-tech platform experience", role: "Legal Team", bio: "Lorem ipsum dolor sit amet, legal-tech experience joining legal criteria, digital process, and mediation." },
        ],
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "We answer your questions calmly",
      items: [
        {
          q: "What is \"posesión efectiva\" and why is it the first step?",
          a: "It's the legal process that recognizes the heirs as the continuators of the deceased's estate. Without it, no asset in the inheritance can be sold, mortgaged, or distributed. It can be administrative (Civil Registry, when there's a will or clear heirs) or judicial (courts, for more complex cases) — we help you figure out which one applies to you.",
        },
        {
          q: "Can I sell an inherited property before finishing all the paperwork?",
          a: "No. Article 688 of the Civil Code requires registering the posesión efectiva, the partition order (or the award), and the property under the heirs' names before it can be sold. Our team handles getting the property into legal condition for sale.",
        },
        {
          q: "Do I have to pay inheritance tax?",
          a: "It depends on the amount and your relationship to the deceased. For example, spouses, children, and parents (Group I) are exempt up to 50 UTA, around $41,000,000 CLP. Many family inheritances fall under that threshold and pay no tax — we calculate this in your initial diagnosis.",
        },
        {
          q: "What if the heirs don't agree?",
          a: "That's exactly what our Family Mediation service is for: we seek consensus in a neutral space before reaching court. A partition lawsuit can take years and consume up to 10% of the estate's value in costs — that's why we always recommend exhausting a direct agreement first.",
        },
        {
          q: "Does the report replace a lawyer?",
          a: "No. It gives you immediate clarity on your situation; for formal management you have our team of mediators and specialized lawyers guiding you from start to finish.",
        },
        {
          q: "Do I need a will for this to work?",
          a: "It's not required. If there's no will, Chilean law still defines who the heirs are and in what proportion (intestate succession). Our simulator works with or without a will.",
        },
        {
          q: "Is my data safe?",
          a: "Yes. We handle your family and estate information with confidentiality and encryption throughout the process.",
        },
        {
          q: "What does the free 30-minute call include?",
          a: "It's a free initial conversation to understand your specific case and guide you toward the best path forward, no obligation.",
        },
      ],
      itemsExtra: [
        {
          q: "How is the inheritance divided if there's no will?",
          a: "Chilean law already sets an order: children inherit first, together with the spouse or civil partner, who receives double what each child gets, with a guaranteed minimum of 25% of the estate. If there are no children or spouse, parents inherit, then siblings. We help you calculate exactly what you're entitled to in your case.",
        },
        {
          q: "Can I leave a child or my spouse out of my will?",
          a: "Not freely. Chilean law protects children, spouses, and parents through what's called a \"legítima\" — a portion of the estate that can't be taken away except for very specific, legally proven reasons. You do have free rein over a smaller portion of the estate, the \"cuarta de libre disposición\".",
        },
        {
          q: "Can I sell just my share of the inheritance without waiting for everyone to agree?",
          a: "Yes. You can transfer or sell your inheritance share to another heir or a third party without needing everyone else's agreement, though you can't sell a specific asset (like \"half the house\") until the estate is formally divided. This is exactly what our Immediate Liquidity service solves.",
        },
        {
          q: "What if one of the heirs lives abroad or we can't all get together?",
          a: "That's not a problem. Our platform lets heirs vote on agreements and sign contracts with full legal validity 100% online, so everyone can participate from wherever they are, with no travel or in-person meetings required.",
        },
        {
          q: "What documents do I need to get started?",
          a: "The basics are the deceased's death certificate, the heirs' birth and marriage certificates, and a list or inventory of the assets (properties, vehicles, accounts). If there's a will, you'll also need a certified copy. We guide you step by step to gather everything correctly.",
        },
        {
          q: "How long does the posesión efectiva process take?",
          a: "If there's no will, it's an administrative process through the Civil Registry that usually takes 30 to 60 days. If there's a will, it's a judicial process that can take anywhere from 3 months to a year. Either way, we help you avoid the most common mistakes that drag it out.",
        },
        {
          q: "What if the deceased left debts?",
          a: "As an heir, you're generally responsible for the deceased's debts, even with your own assets. To avoid that risk, there's an option called \"acceptance with benefit of inventory,\" which limits your liability to the value of what you actually inherit. We'll help you figure out which option fits your case.",
        },
        {
          q: "What if an heir doesn't want to accept the inheritance?",
          a: "Every heir has the right to accept or renounce (reject) an inheritance — no one is obligated to receive it, for example if the debts outweigh the assets. If someone renounces, their share is redistributed among the other heirs according to the legal rules — we'll walk you through what that means for your case.",
        },
      ],
      tabLeft: "The essentials",
      tabRight: "Process & details",
    },
    contacto: {
      eyebrow: "Contact",
      title: "Let's talk about your case",
      subtitle: "Tell us your situation and an advisor will reach out to guide you — calmly, at no cost.",
      hours: "Monday to Friday, 9:00 am – 6:00 pm",
      form: {
        name: "Full name",
        phone: "Phone",
        email: "Email",
        message: "Tell us your situation",
        messagePlaceholder: "E.g. My father passed away and we're 3 siblings, we don't know where to start…",
        submit: "Send message",
        note: "Your data is only used to contact you about your inheritance process.",
      },
    },
    footer: {
      tagline: "Herédame — inheritance mediation and management in Chile.",
      rights: "All rights reserved.",
      legal: "Terms of Use and Legal Notice",
      credit: "Designed by Devdenilson.com",
    },
    whatsapp: {
      label: "Chat on WhatsApp",
      message: "Hi, I'd like information about Herédame",
    },
  },
};
