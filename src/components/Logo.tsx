import React from 'react';

/** Propiedades que acepta el componente de Marca / Logotipo */
interface LogoProps {
  /** Variante de color: 'dark' para fondos oscuros (texto blanco), 'light' para fondos claros */
  variant?: 'dark' | 'light';
  /** Clases CSS adicionales para escala o posicionamiento */
  className?: string;
  /** Controla si se muestra la leyenda inferior "ATTORNEYS AT LAW" */
  showTagline?: boolean;
}

/**
 * Componente Logo
 * Renderiza el isologotipo oficial de EIP & ASSOCIATES.
 * Utiliza tipografía serif Cormorant Garamond en tono dorado (#C6A45D),
 * una línea divisoria en gradiente y visibilidad condicional para el subtítulo.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex flex-col items-center justify-center font-heading select-none group cursor-pointer ${className}`}>
      <div className="flex flex-col items-center">
        {/* Parte Superior: EIP & */}
        <div className="flex items-baseline justify-center gap-1 leading-none">
          <span className="text-3xl sm:text-4xl font-semibold tracking-[0.08em] text-[#C6A45D] group-hover:text-[#D7B76F] transition-colors duration-300">
            EIP
          </span>
          {!isDark && (
            <span className="text-xl font-serif text-[#111111] font-normal ml-0.5">
              &
            </span>
          )}
        </div>

        {/* Parte Central: ASSOCIATES */}
        <div className="mt-1 leading-none">
          <span
            className={`text-2xl sm:text-3xl font-normal tracking-[0.25em] uppercase ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            ASSOCIATES
          </span>
        </div>

        {/* Línea Divisoria Horizontal Dorada */}
        <div className="w-full my-2 h-[1.5px] bg-gradient-to-r from-[#C6A45D]/40 via-[#C6A45D] to-[#C6A45D]/40" />

        {/* Leyenda Inferior: ATTORNEYS AT LAW */}
        {showTagline && (
          <div className="leading-none tracking-[0.3em] uppercase">
            <span
              className={`text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.28em] ${
                isDark ? 'text-[#F4F4F4]/90' : 'text-[#111111]'
              }`}
            >
              ATTORNEYS AT LAW
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
