/**
 * Diccionario de Traducciones Bilingüe (Español / Inglés) para EIP & Associates
 * Permite la conmutación dinámica e instantánea de idioma al pulsar el botón del Navbar.
 */

export type Language = "ES" | "EN";

export interface ArticleTranslation {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export const TRANSLATIONS = {
  ES: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      testimonials: "Testimonios",
      contact: "Contacto",
      schedule: "Agendar Consulta",
    },
    hero: {
      trustBadge: "Derecho Migratorio • Residencias • Derecho Corporativo",
      titlePart1: "SU PUERTA DE ENTRADA PARA VIVIR,",
      titlePart2: "INVERTIR Y HACER NEGOCIOS",
      titleIn: "EN",
      titlePanama: "PANAMÁ",
      subtitle:
        "Guiamos a personas, familias y empresas internacionales en programas de residencia, trámites de inmigración, permisos de trabajo y servicios legales corporativos con apoyo legal personalizado.",
      explore: "Explorar Servicios",
      contact: "Contáctenos",
      scroll: "Deslizar para Explorar",
      panamaTime: "Hora Oficial de Panamá",
      dayVideo: "Video Día",
      nightVideo: "Video Noche",
    },
    whyPanama: {
      badge: "Ventajas Estratégicas",
      title: "Por Qué Panamá Sigue Siendo Uno de los Destinos Más Atractivos del Mundo",
      subtitle:
        "Ubicado en el nexo del comercio internacional y el patrimonio privado, Panamá ofrece a inversionistas extranjeros, corporaciones y familias un entorno excepcionalmente estable para el crecimiento, la seguridad y la residencia.",
      card1Title: "Ubicación Estratégica",
      card1Tag: "Hub Logístico Global",
      card1Desc:
        "El crisol de las Américas. Panamá conecta rutas marítimas globales, centros de aviación internacional y corredores financieros con ventajas geográficas inigualables.",
      card2Title: "Negocios e Inversión",
      card2Tag: "Estabilidad Económica",
      card2Desc:
        "Una economía dolarizada y resiliente que ofrece tributación territorial, confidencialidad bancaria internacional e incentivos para Sedes de Empresas Multinacionales (SEM).",
      card3Title: "Oportunidades de Residencia",
      card3Tag: "Vías de Inmigración",
      card3Desc:
        "Programas de residencia permanente de tramitación expedita, incluyendo la Visa de Inversionista Calificado, Tratado de Países Amigos y permisos de trabajo ejecutivos.",
      card4Title: "Calidad de Vida",
      card4Tag: "Estilo de Vida Premium",
      card4Desc:
        "Atención médica privada de nivel mundial, infraestructura moderna, clima tropical, seguridad y un estilo de vida cosmopolita diseñado para familias internacionales.",
      learnMore: "Conocer Más",
    },
    legalInsights: {
      badge: "Análisis y Publicaciones Legales",
      title: "Análisis e Información Legal",
      subtitle:
        "Actualizaciones legales diarias, cambios regulatorios e información migratoria estratégica para inversionistas internacionales y ejecutivos corporativos en Panamá.",
      readArticle: "Leer Artículo",
      articles: [
        {
          id: "news-1",
          slug: "panama-qualified-investor-residency-2026",
          title: "Panamá Actualiza el Esquema de Residencia para Inversionistas Calificados: Implicaciones Fiscales y Legales Clave",
          summary:
            "Nuevos Decretos Ejecutivos perfeccionan los umbrales mínimos de inversión en bienes raíces y depósitos bancarios, ofreciendo rutas aceleradas de residencia permanente para inversionistas globales.",
          category: "Inmigración e Inversión",
          date: "4 de Agosto, 2026",
          readTime: "Lectura de 4 min",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-2",
          slug: "panama-multinational-headquarters-sem-guidelines",
          title: "Nuevas Guías de Transparencia Corporativa para Sedes Multinacionales (SEM) en Panamá",
          summary:
            "La Superintendencia de Panamá refuerza los estándares de cumplimiento para licencias SEM y EMMA, agilizando la gobernanza corporativa internacional.",
          category: "Derecho Corporativo y Comercial",
          date: "3 de Agosto, 2026",
          readTime: "Lectura de 5 min",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-3",
          slug: "panama-friendly-nations-program",
          title: "Programa de Visa de Países Amigos: Mejoras Regulatorias para Empleados y Empresarios",
          summary:
            "Una guía legal esencial para ejecutivos y ciudadanos extranjeros que buscan permisos de trabajo y residencia bajo los tratados bilaterales actualizados de Panamá.",
          category: "Permisos de Trabajo",
          date: "1 de Agosto, 2026",
          readTime: "Lectura de 3 min",
          imageUrl:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-4",
          slug: "panama-canal-logistics-free-zones-2026",
          title: "Marco Legal de Logística del Canal de Panamá y Zonas Francas 2026: Visión Estratégica",
          summary:
            "Análisis de exenciones fiscales, concesiones marítimas y estructuras de protección patrimonial disponibles para entidades logísticas internacionales en Colón y Panamá Pacífico.",
          category: "Derecho Marítimo y Comercio",
          date: "29 de Julio, 2026",
          readTime: "Lectura de 6 min",
          imageUrl:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        },
      ] as ArticleTranslation[],
    },
    cta: {
      badge: "Asesoría Legal Confidencial",
      title: "¿Listo para Iniciar su Trayectoria en Panamá?",
      subtitle:
        "Programe una consulta privada con nuestros socios principales para evaluar su programa de residencia, portafolio de inversión o estructura corporativa en Panamá.",
      button: "Agendar una Consulta",
      disclaimer:
        "Todas las consultas están sujetas al secreto profesional entre abogado y cliente y a la estricta normativa de confidencialidad panameña.",
    },
    footer: {
      summary:
        "Firma legal corporativa de primer nivel en Panamá, especializada en programas de residencia migratoria, permisos de trabajo, protección de activos y asesoría en inversiones internacionales.",
      locationTitle: "Ubicación de la Oficina",
      mapsLink: "Abrir en Google Maps",
      hoursTitle: "Horario de Atención",
      hoursValue: "Lunes a Viernes: 9:00 AM - 4:00 PM (Hora Oficial de Panamá)",
      contactTitle: "Contacto Directo",
      privacy: "Política de Privacidad",
      terms: "Términos del Servicio Legal",
      compliance: "Cumplimiento Regulatorio",
    },
    aboutPage: {
      hero: {
        badge: "15+ Años de Excelencia Legal en Panamá",
        title: "Orientación Legal Estratégica para Personas, Inversionistas y Empresas Internacionales",
        subtitle:
          "En EIP & Associates, brindamos soluciones legales estratégicas en derecho migratorio, derecho corporativo, cumplimiento regulatorio y servicios legales especializados, ayudando a clientes internacionales a establecerse, invertir y crecer con confianza en Panamá.",
        btnExplore: "Explorar Nuestros Servicios",
        btnContact: "Contáctenos",
      },
      credibilityBar: [
        { label: "15+ Años de Experiencia" },
        { label: "Derecho Migratorio y Corporativo" },
        { label: "Clientes Internacionales" },
        { label: "Práctica Legal con Sede en Panamá" },
      ],
      whoWeAre: {
        badge: "Quiénes Somos",
        title: "Nuestra Historia y Propósito",
        p1: "En EIP & Associates, somos una firma de abogados con sede en Panamá con más de 15 años de experiencia brindando soluciones legales estratégicas a personas, inversionistas y empresas internacionales.",
        p2: "Nuestra práctica se enfoca en derecho migratorio, derecho corporativo, cumplimiento regulatorio y servicios legales especializados, ofreciendo claridad, confidencialidad y orientación profesional en cada etapa del proceso legal.",
        p3: "Con un amplio conocimiento del marco legal de Panamá, trabajamos en estrecha colaboración con cada cliente para comprender sus objetivos y desarrollar estrategias legales prácticas, en cumplimiento normativo y orientadas a resultados.",
        p4: "Nuestro compromiso es construir relaciones a largo plazo basadas en la confianza, la transparencia y un servicio legal excepcional.",
      },
      values: {
        badge: "Nuestros Principios",
        title: "Nuestros Valores Fundamentales",
        items: [
          {
            title: "Integridad",
            desc: "Inquebrantable adhesión a principios éticos, confidencialidad absoluta y estricto secreto profesional en cada asunto legal confiado.",
          },
          {
            title: "Excelencia Profesional",
            desc: "Análisis riguroso, profundo conocimiento del sistema legal panameño y atención meticulosa a cada detalle de su caso.",
          },
          {
            title: "Transparencia",
            desc: "Comunicación clara, procesos directos y orientación franca en cada etapa sin términos ocultos ni ambigüedades.",
          },
          {
            title: "Compromiso a Largo Plazo",
            desc: "Construcción de alianzas perdurables como asesores de confianza para su crecimiento, protección de activos y estabilidad legal.",
          },
        ],
      },
      whyTrust: {
        badge: "Nuestra Ventaja Competitiva",
        title: "Por Qué los Clientes Confían en EIP",
        items: [
          {
            title: "Soluciones Legales Personalizadas",
            desc: "Estrategias legales diseñadas a la medida de sus objetivos específicos, estructuras patrimoniales y requerimientos internacionales.",
          },
          {
            title: "Experiencia con Clientes Internacionales",
            desc: "Años de trayectoria guiando a inversionistas extranjeros, familias multinacionales y corporaciones a establecerse en Panamá.",
          },
          {
            title: "Más de 15 Años de Experiencia",
            desc: "Sólida trayectoria navegando el panorama regulatorio, derecho migratorio y gobierno corporativo en Panamá.",
          },
          {
            title: "Procesos Legales Transparentes",
            desc: "Seguimiento claro paso a paso, cronogramas estructurados y honorarios transparentes para total tranquilidad.",
          },
          {
            title: "Cumplimiento Regulatorio",
            desc: "Alineación rigurosa con normas nacionales, estándares internacionales de prevención de blanqueo y normativas SEM.",
          },
          {
            title: "Alianza de Confianza a Largo Plazo",
            desc: "Acompañamiento continuo tras completar trámites iniciales, protegiendo sus activos y continuidad corporativa.",
          },
        ],
      },
      journey: {
        badge: "Nuestra Trayectoria",
        title: "Evolución y Consolidación",
        timeline: [
          {
            year: "Desde 2010",
            title: "Fundación de EIP & Associates",
            desc: "Establecimiento de la firma con el propósito de brindar asesoría legal estratégica en Panamá.",
          },
          {
            year: "Expansión Migratoria",
            title: "Servicios Migratorios Especializados",
            desc: "Creación de la unidad especializada en programas de residencia e inversión extranjera.",
          },
          {
            year: "Práctica Corporativa",
            title: "Práctica Legal Corporativa",
            desc: "Consolidación de servicios en derecho corporativo, gobernanza y cumplimiento multinacional.",
          },
          {
            year: "Crecimiento Internacional",
            title: "Red Global de Clientes",
            desc: "Ampliación de la red global de clientes en las Américas, Europa y Asia.",
          },
          {
            year: "Actualidad",
            title: "Firma Legal Referente en Panamá",
            desc: "Líderes en asesoría legal integral para inversionistas, familias y empresas multinacionales.",
          },
        ],
      },
      commitment: {
        badge: "Nuestra Filosofía",
        title: "Nuestro Compromiso Inquebrantable",
        quote:
          '"Creemos que cada cliente merece una orientación legal estratégica brindada con integridad, discreción y un compromiso inquebrantable."',
        subtext:
          "En EIP & Associates, nuestro compromiso va más allá de la representación legal. Construimos relaciones duraderas al brindar asesoramiento legal confiable, comunicación transparente y soluciones legales a medida que respaldan a nuestros clientes en cada etapa de su trayectoria en Panamá.",
      },
      cta: {
        title: "¿Listo para Trabajar con un Equipo Legal de Confianza?",
        text: "Ya sea que esté planeando mudarse, establecer un negocio o requiera asistencia legal especializada en Panamá, nuestro equipo está listo para ayudarle.",
        btnSchedule: "Agendar una Consulta",
        btnContact: "Contáctenos",
      },
    },
    testimonialsPage: {
      hero: {
        badge: "TESTIMONIOS DE CLIENTES",
        title: "Lo que dicen nuestros clientes",
        subtitle:
          "Conozca las experiencias de clientes que han confiado en EIP & Associates para sus procesos migratorios, corporativos y asuntos legales en Panamá.",
      },
      googleReviews: {
        title: "Google Reviews",
        sourceTag: "Google",
        readMore: "Leer más",
        readLess: "Leer menos",
        viewOnGoogle: "Ver en Google Maps",
      },
      summary: {
        basedOn: "Basado en Google Reviews",
        viewAll: "Ver todas las reseñas en Google",
        reviewsCount: "{count} reseñas",
      },
      fallback: {
        title: "Testimonios no disponibles temporalmente",
        message:
          "Client testimonials are temporarily unavailable. Please visit our Google profile to see the latest reviews.",
        messageEs:
          "Los testimonios de clientes no están disponibles temporalmente. Por favor, visite nuestro perfil de Google para ver las reseñas más recientes.",
        btnGoogle: "View Reviews on Google",
        btnGoogleEs: "Ver reseñas en Google",
      },
      trust: {
        badge: "EXPERIENCIA INTERNACIONAL",
        title: "La confianza de clientes de todo el mundo",
        subtitle:
          "Nuestro equipo legal representa a personas, familias, inversionistas y empresas internacionales que buscan servicios legales de alto estándar y residencia en Panamá.",
        item1Title: "15+ Años de Experiencia",
        item1Desc: "Sólida trayectoria guiando a clientes extranjeros en el panorama legal panameño.",
        item2Title: "Inmigración y Residencia",
        item2Desc: "Asesoría especializada en Inversionista Calificado, Países Amigos y programas de residencia.",
        item3Title: "Servicios Corporativos y Legales",
        item3Desc: "Constitución de sociedades, licencias SEM, contratos y protección de activos internacionales.",
        item4Title: "Experiencia con Clientes Internacionales",
        item4Desc: "Atención bilingüe, transparente y confidencial en cada asunto legal.",
      },
      cta: {
        title: "¿Listo para discutir sus necesidades legales?",
        text: "Ya sea que busque asistencia migratoria, soluciones de residencia, servicios corporativos o asesoría legal en Panamá, nuestro equipo está listo para ayudarle.",
        btnSchedule: "Programar una Consulta",
        mapsBlockTitle: "Vea más reseñas en Google",
        mapsBlockBtn: "Ver reseñas en Google",
      },
    },
    contactPage: {
      hero: {
        badge: "Contacte a Nuestro Equipo Legal",
        title: "Hablemos de Sus Necesidades Legales",
        subtitle:
          "Ya sea que requiera asistencia migratoria, servicios legales corporativos o asesoría estratégica en Panamá, nuestro equipo experimentado está listo para ayudarle.",
      },
      cards: {
        addressTitle: "Dirección de la Oficina",
        hoursTitle: "Horario de Atención",
        emailTitle: "Correo Corporativo",
        phoneTitle: "Teléfono Corporativo",
        whatsappTitle: "WhatsApp Business",
        openMaps: "Abrir en Google Maps",
        panamaTime: "EST / Hora Oficial de Panamá",
        sendEmail: "Enviar Correo",
        callUs: "Llamar Ahora",
        openChat: "Abrir Chat",
      },
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        phone: "Teléfono",
        country: "País",
        subject: "Asunto",
        message: "Mensaje",
        privacyCheck: "Acepto la Política de Privacidad.",
        submitBtn: "Enviar Mensaje",
        submittingBtn: "Enviando...",
        charCount: "{count} / 3000 caracteres (mínimo 20)",
        customSubjectLabel: "Escriba el Asunto Específico",
        customSubjectPlaceholder: "Especifique el asunto de su consulta...",
        subjectOptions: [
          "Seleccione un Asunto",
          "Residencia e Inmigración",
          "Permiso de Trabajo",
          "Corporativo",
          "Compra Venta de Propiedades",
          "Servicios de Cédula",
          "Notariales y Apostilla",
          "Fingerprints & FBI Request",
          "Otro Asunto",
        ],
      },
      responseTime: {
        title: "Tiempo Promedio de Respuesta",
        content: "Menos de 24 Horas Hábiles",
      },
      locationCard: {
        title: "Oficina Central en Panamá",
        subtitle: "Century Tower, Ciudad de Panamá, República de Panamá",
        hours: "Lunes a Viernes: 9:00 AM - 4:00 PM (Hora Oficial de Panamá)",
        btnMaps: "Abrir en Google Maps",
      },
      faq: {
        badge: "Preguntas Frecuentes",
        title: "Preguntas Frecuentes sobre Consultas Legales",
        items: [
          {
            q: "¿Cuánto tiempo se tarda en recibir una respuesta?",
            a: "Nuestro equipo legal revisa y responde a todas las consultas en menos de 24 horas hábiles. Para asuntos urgentes, puede comunicarse directamente por teléfono o WhatsApp Business.",
          },
          {
            q: "¿Puedo agendar una consulta privada?",
            a: "Sí, ofrecemos consultas presenciales en nuestra oficina de Panamá o virtuales a través de videoconferencia confidencial con nuestros socios principales.",
          },
          {
            q: "¿Brindan asesoría a clientes internacionales?",
            a: "Absolutamente. La mayor parte de nuestra práctica está enfocada en guiar a inversionistas extranjeros, familias multinacionales y corporaciones de las Américas, Europa y Asia.",
          },
          {
            q: "¿Qué servicios legales ofrecen?",
            a: "Somos especialistas en derecho migratorio (residencias, permisos de trabajo, visas de inversionista), derecho corporativo, gobernanza comercial, bienes raíces y protección de activos en Panamá.",
          },
        ],
      },
      modal: {
        title: "Gracias por Contactarnos",
        message:
          "Hemos recibido correctamente su consulta. Uno de nuestros asesores legales se pondrá en contacto con usted lo antes posible.",
        btnHome: "Volver al Inicio",
        btnClose: "Cerrar",
      },
    },
    privacyPage: {
      hero: {
        badge: "Protección de Datos & Confidencialidad",
        title: "Política de Privacidad",
        subtitle:
          "Cumplimiento riguroso de la Ley N° 81 de Protección de Datos Personales de Panamá y el estricto Secreto Profesional Abogado-Cliente.",
        updatedDate: "Última actualización: 6 de Agosto, 2026",
      },
      sections: [
        {
          title: "1. Marco Legal y Compromiso de Confidencialidad",
          content:
            "En EIP & Associates, valoramos y respetamos la privacidad de nuestros clientes e interesados. El tratamiento de los datos personales recopilados a través de este sitio web cumple estrictamente con la Ley N° 81 del 26 de marzo de 2019 sobre Protección de Datos Personales de la República de Panamá, su Decreto Ejecutivo N° 285 de 2021, y el deber del Secreto Profesional Abogado-Cliente establecido en la legislación nacional.",
        },
        {
          title: "2. Datos Personales Recopilados",
          content:
            "Recopilamos únicamente los datos estrictamente necesarios para brindar asesoría jurídica y responder sus consultas: nombre completo, dirección de correo electrónico, número telefónico, país de residencia y descripción del asunto legal. No recolectamos información financiera sensible ni datos de tarjetas a través de este formulario.",
        },
        {
          title: "3. Finalidad del Tratamiento de Datos",
          content:
            "Los datos recopilados se utilizan exclusivamente para: (a) Evaluar su consulta jurídica y establecer contacto inicial; (b) Gestionar la prestación de servicios legales contratados; (c) Cumplir con las obligaciones legales de verificación de identidad (KYC) y prevención de blanqueo de capitales bajo la normativa panameña.",
        },
        {
          title: "4. Secreto Profesional Abogado-Cliente",
          content:
            "Toda comunicación enviada a nuestra firma está amparada bajo el estricto secreto profesional conferido por el Código Judicial de Panamá (Art. 396) y el Código de Ética del Abogado. Su información no será divulgada, vendida ni transferida a terceros sin su consentimiento expreso o por mandato judicial firme de autoridad panameña competente.",
        },
        {
          title: "5. Medidas de Seguridad Tecnológica",
          content:
            "Implementamos cifrado SSL/TLS de grado bancario para la transmisión de datos, protección por servidor seguro SMTP, filtrado de seguridad con Cloudflare y almacenamiento en bases de datos con políticas de seguridad RLS de acceso restringido.",
        },
        {
          title: "6. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)",
          content:
            "Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales conforme a la Ley N° 81. Para ejercer cualquiera de estos derechos o solicitar la eliminación de sus datos de nuestros registros de contacto, puede enviar un correo formal a info@eippanamalawyers.net.",
        },
      ],
    },
    termsPage: {
      hero: {
        badge: "Términos Legales de Uso",
        title: "Términos del Servicio Legal",
        subtitle:
          "Condiciones de uso de nuestro portal web, alcance del contenido y naturaleza de la orientación legal inicial.",
        updatedDate: "Última actualización: 6 de Agosto, 2026",
      },
      sections: [
        {
          title: "1. Aceptación de los Términos",
          content:
            "Al acceder y utilizar este sitio web (eippanamalawyers.net), usted acepta quedar sujeto a los presentes Términos del Servicio Legal. Si no está de acuerdo con alguna disposición contenida en este documento, le solicitamos amablemente abstenerse de navegar o enviar información a través del portal.",
        },
        {
          title: "2. Ausencia de Relación Abogado-Cliente por Consulta Web",
          content:
            "El envío de información a través del formulario de contacto o el uso de este portal web no constituye ni genera por sí solo una relación formal de representación o relación abogado-cliente. Tal relación formal se constituirá únicamente tras la firma del contrato de servicios profesionales y/o el otorgamiento del poder correspondiente ante Notario Público.",
        },
        {
          title: "3. Carácter Informativo del Contenido",
          content:
            "Las publicaciones, análisis jurídicos, guías de inmigración y artículos difundidos en este portal tienen fines exclusivamente informativos e ilustrativos. No deben ser interpretados como un dictamen o concepto legal vinculante ni sustituyen la asesoría legal directa e individualizada de un abogado idóneo.",
        },
        {
          title: "4. Propiedad Intelectual y Derechos Reservados",
          content:
            "Todo el contenido, diseños, logotipos, marcas, código fuente y textos exhibidos en este sitio son propiedad exclusiva de EIP & Associates y están protegidos por las leyes de propiedad intelectual de la República de Panamá y los convenios internacionales vigentes.",
        },
        {
          title: "5. Jurisdicción y Ley Aplicable",
          content:
            "Cualquier controversia, reclamo o interpretación derivada del uso de este sitio web será regulada y resuelta exclusivamente conforme a las leyes de la República de Panamá, sometiéndose a la jurisdicción de los Tribunales Ordinarios de la Ciudad de Panamá.",
        },
      ],
    },
    compliancePage: {
      hero: {
        badge: "Prevención & Ética Corporativa",
        title: "Cumplimiento Regulatorio",
        subtitle:
          "Adhesión rigurosa a las normas de Prevención del Blanqueo de Capitales (AML) y estándares internacionales de transparencia.",
        updatedDate: "Última actualización: 6 de Agosto, 2026",
      },
      sections: [
        {
          title: "1. Compromiso de Cumplimiento Normativo (AML / CFT)",
          content:
            "EIP & Associates opera en estricto cumplimiento con el marco legal de la República de Panamá para la prevención del blanqueo de capitales, financiamiento del terrorismo y financiamiento de la proliferación de armas de destrucción masiva, en apego a la Ley N° 23 de 27 de abril de 2015 y sus modificaciones.",
        },
        {
          title: "2. Políticas de Debida Diligencia (KYC - Conozca a su Cliente)",
          content:
            "Como parte de nuestra responsabilidad profesional bajo la supervisión de la Superintendencia de Sujetos No Financieros (SSNF), aplicamos procedimientos de debida diligencia para verificar la identidad de los clientes, beneficiarios finales y el origen lícito de los fondos en trámites de residencia, estructuración corporativa o transacciones inmobiliarias.",
        },
        {
          title: "3. Verificación del Origen Lícito de Fondos",
          content:
            "En programas de inversión (tales como la Visa de Inversionista Calificado) o aperturas de sociedades, nuestra firma requerirá la documentación de soporte idónea que acredite el origen lícito del capital, incluyendo extractos bancarios, declaraciones fiscales o estados financieros auditable.",
        },
        {
          title: "4. Estándares Internacionales (GAFI / FATCA / CRS)",
          content:
            "Nuestra práctica legal está plenamente alineada con las recomendaciones del Grupo de Acción Financiera Internacional (GAFI / FATF) y los estándares globales de transparencia fiscal e intercambio de información financiera.",
        },
      ],
    },
  },
  EN: {
    nav: {
      home: "Home",
      about: "About Us",
      testimonials: "Testimonials",
      contact: "Contact Us",
      schedule: "Schedule Consultation",
    },
    hero: {
      trustBadge: "Immigration • Residency • Corporate Law",
      titlePart1: "YOUR GATEWAY TO LIVING,",
      titlePart2: "INVESTING AND DOING BUSINESS",
      titleIn: "IN",
      titlePanama: "PANAMA",
      subtitle:
        "We guide individuals, families and international businesses through residency programs, immigration procedures, work permits and corporate legal services with personalized legal support.",
      explore: "Explore Services",
      contact: "Contact Us",
      scroll: "Scroll to Explore",
      panamaTime: "Panama Official Time",
      dayVideo: "Day Video",
      nightVideo: "Night Video",
    },
    whyPanama: {
      badge: "Strategic Advantages",
      title: "Why Panama Continues to Be One of the World's Most Attractive Destinations",
      subtitle:
        "Positioned at the nexus of international commerce and private wealth, Panama offers foreign investors, corporations, and families an exceptionally stable environment for growth, security, and residency.",
      card1Title: "Strategic Location",
      card1Tag: "Global Logistics Hub",
      card1Desc:
        "The Crossroads of the Americas. Panama connects global shipping lanes, international aviation hubs, and financial corridors with unmatched geographic advantages.",
      card2Title: "Business & Investment",
      card2Tag: "Economic Stability",
      card2Desc:
        "A dollarized, resilient economy offering territorial taxation, international banking confidentiality, and tax-exempt Multinational Headquarters (SEM) incentives.",
      card3Title: "Residency Opportunities",
      card3Tag: "Immigration Pathways",
      card3Desc:
        "Fast-track permanent residency programs including the Qualified Investor Visa, Friendly Nations Treaty, and specialized work permits for executives.",
      card4Title: "Quality of Life",
      card4Tag: "World-Class Living",
      card4Desc:
        "World-class private healthcare, modern infrastructure, tropical climate, safety, and a vibrant cosmopolitan lifestyle tailored for international families.",
      learnMore: "Learn More",
    },
    legalInsights: {
      badge: "Legal Insights & Publications",
      title: "Legal Insights & Analysis",
      subtitle:
        "Daily legal updates, regulatory shifts, and immigration intelligence for international investors and corporate executives in Panama.",
      readArticle: "Read Article",
      articles: [
        {
          id: "news-1",
          slug: "panama-qualified-investor-residency-2026",
          title: "Panama Updates Qualified Investor Residency Scheme: Key Tax & Legal Implications",
          summary:
            "New Executive Decrees refine the minimum investment threshold for real estate and banking deposits, offering accelerated permanent residency routes for global investors.",
          category: "Immigration & Investment",
          date: "August 4, 2026",
          readTime: "4 min read",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-2",
          slug: "panama-multinational-headquarters-sem-guidelines",
          title: "New Corporate Transparency Guidelines for Multinational Headquarters (SEM) in Panama",
          summary:
            "The Superintendency of Panama reinforces compliance standards for SEM and EMMA license holders, streamlining international corporate governance.",
          category: "Corporate & Commercial",
          date: "August 3, 2026",
          readTime: "5 min read",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-3",
          slug: "panama-friendly-nations-program",
          title: "Friendly Nations Visa Program: Regulatory Enhancements for Employment & Business Owners",
          summary:
            "An essential legal guide for executives and foreign nationals seeking work permits and residency under Panama's updated bilateral treaty frameworks.",
          category: "Work Permits",
          date: "August 1, 2026",
          readTime: "3 min read",
          imageUrl:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        },
        {
          id: "news-4",
          slug: "panama-canal-logistics-free-zones-2026",
          title: "Panama Canal Logistics & Free Trade Zone Legal Framework 2026 Strategic Overview",
          summary:
            "Analysis of tax exemptions, maritime concessions, and asset protection structures available for international logistics entities in Colon and Panama Pacifico.",
          category: "Maritime & Trade",
          date: "July 29, 2026",
          readTime: "6 min read",
          imageUrl:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        },
      ] as ArticleTranslation[],
    },
    cta: {
      badge: "Confidential Legal Advisory",
      title: "Ready to Start Your Journey in Panama?",
      subtitle:
        "Schedule a private, structured consultation with our senior partners to evaluate your residency program, investment portfolio, or corporate structure in Panama.",
      button: "Schedule a Consultation",
      disclaimer:
        "All consultations are bound by attorney-client privilege and strict Panamanian confidentiality regulations.",
    },
    footer: {
      summary:
        "Premier corporate law firm in Panama specializing in immigration residency programs, work permits, asset protection, and international investment advisory.",
      locationTitle: "Office Location",
      mapsLink: "Open in Google Maps",
      hoursTitle: "Business Hours",
      hoursValue: "Monday - Friday: 9:00 AM - 4:00 PM (EST / Panama Time)",
      contactTitle: "Direct Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Legal Service",
      compliance: "Regulatory Compliance",
    },
    aboutPage: {
      hero: {
        badge: "15+ Years of Legal Excellence in Panama",
        title: "Strategic Legal Guidance for Individuals, Investors and International Businesses",
        subtitle:
          "At EIP & Associates, we provide strategic legal solutions in immigration, corporate law, regulatory compliance and specialized legal services, helping international clients establish, invest and grow confidently in Panama.",
        btnExplore: "Explore Our Services",
        btnContact: "Contact Us",
      },
      credibilityBar: [
        { label: "15+ Years of Experience" },
        { label: "Immigration & Corporate Law" },
        { label: "International Clients" },
        { label: "Panama-Based Legal Practice" },
      ],
      whoWeAre: {
        badge: "Who We Are",
        title: "Our History and Purpose",
        p1: "At EIP & Associates, we are a Panama-based law firm with more than 15 years of experience providing strategic legal solutions to individuals, investors and international businesses.",
        p2: "Our practice focuses on immigration law, corporate law, regulatory compliance and specialized legal services, delivering clarity, confidentiality and professional guidance throughout every stage of the legal process.",
        p3: "With extensive knowledge of Panama's legal framework, we work closely with every client to understand their objectives and develop practical, compliant and results-oriented legal strategies.",
        p4: "Our commitment is to build long-term relationships based on trust, transparency and exceptional legal service.",
      },
      values: {
        badge: "Our Principles",
        title: "Our Core Values",
        items: [
          {
            title: "Integrity",
            desc: "Unwavering adherence to ethical principles, absolute confidentiality, and strict attorney-client privilege in every legal matter.",
          },
          {
            title: "Professional Excellence",
            desc: "Rigorous legal analysis, deep expertise in Panama's legal system, and meticulous attention to every detail of your case.",
          },
          {
            title: "Transparency",
            desc: "Clear communication, straightforward processes, and upfront counsel at every stage with no hidden terms or ambiguities.",
          },
          {
            title: "Long-Term Commitment",
            desc: "Building enduring partnerships as trusted advisors for your ongoing growth, asset protection, and legal stability in Panama.",
          },
        ],
      },
      whyTrust: {
        badge: "Our Competitive Edge",
        title: "Why Clients Trust EIP",
        items: [
          {
            title: "Personalized Legal Solutions",
            desc: "Tailored legal strategies designed around your specific objectives, asset structures, and international requirements.",
          },
          {
            title: "International Client Experience",
            desc: "Decades of expertise guiding foreign investors, multinational families, and global corporations seamlessly establishing in Panama.",
          },
          {
            title: "More than 15 Years of Experience",
            desc: "Proven track record navigating Panama's regulatory landscape, immigration laws, and corporate governance frameworks.",
          },
          {
            title: "Transparent Legal Processes",
            desc: "Step-by-step progress tracking, structured legal timelines, and transparent fee schedules for absolute peace of mind.",
          },
          {
            title: "Regulatory Compliance",
            desc: "Uncompromising alignment with national laws, international compliance standards, anti-money laundering, and SEM guidelines.",
          },
          {
            title: "Long-Term Trusted Partnership",
            desc: "Continuous legal counsel long after initial proceedings, preserving assets, corporate continuity, and family legacy in Panama.",
          },
        ],
      },
      journey: {
        badge: "Our Journey",
        title: "Evolution & Growth",
        timeline: [
          {
            year: "Since 2010",
            title: "Foundation of EIP & Associates",
            desc: "Establishment of the firm with a mandate for strategic legal advisory in Panama.",
          },
          {
            year: "Expansion of Immigration Services",
            title: "Specialized Immigration Practice",
            desc: "Creation of specialized department for residency programs and foreign investor visas.",
          },
          {
            year: "Corporate Legal Practice",
            title: "Corporate Governance Practice",
            desc: "Consolidation of corporate law, governance, and multinational compliance services.",
          },
          {
            year: "International Client Growth",
            title: "International Client Network",
            desc: "Expansion of global client portfolio across the Americas, Europe, and Asia.",
          },
          {
            year: "Today",
            title: "Premier Legal Firm in Panama",
            desc: "Leading comprehensive legal advisors for foreign investors, families, and global enterprises.",
          },
        ],
      },
      commitment: {
        badge: "Our Philosophy",
        title: "Our Unwavering Commitment",
        quote:
          '"We believe every client deserves strategic legal guidance delivered with integrity, discretion and unwavering commitment."',
        subtext:
          "At EIP & Associates, our commitment extends beyond legal representation. We build lasting relationships by providing reliable legal counsel, transparent communication and tailored legal solutions that support our clients throughout every stage of their journey in Panama.",
      },
      cta: {
        title: "Ready to Work with a Trusted Legal Team?",
        text: "Whether you are planning to relocate, establish a business or require specialized legal assistance in Panama, our team is ready to help.",
        btnSchedule: "Schedule a Consultation",
        btnContact: "Contact Us",
      },
    },
    testimonialsPage: {
      hero: {
        badge: "CLIENT TESTIMONIALS",
        title: "What Our Clients Say",
        subtitle:
          "Discover the experiences of clients who have trusted EIP & Associates with their immigration, corporate and legal matters in Panama.",
      },
      googleReviews: {
        title: "Google Reviews",
        sourceTag: "Google",
        readMore: "Read More",
        readLess: "Read Less",
        viewOnGoogle: "View on Google Maps",
      },
      summary: {
        basedOn: "Based on Google Reviews",
        viewAll: "View all reviews on Google",
        reviewsCount: "{count} reviews",
      },
      fallback: {
        title: "Client Testimonials Temporarily Unavailable",
        message:
          "Client testimonials are temporarily unavailable. Please visit our Google profile to see the latest reviews.",
        messageEs:
          "Los testimonios de clientes no están disponibles temporalmente. Por favor, visite nuestro perfil de Google para ver las reseñas más recientes.",
        btnGoogle: "View Reviews on Google",
        btnGoogleEs: "Ver reseñas en Google",
      },
      trust: {
        badge: "INTERNATIONAL EXPERIENCE",
        title: "Trusted by Clients from Around the World",
        subtitle:
          "Our legal team represents foreign investors, multinational families, and global enterprises seeking top-tier legal guidance and residency in Panama.",
        item1Title: "15+ Years of Experience",
        item1Desc: "Established track record guiding foreign clients through Panama's legal landscape.",
        item2Title: "Immigration & Residency",
        item2Desc: "Specialized assistance in Qualified Investor, Friendly Nations and residency programs.",
        item3Title: "Corporate & Legal Services",
        item3Desc: "Company formation, SEM licenses, contracts, and international asset protection.",
        item4Title: "International Client Experience",
        item4Desc: "Bilingual, transparent, and confidential attorney-client relationship.",
      },
      cta: {
        title: "Ready to Discuss Your Legal Needs?",
        text: "Whether you are looking for immigration assistance, residency solutions, corporate services or legal guidance in Panama, our team is ready to assist you.",
        btnSchedule: "Schedule a Consultation",
        mapsBlockTitle: "See More Reviews on Google",
        mapsBlockBtn: "View Google Reviews",
      },
    },
    contactPage: {
      hero: {
        badge: "Contact Our Legal Team",
        title: "Let's Discuss Your Legal Needs",
        subtitle:
          "Whether you need immigration assistance, corporate legal services or strategic legal guidance in Panama, our experienced team is ready to help.",
      },
      cards: {
        addressTitle: "Office Address",
        hoursTitle: "Business Hours",
        emailTitle: "Corporate Email",
        phoneTitle: "Corporate Phone",
        whatsappTitle: "WhatsApp Business",
        openMaps: "Open in Google Maps",
        panamaTime: "EST / Panama Time",
        sendEmail: "Send Email",
        callUs: "Call Us",
        openChat: "Open Chat",
      },
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        country: "Country",
        subject: "Subject",
        message: "Message",
        privacyCheck: "I agree to the Privacy Policy.",
        submitBtn: "Send Message",
        submittingBtn: "Sending...",
        charCount: "{count} / 3000 characters (minimum 20)",
        customSubjectLabel: "Specify Custom Subject",
        customSubjectPlaceholder: "Specify the subject of your inquiry...",
        subjectOptions: [
          "Select a Subject",
          "Residency & Immigration",
          "Work Permit",
          "Corporate Law",
          "Real Estate Buy & Sell",
          "Panamanian ID (Cédula) Services",
          "Notary & Apostille Services",
          "Fingerprints & FBI Request",
          "Other Subject",
        ],
      },
      responseTime: {
        title: "Average Response Time",
        content: "Less than 24 Business Hours",
      },
      locationCard: {
        title: "Panama Headquarters",
        subtitle: "Century Tower, Panama City, Republic of Panama",
        hours: "Monday - Friday: 9:00 AM - 4:00 PM (EST / Panama Time)",
        btnMaps: "Open in Google Maps",
      },
      faq: {
        badge: "Frequently Asked Questions",
        title: "Frequently Asked Questions About Legal Inquiries",
        items: [
          {
            q: "How long does it take to receive a response?",
            a: "Our legal team reviews and responds to all inquiries within less than 24 business hours. For urgent matters, you may reach out directly via phone or WhatsApp Business.",
          },
          {
            q: "Can I schedule a private consultation?",
            a: "Yes, we offer in-person consultations at our Panama office as well as virtual consultations via confidential video conference with our senior partners.",
          },
          {
            q: "Do you assist international clients?",
            a: "Absolutely. The majority of our practice is focused on guiding foreign investors, multinational families, and global corporations from the Americas, Europe, and Asia.",
          },
          {
            q: "What legal services do you provide?",
            a: "We specialize in immigration law (residency programs, work permits, investor visas), corporate law, commercial governance, real estate, and asset protection in Panama.",
          },
        ],
      },
      modal: {
        title: "Thank You for Contacting Us",
        message:
          "We have successfully received your inquiry. One of our legal advisors will review your message and contact you as soon as possible.",
        btnHome: "Back to Home",
        btnClose: "Close",
      },
    },
    privacyPage: {
      hero: {
        badge: "Data Protection & Confidentiality",
        title: "Privacy Policy",
        subtitle:
          "Strict compliance with Law No. 81 of Personal Data Protection of Panama and attorney-client privilege.",
        updatedDate: "Last updated: August 6, 2026",
      },
      sections: [
        {
          title: "1. Legal Framework & Confidentiality Commitment",
          content:
            "At EIP & Associates, we value and respect the privacy of our clients and website visitors. Processing of personal data collected through this website strictly complies with Law No. 81 of March 26, 2019 on Personal Data Protection of the Republic of Panama, Executive Decree No. 285 of 2021, and the duty of Attorney-Client Privilege established in Panamanian legislation.",
        },
        {
          title: "2. Personal Data Collected",
          content:
            "We collect only data strictly necessary to provide legal counsel and respond to inquiries: full name, email address, phone number, country of residence, and legal inquiry details. We do not collect sensitive financial information or credit card data through this form.",
        },
        {
          title: "3. Purpose of Data Processing",
          content:
            "Collected data is used exclusively to: (a) Evaluate your legal inquiry and initiate initial contact; (b) Manage provision of contracted legal services; (c) Comply with legal KYC/AML identity verification obligations under Panamanian law.",
        },
        {
          title: "4. Attorney-Client Privilege",
          content:
            "All communications sent to our firm are protected under strict attorney-client privilege granted by the Judicial Code of Panama (Art. 396) and the Lawyers' Code of Ethics. Your information will not be disclosed, sold, or transferred to third parties without your explicit consent or a binding court order.",
        },
        {
          title: "5. Technical Security Measures",
          content:
            "We implement bank-grade SSL/TLS encryption for data transmission, secure SMTP server protection, Cloudflare security filtering, and database storage with restricted RLS security policies.",
        },
        {
          title: "6. ARCO Rights (Access, Rectification, Cancellation, Opposition)",
          content:
            "You have the right to Access, Rectify, Cancel, or Oppose the processing of your personal data under Law No. 81. To exercise any of these rights, email info@eippanamalawyers.net.",
        },
      ],
    },
    termsPage: {
      hero: {
        badge: "Legal Terms of Use",
        title: "Terms of Legal Service",
        subtitle:
          "Conditions of use for our web portal, content scope, and nature of initial legal guidance.",
        updatedDate: "Last updated: August 6, 2026",
      },
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By accessing and using this website (eippanamalawyers.net), you agree to be bound by these Terms of Legal Service. If you do not agree with any provision, please refrain from using this portal.",
        },
        {
          title: "2. No Attorney-Client Relationship via Contact Form",
          content:
            "Submitting information via the contact form or browsing this website does not constitute an attorney-client relationship. Such a formal relationship is established only upon execution of a professional services agreement or formal power of attorney.",
        },
        {
          title: "3. Informational Nature of Content",
          content:
            "Legal publications, articles, and guides on this portal are provided solely for informational purposes. They do not constitute formal legal opinions or replace personalized legal counsel.",
        },
        {
          title: "4. Intellectual Property Rights",
          content:
            "All content, designs, logos, trademarks, source code, and text on this website are the exclusive property of EIP & Associates, protected under Panamanian intellectual property laws and international treaties.",
        },
        {
          title: "5. Jurisdiction & Governing Law",
          content:
            "Any controversy arising from the use of this website shall be governed exclusively by the laws of the Republic of Panama and submitted to the Ordinary Courts of Panama City.",
        },
      ],
    },
    compliancePage: {
      hero: {
        badge: "Prevention & Corporate Ethics",
        title: "Regulatory Compliance",
        subtitle:
          "Rigorous adherence to Anti-Money Laundering (AML) regulations and global transparency standards.",
        updatedDate: "Last updated: August 6, 2026",
      },
      sections: [
        {
          title: "1. Compliance Commitment (AML / CFT)",
          content:
            "EIP & Associates operates in strict compliance with Panama's legal framework for preventing money laundering, counter-terrorist financing, and proliferation financing (Law No. 23 of April 27, 2015).",
        },
        {
          title: "2. Due Diligence Policies (KYC)",
          content:
            "Under the supervision of the Superintendency of Non-Financial Subjects (SSNF), we apply due diligence procedures to verify client identity, ultimate beneficial owners, and source of funds for residency, corporate, or real estate matters.",
        },
        {
          title: "3. Verification of Source of Funds",
          content:
            "For investment residency programs (such as Qualified Investor Visa) or corporate incorporations, our firm requires supporting documentation demonstrating the legitimate origin of capital.",
        },
        {
          title: "4. International Standards (FATF / FATCA / CRS)",
          content:
            "Our legal practice fully aligns with Financial Action Task Force (FATF) recommendations and global tax transparency standards.",
        },
      ],
    },
  },
};
