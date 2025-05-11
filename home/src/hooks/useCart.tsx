// import type { Design } from "@prisma/client"
// import { create } from "zustand"
// import { persist } from "zustand/middleware"

// export type CartItem = Design & {
//   customText: string
//   fromText: string
//   toText: string
//   quantity: number
//   price: number
// }

// interface CartState {
//   items: CartItem[]
//   addItem: (item: CartItem) => void
//   removeItem: (id: string) => void
//   updateQuantity: (id: string, quantity: number) => void
//   clearCart: () => void
// }

// export const useCartStore = create<CartState>()(
//   persist<CartState>(
//     (set, get) => ({
//       items: [],
//       addItem: (item: CartItem) => {
//         // Check if the item already exists in the cart
//         const existingItem = get().items.find((i) => i.id === item.id)
//         if (existingItem) {
//           // Increase quantity if the item exists
//           set((state) => ({
//             items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
//           }))
//         } else {
//           // Add new item to the cart
//           set((state) => ({ items: [...state.items, item] }))
//         }
//       },
//       removeItem: (id: string) => {
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== id),
//         }))
//       },
//       updateQuantity: (id: string, quantity: number) => {
//         set((state) => ({
//           items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
//         }))
//       },
//       clearCart: () => {
//         set({ items: [] })
//       },
//     }),
//     {
//       name: "cart-storage", // Unique name for localStorage key
//     },
//   ),
// )

// hooks/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    thumbnailUrl: string;
    customText?: string;
    fromText?: string;
    toText?: string;
};

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist<CartState>(
        (set, get) => ({
            items: [],

            addItem: (item: CartItem) => {
                const existingItem = get().items.find((i) => i.id === item.id);
                if (existingItem) {
                    set((state) => ({
                        items: state.items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    }));
                } else {
                    set((state) => ({
                        items: [...state.items, item],
                    }));
                }
            },

            removeItem: (id: string) => {
                set((state) => ({

                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            updateQuantity: (id: string, quantity: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: "cart-storage", // localStorage key name
        }
    )
);
