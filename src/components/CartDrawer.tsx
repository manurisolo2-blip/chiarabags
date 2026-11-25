import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  DeliveryOption,
  buildWhatsAppLink,
  formatArs,
} from '../data/products';
import {
  FLUID_SPRING_DEFAULT,
  FLUID_SPRING_SNAPPY,
  project,
  withReleaseVelocity,
} from '../utils/fluidPhysics';

export function CartQuickCapsule({ hidden }: { hidden: boolean }) {
  const prefersReduced = useReducedMotion();
  const { cart, priceMode, setCartOpen } = useStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (priceMode === 'transfer' ? item.product.transferPrice : item.product.listPrice),
    0,
  );

  return (
    <AnimatePresence>
      {totalItems > 0 && !hidden && (
        <motion.div
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 18, scale: 0.94, filter: 'blur(6px)' }
          }
          animate={
            prefersReduced
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          exit={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 14, scale: 0.94, filter: 'blur(6px)' }
          }
          transition={prefersReduced ? { duration: 0.18 } : FLUID_SPRING_SNAPPY}
          style={{ transformOrigin: 'bottom right' }}
          className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40"
        >
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="liquid-glass-nav rounded-full pl-4 pr-2 py-2 min-h-[44px] flex items-center gap-3.5 text-[#121212] hover:scale-[1.01] active:scale-[0.97] transition-transform duration-100 ease-out cursor-pointer"
          >
            <span className="relative flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" strokeWidth={1.6} />
              <span className="tabular-nums ml-1.5 text-xs font-semibold text-[#D90429]">
                {totalItems}
              </span>
            </span>

            <span className="tabular-nums text-xs md:text-[13px] font-medium">
              {formatArs(totalValue)}
            </span>

            <span className="px-3.5 py-1.5 rounded-full bg-[#121212] text-[#F6F4EF] text-[11px] font-medium tracking-[0.06em] uppercase">
              Ver bolsa
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  'Retiro Nueva Córdoba',
  'Retiro Arroyito',
  'Retiro Río Tercero',
  'Envío a coordinar',
];

export function CartDrawer() {
  const prefersReduced = useReducedMotion();
  const {
    cart,
    cartOpen,
    setCartOpen,
    priceMode,
    setPriceMode,
    updateQuantity,
    removeItem,
  } = useStore();
  const [delivery, setDelivery] = useState<DeliveryOption>('Retiro Nueva Córdoba');
  const [exitVelocity, setExitVelocity] = useState(0);

  const dragX = useMotionValue(0);
  const scrimOpacity = useTransform(dragX, [0, 340], [1, 0]);

  useEffect(() => {
    if (cartOpen) {
      dragX.set(0);
      setExitVelocity(0);
    }
  }, [cartOpen, dragX]);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cartOpen, setCartOpen]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projectedX = info.offset.x + project(info.velocity.x, 0.992);
    if (projectedX > 140 || info.offset.x > 120) {
      setExitVelocity(info.velocity.x);
      setCartOpen(false);
    }
  };

  const listSubtotal = cart.reduce(
    (sum, item) => sum + item.product.listPrice * item.quantity,
    0,
  );
  const transferSubtotal = cart.reduce(
    (sum, item) => sum + item.product.transferPrice * item.quantity,
    0,
  );
  const installmentAmount = Math.floor(listSubtotal / 3);
  const activeTotal = priceMode === 'transfer' ? transferSubtotal : listSubtotal;

  const whatsappCheckoutHref = (() => {
    const lines = cart.map((item) => {
      const unitPrice =
        priceMode === 'transfer' ? item.product.transferPrice : item.product.listPrice;
      return `- ${item.quantity}x ${item.product.name} (${item.product.brand}) — ${formatArs(
        unitPrice * item.quantity,
      )}`;
    });

    const paymentLine =
      priceMode === 'transfer'
        ? 'Método de pago: Transferencia bancaria (15% OFF)'
        : `Método de pago: 3 cuotas sin interés de ${formatArs(installmentAmount)}`;

    const message = [
      'Hola Chiara! Te paso mi pedido desde la web de CH. Chiara Bags:',
      '',
      ...lines,
      '',
      paymentLine,
      `Entrega / retiro: ${delivery}`,
      `Total a abonar: ${formatArs(activeTotal)}`,
    ].join('\n');

    return buildWhatsAppLink(message);
  })();

  return (
    <AnimatePresence>
      {cartOpen && (
        <div
          className="fixed inset-0 z-[70] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Bolsa de compra"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0"
          >
            <motion.div
              style={{ opacity: prefersReduced ? 1 : scrimOpacity }}
              className="w-full h-full bg-[#121212]/40 backdrop-blur-[2px]"
            />
          </motion.div>

          <motion.aside
            style={{ x: prefersReduced ? undefined : dragX }}
            drag={prefersReduced ? false : 'x'}
            dragDirectionLock
            dragConstraints={{ left: 0 }}
            dragElastic={{ left: 0.08, right: 0.6 }}
            onDragEnd={handleDragEnd}
            initial={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReduced ? { opacity: 1 } : { x: 0 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : {
                    x: '100%',
                    transition: withReleaseVelocity(exitVelocity, FLUID_SPRING_DEFAULT),
                  }
            }
            transition={prefersReduced ? { duration: 0.2 } : FLUID_SPRING_DEFAULT}
            className="relative z-10 w-full max-w-md bg-[#F6F4EF] h-full flex flex-col shadow-2xl touch-pan-y"
          >
            <div className="md:hidden flex justify-center pt-2.5 pb-0.5" aria-hidden="true">
              <span className="w-9 h-1 rounded-full bg-[#121212]/15" />
            </div>

            <div className="flex items-center justify-between px-6 py-4 md:py-5">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#5A5550]">
                  CH. Chiara Bags
                </p>
                <h2 className="display-heading text-2xl font-semibold text-[#121212] mt-1">
                  Tu bolsa
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Cerrar bolsa"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#EAE4DC] transition-[transform,background-color] duration-100 ease-out active:scale-[0.94] cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y px-6 py-2">
              {cart.length === 0 ? (
                <div className="py-16">
                  <p className="text-base text-[#121212] mb-2">Tu bolsa está vacía.</p>
                  <p className="text-sm text-[#5A5550] leading-relaxed">
                    Elegí alguna cartera de la colección para comparar precios en 3 cuotas o con el
                    15% OFF por transferencia.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {cart.map(({ product, quantity }) => {
                    const lineTotal =
                      quantity *
                      (priceMode === 'transfer' ? product.transferPrice : product.listPrice);
                    return (
                      <div key={product.id} className="flex gap-4 items-start">
                        <img
                          src={product.studioImage}
                          alt={product.name}
                          className="w-20 h-24 object-contain p-1.5 bg-[#EAE4DC] shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#5A5550]">
                            {product.brand}
                          </p>
                          <h3 className="font-serif text-lg leading-tight text-[#121212] truncate mt-0.5">
                            {product.name}
                          </h3>
                          <p
                            className={`tabular-nums text-xs font-medium mt-1 ${
                              priceMode === 'transfer' ? 'text-[#B80322]' : 'text-[#121212]'
                            }`}
                          >
                            {formatArs(lineTotal)}
                            <span className="text-[#5A5550] font-normal ml-1.5">
                              {priceMode === 'transfer' ? '(15% OFF)' : '(Lista / 3 cuotas)'}
                            </span>
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center bg-[#EAE4DC] rounded-full p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, -1)}
                                aria-label={`Quitar una unidad de ${product.name}`}
                                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#D90429] transition-transform duration-100 ease-out active:scale-[0.9] cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" strokeWidth={1.8} />
                              </button>
                              <span className="tabular-nums px-2 text-xs font-medium text-[#121212]">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, 1)}
                                aria-label={`Agregar una unidad de ${product.name}`}
                                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#D90429] transition-transform duration-100 ease-out active:scale-[0.9] cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" strokeWidth={1.8} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              aria-label={`Eliminar ${product.name}`}
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#5A5550] hover:text-[#D90429] transition-[transform,color] duration-100 ease-out active:scale-[0.92] cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.6} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-2">
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5A5550] mb-2.5">
                      Método de pago
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPriceMode('transfer')}
                        className={`min-h-[44px] px-3 py-2 rounded-full text-xs text-center transition-[transform,colors] duration-100 ease-out active:scale-[0.97] cursor-pointer ${
                          priceMode === 'transfer'
                            ? 'bg-[#D90429] text-[#F6F4EF] font-semibold'
                            : 'bg-[#EAE4DC] text-[#121212] hover:bg-[#E6D3CE]'
                        }`}
                      >
                        Transferencia 15% OFF
                      </button>

                      <button
                        type="button"
                        onClick={() => setPriceMode('list')}
                        className={`min-h-[44px] px-3 py-2 rounded-full text-xs text-center transition-[transform,colors] duration-100 ease-out active:scale-[0.97] cursor-pointer ${
                          priceMode === 'list'
                            ? 'bg-[#121212] text-[#F6F4EF] font-medium'
                            : 'bg-[#EAE4DC] text-[#121212] hover:bg-[#E6D3CE]'
                        }`}
                      >
                        3 cuotas sin interés
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5A5550] mb-2.5">
                      Entrega o punto de retiro
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DELIVERY_OPTIONS.map((option) => {
                        const selected = delivery === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setDelivery(option)}
                            className={`min-h-[44px] px-4 py-1.5 rounded-full text-xs transition-[transform,colors] duration-100 ease-out active:scale-[0.97] cursor-pointer ${
                              selected
                                ? 'bg-[#121212] text-[#F6F4EF] font-medium'
                                : 'bg-[#EAE4DC] text-[#121212] hover:bg-[#E6D3CE]'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-[#EAE4DC] space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-xs font-medium uppercase tracking-[0.08em] ${
                        priceMode === 'transfer' ? 'text-[#B80322]' : 'text-[#121212]'
                      }`}
                    >
                      {priceMode === 'transfer'
                        ? 'Total transferencia (15% OFF)'
                        : 'Total en 3 cuotas sin interés'}
                    </span>
                    <span
                      className={`tabular-nums text-xl font-semibold ${
                        priceMode === 'transfer' ? 'text-[#B80322]' : 'text-[#121212]'
                      }`}
                    >
                      {formatArs(activeTotal)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between text-xs text-[#5A5550]">
                    {priceMode === 'transfer' ? (
                      <>
                        <span>Precio lista (o 3 cuotas s/i de {formatArs(installmentAmount)})</span>
                        <span className="tabular-nums font-medium text-[#121212]">
                          {formatArs(listSubtotal)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="tabular-nums">
                          3 cuotas sin interés de {formatArs(installmentAmount)}
                        </span>
                        <span className="tabular-nums font-medium text-[#B80322]">
                          {formatArs(transferSubtotal)} transf.
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <a
                  href={whatsappCheckoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-[transform,colors] duration-100 ease-out active:scale-[0.97]"
                >
                  <span>Finalizar pedido por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                </a>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
