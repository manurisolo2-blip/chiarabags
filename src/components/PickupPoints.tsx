import { MapPin, Truck } from 'lucide-react';
import { PICKUP_POINTS } from '../data/products';

export function PickupPoints() {
  return (
    <section
      id="retiros"
      aria-label="Logística y puntos de retiro"
      className="py-16 md:py-28 px-5 md:px-10 max-w-[1440px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#5A5550] mb-4">
            Entregas y financiación
          </p>
          <h2 className="display-heading text-4xl sm:text-5xl font-semibold text-[#121212] mb-6">
            Retiros en mano y envíos a todo el país
          </h2>
          <p className="text-[15px] text-[#5A5550] leading-relaxed max-w-md mb-8">
            Coordinamos cada entrega de forma directa para que recibas tu cartera sin demoras y con
            la modalidad de pago que te quede más cómoda.
          </p>

          <div className="space-y-3 text-sm">
            <p className="text-[#75151E] font-medium">
              15% OFF abonando por transferencia bancaria
            </p>
            <p className="text-[#121212]">3 cuotas sin interés en todo el catálogo</p>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
          {PICKUP_POINTS.map((point) => (
            <div key={point.city} className="space-y-2.5">
              <div className="flex items-center gap-2 text-[#75151E]">
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.6} />
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase">
                  {point.timing}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#121212]">{point.city}</h3>
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
            <h3 className="font-serif text-2xl text-[#121212]">Envíos a todo el país</h3>
            <p className="text-sm text-[#5A5550] leading-relaxed">
              Despacho embalado con código de seguimiento hacia cualquier provincia de Argentina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
