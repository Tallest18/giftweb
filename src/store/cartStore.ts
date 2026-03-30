import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant, Order } from '../types';

interface CartStore {
  items: CartItem[];
  orders: Order[];
  currency: string;
  setCurrency: (c: string) => void;
  addItem: (p: Product, v?: ProductVariant) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleGiftWrap: (id: string) => void;
  clearCart: () => void;
  addOrder: (o: Order) => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getGiftWrapFee: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      currency: 'CAD',
      setCurrency: (c) => set({ currency: c }),
      addItem: (product, variant) => set(s => {
        const ex = s.items.find(i => i.product.id === product.id && i.selectedVariant?.id === variant?.id);
        if (ex) return { items: s.items.map(i => i.product.id === product.id && i.selectedVariant?.id === variant?.id ? { ...i, quantity: i.quantity + 1 } : i) };
        return { items: [...s.items, { product, quantity: 1, selectedVariant: variant }] };
      }),
      removeItem: id => set(s => ({ items: s.items.filter(i => i.product.id !== id) })),
      updateQuantity: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set(s => ({ items: s.items.map(i => i.product.id === id ? { ...i, quantity: qty } : i) }));
      },
      toggleGiftWrap: id => set(s => ({ items: s.items.map(i => i.product.id === id ? { ...i, giftWrap: !i.giftWrap } : i) })),
      clearCart: () => set({ items: [] }),
      addOrder: o => set(s => ({ orders: [o, ...s.orders] })),
      // All internal prices stored in CAD
      getSubtotal: () => get().items.reduce((sum, i) => sum + (i.product.price + (i.selectedVariant?.priceModifier || 0)) * i.quantity, 0),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getGiftWrapFee: () => get().items.filter(i => i.giftWrap).length * 5, // $5 CAD per item
    }),
    { name: 'giftly-cart' }
  )
);
