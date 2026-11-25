import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import sobreChiara1Img from '../assets/images/lifestyle/sobre-chiara-1.jpg';
import { FeaturedCarousel3D } from '../components/FeaturedCarousel3D';
import { ChiaraBagRail } from '../components/ChiaraBagRail';
import { BRAND_INFO, CURATED_BRANDS } from '../data/products';

export function HomePage() {
  return (
    <>
      <ChiaraBagRail />

      <FeaturedCarousel3D />

      {/* Editorial Curaduría Preview */}
      <section
        aria-label="Adelanto de curaduría"
        className="w-full px-6 md:px-10 lg:px-12 py-20 md:py-28 bg-[#EAE4DC]/45"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 bg-[#EAE4DC] aspect-[4/3] overflow-hidden">
            <img
              src={sobreChiara1Img}
              alt="Selección curada de carteras en CH. Chiara Bags"
              width={750}
              height={1000}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col items-start">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-4">
              Sobre CH · Córdoba, Argentina
            </p>

            <h2 className="display-heading text-4xl sm:text-5xl font-semibold text-[#121212] mb-6">
              Detrás de la tienda estoy yo, Chiara
            </h2>

            <p className="text-[15px] md:text-base text-[#5A5550] leading-relaxed max-w-xl mb-6">
              {BRAND_INFO.manifestoParagraphs[0]}
            </p>

            <p className="font-serif text-lg md:text-xl text-[#121212] mb-8">
              {CURATED_BRANDS.join(' · ')}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/sobre-ch"
                className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-colors active:scale-[0.97]"
              >
                <span>Leer historia completa</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
              </Link>

              <Link
                to="/retiros"
                className="editorial-link min-h-[44px] inline-flex items-center text-[13px] font-medium text-[#121212] hover:text-[#D90429] transition-colors"
              >
                Retiros en Córdoba &amp; envíos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
