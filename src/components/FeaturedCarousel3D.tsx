import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, Product, formatArs } from '../data/products';

const FEATURED_SLUGS = [
  'bandolera-nala',
  'portacelular-mare-xl-natural',
  'cartera-dalk',
  'bolso-adele-negro',
  'sobre-felipa-negro',
];

const FEATURED_ITEMS: Product[] = FEATURED_SLUGS.map((slug) =>
  PRODUCTS.find((p) => p.slug === slug),
).filter((p): p is Product => Boolean(p));

export function FeaturedCarousel3D() {
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();
  const { priceMode } = useStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [tilts, setTilts] = useState<number[]>(() => FEATURED_ITEMS.map(() => 0));

  const updateTilts = useCallback(() => {
    const el = trackRef.current;
    if (!el || prefersReduced) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const cards = Array.from(el.children) as HTMLElement[];

    const next = cards.map((card) => {
      const cRect = card.getBoundingClientRect();
      const cardCenter = cRect.left + cRect.width / 2;
      const normalized = (cardCenter - center) / Math.max(rect.width * 0.55, 1);
      return Math.max(-1, Math.min(1, normalized));
    });
    setTilts(next);
  }, [prefersReduced]);

  useEffect(() => {
    updateTilts();
    window.addEventListener('resize', updateTilts, { passive: true });
    return () => window.removeEventListener('resize', updateTilts);
  }, [updateTilts]);

  const scrollByStep = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.72, 420);
    el.scrollBy({ left: dir * step, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 6) {
      dragState.current.moved = true;
    }
    el.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <section
      aria-label="Piezas destacadas"
      className="w-full py-20 md:py-28 bg-[#F6F4EF] overflow-hidden"
    >
      <div className="w-full px-6 md:px-10 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-3">
            Edición destacada
          </p>
          <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-[#121212]">
            Piezas destacadas
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label="Pieza anterior"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#EAE4DC] text-[#121212] hover:bg-[#121212] hover:text-[#F6F4EF] transition-colors active:scale-[0.94] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label="Pieza siguiente"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#EAE4DC] text-[#121212] hover:bg-[#121212] hover:text-[#F6F4EF] transition-colors active:scale-[0.94] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
            </button>
          </div>

          <Link
            to="/coleccion"
            className="editorial-link min-h-[44px] inline-flex items-center gap-1.5 text-[13px] font-medium text-[#121212] hover:text-[#D90429] transition-colors whitespace-nowrap"
          >
            <span>Ver todas</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      {/* Full-width draggable 3D-perspective track */}
      <div
        ref={trackRef}
        onScroll={updateTilts}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ perspective: '1200px' }}
        className="w-full px-6 md:px-10 lg:px-12 py-4 flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
      >
        {FEATURED_ITEMS.map((product, idx) => {
          const offset = tilts[idx] ?? 0;
          const rotateY = prefersReduced ? 0 : offset * -10;
          const scale = prefersReduced ? 1 : 1 - Math.abs(offset) * 0.04;
          const activePrice =
            priceMode === 'transfer' ? product.transferPrice : product.listPrice;

          return (
            <article
              key={product.id}
              style={{
                transform: `rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                transition: 'transform 160ms ease-out',
              }}
              className="group shrink-0 w-[76vw] sm:w-[46vw] md:w-[34vw] lg:w-[27vw] snap-center"
            >
              <button
                type="button"
                data-cursor="VER PIEZA"
                onClick={() => {
                  if (dragState.current.moved) return;
                  navigate(`/coleccion/${product.slug}`);
                }}
                aria-label={`Ver ${product.name} (${product.brand})`}
                className="block w-full aspect-[4/5] bg-[#EAE4DC] p-5 md:p-7 overflow-hidden relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <img
                  src={product.studioImage}
                  alt={`${product.name} vista estudio`}
                  width={750}
                  height={1000}
                  draggable={false}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />

                <img
                  src={product.lifestyleImage}
                  alt={`${product.name} en uso`}
                  width={750}
                  height={1000}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
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
                      className="tabular-nums absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#D90429] text-[#F6F4EF] text-[10px] font-semibold tracking-[0.08em] uppercase"
                    >
                      15% OFF
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div className="pt-4 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                    {product.brand}
                  </p>
                  <Link
                    to={`/coleccion/${product.slug}`}
                    onClick={(e) => {
                      if (dragState.current.moved) e.preventDefault();
                    }}
                    className="min-h-[44px] inline-flex items-center font-serif text-xl md:text-2xl text-[#121212] group-hover:text-[#D90429] transition-colors truncate"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="text-right shrink-0">
                  <p className="tabular-nums text-base md:text-lg font-medium text-[#121212]">
                    {formatArs(activePrice)}
                  </p>
                  <p className="tabular-nums text-[11px] text-[#5A5550]">
                    {priceMode === 'transfer'
                      ? `Lista ${formatArs(product.listPrice)}`
                      : `3 × ${formatArs(product.installmentAmount)} s/i`}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
