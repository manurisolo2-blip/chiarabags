import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  CATEGORIES,
  Category,
  PriceMode,
  Product,
  PRODUCTS,
  formatArs,
} from '../data/products';
import { PriceModeToggle } from './PriceModeToggle';
import { scrollToSection } from './SmoothScroll';

interface LookbookGridProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  priceMode: PriceMode;
  onPriceModeChange: (mode: PriceMode) => void;
  onSelectProduct: (product: Product) => void;
}

const ASYMMETRIC_SPANS_ALL = [
  'lg:col-span-7',
  'lg:col-span-5 lg:pt-16',
  'lg:col-span-4 lg:pt-8',
  'lg:col-span-8',
  'lg:col-span-5',
  'lg:col-span-3 lg:pt-14',
  'lg:col-span-4 lg:pt-4',
];

const ASPECT_CLASSES_ALL = [
  'aspect-[5/4]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[4/5]',
];

function getLayoutClasses(index: number, totalCount: number) {
  if (totalCount === 7) {
    return {
      colClass: ASYMMETRIC_SPANS_ALL[index % ASYMMETRIC_SPANS_ALL.length],
      aspectClass: ASPECT_CLASSES_ALL[index % ASPECT_CLASSES_ALL.length],
    };
  }
  if (totalCount === 1) {
    return {
      colClass: 'lg:col-span-7',
      aspectClass: 'aspect-[5/4]',
    };
  }
  if (totalCount === 2) {
    return index === 0
      ? { colClass: 'lg:col-span-7', aspectClass: 'aspect-[5/4]' }
      : { colClass: 'lg:col-span-5 lg:pt-14', aspectClass: 'aspect-[4/5]' };
  }
  return index % 3 === 0
    ? { colClass: 'lg:col-span-6', aspectClass: 'aspect-[5/4]' }
    : { colClass: 'lg:col-span-3 lg:pt-10', aspectClass: 'aspect-[4/5]' };
}

export function LookbookGrid({
  activeCategory,
  onCategoryChange,
  priceMode,
  onPriceModeChange,
  onSelectProduct,
}: LookbookGridProps) {
  const prefersReduced = useReducedMotion();

  const filteredProducts =
    activeCategory === 'Todas'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="coleccion"
      aria-label="Catálogo curado"
      className="py-20 md:py-28 px-5 md:px-10 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-14">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#5A5550] mb-3">
            Selección disponible
          </p>
          <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-[#121212]">
            Lookbook curado
          </h2>
        </div>

        <p className="text-sm text-[#5A5550] max-w-sm leading-relaxed">
          Cada pieza se presenta sobre arena natural y revela su textura real al pasar el cursor.
          Tocá cualquier modelo para ver medidas y detalles.
        </p>
      </div>

      <div className="sticky top-[74px] md:top-[84px] z-30 mb-12 md:mb-16">
        <div className="liquid-glass rounded-[28px] lg:rounded-full px-3 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="w-full lg:w-auto flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(category)}
                  className={`relative min-h-[44px] px-3.5 py-1.5 rounded-full text-xs md:text-[13px] whitespace-nowrap transition-colors active:scale-[0.97] cursor-pointer ${
                    isActive
                      ? 'text-[#F6F4EF] font-medium'
                      : 'text-[#121212] hover:bg-[#E6D3CE]/45'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                      className="absolute inset-0 rounded-full bg-[#121212]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          <PriceModeToggle priceMode={priceMode} onChange={onPriceModeChange} />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#EAE4DC] px-8 py-16 md:px-14 md:py-20 max-w-3xl"
        >
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#75151E] mb-4">
            Categoría a pedido
          </p>
          <h3 className="display-heading text-3xl md:text-4xl font-semibold text-[#121212] mb-5">
            Todavía no hay mochilas en stock inmediato esta semana.
          </h3>
          <p className="text-[15px] text-[#5A5550] leading-relaxed mb-8 max-w-xl">
            Si estás buscando una mochila urbana, de viaje o para facultad de Gabriana, Good
            Company u Ona Saez, contame qué tamaño o color tenés en mente y la buscamos juntas.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('pedido-especial')}
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121212] text-[#F6F4EF] text-xs font-medium tracking-[0.06em] uppercase hover:bg-[#75151E] transition-colors active:scale-[0.97] cursor-pointer"
            >
              <span>Pedir búsqueda a Chiara</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => onCategoryChange('Todas')}
              className="min-h-[44px] inline-flex items-center text-xs font-medium tracking-[0.06em] uppercase text-[#5A5550] hover:text-[#121212] px-3 py-2 cursor-pointer"
            >
              Ver todo el catálogo
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-7 gap-y-16 lg:gap-y-24 items-start">
          {filteredProducts.map((product, index) => {
            const { colClass, aspectClass } = getLayoutClasses(index, filteredProducts.length);
            const activePrice =
              priceMode === 'transfer' ? product.transferPrice : product.listPrice;

            return (
              <motion.article
                key={product.id}
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`${colClass} group`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  data-cursor="VER PIEZA"
                  aria-label={`Ver detalles de ${product.name} (${product.brand})`}
                  className={`block w-full text-left relative bg-[#EAE4DC] overflow-hidden ${aspectClass} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]`}
                >
                  <img
                    src={product.studioImage}
                    alt={`${product.name} de ${product.brand} vista estudio`}
                    width={750}
                    height={1000}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />

                  <img
                    src={product.lifestyleImage}
                    alt={`${product.name} en uso real`}
                    width={750}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />

                  <AnimatePresence>
                    {priceMode === 'transfer' && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="tabular-nums absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#75151E] text-[#F6F4EF] text-[10px] font-medium tracking-[0.08em] uppercase"
                      >
                        15% OFF
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <div className="pt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                        {product.brand}
                      </span>
                      {product.linkedVariantId && (
                        <span
                          title={`Color: ${product.colorName}`}
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: product.colorHex }}
                        />
                      )}
                    </div>
                    <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] leading-tight text-[#121212] group-hover:text-[#75151E] transition-colors">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="min-h-[44px] inline-flex items-center text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-sm"
                      >
                        {product.name}
                      </button>
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${product.id}-${priceMode}`}
                        initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReduced ? undefined : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="tabular-nums text-base md:text-lg font-medium text-[#121212]">
                          {formatArs(activePrice)}
                        </p>
                        {priceMode === 'transfer' ? (
                          <p className="tabular-nums text-[11px] text-[#5A5550]">
                            Lista {formatArs(product.listPrice)}
                          </p>
                        ) : (
                          <p className="tabular-nums text-[11px] text-[#5A5550]">
                            3 × {formatArs(product.installmentAmount)} s/i
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
