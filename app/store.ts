import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId: number) => {
        const items = get().items;
        const itemToRemove = items.find((item) => item.id === productId);

        if (itemToRemove && itemToRemove.quantity > 1) {
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          set({ items: items.filter((item) => item.id !== productId) });
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            item.price * (1 - item.discountPercentage / 100) * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
