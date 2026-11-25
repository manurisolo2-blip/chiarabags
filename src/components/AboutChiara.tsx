import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import sobreChiara1Img from '../assets/images/lifestyle/sobre-chiara-1.jpg';
import sobreChiara2Img from '../assets/images/lifestyle/sobre-chiara-2.jpg';
import { BRAND_INFO, CURATED_BRANDS, buildWhatsAppLink } from '../data/products';

export function AboutChiara() {
  const prefersReduced = useReducedMotion();
  const [modelIdea, setModelIdea] = useState('');
  const [colorOrSize, setColorOrSize] = useState('');
  const [budgetNote, setBudgetNote] = useState('');

  const buildConciergeText = () => {
    const details = [
      'Hola Chiara! Te escribo desde la web por un pedido especial.',
      modelIdea.trim() ? `Qué estoy buscando: ${modelIdea.trim()}` : 'Estoy buscando un modelo en particular.',
      colorOrSize.trim() ? `Color / tamaño: ${colorOrSize.trim()}` : null,
      budgetNote.trim() ? `Presupuesto o referencia: ${budgetNote.trim()}` : null,
    ].filter(Boolean);
    return details.join('\n');
  };

  const handleSubmitWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppLink(buildConciergeText()), '_blank', 'noopener,noreferrer');
  };

  const mailtoHref = `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
    'Pedido especial — CH. Chiara Bags',
  )}&body=${encodeURIComponent(buildConciergeText())}`;

  return (
    <section aria-label="Sobre Chiara y Búsqueda a Pedido" className="py-20 md:py-32">
      <div
        id="curaduria"
        className="px-5 md:px-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-36"
      >
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#5A5550] mb-4">
            Sobre CH
          </p>

          <h2 className="display-heading text-4xl sm:text-5xl font-semibold text-[#121212] mb-8">
            Curaduría en primera persona
          </h2>

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
            <p className="font-serif text-lg md:text-xl text-[#121212] leading-snug">
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

      <div id="pedido-especial" className="bg-[#261A17] text-[#F6F4EF] py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#E6D3CE] mb-4">
              Pedido Especial · Atención directa
            </p>
            <h2 className="display-heading text-4xl sm:text-5xl md:text-[3.4rem] font-semibold text-[#F6F4EF] mb-6">
              ¿Buscás algo en particular y no lo encontrás en la tienda?
            </h2>
            <p className="text-[15px] md:text-base text-[#E6D3CE]/90 leading-relaxed max-w-lg">
              Contame qué tenés en mente y te ayudo a buscarlo. Trabajamos con catálogos completos de
              Gabriana, Good Company, Cruz de la Rosa, Ruggeri Bags y Ona Saez, además de asesorarte
              con medidas y opciones para regalar.
            </p>
          </div>

          <form
            onSubmit={handleSubmitWhatsApp}
            className="lg:col-span-6 space-y-6 max-w-xl"
            aria-label="Formulario de búsqueda a pedido con Chiara"
          >
            <div>
              <label
                htmlFor="concierge-model"
                className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#E6D3CE] mb-2"
              >
                ¿Qué modelo o estilo estás buscando?
              </label>
              <input
                id="concierge-model"
                type="text"
                value={modelIdea}
                onChange={(e) => setModelIdea(e.target.value)}
                placeholder="Ej. Bandolera mediana con correa ancha, tote para notebook..."
                className="w-full bg-[#F6F4EF]/10 px-4 py-3.5 text-sm text-[#F6F4EF] placeholder:text-[#E6D3CE]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D3CE] focus:bg-[#F6F4EF]/15 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="concierge-color"
                  className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#E6D3CE] mb-2"
                >
                  Color o material
                </label>
                <input
                  id="concierge-color"
                  type="text"
                  value={colorOrSize}
                  onChange={(e) => setColorOrSize(e.target.value)}
                  placeholder="Negro, suela, bordo, natural..."
                  className="w-full bg-[#F6F4EF]/10 px-4 py-3.5 text-sm text-[#F6F4EF] placeholder:text-[#E6D3CE]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D3CE] focus:bg-[#F6F4EF]/15 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="concierge-budget"
                  className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#E6D3CE] mb-2"
                >
                  Ocasión o presupuesto
                </label>
                <input
                  id="concierge-budget"
                  type="text"
                  value={budgetNote}
                  onChange={(e) => setBudgetNote(e.target.value)}
                  placeholder="Uso diario, regalo, hasta $70.000..."
                  className="w-full bg-[#F6F4EF]/10 px-4 py-3.5 text-sm text-[#F6F4EF] placeholder:text-[#E6D3CE]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D3CE] focus:bg-[#F6F4EF]/15 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F6F4EF] text-[#121212] text-[13px] font-medium tracking-[0.04em] hover:bg-[#E6D3CE] transition-colors active:scale-[0.98] cursor-pointer"
              >
                <span>Hablar con Chiara por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
              </button>

              <a
                href={mailtoHref}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-3 text-[13px] text-[#E6D3CE] hover:text-[#F6F4EF] transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.6} />
                <span>Enviar por correo</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
