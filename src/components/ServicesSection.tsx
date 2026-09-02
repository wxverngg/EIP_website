import React from 'react';
import { Language, ServiceItem } from '../types';
import { Briefcase, Landmark, Scale, Shield, Anchor, Gem, ArrowUpRight } from 'lucide-react';

/** Props for ServicesSection component */
interface ServicesSectionProps {
  /** Active language state ('EN' or 'ES') */
  lang: Language;
  /** Callback to trigger consultation contact modal */
  onOpenContact: () => void;
}

/**
 * ServicesSection Component
 * Section 4 of the Home page: Displays 6 elite practice area cards:
 * 1. Corporate & M&A
 * 2. Banking & Financial Law
 * 3. Litigation & International Arbitration
 * 4. Intellectual Property
 * 5. Maritime & Logistics Law
 * 6. Estate Planning & Tax
 * Features vector gold Lucide icons, detail checklists, and elevation hover states.
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onOpenContact }) => {
  /** Array of 6 core practice areas with bilingual content */
  const services: ServiceItem[] = [
    {
      id: '1',
      iconName: 'Briefcase',
      title: lang === 'EN' ? 'Corporate & M&A' : 'Corporativo & M&A',
      description:
        lang === 'EN'
          ? 'Cross-border mergers, acquisitions, joint ventures, joint holding restructuring, and high-level corporate governance.'
          : 'Asesoramiento en fusiones, adquisiciones, reestructuraciones societarias transfronterizas y gobierno corporativo.',
      details: [
        lang === 'EN' ? 'Cross-Border Due Diligence' : 'Due Diligence Multijurisdiccional',
        lang === 'EN' ? 'Joint Venture Contracts' : 'Contratos de Coinversión',
        lang === 'EN' ? 'Holding Restructuring' : 'Reestructuración de Holdings',
      ],
    },
    {
      id: '2',
      iconName: 'Landmark',
      title: lang === 'EN' ? 'Banking & Financial Law' : 'Derecho Bancario & Financiero',
      description:
        lang === 'EN'
          ? 'Structuring complex syndicated loan agreements, project finance, and regulatory licensing within Panama Banking Center.'
          : 'Estructuración de operaciones bancarias complejas, financiamiento de proyectos y cumplimiento en el Centro Bancario.',
      details: [
        lang === 'EN' ? 'Bond & Securities Issuance' : 'Emisión de Bonos y Valores',
        lang === 'EN' ? 'Banking License Advisory' : 'Licencias Bancarias',
        lang === 'EN' ? 'AML & FATCA Compliance' : 'Cumplimiento AML & FATCA',
      ],
    },
    {
      id: '3',
      iconName: 'Scale',
      title: lang === 'EN' ? 'Litigation & Arbitration' : 'Litigios & Arbitraje Internacional',
      description:
        lang === 'EN'
          ? 'Elite advocacy in complex commercial litigation, international arbitration (ICC, ICSID), and cross-border dispute resolution.'
          : 'Representación en disputas comerciales complejas, arbitrajes internacionales (CCI, CIADI) y resolución de controversias.',
      details: [
        lang === 'EN' ? 'ICC & ICSID Arbitration' : 'Arbitraje CCI & CIADI',
        lang === 'EN' ? 'Shareholder Dispute Defense' : 'Defensa en Disputas Societarias',
        lang === 'EN' ? 'Foreign Award Enforcement' : 'Ejecución de Laudos Extranjeros',
      ],
    },
    {
      id: '4',
      iconName: 'Shield',
      title: lang === 'EN' ? 'Intellectual Property' : 'Propiedad Intelectual & Marcas',
      description:
        lang === 'EN'
          ? 'Global protection of high-value intangible assets, flagship trademarks, patents, copyright, and technology licensing.'
          : 'Protección global de activos intangibles, patentes, marcas renombradas, derechos de autor y licencias tecnológicas.',
      details: [
        lang === 'EN' ? 'Global Trademark Registration' : 'Registro Internacional de Marcas',
        lang === 'EN' ? 'IP Litigation & Infringement' : 'Litigios de Marcas y Patentes',
        lang === 'EN' ? 'Technology Licensing Deals' : 'Acuerdos de Licenciamiento',
      ],
    },
    {
      id: '5',
      iconName: 'Anchor',
      title: lang === 'EN' ? 'Maritime & Logistics Law' : 'Derecho Marítimo & Logística',
      description:
        lang === 'EN'
          ? 'Specialized counsel for ship registration under Panama flag, maritime mortgages, charterparties, and logistics agreements.'
          : 'Servicios en abanderamiento de naves en el registro panameño, hipotecas navales y contratos logísticos internacionales.',
      details: [
        lang === 'EN' ? 'Vessel Registration & Mortgages' : 'Registro de Naves & Hipotecas',
        lang === 'EN' ? 'Charterparty Agreements' : 'Contratos de Fletamento',
        lang === 'EN' ? 'Admiralty & Maritime Claims' : 'Litigios Marítimos y Reclamaciones',
      ],
    },
    {
      id: '6',
      iconName: 'Gem',
      title: lang === 'EN' ? 'Estate Planning & Tax' : 'Planificación Patrimonial & Tax',
      description:
        lang === 'EN'
          ? 'Sophisticated private wealth preservation, Private Interest Foundations (PIFs), trusts, and international tax optimization.'
          : 'Diseño de estructuras para la preservación de patrimonios familiares, fundaciones de interés privado y optimización fiscal.',
      details: [
        lang === 'EN' ? 'Private Interest Foundations' : 'Fundaciones de Interés Privado',
        lang === 'EN' ? 'International Asset Trusts' : 'Fideicomisos Internacionales',
        lang === 'EN' ? 'Family Wealth Succession' : 'Planificación Sucesoral',
      ],
    },
  ];

  /** Helper function returning the matching gold vector SVG icon for each practice area */
  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#C6A45D]" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#C6A45D]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#C6A45D]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#C6A45D]" />;
      case 'Anchor':
        return <Anchor className="w-6 h-6 text-[#C6A45D]" />;
      case 'Gem':
        return <Gem className="w-6 h-6 text-[#C6A45D]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#C6A45D]" />;
    }
  };

  return (
    <section id="servicios" className="py-32 bg-[#0D0D0D] relative border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C6A45D] font-medium mb-3 block">
            {lang === 'EN' ? 'Our Practice Areas' : 'Nuestras Especialidades'}
          </span>
          <h2 className="font-heading fluid-heading font-light text-[#F4F4F4] leading-tight mb-6">
            {lang === 'EN' ? 'Elite Practice Areas' : 'Áreas de Práctica de Élite'}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
            {lang === 'EN'
              ? 'Tailored high-complexity legal advisory designed to overcome challenging regulatory environments and cross-border commercial demands.'
              : 'Soluciones legales integrales y personalizadas para superar los desafíos regulatorios y comerciales más exigentes.'}
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="glass-card glass-reflection rounded-lg p-8 flex flex-col justify-between group relative"
              style={{ '--i': idx + 1 } as React.CSSProperties}
            >
              <div>
                {/* Icon Header Box */}
                <div className="w-12 h-12 rounded bg-[#151515] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#C6A45D]/40 group-hover:bg-[#C6A45D]/10 transition-all duration-300">
                  {getIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-2xl font-normal text-[#F4F4F4] group-hover:text-[#C6A45D] transition-colors duration-300 mb-3">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
                  {service.details.map((detail, i) => (
                    <li key={i} className="text-[11px] text-[#A1A1AA]/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C6A45D]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button Link: Ver servicio */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={onOpenContact}
                  className="gold-link-hover text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <span>{lang === 'EN' ? 'View Practice' : 'Ver servicio'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
