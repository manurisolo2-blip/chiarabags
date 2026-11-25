import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { ChLogo } from './ChLogo';
import { scrollToSection } from './SmoothScroll';
import { FLUID_SPRING_SNAPPY } from '../utils/fluidPhysics';

interface GlassNavbarProps {
  cartCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

const MOBILE_LINKS = [
  { label: 'Colección', target: 'coleccion' },
  { label: 'Curaduría', target: 'curaduria' },
  { label: 'Retiros', target: 'retiros' },
  { label: 'Pedido Especial', target: 'pedido-especial' },
];

export function GlassNavbar({ cartCount, onOpenSearch, onOpenCart }: GlassNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = Boolean(useReducedMotion());

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    scrollToSection(target);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-40 flex flex-col items-center px-3 md:px-6 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className="liquid-glass pointer-events-auto w-full max-w-5xl rounded-full px-3 md:px-7 py-1.5 md:py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2"
      >
        {/* Left zone: Colección & Curaduría on desktop, menu toggle on mobile */}
        <div className="justify-self-start flex items-center">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#121212]/5 transition-[background-color,transform] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.6} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.6} />
            )}
          </button>

          <ul className="hidden md:flex items-center gap-7">
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('coleccion')}
                className="text-[13px] font-normal tracking-[0.02em] text-[#121212] hover:text-[#75151E] transition-[color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer py-2 whitespace-nowrap"
              >
                Colección
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('curaduria')}
                className="text-[13px] font-normal tracking-[0.02em] text-[#121212] hover:text-[#75151E] transition-[color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer py-2 whitespace-nowrap"
              >
                Curaduría
              </button>
            </li>
          </ul>
        </div>

        {/* Center zone: Stacked CH. CHIARA BAGS SVG logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="CH. Chiara Bags — Ir al inicio"
          className="justify-self-center min-h-[44px] flex items-center justify-center px-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-sm transition-[opacity,transform] duration-100 ease-out hover:opacity-80 active:scale-[0.97]"
        >
          <ChLogo size="sm" />
        </button>

        {/* Right zone: Retiros + Search + Bag */}
        <div className="justify-self-end flex items-center gap-0.5 md:gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('retiros')}
            className="hidden md:inline-block text-[13px] font-normal tracking-[0.02em] text-[#121212] hover:text-[#75151E] transition-[color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer py-2 px-1 whitespace-nowrap"
          >
            Retiros
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar carteras"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#75151E] hover:bg-[#121212]/5 transition-[color,background-color,transform] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir bolsa (${cartCount} ${cartCount === 1 ? 'pieza' : 'piezas'})`}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#75151E] hover:bg-[#121212]/5 transition-[color,background-color,transform] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={prefersReduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={prefersReduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                  className="tabular-nums absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#75151E] text-[#F6F4EF] text-[10px] font-medium flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -10, scale: 0.96, filter: 'blur(6px)' }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.96, filter: 'blur(6px)' }
            }
            transition={FLUID_SPRING_SNAPPY}
            className="liquid-glass origin-top pointer-events-auto md:hidden mt-2 w-full max-w-5xl rounded-3xl px-5 py-3"
          >
            <ul className="flex flex-col">
              {MOBILE_LINKS.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.target)}
                    className="w-full min-h-[44px] flex items-center text-left text-[15px] font-normal text-[#121212] hover:text-[#75151E] origin-left transition-[color,transform] duration-100 ease-out active:scale-[0.97] cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
