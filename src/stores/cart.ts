import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number; // price_inr
  quantity: number;
  image: string;
}

interface CouponInfo {
  code: string;
  discountType: "flat" | "percent";
  discountValue: number;
}

interface CartState {
  items: CartItem[];
  coupon: CouponInfo | null;
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: CouponInfo) => void;
  removeCoupon: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Derived (computed on read — Zustand doesn't cache these, but it's fine for cart size)
  itemCount: () => number;
  subtotal: () => number;
  discount: () => number;
  deliveryFee: () => number;
  total: () => number;
}

const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isOpen: false,

      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
            isOpen: true,
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      discount: () => {
        const { coupon } = get();
        if (!coupon) return 0;
        const sub = get().subtotal();
        if (coupon.discountType === "flat") return Math.min(coupon.discountValue, sub);
        return Math.round((sub * coupon.discountValue) / 100);
      },

      deliveryFee: () => {
        const sub = get().subtotal();
        return sub >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      total: () => {
        const sub = get().subtotal();
        const disc = get().discount();
        const fee = get().deliveryFee();
        return Math.max(0, sub - disc + fee);
      },
    }),
    {
      name: "bittersweet-cart",
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    },
  ),
);
