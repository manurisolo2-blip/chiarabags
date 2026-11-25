import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { CartDrawer, CartQuickCapsule } from '../components/CartDrawer';
import { CustomCursor } from '../components/CustomCursor';
import { FooterEspresso } from '../components/FooterEspresso';
import { GlassNavbar } from '../components/GlassNavbar';
import { Preloader } from '../components/Preloader';
import { SearchOverlay } from '../components/SearchOverlay';
import { SmoothScroll } from '../components/SmoothScroll';
import { StoreProvider, useStore } from '../context/StoreContext';
import { ColeccionPage } from '../pages/ColeccionPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { RetirosPage } from '../pages/RetirosPage';
import { SobreChPage } from '../pages/SobreChPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -96 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 120);
      return () => window.clearTimeout(timer);
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/coleccion" element={<ColeccionPage />} />
          <Route path="/coleccion/:slug" element={<ProductDetailPage />} />
          <Route path="/sobre-ch" element={<SobreChPage />} />
          <Route path="/retiros" element={<RetirosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const { cartOpen, searchOpen } = useStore();
  const hasOverlayOpen = cartOpen || searchOpen;

  return (
    <>
      <ScrollManager />
      <SmoothScroll paused={hasOverlayOpen} />
      <CustomCursor />
      <GlassNavbar />
      {/* Preloader renders after GlassNavbar so its z-50 curtain paints above navigation without editing Preloader.tsx */}
      <Preloader />

      <main className="w-full min-h-screen bg-[#F6F4EF]">
        <AnimatedRoutes />
      </main>

      <FooterEspresso />
      <CartQuickCapsule hidden={hasOverlayOpen} />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}

export function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default Page;
