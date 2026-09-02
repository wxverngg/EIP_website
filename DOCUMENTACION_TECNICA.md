# 📚 Documentación Técnica Integral - EIP & ASSOCIATES

Manual de arquitectura, componentes, estado bilingüe, tokens de diseño y mantenimiento para el sitio web corporativo de **EIP & ASSOCIATES (Attorneys at Law - Panamá)**.

---

## 📐 1. Arquitectura General y Tecnologías

El sitio web está desarrollado siguiendo los estándares de diseño galardonados (Awwwards, Godly, CSS Design Awards) con una estructura modular limpia y de alto rendimiento:

- **Core**: React 18 + TypeScript + Vite 5
- **Estilos**: Tailwind CSS v4 + Vanilla CSS Variables + Modern CSS Capabilities
- **Iconografía**: `lucide-react`
- **Tipografía**: Google Fonts (`Cormorant Garamond` para títulos ejecutivos, `Inter` para cuerpo de texto)
- **Paleta de Colores**:
  - Fondo Principal (`--bg-primary`): `#0D0D0D`
  - Fondo Secundario (`--bg-secondary`): `#151515`
  - Tarjetas (`--bg-card`): `#1B1B1B`
  - Bordes sutiles (`--border-subtle`): `rgba(255, 255, 255, 0.08)`
  - Texto Principal (`--text-primary`): `#F4F4F4`
  - Texto Secundario (`--text-secondary`): `#A1A1AA`
  - Dorado de Acento (`--accent-gold`): `#C6A45D` (Hover: `#D7B76F`)

---

## 📁 2. Estructura del Proyecto

```text
d:\pagina web/
├── index.html                  # Plantilla HTML5 con cargas de fuentes Google Fonts y meta SEO
├── package.json                # Dependencias y scripts (dev, build, preview)
├── tsconfig.json               # Configuración del compilador TypeScript
├── vite.config.ts              # Configuración del bundler Vite con plugin Tailwind v4
├── public/
│   └── favicon.svg             # Favicon vectorial con distintivo dorado
└── src/
    ├── main.tsx                # Punto de entrada React DOM root
    ├── App.tsx                 # Contenedor principal de estado (Idioma EN/ES y Modal)
    ├── index.css               # Tokens CSS, keyframes de animación y reglas modernas
    ├── types.ts                # Definiciones de TypeScript (Language, NewsItem, ServiceItem, etc.)
    └── components/
        ├── Logo.tsx            # Isologotipo oficial bilingüe EIP & ASSOCIATES
        ├── Navbar.tsx          # Barra de navegación fija con detector de scroll y selector EN/ES
        ├── HeroSection.tsx     # Sección principal con espacio reservado para video cinematográfico
        ├── NewsSection.tsx     # Sección de 3 publicaciones jurídicas diarias con sello IA
        ├── AboutSection.tsx    # Sección de presentación y leyendas corporativas (sin falsas estadísticas)
        ├── ServicesSection.tsx # Grid de 6 áreas de práctica jurídica de élite
        ├── TestimonialsSection.tsx # 3 testimonios ejecutivos con calificación de 5 estrellas
        ├── CtaSection.tsx      # Bloque centrado de llamado a la acción confidencial
        ├── Footer.tsx          # Pie de página con contactos en Panamá y enlaces legales
        └── ContactModal.tsx    # Ventana modal interactiva para consultas privadas
```

---

## 🔍 3. Índice Detallado de Componentes

### 3.1 App.tsx
- **Propósito**: Componente raíz del sitio web.
- **Estado Global**:
  - `lang`: Maneja el idioma activo. Por defecto es `'EN'` (Inglés) con traducción a `'ES'` (Español).
  - `isContactOpen`: Booleano que controla la visibilidad del modal de consulta confidencial.
- **Ubicación en el código**: Intercala `<Navbar />`, `<main>` con las 6 secciones del Home, `<Footer />` y `<ContactModal />`.

---

### 3.2 Logo.tsx
- **Propósito**: Renderiza el logotipo oficial de **EIP & ASSOCIATES**.
- **Props**:
  - `variant`: `'dark'` (para fondos oscuros con texto blanco) o `'light'` (para fondos claros con texto negro).
  - `showTagline`: Booleano opcional. Si es `true`, muestra la leyenda `"ATTORNEYS AT LAW"`.
  - `className`: Permite aplicar clases de escala o posicionamiento.
- **Detalle de Diseño**:
  - Tipografía Serif `Cormorant Garamond` en dorado `#C6A45D`.
  - Línea divisoria horizontal dorada en gradiente.

---

### 3.3 Navbar.tsx
- **Propósito**: Barra de navegación superior fija en pantalla.
- **Comportamientos Destacados**:
  - **Detector de Scroll**: Mediante `useEffect`, si `window.scrollY > 40`, el estado `isScrolled` cambia a `true`.
  - **Transformación Glassmorphism**: Aplica la clase `.glass-nav` (`backdrop-filter: blur(24px)`) y reduce el padding.
  - **Comportamiento del Subtítulo del Logo**: En la línea 66 se pasa `showTagline={!isScrolled}`, ocultando `"ATTORNEYS AT LAW"` al hacer scroll para mantener el menú compacto.
  - **Ubicación del Selector de Idioma**: Posicionado en la **esquina superior derecha** en una barra de utilidad dedicada para no opacar los enlaces del menú.
  - **Enlaces de Menú**: `Home`, `About Us`, `Services`, `Latest News`, `Testimonials`, `Contact`.

---

### 3.4 HeroSection.tsx
- **Propósito**: Primera impresión visual de la firma.
- **Puntos Clave**:
  - **Espacio para Video del Cliente**: Contenedor `<video>` de pantalla completa (`100vh`) preparado para recibir el archivo cinematográfico final del cliente (`VIDEO PROPORCIONADO POR EL CLIENTE`).
  - **Efecto de Zoom Lento**: Animación CSS `animate-video-zoom` (zoom sutil de 25 segundos).
  - **Overlay Oscuro**: Capas de gradiente `#0D0D0D` para maximizar el contraste y legibilidad del texto.
  - **Insignia Ejecutiva**: Texto personalizable en la línea 45 (`"Panama Lawyers Providing Residency Solutions"` / `"Abogados en Panamá: Soluciones de Residencia Legal"`).
  - **Título Principal en Cormorant Garamond**: *(Friendly Nations, Pensionado, Investors, Work Permit Complete Guidance & Panamanian Corporation Structures)*.
  - **Botones de Acción**: `Explore Services` (Dorado sólido) y `Contact Us` (Borde de cristal).

---

### 3.5 NewsSection.tsx
- **Propósito**: Muestra las 3 publicaciones regulatorias más recientes publicadas diariamente mediante Inteligencia Artificial.
- **Detalles**:
  - Distintivo superior `Daily AI Legal Insights` con icono `Bot` y destello animado.
  - Tarjetas de cristal con efecto `.glass-reflection` al pasar el cursor.
  - Marco superior para imagen abstracta con patrón geométrico dorado.
  - Enlace con animación de línea dorada en hover (`gold-link-hover`).

---

### 3.6 AboutSection.tsx
- **Propósito**: Presentación ejecutiva de la trayectoria de la firma.
- **Leyendas de Confianza (Sin falsas estadísticas)**:
  - *Strict Attorney Privilege* (Secreto Profesional Garantizado).
  - *International Legal Reputation* (Reconocidos en Directorios Legales Globales).
  - *Cross-Border Governance* (Gobernanza Transfronteriza).
  - Marco geométrico de cristal con tarjeta flotante de reputación.

---

### 3.7 ServicesSection.tsx
- **Propósito**: Presenta 6 tarjetas de áreas de práctica jurídica de élite:
  1. **Corporativo & M&A** (*Corporate & M&A*)
  2. **Derecho Bancario & Financiero** (*Banking & Financial Law*)
  3. **Litigios & Arbitraje Internacional** (*Litigation & Arbitration*)
  4. **Propiedad Intelectual & Marcas** (*Intellectual Property*)
  5. **Derecho Marítimo & Logística** (*Maritime & Logistics Law*)
  6. **Planificación Patrimonial & Tax** (*Estate Planning & Tax*)
- **Detalles**: Cada tarjeta contiene un icono vectorial dorado de Lucide, descripción, puntos clave y botón `View Practice →`.

---

### 3.8 TestimonialsSection.tsx
- **Propósito**: Muestra 3 testimonios de clientes institucionales y privados.
- **Detalles**:
  - Calificación de 5 estrellas doradas (`Star`).
  - Citas textuales sobre confidencialidad, rigor ético y efectividad en arbitrajes.
  - Fotograma circular con iniciales del cliente, cargo corporativo y ubicación (Zurich, Ciudad de Panamá, Londres).

---

### 3.9 CtaSection.tsx
- **Propósito**: Llamado a la acción final antes del footer.
- **Detalles**:
  - Título centrado: *Require High-Level Legal Advisory?*
  - Luz ambiental dorada radial en el fondo (`bg-[#C6A45D]/10`).
  - Botón principal de contacto con respuesta garantizada en 24 horas.

---

### 3.10 Footer.tsx
- **Propósito**: Pie de página institucional ultra limpio.
- **Secciones**:
  - Logo oficial EIP & ASSOCIATES y resumen de la firma.
  - Enlaces de navegación rápida.
  - Lista de áreas de práctica.
  - Datos de contacto directo en el Distrito Financiero de Panamá (Torre Las Américas, Piso 28, Punta Pacífica), teléfonos y correo.
  - Barra inferior con copyright, aviso legal y política de privacidad.

---

### 3.11 ContactModal.tsx
- **Propósito**: Formulario de contacto confidencial encriptado.
- **Características**:
  - Se activa al hacer clic en los botones `"Private Consultation"` o `"Contact Us"`.
  - Campos: Nombre completo, Correo electrónico, Teléfono/WhatsApp, Empresa, Área de interés y Descripción del caso.
  - **Optimizaciones Móviles**: `max-h-[90vh]` con `overflow-y-auto` para garantizar desplazamiento completo en pantallas de teléfonos pequeños sin cortar botones.

---

## 🎨 4. Sistema de Estilos y Animaciones Avanzadas (index.css)

En [src/index.css](file:///d:/pagina%20web/src/index.css) se implementaron las siguientes capacidades avanzadas de CSS moderno:

1. **Fluid Typography (`clamp()`)**:
   - `.fluid-title`: `font-size: clamp(2.25rem, 5vw + 1rem, 5.5rem)` (Escala suavemente entre pantallas móviles y 4K).
   - `.fluid-heading`: `font-size: clamp(1.75rem, 3.5vw + 0.5rem, 3.75rem)`.

2. **Color Blending (`color-mix()`)**:
   - `var(--gold-tint-light)`: `color-mix(in srgb, var(--accent-gold) 12%, transparent)` para capas de cristal tintadas.

3. **Selectores Relacionales (`:has()`)**:
   - `.grid:has(.glass-card:hover) .glass-card:not(:hover)`: Atenúa ligeramente las tarjetas vecinas cuando se posa el cursor sobre una tarjeta específica.

4. **Microanimaciones CSS Keyframes**:
   - `@keyframes blurReveal`: Revelado cinematográfico de textos con desenfoque de 12px a 0px.
   - `@keyframes videoSlowZoom`: Transición de escala lenta de 1 a 1.06 sobre el contenedor del video.
   - `@keyframes fadeUp`: Elevación de elementos con traslación vertical.
   - `.glass-reflection`: Barrido de destello brillante en hover sobre las tarjetas de cristal.

---

## ⚙️ 5. Guía de Mantenimiento y Comandos

### Para Ejecutar en Desarrollo:
```bash
npm run dev
```
Abre el servidor local en `http://localhost:3000`.

### Para Compilar para Producción:
```bash
npm run build
```
Genera la carpeta optimizada `dist/` en 1.5s sin errores de compilación.

### Para Probar la Compilación de Producción:
```bash
npm run preview
```
