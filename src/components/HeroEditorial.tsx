import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import heroEditorialImg from '../assets/images/lifestyle/hero-editorial.jpg';
import { useStore } from '../context/StoreContext';
import { BRAND_INFO, PRODUCTS, formatArs } from '../data/products';

const HERO_FEATURED_PRODUCTS = PRODUCTS.slice(0, 2);

export function HeroEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { priceMode } = useStore();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 56]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1.04, 1.04] : [1.05, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Presentación CH. Chiara Bags"
      className="relative w-full bg-[#F6F4EF] overflow-hidden lg:min-h-[96vh]"
    >
      {/* Desktop right-side full-bleed vertical editorial campaign photograph passing behind the glass capsule */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%] xl:w-[47%] bg-[#EAE4DC]">
        <Link
          to="/coleccion"
          data-cursor="EXPLORAR"
          aria-label="Explorar colección CH. Chiara Bags"
          className="block w-full h-full overflow-hidden relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
        >
          <motion.img
            src={heroEditorialImg}
            alt="Campaña editorial CH. Chiara Bags con cartera estructurada negra"
            width={1200}
            height={800}
            style={{ y: imageY, scale: imageScale }}
            className="w-full h-full object-cover object-[76%_18%] will-change-transform"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </Link>
      </div>

      {/* Full-width content container */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-20">
        <div className="lg:w-[50%] xl:w-[49%] flex flex-col items-start">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5 md:mb-6">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#D90429] text-[#F6F4EF] text-[11px] font-semibold tracking-[0.08em] uppercase">
                15% OFF Transferencia
              </span>
              <span className="text-xs text-[#5A5550]">3 cuotas sin interés</span>
            </div>

            <h1 className="display-heading text-[2.7rem] sm:text-[3.6rem] xl:text-[4.85rem] font-semibold text-[#121212] mb-5 md:mb-6 max-w-xl">
              {BRAND_INFO.heroHeadline}
            </h1>

            <p className="text-[14px] md:text-[15px] text-[#5A5550] leading-relaxed max-w-md mb-7">
              {BRAND_INFO.descriptor}. Curaduría multimarca elegida en Córdoba: Gabriana, Good
              Company, Cruz de la Rosa, Ruggeri Bags y Ona Saez.
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-9 lg:mb-12">
              <Link
                to="/coleccion"
                className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-colors active:scale-[0.97]"
              >
                <span>Ver colección</span>
                <ArrowDownRight className="w-4 h-4" strokeWidth={1.6} />
              </Link>

              <Link
                to="/retiros#pedido-especial"
                className="editorial-link min-h-[44px] inline-flex items-center px-1 text-[13px] font-medium text-[#121212] hover:text-[#D90429] transition-colors"
              >
                Pedido especial
              </Link>
            </div>
          </motion.div>

          {/* Mobile-first vertical campaign photograph right below headline/CTA */}
          <div className="lg:hidden w-full mb-8">
            <Link
              to="/coleccion"
              aria-label="Explorar colección"
              className="block w-full aspect-[4/5] bg-[#EAE4DC] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
            >
              <img
                src={heroEditorialImg}
                alt="Campaña editorial CH. Chiara Bags con cartera estructurada negra"
                width={1200}
                height={800}
                className="w-full h-full object-cover object-[76%_18%]"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Two featured pieces floating cleanly on canvas with uncropped handles */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full grid grid-cols-2 gap-4 sm:gap-6 max-w-xl"
          >
            {HERO_FEATURED_PRODUCTS.map((product) => {
              const price =
                priceMode === 'transfer' ? product.transferPrice : product.listPrice;
              return (
                <article key={product.id} className="group">
                  <Link
                    to={`/coleccion/${product.slug}`}
                    data-cursor="VER PIEZA"
                    aria-label={`Ver ${product.name}`}
                    className="block w-full aspect-[4/5] bg-[#EAE4DC] p-3 sm:p-4 overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                  >
                    <img
                      src={product.studioImage}
                      alt={product.name}
                      width={750}
                      height={1000}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                    />
                    <img
                      src={product.lifestyleImage}
                      alt={`${product.name} detalle`}
                      width={750}
                      height={1000}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                      loading="eager"
                      decoding="async"
                    />
                  </Link>

                  <Link
                    to={`/coleccion/${product.slug}`}
                    className="mt-1.5 w-full min-h-[44px] flex flex-col justify-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-sm"
                  >
                    <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#5A5550]">
                      {product.brand}
                    </p>
                    <div className="flex items-baseline justify-between gap-2 mt-0.5">
                      <span className="font-serif text-[15px] sm:text-base text-[#121212] group-hover:text-[#D90429] transition-colors truncate">
                        {product.name}
                      </span>
                      <span className="tabular-nums text-xs sm:text-[13px] font-medium text-[#121212] shrink-0">
                        {formatArs(price)}
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
