import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Truck } from 'lucide-react';
import { BRAND_INFO, PICKUP_POINTS, buildWhatsAppLink } from '../data/products';

export function PickupPoints() {
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
    <div id="retiros" className="w-full">
      <section
        aria-label="Logística y puntos de retiro"
        className="w-full px-6 md:px-10 lg:px-12 pb-20 md:pb-28"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-4">
              Entregas y financiación
            </p>
            <h1 className="display-heading text-4xl sm:text-5xl xl:text-6xl font-semibold text-[#121212] mb-6">
              Retiros en mano y envíos a todo el país
            </h1>
            <p className="text-[15px] text-[#5A5550] leading-relaxed max-w-md mb-8">
              Coordinamos cada entrega de forma directa para que recibas tu cartera sin demoras y con
              la modalidad de pago que te quede más cómoda.
            </p>

            <div className="space-y-3 text-sm">
              <p className="text-[#B80322] font-semibold">
                15% OFF abonando por transferencia bancaria
              </p>
              <p className="text-[#121212]">3 cuotas sin interés en todo el catálogo</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {PICKUP_POINTS.map((point) => (
              <div key={point.city} className="space-y-2.5">
                <div className="flex items-center gap-2 text-[#B80322]">
                  <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.7} />
                  <span className="text-[11px] font-medium tracking-[0.14em] uppercase">
                    {point.timing}
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-[#121212]">{point.city}</h2>
                <p className="text-sm text-[#5A5550] leading-relaxed">{point.detail}</p>
              </div>
            ))}

            <div className="space-y-2.5 bg-[#EAE4DC] p-6">
              <div className="flex items-center gap-2 text-[#121212]">
                <Truck className="w-4 h-4 shrink-0" strokeWidth={1.6} />
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase">
                  Correo y encomienda
                </span>
              </div>
              <h2 className="font-serif text-2xl text-[#121212]">Envíos a todo el país</h2>
              <p className="text-sm text-[#5A5550] leading-relaxed">
                Despacho embalado con código de seguimiento hacia cualquier provincia de Argentina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Concierge / Pedido Especial Block */}
      <section
        id="pedido-especial"
        aria-label="Pedido Especial"
        className="w-full bg-[#261A17] text-[#F6F4EF] py-20 md:py-28 px-6 md:px-10 lg:px-12"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
                className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F6F4EF] text-[#121212] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] hover:text-[#F6F4EF] transition-colors active:scale-[0.98] cursor-pointer"
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
      </section>
    </div>
  );
}
