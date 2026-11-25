import nalaStudio from '../assets/images/studio/nala.jpg';
import mareStudio from '../assets/images/studio/mare.jpg';
import dalkStudio from '../assets/images/studio/dalk.jpg';
import adeleStudio from '../assets/images/studio/adele.jpg';
import tunerStudio from '../assets/images/studio/tuner.jpg';
import felipaNegroStudio from '../assets/images/studio/felipa-negro.jpg';
import felipaNudeStudio from '../assets/images/studio/felipa-nude.jpg';

import nalaLife from '../assets/images/lifestyle/nala.jpg';
import mareLife from '../assets/images/lifestyle/mare.jpg';
import dalkLife from '../assets/images/lifestyle/dalk.jpg';
import adeleLife from '../assets/images/lifestyle/adele.jpg';
import tunerLife from '../assets/images/lifestyle/tuner.jpg';
import felipaNegroLife from '../assets/images/lifestyle/felipa-negro.jpg';
import felipaNudeLife from '../assets/images/lifestyle/felipa-nude.jpg';

export type Category =
  | 'Todas'
  | 'Bandoleras'
  | 'Carteras & Totes'
  | 'Sobres'
  | 'Portacelulares'
  | 'Mochilas';

export type PriceMode = 'transfer' | 'list';

export type LookbookWeight = 'featured' | 'tall' | 'standard';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Exclude<Category, 'Todas'>;
  listPrice: number;
  transferPrice: number;
  installmentAmount: number;
  studioImage: string;
  lifestyleImage: string;
  dimensions: string;
  material: string;
  strap: string;
  capacityNote: string;
  curatorialNote: string;
  colorName: string;
  colorHex: string;
  linkedVariantId?: string;
  lookbookWeight: LookbookWeight;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryOption =
  | 'Retiro Nueva Córdoba'
  | 'Retiro Arroyito'
  | 'Retiro Río Tercero'
  | 'Envío a coordinar';

export const CATEGORIES: Category[] = [
  'Todas',
  'Bandoleras',
  'Carteras & Totes',
  'Sobres',
  'Portacelulares',
  'Mochilas',
];

export const CURATED_BRANDS = [
  'Gabriana',
  'Good Company',
  'Cruz de la Rosa',
  'Ruggeri Bags',
  'Ona Saez',
] as const;

export const PICKUP_POINTS = [
  {
    city: 'Nueva Córdoba',
    detail: 'Retiro coordinado en punto céntrico, con horario flexible para probarte el modelo antes de llevarlo.',
    timing: 'Coordinación en el día',
  },
  {
    city: 'Arroyito',
    detail: 'Entregas personales sin costo de envío en zona urbana, coordinando día y franja horaria.',
    timing: 'Entregas semanales',
  },
  {
    city: 'Río Tercero',
    detail: 'Punto de retiro directo para retirar tu pedido en mano o recibir asesoramiento previo.',
    timing: 'Entregas semanales',
  },
] as const;

export const BRAND_INFO = {
  name: 'CH. Chiara Bags',
  descriptor: 'CH. CHIARA · Carteras & marroquinería',
  heroHeadline: 'Tu próxima cartera de todos los días',
  closingTagline: 'Nunca dejes de buscar tu estilo.',
  instagram: '@ch.chiarabags',
  instagramUrl: 'https://instagram.com/ch.chiarabags',
  email: 'ch.chiarabags@gmail.com',
  whatsappDisplay: '+54 9 3576 47-7798',
  whatsappNumber: '543576477798',
  manifestoParagraphs: [
    'Ch. Chiara nació de mi gusto por las carteras y esos detalles que hacen propio un estilo. Selecciono carteras y marroquinería buscando un equilibrio entre diseño, calidad y buen precio. Piezas lindas, prácticas y fáciles de incorporar a tu día a día.',
    'Detrás de la tienda estoy yo, Chiara. Elijo cada modelo y te acompaño si necesitás consultar medidas, conocer más sobre un producto o encontrar una opción para regalar.',
    '¿Buscás algo en particular y no lo encontrás en la tienda? No dudes en escribirme. Contame qué tenés en mente y te ayudo a buscarlo.',
  ],
} as const;

export const PRODUCTS: Product[] = [
  {
    id: 'bandolera-nala',
    name: 'Bandolera Nala',
    brand: 'Gabriana',
    category: 'Bandoleras',
    listPrice: 75000,
    transferPrice: 63750,
    installmentAmount: 25000,
    studioImage: nalaStudio,
    lifestyleImage: nalaLife,
    dimensions: '23 cm ancho × 16 cm alto × 8 cm prof.',
    material: 'PU graneado mate de textura firme con interior forrado y bolsillo con cierre.',
    strap: 'Correa regulable y desmontable (hasta 124 cm) con herrajes metálicos.',
    capacityNote: 'Entran billetera mediana, celular grande, llaves y anteojos.',
    curatorialNote:
      'Una bandolera estructurada que mantiene la forma aunque la lleves liviana. Ideal para resolver la semana sin pensar demasiado.',
    colorName: 'Negro / Espresso',
    colorHex: '#221C1A',
    lookbookWeight: 'featured',
  },
  {
    id: 'portacelular-mare-xl-natural',
    name: 'Portacelular Mare XL Natural',
    brand: 'Ruggeri Bags',
    category: 'Portacelulares',
    listPrice: 70000,
    transferPrice: 59500,
    installmentAmount: 23333,
    studioImage: mareStudio,
    lifestyleImage: mareLife,
    dimensions: '13 cm ancho × 20 cm alto × 5 cm prof.',
    material: 'Material sintético efecto cuero graneado en tono natural crudo, costuras al tono.',
    strap: 'Correa fina regulable para cruzar al hombro con mosquetones dorados.',
    capacityNote: 'Espacio para teléfono XL, tarjetero, llaves y labial.',
    curatorialNote:
      'Más amplio que un portacelular común: pensado para salir con manos libres sin dejar lo esencial afuera.',
    colorName: 'Natural',
    colorHex: '#DDD2C2',
    lookbookWeight: 'tall',
  },
  {
    id: 'cartera-dalk',
    name: 'Cartera Dalk',
    brand: 'Good Company',
    category: 'Carteras & Totes',
    listPrice: 65000,
    transferPrice: 55250,
    installmentAmount: 21666,
    studioImage: dalkStudio,
    lifestyleImage: dalkLife,
    dimensions: '33 cm ancho × 26 cm alto × 12 cm prof.',
    material: 'Cuerpo liso estructurado en tono suela cálido con base reforzada.',
    strap: 'Manijas rígidas al hombro + correa larga extensible.',
    capacityNote: 'Lleva agenda A5, neceser, botella chica y objetos de oficina.',
    curatorialNote:
      'Líneas limpias y boca amplia para encontrar todo rápido. La elegí porque funciona igual con tapado o con camisa de lino.',
    colorName: 'Suela / Camel',
    colorHex: '#8E5B3A',
    lookbookWeight: 'standard',
  },
  {
    id: 'bolso-adele-negro',
    name: 'Bolso Adele Negro',
    brand: 'Cruz de la Rosa',
    category: 'Carteras & Totes',
    listPrice: 65000,
    transferPrice: 55250,
    installmentAmount: 21666,
    studioImage: adeleStudio,
    lifestyleImage: adeleLife,
    dimensions: '36 cm ancho × 29 cm alto × 14 cm prof.',
    material: 'Textura flexible de acabado semi-mate en negro profundo, cierre superior completo.',
    strap: 'Doble manija acolchada cómoda para hombro o brazo.',
    capacityNote: 'Apto cuaderno universitario, tablet o notebook de hasta 14".',
    curatorialNote:
      'El clásico negro que no pesa vacío. Su caída suave acompaña el movimiento y resiste jornadas largas.',
    colorName: 'Negro',
    colorHex: '#121212',
    lookbookWeight: 'featured',
  },
  {
    id: 'bandolera-tuner',
    name: 'Bandolera Tuner',
    brand: 'Ruggeri Bags',
    category: 'Bandoleras',
    listPrice: 60000,
    transferPrice: 51000,
    installmentAmount: 20000,
    studioImage: tunerStudio,
    lifestyleImage: tunerLife,
    dimensions: '21 cm ancho × 15 cm alto × 7 cm prof.',
    material: 'Acabado suave tono visón/taupe con solapa limpia y broche imantado.',
    strap: 'Correa ancha tejida intercambiable con regulación continua.',
    capacityNote: 'Perfecta para uso urbano diario: celular, billetera y llaves.',
    curatorialNote:
      'Un neutro intermedio entre el beige y el gris que combina con denim, negro y tonos tierra.',
    colorName: 'Taupe / Visón',
    colorHex: '#8C8178',
    lookbookWeight: 'standard',
  },
  {
    id: 'sobre-felipa-negro',
    name: 'Sobre Felipa Negro',
    brand: 'Cruz de la Rosa',
    category: 'Sobres',
    listPrice: 39000,
    transferPrice: 33150,
    installmentAmount: 13000,
    studioImage: felipaNegroStudio,
    lifestyleImage: felipaNegroLife,
    dimensions: '25 cm ancho × 14 cm alto × 3,5 cm prof.',
    material: 'Acabado liso satinado negro con solapa envolvente e interior forrado.',
    strap: 'Incluye cadena metálica fina desmontable para usar al hombro o en mano.',
    capacityNote: 'Entra cualquier smartphone, documentos, tarjetas y llaves.',
    curatorialNote:
      'Minimalista y liviano para eventos, cenas o para usar como organizador dentro de una tote amplia.',
    colorName: 'Negro',
    colorHex: '#121212',
    linkedVariantId: 'sobre-felipa-nude',
    lookbookWeight: 'standard',
  },
  {
    id: 'sobre-felipa-nude',
    name: 'Sobre Felipa Nude',
    brand: 'Cruz de la Rosa',
    category: 'Sobres',
    listPrice: 39000,
    transferPrice: 33150,
    installmentAmount: 13000,
    studioImage: felipaNudeStudio,
    lifestyleImage: felipaNudeLife,
    dimensions: '25 cm ancho × 14 cm alto × 3,5 cm prof.',
    material: 'Acabado liso mate en tono arena rosado/nude con broche oculto.',
    strap: 'Incluye cadena metálica fina desmontable para llevar cruzado o como clutch.',
    capacityNote: 'Entra cualquier smartphone, documentos, tarjetas y llaves.',
    curatorialNote:
      'Un tono neutro luminoso pensado para casamientos, fiestas de día o regalos que nunca fallan.',
    colorName: 'Nude',
    colorHex: '#D8C2B8',
    linkedVariantId: 'sobre-felipa-negro',
    lookbookWeight: 'tall',
  },
];

export function formatArs(value: number): string {
  const rounded = Math.round(value);
  return '$' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
