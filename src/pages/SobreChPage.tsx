import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AboutChiara } from '../components/AboutChiara';

export function SobreChPage() {
  return (
    <div className="w-full pt-24 md:pt-32 pb-16 bg-[#F6F4EF]">
      <AboutChiara />

      <div className="w-full px-6 md:px-10 lg:px-12 pt-8 pb-12 flex flex-wrap items-center gap-5">
        <Link
          to="/coleccion"
          className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-colors active:scale-[0.97]"
        >
          <span>Explorar piezas disponibles</span>
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
        </Link>

        <Link
          to="/retiros#pedido-especial"
          className="editorial-link min-h-[44px] inline-flex items-center text-[13px] font-medium text-[#121212] hover:text-[#D90429] transition-colors"
        >
          Pedir una búsqueda personalizada
        </Link>
      </div>
    </div>
  );
}
