export interface ServiceItem {
  id: string;
  iconName: string;
  title: { es: string; en: string };
  shortDesc: { es: string; en: string };
  fullDesc: { es: string; en: string };
  keyFeatures: { es: string[]; en: string[] };
}

export interface NewsItem {
  id: string;
  category: { es: string; en: string };
  title: { es: string; en: string };
  date: string;
  summary: { es: string; en: string };
  content: { es: string; en: string };
  author: string;
  readTime: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  initials: string;
  comment: { es: string; en: string };
  rating: number;
}

export interface PartnerItem {
  name: string;
  title: { es: string; en: string };
  specialty: { es: string; en: string };
  education: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'corp-ma',
    iconName: 'Briefcase',
    title: {
      es: 'Derecho Corporativo & M&A',
      en: 'Corporate Law & M&A'
    },
    shortDesc: {
      es: 'Estructuración corporativa, fusiones, adquisiciones y gobierno corporativo para conglomerados internacionales.',
      en: 'Corporate structuring, mergers, acquisitions, and corporate governance for international conglomerates.'
    },
    fullDesc: {
      es: 'Brindamos asesoría estratégica integral en operaciones de fusiones y adquisiciones transfronterizas, reorganizaciones societarias, joint ventures y cumplimiento de buen gobierno corporativo bajo el marco legal de Panamá e intencional.',
      en: 'We provide comprehensive strategic advisory in cross-border M&A transactions, corporate reorganizations, joint ventures, and corporate governance compliance.'
    },
    keyFeatures: {
      es: [
        'Fusiones y Adquisiciones Transfronterizas',
        'Gobierno Corporativo y Cumplimiento Normativo',
        'Due Diligence Legal Riguroso',
        'Acuerdos de Accionistas y Reorganizaciones'
      ],
      en: [
        'Cross-Border Mergers & Acquisitions',
        'Corporate Governance & Regulatory Compliance',
        'Rigorous Legal Due Diligence',
        'Shareholder Agreements & Reorganizations'
      ]
    }
  },
  {
    id: 'arbitration',
    iconName: 'Scale',
    title: {
      es: 'Arbitraje Internacional & Litigios',
      en: 'International Arbitration & Litigation'
    },
    shortDesc: {
      es: 'Representación especializada en disputas comerciales y de inversión ante tribunales internacionales y locales.',
      en: 'Specialized representation in commercial and investment disputes before international and local tribunals.'
    },
    fullDesc: {
      es: 'Representamos a corporaciones y clientes de alto patrimonio en arbitrajes internacionales complejos (CCI, CeCAP, CIADI) y litigios comerciales de gran envergadura en Panamá.',
      en: 'We represent corporations and high-net-worth clients in complex international arbitrations (ICC, CeCAP, ICSID) and high-stakes commercial litigation in Panama.'
    },
    keyFeatures: {
      es: [
        'Arbitraje Comercial CCI, CeCAP y AAA',
        'Litigios Comerciales y Civiles Complejos',
        'Ejecución de Laudos Arbitrales Extranjeros',
        'Estrategias de Mediación y Negociación'
      ],
      en: [
        'ICC, CeCAP, and AAA Commercial Arbitration',
        'Complex Commercial & Civil Litigation',
        'Enforcement of Foreign Arbitral Awards',
        'Mediation & Negotiation Strategies'
      ]
    }
  },
  {
    id: 'banking-finance',
    iconName: 'Landmark',
    title: {
      es: 'Banca, Finanzas & Mercado de Capitales',
      en: 'Banking, Finance & Capital Markets'
    },
    shortDesc: {
      es: 'Asesoría integral en estructuración crediticia, regulaciones bancarias y emisiones de deuda privada y pública.',
      en: 'Comprehensive advisory on credit structuring, banking regulations, and private and public debt issuances.'
    },
    fullDesc: {
      es: 'Asesoramos a instituciones financieras internacionales, fondos de inversión y prestatarios corporativos en financiamientos estructurados, regulaciones bancarias ante la Superintendencia de Bancos de Panamá y mercado de valores.',
      en: 'We advise international financial institutions, investment funds, and corporate borrowers on structured finance, banking regulations, and capital markets.'
    },
    keyFeatures: {
      es: [
        'Financiamientos Estructurados y Sindicaos',
        'Licencias Bancarias ante la SBP',
        'Emisiones en la Bolsa Latinoamericana de Valores (Latinex)',
        'Regulación Fintech y Pagos Digitales'
      ],
      en: [
        'Structured & Syndicated Financing',
        'Banking Licenses with the SBP',
        'Issuances on Latinex Exchange',
        'Fintech & Digital Payment Regulations'
      ]
    }
  },
  {
    id: 'asset-protection',
    iconName: 'Shield',
    title: {
      es: 'Protección de Activos & Estructuración',
      en: 'Asset Protection & Wealth Structuring'
    },
    shortDesc: {
      es: 'Creación de Fundaciones de Interés Privado, fideicomisos y planificación sucesoria para familias de alto patrimonio.',
      en: 'Creation of Private Interest Foundations, trusts, and estate planning for high-net-worth families.'
    },
    fullDesc: {
      es: 'Diseñamos estructuras de protección patrimonial atemporales mediante la legislación panameña de Fundaciones de Interés Privado y Fideicomisos, garantizando estricta confidencialidad y preservación intergeneracional.',
      en: 'We design timeless asset protection structures utilizing Panama Private Interest Foundations and Trusts, ensuring strict confidentiality and intergenerational preservation.'
    },
    keyFeatures: {
      es: [
        'Fundaciones de Interés Privado de Panamá (Ley 25)',
        'Fideicomisos Patrimoniales y Comerciales',
        'Planificación Sucesoria Intergeneracional',
        'Family Offices y Protocolos Familiares'
      ],
      en: [
        'Panama Private Interest Foundations (Law 25)',
        'Wealth & Commercial Trusts',
        'Intergenerational Succession Planning',
        'Family Offices & Family Protocols'
      ]
    }
  },
  {
    id: 'maritime-logistics',
    iconName: 'Anchor',
    title: {
      es: 'Derecho Marítimo & Logística del Canal',
      en: 'Maritime Law & Canal Logistics'
    },
    shortDesc: {
      es: 'Registro de naves en el registro más grande del mundo, financiamiento naval y contratos de logística del Canal.',
      en: 'Vessel registration in the world’s largest ship registry, naval financing, and Canal logistics contracts.'
    },
    fullDesc: {
      es: 'Panamá es el centro marítimo líder del mundo. Nuestra firma asesora en abanderamiento de embarcaciones, hipotecas navales, concesiones portuarias y contratos de flete y operación logística.',
      en: 'Panama is the world’s premier maritime hub. Our firm advises on ship registration, naval mortgages, port concessions, and logistics operations.'
    },
    keyFeatures: {
      es: [
        'Abanderamiento en la Marina Mercante de Panamá',
        'Hipotecas Navales y Financiamiento Marítimo',
        'Contratos Portuarios y de Zonas Libres (ZLC)',
        'Litigios Marítimos en Tribunales de Panamá'
      ],
      en: [
        'Panama Merchant Marine Vessel Registration',
        'Naval Mortgages & Maritime Financing',
        'Port & Free Zone Contracts (ZLC)',
        'Maritime Litigation in Panama Courts'
      ]
    }
  },
  {
    id: 'intellectual-property',
    iconName: 'Award',
    title: {
      es: 'Propiedad Intelectual & Tecnología',
      en: 'Intellectual Property & Technology'
    },
    shortDesc: {
      es: 'Protección global de marcas, patentes, secretos comerciales y licenciamiento de tecnologías emergentes.',
      en: 'Global protection of trademarks, patents, trade secrets, and emerging technology licensing.'
    },
    fullDesc: {
      es: 'Protegemos y monetizamos los activos intangibles de nuestros clientes en la región. Registro de marcas, patentes, derechos de autor y regulación de protección de datos personales.',
      en: 'We protect and monetize intangible assets across the region. Registration of trademarks, patents, copyrights, and personal data protection compliance.'
    },
    keyFeatures: {
      es: [
        'Registro y Defensa de Marcas y Patentes',
        'Licenciamiento Tecnológico y Transferencia de IP',
        'Cumplimiento de Ley de Datos Personales (Ley 81)',
        'Protección de Secretos Industriales'
      ],
      en: [
        'Trademark & Patent Registration & Defense',
        'Tech Licensing & IP Transfer',
        'Personal Data Protection Compliance (Law 81)',
        'Trade Secrets Protection'
      ]
    }
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    category: {
      es: 'DERECHO CORPORATIVO',
      en: 'CORPORATE LAW'
    },
    title: {
      es: 'Nuevas Directrices sobre el Registro Único de Beneficiarios Finales en Panamá',
      en: 'New Guidelines on the Final Beneficial Owners Registry in Panama'
    },
    date: '03 AGO 2026',
    summary: {
      es: 'Análisis detallado de las actualizaciones normativas emitidas por la Superintendencia de Sujetos No Financieros para sociedades anónimas y fundaciones.',
      en: 'Detailed analysis of regulatory updates issued by the Superintendency of Non-Financial Entities for corporations and foundations.'
    },
    content: {
      es: 'La Superintendencia de Sujetos No Financieros de Panamá ha publicado una serie de circulares actualizadas que optimizan el sistema del Registro Único de Beneficiarios Finales (RUBF). Estas medidas refuerzan el compromiso del país con la transparencia fiscal y el estándar OCDE, al tiempo que garantizan canales seguros y protegidos para el tratamiento de información confidencial de clientes internacionales.',
      en: 'Panama’s Superintendency of Non-Financial Entities has published updated circulars enhancing the Beneficial Ownership Registry system. These measures reinforce the country’s commitment to fiscal transparency while maintaining secure channels for international clients.'
    },
    author: 'AI Legal Research Desk',
    readTime: '4 min'
  },
  {
    id: 'news-2',
    category: {
      es: 'ARBITRAJE INTERNACIONAL',
      en: 'INTERNATIONAL ARBITRATION'
    },
    title: {
      es: 'Panamá como Sede Estratégica de Arbitrajes Comerciales en la Región',
      en: 'Panama as a Strategic Hub for Regional Commercial Arbitrations'
    },
    date: '01 AGO 2026',
    summary: {
      es: 'Evaluación del posicionamiento de la Ciudad de Panamá bajo las reglas de la CCI y CeCAP para resolución de disputas transfronterizas.',
      en: 'Evaluation of Panama City’s positioning under ICC and CeCAP rules for resolving cross-border dispute resolutions.'
    },
    content: {
      es: 'Gracias a su neutralidad política, conectividad global sin precedentes y un marco legal pro-arbitraje moderno basado en la Ley UNCITRAL, Panamá consolida su liderazgo como la sede preferida por empresas europeas y norteamericanas para pactar cláusulas arbitrales en contratos de infraestructura y energía.',
      en: 'Thanks to its political neutrality, global connectivity, and modern pro-arbitration legal framework based on UNCITRAL Law, Panama consolidates its leadership as the preferred seat for European and North American infrastructure contracts.'
    },
    author: 'AI Legal Research Desk',
    readTime: '5 min'
  },
  {
    id: 'news-3',
    category: {
      es: 'SERVICIOS FINANCIEROS',
      en: 'FINANCIAL SERVICES'
    },
    title: {
      es: 'Estructuración de Family Offices y Régimen EMMA para Inversionistas',
      en: 'Structuring Family Offices and EMMA Regime for Investors'
    },
    date: '28 JUL 2026',
    summary: {
      es: 'Ventajas competitivas del régimen de Empresas Multinacionales para la Prestación de Servicios Relacionados con la Manufactura y Family Offices.',
      en: 'Competitive advantages of the Multinational Enterprises for Manufacturing Services (EMMA) regime and Family Offices.'
    },
    content: {
      es: 'El régimen especial EMMA y las leyes de zonas francas tecnológicas en Panamá continúan atrayendo oficinas de gestión patrimonial familiar. Este reporte analiza las exenciones fiscales, facilidades migratorias para ejecutivos sénior y la integración con el sistema bancario panameño.',
      en: 'The EMMA special regime and tech free zone laws in Panama continue to attract family offices. This report analyzes tax exemptions, executive residency benefits, and integration with the Panamanian banking system.'
    },
    author: 'AI Legal Research Desk',
    readTime: '6 min'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Carlos Mendoza-Vargas',
    company: 'Presidente & CEO, Pacific Rim Investment Group',
    initials: 'CM',
    rating: 5,
    comment: {
      es: 'La precisión estratégica de EIP & ASSOCIATES en nuestra reestructuración corporativa multimillonaria fue impecable. Su conocimiento del marco regulatorio panameño e internacional no tiene rival.',
      en: 'The strategic precision of EIP & ASSOCIATES during our multi-million dollar corporate restructuring was flawless. Their knowledge of Panamanian and international law is unrivaled.'
    }
  },
  {
    id: 'test-2',
    name: 'Dr. Alexander von Berg',
    company: 'Managing Partner, Zurich Wealth Advisory',
    initials: 'AB',
    rating: 5,
    comment: {
      es: 'Estructurar nuestros fideicomisos y fundaciones de interés privado con EIP nos dio la máxima tranquilidad. Su atención al detalle y discreción absoluta reflejan verdadera elegancia legal.',
      en: 'Structuring our trusts and private interest foundations with EIP provided ultimate peace of mind. Their attention to detail and absolute discretion reflect true legal elegance.'
    }
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    company: 'VP of Global Assets, Mediterranean Shipping Logistics',
    initials: 'ER',
    rating: 5,
    comment: {
      es: 'En el ámbito del Derecho Marítimo y la logística internacional, EIP es nuestro aliado definitivo en Panamá. Resolvieron una negociación compleja con velocidad y solidez jurídica extraordinarias.',
      en: 'In Maritime Law and international logistics, EIP is our definitive partner in Panama. They resolved a complex negotiation with extraordinary speed and legal rigor.'
    }
  }
];

export const teamData: PartnerItem[] = [
  {
    name: 'Lic. Eduardo I. Palacios',
    title: { es: 'Socio Fundador & Senior Partner', en: 'Managing & Senior Partner' },
    specialty: { es: 'Derecho Corporativo, M&A y Arbitraje', en: 'Corporate Law, M&A & Arbitration' },
    education: 'Harvard Law School (LL.M.) / Universidad de Panamá'
  },
  {
    name: 'Dra. Isabela A. Ruiz-Pineda',
    title: { es: 'Socia Ejecutiva', en: 'Executive Partner' },
    specialty: { es: 'Protección Patrimonial & Fideicomisos', en: 'Asset Protection & Wealth Structuring' },
    education: 'London School of Economics (LL.M.)'
  },
  {
    name: 'Lic. Fernando A. Thorne',
    title: { es: 'Socio de Litigios & Marítimo', en: 'Partner - Maritime & Litigation' },
    specialty: { es: 'Derecho Marítimo & Litigios Complejos', en: 'Maritime Law & Complex Litigation' },
    education: 'Tulane University Law School (LL.M.)'
  }
];
