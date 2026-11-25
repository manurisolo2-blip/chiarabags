import { useState } from 'react';
import { LookbookGrid } from '../components/LookbookGrid';
import { useStore } from '../context/StoreContext';
import { Category, PRODUCTS } from '../data/products';

export function ColeccionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todas');
  const { priceMode, setPriceMode } = useStore();

  return (
    <div className="w-full pt-32 md:pt-40 bg-[#F6F4EF]">
      <header className="w-full px-6 md:px-10 lg:px-12 mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-3">
            Catálogo curado · {PRODUCTS.length} piezas disponibles
          </p>
          <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-[#121212]">
            Colección actual
          </h1>
        </div>

        <p className="text-sm md:text-[15px] text-[#5A5550] max-w-md leading-relaxed">
          Alterná entre Precio Lista en 3 cuotas sin interés o 15% OFF abonando por transferencia.
          Cada pieza muestra su silueta completa sobre arena y detalle al pasar el cursor.
        </p>
      </header>

      <LookbookGrid
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        priceMode={priceMode}
        onPriceModeChange={setPriceMode}
      />
    </div>
  );
}
