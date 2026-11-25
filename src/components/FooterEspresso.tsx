import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { BRAND_INFO, buildWhatsAppLink } from '../data/products';
import { ChLogo } from './ChLogo';

export function FooterEspresso() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#261A17] text-[#F6F4EF] pt-20 pb-24 md:pb-14 px-6 md:px-10 lg:px-12">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="space-y-7 max-w-2xl">
            <Link to="/" aria-label="CH. Chiara Bags Inicio" className="inline-block">
              <ChLogo tone="light" size="lg" />
            </Link>
            <p className="display-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F6F4EF]">
              {BRAND_INFO.closingTagline}
            </p>
          </div>

          <div className="w-full max-w-sm">
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#E6D3CE] mb-3">
              Novedades de curaduría
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2.5 text-sm text-[#E6D3CE] py-3">
                <Check className="w-4 h-4 shrink-0 text-[#D90429]" strokeWidth={2} />
                <span>Listo. Te avisamos cuando ingresen piezas nuevas a tienda.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-[#F6F4EF]/10 rounded-full p-1.5">
                <label htmlFor="newsletter-email" className="sr-only">
                  Tu correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email para recibir ingresos"
                  className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm text-[#F6F4EF] placeholder:text-[#E6D3CE]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D3CE] rounded-full"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse al newsletter"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F6F4EF] text-[#121212] hover:bg-[#D90429] hover:text-[#F6F4EF] transition-colors active:scale-[0.95] shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
          <nav aria-label="Navegación pie de página" className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <Link
              to="/coleccion"
              className="min-h-[44px] inline-flex items-center py-2 text-[#F6F4EF]/90 hover:text-[#D90429] transition-colors"
            >
              Colección
            </Link>
            <Link
              to="/sobre-ch"
              className="min-h-[44px] inline-flex items-center py-2 text-[#F6F4EF]/90 hover:text-[#D90429] transition-colors"
            >
              Sobre CH
            </Link>
            <Link
              to="/retiros"
              className="min-h-[44px] inline-flex items-center py-2 text-[#F6F4EF]/90 hover:text-[#D90429] transition-colors"
            >
              Retiros y envíos
            </Link>
            <Link
              to="/retiros#pedido-especial"
              className="min-h-[44px] inline-flex items-center py-2 text-[#F6F4EF]/90 hover:text-[#D90429] transition-colors"
            >
              Pedido Especial
            </Link>
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#E6D3CE]">
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center py-2 hover:text-[#F6F4EF] transition-colors"
            >
              Instagram {BRAND_INFO.instagram}
            </a>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="min-h-[44px] inline-flex items-center py-2 hover:text-[#F6F4EF] transition-colors"
            >
              {BRAND_INFO.email}
            </a>
            <a
              href={buildWhatsAppLink('Hola Chiara! Te escribo desde la web de CH. Chiara Bags.')}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular-nums min-h-[44px] inline-flex items-center py-2 hover:text-[#F6F4EF] transition-colors"
            >
              WhatsApp {BRAND_INFO.whatsappDisplay}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#E6D3CE]/70">
          <p>CH. Chiara Bags · Carteras &amp; marroquinería</p>
          <p>Nueva Córdoba · Arroyito · Río Tercero · Envíos a todo el país</p>
        </div>
      </div>
    </footer>
  );
}
