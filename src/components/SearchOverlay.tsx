import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, formatArs } from '../data/products';
import {
  FLUID_SPRING_SNAPPY,
  project,
  withReleaseVelocity,
} from '../utils/fluidPhysics';

export function SearchOverlay() {
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();
  const { searchOpen, setSearchOpen, priceMode } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [exitVelocity, setExitVelocity] = useState(0);

  const dragY = useMotionValue(0);
  const scrimOpacity = useTransform(dragY, [0, -240], [1, 0]);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      dragY.set(0);
      setExitVelocity(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
  }, [searchOpen, dragY]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, setSearchOpen]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projectedY = info.offset.y + project(info.velocity.y, 0.99);
    if (info.offset.y < -90 || projectedY < -130) {
      setExitVelocity(info.velocity.y);
      setSearchOpen(false);
    }
  };

  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? PRODUCTS.filter((item) =>
        [item.name, item.brand, item.category, item.colorName, item.material]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
    : PRODUCTS;

  return (
    <AnimatePresence>
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-16 md:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en CH. Chiara Bags"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0"
          >
            <motion.div
              style={{ opacity: prefersReduced ? 1 : scrimOpacity }}
              className="w-full h-full bg-[#121212]/45 backdrop-blur-[3px]"
            />
          </motion.div>

          <motion.div
            style={{ y: prefersReduced ? undefined : dragY, transformOrigin: 'top center' }}
            drag={prefersReduced ? false : 'y'}
            dragDirectionLock
            dragConstraints={{ bottom: 0 }}
            dragElastic={{ top: 0.55, bottom: 0.08 }}
            onDragEnd={handleDragEnd}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.96, filter: 'blur(8px)' }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -18,
                    scale: 0.96,
                    filter: 'blur(8px)',
                    transition: withReleaseVelocity(exitVelocity, FLUID_SPRING_SNAPPY),
                  }
            }
            transition={prefersReduced ? { duration: 0.18 } : FLUID_SPRING_SNAPPY}
            className="relative z-10 w-full max-w-2xl bg-[#F6F4EF] p-6 md:p-8 shadow-2xl max-h-[78vh] flex flex-col"
          >
            <div className="flex items-center gap-3 pb-4">
              <Search className="w-5 h-5 text-[#5A5550] shrink-0" strokeWidth={1.6} />
              <input
                ref={inputRef}
                type="search"
                aria-label="Buscar por modelo, marca o color"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por modelo, marca o color (ej. Bandolera, Gabriana, Nude)"
                className="w-full bg-transparent text-base md:text-lg text-[#121212] placeholder:text-[#5A5550]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-sm py-1"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Cerrar búsqueda"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#EAE4DC] transition-[transform,background-color] duration-100 ease-out active:scale-[0.94] cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain touch-pan-y pt-2 space-y-2.5">
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
                        setSearchOpen(false);
                        navigate(`/coleccion/${product.slug}`);
                      }}
                      className="w-full min-h-[68px] flex items-center gap-4 p-2.5 text-left hover:bg-[#EAE4DC] transition-[transform,background-color] duration-100 ease-out active:scale-[0.985] cursor-pointer group"
                    >
                      <img
                        src={product.studioImage}
                        alt={product.name}
                        className="w-14 h-16 object-contain p-1 bg-[#EAE4DC] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#5A5550]">
                          {product.brand} · {product.category}
                        </p>
                        <p className="font-serif text-lg text-[#121212] group-hover:text-[#D90429] transition-colors truncate">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
