import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ClothingRailHero, type RailGarment } from '@/components/ui/product-rail-gallery';
import { useStore } from '@/context/StoreContext';
import {
  PRODUCTS,
  buildWhatsAppLink,
  formatArs,
  type Product,
} from '@/data/products';

const RAIL_CUTOUTS: Record<string, string> = {
  'bandolera-nala': '/bags/rail/bandolera-nala.png',
  'portacelular-mare-xl-natural': '/bags/rail/portacelular-mare-xl.png',
  'cartera-dalk': '/bags/rail/cartera-dalk.png',
  'bolso-adele-negro': '/bags/rail/bolso-adele-negro.png',
  'bandolera-tuner': '/bags/rail/bandolera-tuner.png',
  'sobre-felipa-negro': '/bags/rail/sobre-felipa-negro.png',
  'sobre-felipa-nude': '/bags/rail/sobre-felipa-nude.png',
};

function toRailItem(product: Product, priceMode: 'transfer' | 'list'): RailGarment {
  const cutout = RAIL_CUTOUTS[product.slug] ?? product.studioImage;
  const activePrice =
    priceMode === 'transfer' ? product.transferPrice : product.listPrice;

  return {
    id: product.slug,
    name: product.name,
    image: cutout,
    backImage: product.lifestyleImage,
    tag: formatArs(activePrice),
    description: `${formatArs(product.transferPrice)} con 15% OFF transferencia o 3 cuotas sin interés de ${formatArs(product.installmentAmount)} (${formatArs(product.listPrice)} lista). ${product.curatorialNote}`,
    details: [
      `Marca: ${product.brand}`,
      `Categoría: ${product.category}`,
      `Color: ${product.colorName}`,
      `Medidas: ${product.dimensions}`,
      product.material,
      product.strap,
      product.capacityNote,
    ],
    detailHref: `/coleccion/${product.slug}`,
    whatsappHref: buildWhatsAppLink(
      `Hola Chiara! Quiero consultar por ${product.name} (${formatArs(product.transferPrice)} transferencia / 3 cuotas de ${formatArs(product.installmentAmount)}).`
    ),
  };
}

export function ChiaraBagRail() {
  const navigate = useNavigate();
  const { priceMode } = useStore();

  const items = useMemo(
    () => PRODUCTS.map((product) => toRailItem(product, priceMode)),
    [priceMode]
  );

  return (
    <ClothingRailHero
      items={items}
      hanger="none"
      showSHook
      autoplay={false}
      headingAs="h1"
      eyebrow="CH. CHIARA · 15% OFF TRANSFERENCIA · 3 CUOTAS SIN INTERÉS"
      heading="Tu próxima cartera de todos los días"
      caption="Pasá el cursor sobre una cartera para verla de frente, deslizá el barral o hacé clic para verla en detalle."
      labels={{
        front: 'Frente',
        back: 'Dorso',
        close: 'Cerrar',
        show: 'Ver',
      }}
      onInspectDetail={(item) => {
        if (item.detailHref) {
          navigate(item.detailHref);
        }
      }}
      className="min-h-[92svh] w-full bg-[#F6F4EF] pt-24 text-[#121212] md:pt-28"
      action={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/coleccion"
            data-cursor="EXPLORAR"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#121212] px-6 py-2.5 text-sm font-medium text-[#F6F4EF] transition-colors hover:bg-[#D90429]"
          >
            <span>Explorar colección completa</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/retiros#pedido-especial"
            className="inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#121212] underline decoration-[#121212]/30 underline-offset-4 transition-colors hover:text-[#D90429] hover:decoration-[#D90429]"
          >
            Pedido especial y retiros
          </Link>
        </div>
      }
    />
  );
}
