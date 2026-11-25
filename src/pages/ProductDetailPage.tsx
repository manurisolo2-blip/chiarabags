import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  PRODUCTS,
  buildWhatsAppLink,
  formatArs,
  getProductBySlug,
} from '../data/products';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { priceMode, addToCart, setCartOpen } = useStore();

  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setZoomImage(null);
    setJustAdded(false);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [slug]);

  useEffect(() => {
    if (!zoomImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomImage]);

  if (!product) {
    return (
      <section className="w-full px-6 md:px-10 lg:px-12 pt-36 pb-28 min-h-[70vh] flex flex-col items-start justify-center">
        <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#B80322] mb-3">
          Pieza no encontrada
        </p>
        <h1 className="display-heading text-4xl sm:text-5xl font-semibold text-[#121212] mb-6">
          No encontramos ese modelo en la colección
        </h1>
        <Link
          to="/coleccion"
          className="min-h-[44px] inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium hover:bg-[#D90429] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
          <span>Volver al catálogo</span>
        </Link>
      </section>
    );
  }

  const linkedVariant = product.linkedVariantId
    ? PRODUCTS.find((p) => p.id === product.linkedVariantId)
    : undefined;

  const variantGroup = linkedVariant
    ? [product, linkedVariant].sort((a, b) => a.name.localeCompare(b.name))
    : null;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.id !== product.linkedVariantId,
  ).slice(0, 3);

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      timerRef.current = null;
    }, 2400);
  };

  return (
    <>
      <article className="w-full px-6 md:px-10 lg:px-12 pt-28 md:pt-36 pb-24">
        <div className="mb-8">
          <Link
            to="/coleccion"
            className="editorial-link min-h-[44px] inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[#5A5550] hover:text-[#D90429] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
            <span>Volver a Colección</span>
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Full-height vertical gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <button
              type="button"
              data-cursor="ZOOM"
              onClick={() => setZoomImage(product.studioImage)}
              aria-label={`Ampliar vista estudio de ${product.name}`}
              className="block w-full bg-[#EAE4DC] aspect-[4/5] p-6 sm:p-10 md:p-14 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
            >
              <img
                src={product.studioImage}
                alt={`${product.name} fondo estudio`}
                width={750}
                height={1000}
                className="w-full h-full object-contain"
              />
            </button>

            <button
              type="button"
              data-cursor="ZOOM"
              onClick={() => setZoomImage(product.lifestyleImage)}
              aria-label={`Ampliar vista en uso de ${product.name}`}
              className="block w-full bg-[#EAE4DC] aspect-[4/5] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
            >
              <img
                src={product.lifestyleImage}
                alt={`${product.name} vista en uso`}
                width={750}
                height={1000}
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Sticky info & purchase column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#5A5550] mb-3">
              {product.brand} · {product.category}
            </p>

            <h1 className="display-heading text-4xl sm:text-5xl font-semibold text-[#121212] mb-5">
              {product.name}
            </h1>

            <p className="text-[15px] md:text-base text-[#5A5550] leading-relaxed mb-8">
              {product.curatorialNote}
            </p>

            {/* Price breakdown */}
            <div className="bg-[#EAE4DC] p-6 mb-8">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#D90429] text-[#F6F4EF] text-[10px] font-semibold tracking-[0.08em] uppercase">
                  15% OFF Transferencia
                </span>
                <span className="tabular-nums text-2xl sm:text-3xl font-semibold text-[#B80322]">
                  {formatArs(product.transferPrice)}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 text-sm text-[#121212] mt-3">
                <span>Precio lista</span>
                <span className="tabular-nums font-medium">{formatArs(product.listPrice)}</span>
              </div>

              <p className="tabular-nums text-xs text-[#5A5550] mt-1.5">
                Hasta 3 cuotas sin interés de {formatArs(product.installmentAmount)}
                {priceMode === 'transfer' ? ' · Descuento aplicado en bolsa.' : ''}
              </p>
            </div>

            {/* Color / variant switcher */}
            <div className="mb-8">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5A5550] mb-3">
                Color seleccionado: <span className="text-[#121212]">{product.colorName}</span>
              </p>
              {variantGroup ? (
                <div className="flex flex-wrap items-center gap-3">
                  {variantGroup.map((variant) => {
                    const selected = variant.id === product.id;
                    return (
                      <Link
                        key={variant.id}
                        to={`/coleccion/${variant.slug}`}
                        className={`min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs transition-colors ${
                          selected
                            ? 'bg-[#121212] text-[#F6F4EF] font-medium'
                            : 'bg-[#EAE4DC] text-[#121212] hover:bg-[#E6D3CE]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.colorName}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#EAE4DC] text-xs text-[#121212]">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span>{product.colorName}</span>
                </div>
              )}
            </div>

            {/* Measurements & material details */}
            <dl className="space-y-4 text-sm mb-9">
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

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-colors active:scale-[0.98] cursor-pointer"
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
                  onClick={() => setCartOpen(true)}
                  className="w-full min-h-[44px] py-2 text-xs font-semibold tracking-[0.08em] uppercase text-[#D90429] hover:underline cursor-pointer"
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
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE4DC] text-[#121212] text-[13px] font-normal hover:bg-[#E6D3CE] transition-colors active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.6} />
                <span>Consultar a Chiara por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related pieces */}
        <section aria-label="Otras piezas sugeridas" className="w-full mt-24 md:mt-32">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 className="display-heading text-3xl sm:text-4xl font-semibold text-[#121212]">
              También en esta selección
            </h2>
            <Link
              to="/coleccion"
              className="editorial-link min-h-[44px] inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-[#121212] hover:text-[#D90429]"
            >
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map((item) => {
              const price = priceMode === 'transfer' ? item.transferPrice : item.listPrice;
              return (
                <article key={item.id} className="group">
                  <Link
                    to={`/coleccion/${item.slug}`}
                    data-cursor="VER PIEZA"
                    className="block w-full aspect-[4/5] bg-[#EAE4DC] p-5 overflow-hidden relative"
                  >
                    <img
                      src={item.studioImage}
                      alt={item.name}
                      width={750}
                      height={1000}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <img
                      src={item.lifestyleImage}
                      alt={`${item.name} detalle`}
                      width={750}
                      height={1000}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      loading="lazy"
                    />
                  </Link>
                  <div className="pt-3 flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                        {item.brand}
                      </p>
                      <Link
                        to={`/coleccion/${item.slug}`}
                        className="font-serif text-lg text-[#121212] group-hover:text-[#D90429] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <span className="tabular-nums text-sm font-medium text-[#121212]">
                      {formatArs(price)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </article>

      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[80] bg-[#121212]/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              aria-label="Cerrar vista ampliada"
              className="absolute top-6 right-6 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#F6F4EF] text-[#121212] hover:bg-[#D90429] hover:text-[#F6F4EF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              src={zoomImage}
              alt={product.name}
              className="max-h-[88vh] max-w-full object-contain bg-[#EAE4DC]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
