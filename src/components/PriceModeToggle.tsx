import { motion } from 'framer-motion';
import { PriceMode } from '../data/products';
import { FLUID_SPRING_SNAPPY } from '../utils/fluidPhysics';

interface PriceModeToggleProps {
  priceMode: PriceMode;
  onChange: (mode: PriceMode) => void;
}

export function PriceModeToggle({ priceMode, onChange }: PriceModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Modo de visualización de precio"
      className="w-full lg:w-auto grid grid-cols-2 lg:inline-flex items-center bg-[#EAE4DC] rounded-full p-1"
    >
      <button
        type="button"
        onClick={() => onChange('list')}
        aria-pressed={priceMode === 'list'}
        className={`relative min-h-[44px] flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs leading-[1.2] text-center whitespace-normal lg:whitespace-nowrap transition-[color,transform] duration-100 ease-out active:scale-[0.98] cursor-pointer ${
          priceMode === 'list' ? 'text-[#F6F4EF] font-medium' : 'text-[#5A5550] hover:text-[#121212]'
        }`}
      >
        {priceMode === 'list' && (
          <motion.span
            layoutId="global-price-pill"
            transition={FLUID_SPRING_SNAPPY}
            className="absolute inset-0 rounded-full bg-[#121212]"
          />
        )}
        <span className="relative z-10">Precio Lista (3 cuotas)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('transfer')}
        aria-pressed={priceMode === 'transfer'}
        className={`relative min-h-[44px] flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs leading-[1.2] text-center whitespace-normal lg:whitespace-nowrap transition-[color,transform] duration-100 ease-out active:scale-[0.98] cursor-pointer ${
          priceMode === 'transfer'
            ? 'text-[#F6F4EF] font-semibold'
            : 'text-[#B80322] hover:text-[#121212]'
        }`}
      >
        {priceMode === 'transfer' && (
          <motion.span
            layoutId="global-price-pill"
            transition={FLUID_SPRING_SNAPPY}
            className="absolute inset-0 rounded-full bg-[#D90429]"
          />
        )}
        <span className="relative z-10">Con 15% OFF Transferencia</span>
      </button>
    </div>
  );
}
