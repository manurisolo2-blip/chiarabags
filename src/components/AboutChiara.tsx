import { motion, useReducedMotion } from 'framer-motion';
import sobreChiara1Img from '../assets/images/lifestyle/sobre-chiara-1.jpg';
import sobreChiara2Img from '../assets/images/lifestyle/sobre-chiara-2.jpg';
import { BRAND_INFO, CURATED_BRANDS } from '../data/products';

export function AboutChiara() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="curaduria"
      aria-label="Sobre Chiara"
      className="w-full px-6 md:px-10 lg:px-12 py-12 md:py-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-4">
            Sobre CH
          </p>

          <h1 className="display-heading text-4xl sm:text-5xl xl:text-6xl font-semibold text-[#121212] mb-8">
            Curaduría en primera persona
          </h1>

          <div className="space-y-5 text-[15px] md:text-base text-[#5A5550] leading-[1.72]">
            {BRAND_INFO.manifestoParagraphs.map((paragraph, idx) => (
              <p key={idx} className={idx === 2 ? 'text-[#121212] font-medium' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-4">
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#5A5550] mb-3">
              Marcas seleccionadas en tienda
            </p>
            <p className="font-serif text-xl md:text-2xl text-[#121212] leading-snug">
              {CURATED_BRANDS.join(' · ')}
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-7 grid grid-cols-12 gap-5 md:gap-8 items-start">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-7 bg-[#EAE4DC] aspect-[4/5] overflow-hidden"
          >
            <img
              src={sobreChiara1Img}
              alt="Selección curada de carteras de cuero en tonos negro, suela y nude"
              width={750}
              height={1000}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-5 pt-14 md:pt-24"
          >
            <div className="bg-[#EAE4DC] aspect-[4/5] overflow-hidden">
              <img
                src={sobreChiara2Img}
                alt="Detalle de costuras, textura graneada y herrajes"
                width={750}
                height={1000}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-3 text-xs text-[#5A5550] leading-relaxed">
              Revisión uno a uno de herrajes, cierres y capacidad real antes de sumar cada pieza.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
