import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AboutChiara } from '../components/AboutChiara';
import { CartDrawer, CartQuickCapsule } from '../components/CartDrawer';
import { CustomCursor } from '../components/CustomCursor';
import { FooterEspresso } from '../components/FooterEspresso';
import { GlassNavbar } from '../components/GlassNavbar';
import { HeroEditorial } from '../components/HeroEditorial';
import { LookbookGrid } from '../components/LookbookGrid';
import { PickupPoints } from '../components/PickupPoints';
import { Preloader } from '../components/Preloader';
import { ProductDrawer } from '../components/ProductDrawer';
import { SearchOverlay } from '../components/SearchOverlay';
import { SmoothScroll } from '../components/SmoothScroll';
import { CartItem, Category, PriceMode, Product } from '../data/products';

export function Page() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todas');
  const [priceMode, setPriceMode] = useState<PriceMode>('transfer');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasOverlayOpen = Boolean(selectedProduct || cartOpen || searchOpen);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll paused={hasOverlayOpen} />
      <Preloader />
      <CustomCursor />

      <GlassNavbar
        cartCount={totalCount}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <HeroEditorial
          priceMode={priceMode}
          onSelectProduct={setSelectedProduct}
        />

        <LookbookGrid
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          priceMode={priceMode}
          onPriceModeChange={setPriceMode}
          onSelectProduct={setSelectedProduct}
        />

        <AboutChiara />

        <PickupPoints />
      </main>

      <FooterEspresso />

      <CartQuickCapsule
        items={cart}
        priceMode={priceMode}
        hidden={hasOverlayOpen}
        onOpenCart={() => setCartOpen(true)}
      />

      <ProductDrawer
        product={selectedProduct}
        priceMode={priceMode}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={setSelectedProduct}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        items={cart}
        priceMode={priceMode}
        onPriceModeChange={setPriceMode}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <SearchOverlay
        open={searchOpen}
        priceMode={priceMode}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />
    </MotionConfig>
  );
}

export default Page;
