import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FLUID_SPRING_SNAPPY } from '../utils/fluidPhysics';
import { ChLogo } from './ChLogo';

const MOBILE_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Colección', to: '/coleccion' },
  { label: 'Sobre CH', to: '/sobre-ch' },
  { label: 'Retiros', to: '/retiros' },
  { label: 'Pedido Especial', to: '/retiros#pedido-especial' },
];

export function GlassNavbar() {
  const prefersReduced = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setSearchOpen, setCartOpen } = useStore();

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-50 flex flex-col items-center px-4 md:px-10 lg:px-12 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className="liquid-glass-nav pointer-events-auto w-full max-w-[1600px] rounded-full px-3.5 md:px-8 py-1.5 md:py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2"
      >
        {/* Left zone: Colección & Sobre CH on desktop, menu toggle on mobile */}
        <div className="justify-self-start flex items-center">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:bg-[#121212]/5 transition-[transform,background-color] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.6} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.6} />
            )}
          </button>

          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            <li>
              <NavLink
                to="/coleccion"
                className={({ isActive }) =>
                  `editorial-link inline-flex items-center min-h-[44px] text-[13px] font-medium tracking-[0.02em] transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#D90429]' : 'text-[#121212] hover:text-[#D90429]'
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive ? 'true' : undefined}>Colección</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sobre-ch"
                className={({ isActive }) =>
                  `editorial-link inline-flex items-center min-h-[44px] text-[13px] font-medium tracking-[0.02em] transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#D90429]' : 'text-[#121212] hover:text-[#D90429]'
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive ? 'true' : undefined}>Sobre CH</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Center zone: Crisp larger CH. CHIARA BAGS logo */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          aria-label="CH. Chiara Bags — Ir al inicio"
          className="justify-self-center min-h-[44px] flex items-center justify-center px-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-sm transition-[opacity,transform] duration-100 ease-out hover:opacity-85 active:scale-[0.97]"
        >
          <span className="hidden md:block">
            <ChLogo size="md" />
          </span>
          <span className="md:hidden scale-[1.08] origin-center">
            <ChLogo size="sm" />
          </span>
        </Link>

        {/* Right zone: Retiros + Search + Bag */}
        <div className="justify-self-end flex items-center gap-0.5 md:gap-4 lg:gap-6">
          <NavLink
            to="/retiros"
            className={({ isActive }) =>
              `editorial-link hidden md:inline-flex items-center min-h-[44px] text-[13px] font-medium tracking-[0.02em] transition-colors whitespace-nowrap px-1 ${
                isActive ? 'text-[#D90429]' : 'text-[#121212] hover:text-[#D90429]'
              }`
            }
          >
            {({ isActive }) => (
              <span data-active={isActive ? 'true' : undefined}>Retiros</span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setSearchOpen(true);
            }}
            aria-label="Buscar carteras"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#D90429] hover:bg-[#121212]/5 transition-[transform,colors,background-color] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.7} />
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setCartOpen(true);
            }}
            aria-label={`Abrir bolsa (${cartCount} ${cartCount === 1 ? 'pieza' : 'piezas'})`}
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#121212] hover:text-[#D90429] hover:bg-[#121212]/5 transition-[transform,colors,background-color] duration-100 ease-out active:scale-[0.94] cursor-pointer"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.7} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                  className="tabular-nums absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D90429] text-[#F6F4EF] text-[10px] font-semibold flex items-center justify-center"
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
                : { opacity: 0, y: -8, scale: 0.96, filter: 'blur(6px)' }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.96, filter: 'blur(6px)' }
            }
            transition={prefersReduced ? { duration: 0.18 } : FLUID_SPRING_SNAPPY}
            style={{ transformOrigin: 'top center' }}
            className="liquid-glass-nav pointer-events-auto md:hidden mt-2 w-full max-w-[1600px] rounded-3xl px-5 py-3"
          >
            <ul className="flex flex-col">
              {MOBILE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="w-full min-h-[44px] flex items-center text-left text-[15px] font-medium text-[#121212] hover:text-[#D90429] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
