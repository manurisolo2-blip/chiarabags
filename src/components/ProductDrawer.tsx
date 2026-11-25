import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Check, MessageCircle, ShoppingBag, X } from 'lucide-react';
import {
  PRODUCTS,
  PriceMode,
  Product,
  buildWhatsAppLink,
  formatArs,
} from '../data/products';
import {
  FLUID_SPRING_DEFAULT,
  FLUID_SPRING_SNAPPY,
  project,
  withReleaseVelocity,
} from '../utils/fluidPhysics';

interface ProductDrawerProps {
  product: Product | null;
  priceMode: PriceMode;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
}

interface ProductDrawerPanelProps {
  product: Product;
  priceMode: PriceMode;
  prefersReduced: boolean;
  justAdded: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAdd: () => void;
  onOpenCart: () => void;
  onZoomImage: (src: string) => void;
}

function ProductDrawerPanel({
  product,
  priceMode,
  prefersReduced,
  justAdded,
  onClose,
  onSelectProduct,
  onAdd,
  onOpenCart,
  onZoomImage,
}: ProductDrawerPanelProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const dismissVelocityRef = useRef(0);
  const dragX = useMotionValue(0);
  const backdropOpacity = useTransform(dragX, [0, 340], [1, 0]);

  const offscreenX = useMemo(() => {
    if (typeof window === 'undefined') return 768;
    const rootFontSize =
      parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
    return Math.min(window.innerWidth, rootFontSize * 48);
  }, []);

  const linkedVariant = product.linkedVariantId
    ? PRODUCTS.find((p) => p.id === product.linkedVariantId)
    : undefined;

  const variantGroup = linkedVariant
    ? [product, linkedVariant].sort((a, b) => a.name.localeCompare(b.name))
    : null;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentX = dragX.get();
    const projected = info.offset.x + project(info.velocity.x, 0.992);
    if (projected > 140 || info.offset.x > 120 || currentX > 120) {
      dismissVelocityRef.current = Math.max(0, info.velocity.x);
      onClose();
      return;
    }
    animate(dragX, 0, withReleaseVelocity(info.velocity.x));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24 }}
        onClick={onClose}
        className="fixed inset-0"
      >
        <motion.div
          style={prefersReduced ? undefined : { opacity: backdropOpacity }}
          className="h-full w-full bg-[#121212]/40 backdrop-blur-[2px]"
        />
      </motion.div>

      <motion.aside
        ref={drawerRef}
        variants={{
          initial: prefersReduced ? { opacity: 0 } : { x: offscreenX },
          animate: prefersReduced
            ? { opacity: 1, transition: { duration: 0.2 } }
            : { x: 0, transition: FLUID_SPRING_DEFAULT },
          exit: () => {
            if (prefersReduced) {
              return { opacity: 0, transition: { duration: 0.18 } };
            }
            const exitTarget = Math.max(
              drawerRef.current?.offsetWidth || offscreenX,
              dragX.get() + 40,
            );
            const releaseVelocity = dismissVelocityRef.current;
            return {
              x: exitTarget,
              transition:
                releaseVelocity > 0
                  ? { ...FLUID_SPRING_DEFAULT, velocity: releaseVelocity }
                  : FLUID_SPRING_DEFAULT,
            };
          },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        drag={prefersReduced ? false : 'x'}
        dragDirectionLock
        dragConstraints={{ left: 0 }}
        dragElastic={{ left: 0.08, right: 0.6 }}
        style={prefersReduced ? undefined : { x: dragX }}
        onDragStart={() => {
          dismissVelocityRef.current = 0;
        }}
        onDragEnd={handleDragEnd}
        className="relative z-10 w-full max-w-3xl bg-[#F6F4EF] h-full overflow-y-auto overscroll-contain touch-pan-y shadow-2xl"
      >
        <div className="sticky top-0 z-20 bg-[#F6F4EF]/90 backdrop-blur-md px-6 md:px-10 pt-2.5 md:pt-5 pb-4 md:pb-5">
          <div aria-hidden="true" className="md:hidden flex justify-center pb-2">
            <span className="w-9 h-1 rounded-full bg-[#121212]/15" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#5A5550]">
              {product.brand} · {product.category}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalle de producto"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#EAE4DC] transition-[background-color,color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <div className="px-6 md:px-10 pb-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Clean vertical gallery */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <button
              type="button"
              data-cursor="ZOOM"
              onClick={() => onZoomImage(product.studioImage)}
              aria-label={`Ampliar vista estudio de ${product.name}`}
              className="block w-full bg-[#EAE4DC] aspect-[4/5] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] transition-transform duration-100 ease-out active:scale-[0.985]"
            >
              <img
                src={product.studioImage}
                alt={`${product.name} fondo estudio`}
                className="w-full h-full object-cover"
              />
            </button>

            <button
              type="button"
              data-cursor="ZOOM"
              onClick={() => onZoomImage(product.lifestyleImage)}
              aria-label={`Ampliar vista en uso de ${product.name}`}
              className="block w-full bg-[#EAE4DC] aspect-[4/5] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] transition-transform duration-100 ease-out active:scale-[0.985]"
            >
              <img
                src={product.lifestyleImage}
                alt={`${product.name} vista en uso`}
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Editorial spec & purchase column */}
          <div className="md:col-span-6 md:sticky md:top-24 self-start flex flex-col">
            <h2 className="display-heading text-3xl md:text-4xl font-semibold text-[#121212] mb-4">
              {product.name}
            </h2>

            <p className="text-[15px] text-[#5A5550] leading-relaxed mb-7">
              {product.curatorialNote}
            </p>

            {/* Price breakdown */}
            <div className="bg-[#EAE4DC] p-5 mb-7">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#75151E]">
                  Abonando por transferencia (15% OFF)
                </span>
                <span className="tabular-nums text-2xl font-semibold text-[#75151E]">
                  {formatArs(product.transferPrice)}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 text-sm text-[#121212]">
                <span>Precio lista</span>
                <span className="tabular-nums font-medium">{formatArs(product.listPrice)}</span>
              </div>

              <p className="tabular-nums text-xs text-[#5A5550] mt-1.5">
                O hasta 3 cuotas sin interés de {formatArs(product.installmentAmount)}
                {priceMode === 'transfer' ? ' · Descuento aplicado en bolsa al elegir transferencia.' : ''}
              </p>
            </div>

            {/* Color / variant selector when available */}
            <div className="mb-7">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5A5550] mb-2.5">
                Color seleccionado: <span className="text-[#121212]">{product.colorName}</span>
              </p>
              {variantGroup ? (
                <div className="flex items-center gap-3">
                  {variantGroup.map((variant) => {
                    const selected = variant.id === product.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => onSelectProduct(variant)}
                        className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-[background-color,color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer ${
                          selected
                            ? 'bg-[#121212] text-[#F6F4EF]'
                            : 'bg-[#EAE4DC] text-[#121212] hover:bg-[#E6D3CE]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.colorName}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EAE4DC] text-xs text-[#121212]">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span>{product.colorName}</span>
                </div>
              )}
            </div>

            {/* Measurements & materials */}
            <dl className="space-y-3.5 text-sm mb-8">
              <div>
                <dt className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                  Medidas reales
                </dt>
                <dd className="tabular-nums text-[#121212] mt-0.5">{product.dimensions}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                  Materialidad
                </dt>
                <dd className="text-[#121212] mt-0.5">{product.material}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                  Correa &amp; uso
                </dt>
                <dd className="text-[#121212] mt-0.5">{product.strap}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                  Capacidad
                </dt>
                <dd className="text-[#121212] mt-0.5">{product.capacityNote}</dd>
              </div>
            </dl>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onAdd}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#75151E] transition-[background-color,color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={1.8} />
                    <span>Agregada a tu bolsa</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.6} />
                    <span>Agregar a la bolsa</span>
                  </>
                )}
              </button>

              {justAdded && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                  className="w-full min-h-[44px] inline-flex items-center justify-center py-2 text-xs font-medium tracking-[0.08em] uppercase text-[#75151E] hover:underline transition-transform duration-100 ease-out active:scale-[0.97] cursor-pointer"
                >
                  Ir a revisar tu bolsa
                </button>
              )}

              <a
                href={buildWhatsAppLink(
                  `Hola Chiara! Estaba viendo ${product.name} (${product.brand}) en la web y quería consultar medidas o ver si entra lo que llevo todos los días.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE4DC] text-[#121212] text-[13px] font-normal hover:bg-[#E6D3CE] transition-[background-color,color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.6} />
                <span>Consultar medidas con Chiara</span>
              </a>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

export function ProductDrawer({
  product,
  priceMode,
  onClose,
  onSelectProduct,
  onAddToCart,
  onOpenCart,
}: ProductDrawerProps) {
  const prefersReduced = Boolean(useReducedMotion());
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const justAddedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setZoomImage(null);
    setJustAdded(false);
    if (justAddedTimerRef.current !== null) {
      window.clearTimeout(justAddedTimerRef.current);
      justAddedTimerRef.current = null;
    }
  }, [product?.id]);

  useEffect(() => {
    return () => {
      if (justAddedTimerRef.current !== null) {
        window.clearTimeout(justAddedTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomImage) {
          setZoomImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, zoomImage, onClose]);

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product);
    setJustAdded(true);
    if (justAddedTimerRef.current !== null) {
      window.clearTimeout(justAddedTimerRef.current);
    }
    justAddedTimerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      justAddedTimerRef.current = null;
    }, 2200);
  };

  return (
    <>
      <AnimatePresence>
        {product && (
          <ProductDrawerPanel
            product={product}
            priceMode={priceMode}
            prefersReduced={prefersReduced}
            justAdded={justAdded}
            onClose={onClose}
            onSelectProduct={onSelectProduct}
            onAdd={handleAdd}
            onOpenCart={onOpenCart}
            onZoomImage={setZoomImage}
          />
        )}
      </AnimatePresence>

      {/* Clean Zoom Lightbox */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[60] bg-[#121212]/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              aria-label="Cerrar vista ampliada"
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#F6F4EF] text-[#121212] hover:bg-[#E6D3CE] transition-[background-color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>
            <motion.img
              initial={prefersReduced ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
              transition={FLUID_SPRING_SNAPPY}
              src={zoomImage}
              alt={product?.name || 'Detalle ampliado'}
              className="max-h-[88vh] max-w-full object-contain bg-[#EAE4DC]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
