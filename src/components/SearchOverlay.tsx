import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PriceMode, Product, PRODUCTS, formatArs } from '../data/products';
import {
  FLUID_SPRING_SNAPPY,
  project,
  withReleaseVelocity,
} from '../utils/fluidPhysics';

interface SearchOverlayProps {
  open: boolean;
  priceMode: PriceMode;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

interface SearchOverlayPanelProps {
  priceMode: PriceMode;
  prefersReduced: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

function SearchOverlayPanel({
  priceMode,
  prefersReduced,
  onClose,
  onSelectProduct,
}: SearchOverlayPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dismissVelocityRef = useRef(0);
  const [query, setQuery] = useState('');
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [-240, 0], [0, 1]);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? PRODUCTS.filter((item) =>
        [item.name, item.brand, item.category, item.colorName, item.material]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
    : PRODUCTS;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = dragY.get();
    const projected = info.offset.y + project(info.velocity.y, 0.99);
    if (info.offset.y < -90 || currentY < -90 || projected < -130) {
      dismissVelocityRef.current = Math.min(0, info.velocity.y);
      onClose();
      return;
    }
    animate(dragY, 0, withReleaseVelocity(info.velocity.y));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 md:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en CH. Chiara Bags"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        className="fixed inset-0"
      >
        <motion.div
          style={prefersReduced ? undefined : { opacity: backdropOpacity }}
          className="h-full w-full bg-[#121212]/45 backdrop-blur-[3px]"
        />
      </motion.div>

      <motion.div
        variants={{
          initial: prefersReduced
            ? { opacity: 0 }
            : { opacity: 0, y: -18, scale: 0.96, filter: 'blur(6px)' },
          animate: prefersReduced
            ? { opacity: 1, transition: { duration: 0.18 } }
            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: FLUID_SPRING_SNAPPY },
          exit: () => {
            if (prefersReduced) {
              return { opacity: 0, transition: { duration: 0.16 } };
            }
            const releaseVelocity = dismissVelocityRef.current;
            const currentY = dragY.get();
            const exitY =
              releaseVelocity < 0 || currentY < -10
                ? Math.min(-48, currentY - 120)
                : -24;
            return {
              opacity: 0,
              y: exitY,
              scale: 0.96,
              filter: 'blur(6px)',
              transition:
                releaseVelocity < 0
                  ? { ...FLUID_SPRING_SNAPPY, velocity: releaseVelocity }
                  : FLUID_SPRING_SNAPPY,
            };
          },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        drag={prefersReduced ? false : 'y'}
        dragDirectionLock
        dragConstraints={{ bottom: 0 }}
        dragElastic={{ top: 0.55, bottom: 0.08 }}
        style={prefersReduced ? undefined : { y: dragY }}
        onDragStart={() => {
          dismissVelocityRef.current = 0;
        }}
        onDragEnd={handleDragEnd}
        className="relative z-10 origin-top w-full max-w-2xl bg-[#F6F4EF] p-6 md:p-8 shadow-2xl max-h-[78vh] flex flex-col"
      >
        <div className="flex items-center gap-3 pb-4 touch-none">
          <Search className="w-5 h-5 text-[#5A5550] shrink-0" strokeWidth={1.6} />
          <input
            ref={inputRef}
            type="search"
            aria-label="Buscar carteras por modelo, marca o color"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por modelo, marca o color (ej. Bandolera, Gabriana, Nude)"
            className="w-full bg-transparent text-base md:text-lg text-[#121212] placeholder:text-[#5A5550]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] focus-visible:rounded-sm"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#EAE4DC] transition-[background-color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={1.6} />
          </button>
        </div>

        <div
          onPointerDownCapture={(e) => {
            if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
              e.stopPropagation();
            }
          }}
          className="overflow-y-auto overscroll-contain touch-pan-y pt-2 space-y-3"
        >
          {matches.length === 0 ? (
            <p className="py-8 text-sm text-[#5A5550]">
              No encontramos coincidencias para "{query}". Podés pedirle el modelo directo a
              Chiara en Pedido Especial.
            </p>
          ) : (
            matches.map((product) => {
              const price =
                priceMode === 'transfer' ? product.transferPrice : product.listPrice;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-full min-h-[44px] flex items-center gap-4 p-2 text-left hover:bg-[#EAE4DC] transition-[background-color,transform] duration-100 ease-out active:scale-[0.98] cursor-pointer group"
                >
                  <img
                    src={product.studioImage}
                    alt={product.name}
                    className="w-14 h-16 object-cover bg-[#EAE4DC] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#5A5550]">
                      {product.brand} · {product.category}
                    </p>
                    <p className="font-serif text-lg text-[#121212] group-hover:text-[#75151E] transition-colors truncate">
                      {product.name}
                    </p>
                  </div>
                  <span className="tabular-nums text-sm font-medium text-[#121212] shrink-0">
                    {formatArs(price)}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div aria-hidden="true" className="md:hidden flex justify-center pt-3 -mb-2 touch-none">
          <span className="w-9 h-1 rounded-full bg-[#121212]/15" />
        </div>
      </motion.div>
    </div>
  );
}

export function SearchOverlay({
  open,
  priceMode,
  onClose,
  onSelectProduct,
}: SearchOverlayProps) {
  const prefersReduced = Boolean(useReducedMotion());

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <SearchOverlayPanel
          priceMode={priceMode}
          prefersReduced={prefersReduced}
          onClose={onClose}
          onSelectProduct={onSelectProduct}
        />
      )}
    </AnimatePresence>
  );
}
