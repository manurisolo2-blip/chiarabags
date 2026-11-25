# CH. Chiara Bags — Web Editorial & Catálogo Curado

Rediseño integral de la presencia web de **CH. Chiara Bags**, una tienda curada multimarca de carteras y marroquinería con base en Córdoba, Argentina. El objetivo es migrar de una estética genérica de plantilla e-commerce a una **experiencia digital editorial, sobria y contemporánea**, alineada con la materialidad real del producto (cuero, tonos tierra, negro profundo y acentos bordo) y el trato personalizado de su fundadora.

---

## 1. Identidad de Marca y Datos Reales

### Posicionamiento
- **Marca:** CH. Chiara Bags (`CH. CHIARA · Carteras & marroquinería`)
- **Modelo:** Curaduría multimarca seleccionada personalmente por Chiara (no fabricante masiva).
- **Marcas en catálogo:** Gabriana, Good Company, Cruz de la Rosa, Ruggeri Bags, Ona Saez.
- **Tono de voz:** Cercano, curatorial, en primera persona, sin rigidez corporativa pero con criterio estético.

### Copies Oficiales
- **Titular principal (Hero):** `Tu próxima cartera de todos los días`
- **Descriptor:** `CH. CHIARA · Carteras & marroquinería`
- **Manifiesto (Sobre CH):**
  > Ch. Chiara nació de mi gusto por las carteras y esos detalles que hacen propio un estilo. Selecciono carteras y marroquinería buscando un equilibrio entre diseño, calidad y buen precio. Piezas lindas, prácticas y fáciles de incorporar a tu día a día. Detrás de la tienda estoy yo, Chiara. Elijo cada modelo y te acompaño si necesitás consultar medidas, conocer más sobre un producto o encontrar una opción para regalar. ¿Buscás algo en particular y no lo encontrás en la tienda? No dudes en escribirme. Contame qué tenés en mente y te ayudo a buscarlo.
- **Cierre de marca:** `Nunca dejes de buscar tu estilo.`

### Propuesta Comercial y Logística
- **Beneficio transferencia:** 15% OFF abonando por transferencia bancaria.
- **Financiación:** 3 cuotas sin interés.
- **Entregas:** Envíos coordinados a todo el país y retiros coordinados en **Nueva Córdoba, Arroyito y Río Tercero**.
- **Contacto:**
  - Instagram: `@ch.chiarabags`
  - Email: `ch.chiarabags@gmail.com`
  - WhatsApp: `+54 9 3576 47-7798` (`543576477798`)

### Logotipo (`CH.`)
- Monograma apilado vectorizado en SVG limpio:
  - Línea superior: `CH.` en serif de alto contraste (peso Bold, punto final obligatorio).
  - Línea inferior: `CHIARA BAGS` en sans-serif geométrica Light, mayúsculas, con tracking abierto justificado exactamente al ancho total de `CH.` (incluyendo el punto).
- En loader, favicon y marca de agua editorial puede utilizarse únicamente el monograma `CH.`.

---

## 2. Sistema de Diseño (Design Tokens)

### Paleta Cromática
Se descarta el rosa pastel en bloques grandes de header/footer y se construye una paleta sobria de colores sólidos, rescatando el universo real de las carteras.

| Token | Color | Hex | Proporción | Uso |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-canvas` | Marfil Hueso | `#F6F4EF` | 70% | Lienzo principal del sitio. |
| `--ink-primary` | Negro Obsidiana | `#121212` | 18% | Tipografía principal, logo, CTAs sólidos. |
| `--bg-surface` | Lino / Arena | `#EAE4DC` | 6% | Superficie sólida detrás de fotos de producto recortadas. |
| `--bg-editorial-dark` | Espresso Cuero | `#261A17` | 4% | Footer y bloque editorial oscuro de alto contraste. |
| `--accent-burgundy` | Bordo Charol | `#75151E` | 2% | Acento disruptivo único: badge 15% OFF, estados activos, hovers. |
| `--ink-secondary` | Grafito Suave | `#5A5550` | — | Metadatos, cuotas, descripciones secundarias. |
| `--accent-blush` | Rosa Polvo | `#E6D3CE` | Opcional | Guiño mínimo a la identidad previa solo en un detalle puntual o hover; nunca en el header. |

### Tipografía
- **Display / Títulos:** `Bodoni Moda` (fallback: `Instrument Serif`, serif)
  - Interlineado ajustado en titulares grandes (`line-height: 0.96`), tracking `-0.025em`.
  - Uso exclusivamente en redonda firme; no abusar de cursivas decorativas.
- **UI / Navegación / Precios:** `Plus Jakarta Sans` (fallback: `Geist`, sans-serif)
  - Activar `font-variant-numeric: tabular-nums` en todos los importes y cuotas.

### Variables CSS Base
```css
:root {
  --bg-canvas: #F6F4EF;
  --bg-surface: #EAE4DC;
  --bg-editorial-dark: #261A17;
  --ink-primary: #121212;
  --ink-secondary: #5A5550;
  --accent-burgundy: #75151E;
  --accent-blush: #E6D3CE;

  --glass-bg: rgba(246, 244, 239, 0.58);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-blur: blur(22px) saturate(160%);

  --font-display: 'Bodoni Moda', 'Instrument Serif', serif;
  --font-sans: 'Plus Jakarta Sans', 'Geist', sans-serif;

  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 3. Reglas Visuales Estrictas (Guía para el Agente)

### Sí implementar
- **Estética editorial de alto contraste:** Espacios en blanco generosos, jerarquía tipográfica marcada y fotografía como protagonista absoluta.
- **Colores sólidos:** Fondos limpios y definidos; evitar transparencias grises sucias o degradados genéricos.
- **Apple Liquid Glass (uso selectivo):** Exclusivamente en la cápsula flotante de navegación, filtros flotantes o barra de carrito rápida (`backdrop-filter: blur(22px) saturate(160%)` con borde especular nítido).
- **Asimetría controlada:** Ritmo de lookbook alternando escalas de producto (destacado amplio + par compacto) en lugar de filas idénticas.
- **Cursor personalizado contextual:** Punto mínimo `#121212` que muta a píldora sólida (`VER PIEZA`, `ZOOM`, `EXPLORAR`) sobre imágenes interactivas.

### Prohibido (Evitar patrones genéricos de IA / Tiendanube)
- **NO** usar tarjetas rectangulares con bordes, sombras grises o cajas encerrando cada producto.
- **NO** usar líneas divisorias horizontales/verticales repetitivas entre ítems o secciones.
- **NO** usar etiquetas entre corchetes (`[NUEVO]`, `[01]`, `[CATÁLOGO]`).
- **NO** usar grillas rígidas y monótonas de 4 columnas iguales en toda la página.
- **NO** usar cursivas sueltas sin justificación editorial en medio de titulares.
- **NO** insertar el clásico botón circular verde flotante de WhatsApp.

---

## 4. Arquitectura de Secciones y Experiencia (UX)

1. **Preloader Minimalista:** Monograma `CH.` centrado sobre `#F6F4EF` con revelación limpia por `clip-path` (duración breve, sin bloquear la navegación).
2. **Navegación Flotante (Liquid Glass):** Cápsula flotante superior centrada o distribuida con logo `CH.`, enlaces (`Colección`, `Curaduría`, `Retiros`, `Pedido Especial`) e íconos minimalistas de búsqueda y bolsa.
3. **Hero Editorial Full-Bleed / Asimétrico:**
   - Titular a gran escala: `"Tu próxima cartera de todos los días"`.
   - Fotografía cálida de uso real + micro-referencia sutil a `15% OFF transferencia · 3 cuotas sin interés`.
   - Transición fluida de entrada con desplazamiento parallax sutil.
4. **Catálogo Curado (Lookbook Interactivo):**
   - Filtros por categoría: `Todas`, `Bandoleras`, `Carteras & Totes`, `Sobres`, `Portacelulares`, `Mochilas`.
   - **Switch global de precio:** Toggle interactivo `Precio Lista (3 cuotas)` ↔ `Con 15% OFF Transferencia` que recalcula y anima todos los valores con `tabular-nums`.
   - **Efecto Estudio ↔ Vida Real:** Cada pieza se presenta limpia sobre fondo `#EAE4DC` sin borde ni caja; en hover realiza crossfade a foto de uso real o detalle de textura/herraje.
5. **Vista Rápida / Detalle de Producto (Drawer):**
   - Galería vertical limpia, marca original, medidas, selector de color/variante, precio con desglose de transferencia y 3 cuotas.
   - Acciones claras: agregar a la bolsa o consultar medidas directo con Chiara.
6. **Sección Editorial "Sobre CH":**
   - Relato en primera persona de Chiara acompañado de composición fotográfica asimétrica.
   - Bloque dedicado a **Búsqueda a Pedido / Concierge Editorial** (`"¿Buscás algo en particular? Contame qué tenés en mente y te ayudo a buscarlo"`) reemplazando el widget invasivo de WhatsApp.
7. **Logística & Puntos de Retiro:**
   - Bloque limpio y sobrio destacando las tres plazas presenciales (**Nueva Córdoba**, **Arroyito**, **Río Tercero**) y envíos coordinados.
8. **Footer Editorial (`#261A17` Espresso Cuero):**
   - Tipografía en Marfil Hueso `#F6F4EF`, cierre `"Nunca dejes de buscar tu estilo."`, suscripción minimalista al newsletter, links de navegación y datos de contacto.

---

## 5. Catálogo Semilla (Datos Reales para Prototipo)

| Producto | Marca | Categoría | Precio Lista | 15% OFF Transf. | 3 Cuotas s/i |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Bandolera Nala | Gabriana | Bandoleras | `$75.000` | `$63.750` | `$25.000` |
| Portacelular Mare XL Natural | Ruggeri Bags | Portacelulares | `$70.000` | `$59.500` | `$23.333` |
| Cartera Dalk | Good Company | Carteras & Totes | `$65.000` | `$55.250` | `$21.666` |
| Bolso Adele Negro | Cruz de la Rosa | Carteras & Totes | `$65.000` | `$55.250` | `$21.666` |
| Bandolera Tuner | Ruggeri Bags | Bandoleras | `$60.000` | `$51.000` | `$20.000` |
| Sobre Felipa Negro | Cruz de la Rosa | Sobres | `$39.000` | `$33.150` | `$13.000` |
| Sobre Felipa Nude | Cruz de la Rosa | Sobres | `$39.000` | `$33.150` | `$13.000` |

---

## 6. Stack Técnico y Estructura Sugerida

- **Framework:** React + TypeScript + Vite (arquitectura modular compatible con App Router)
- **Estilos:** Tailwind CSS + CSS Custom Properties (`tokens.css`)
- **Animaciones:** Framer Motion + Lenis (smooth scroll)
- **Deploy:** Vercel (`vercel.json`)

```text
src/
├── assets/
│   ├── logo-ch.svg
│   └── images/            # Fotos separadas en /studio y /lifestyle
├── data/
│   └── products.ts        # Catálogo curado y metadatos de marca
├── styles/
│   └── tokens.css         # Variables de paleta, glass y tipografía
├── components/
│   ├── CustomCursor.tsx
│   ├── Preloader.tsx
│   ├── GlassNavbar.tsx
│   ├── HeroEditorial.tsx
│   ├── PriceModeToggle.tsx
│   ├── LookbookGrid.tsx
│   ├── ProductDrawer.tsx
│   ├── AboutChiara.tsx
│   ├── PickupPoints.tsx
│   └── FooterEspresso.tsx
└── app/
    └── page.tsx
```

```bash
npm install
npm run dev
npm run build
```
