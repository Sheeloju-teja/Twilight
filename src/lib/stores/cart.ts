import { writable } from 'svelte/store';

export interface CartItem {
  item: { id: number; name: string; price: number };
  qty: number;
}

export const cart = writable<CartItem[]>([]);

export function addToCart(item: { id: number; name: string; price: number }) {
  cart.update(c => {
    const existing = c.find(ci => ci.item.id === item.id);
    if (existing) {
      existing.qty += 1;
      return [...c];
    } else {
      return [...c, { item, qty: 1 }];
    }
  });
}

export function removeFromCart(itemId: number) {
  cart.update(c => {
    const existing = c.find(ci => ci.item.id === itemId);
    if (existing) {
      if (existing.qty > 1) {
        existing.qty -= 1;
        return [...c];
      } else {
        return c.filter(ci => ci.item.id !== itemId);
      }
    }
    return c;
  });
}

export function clearCart() {
  cart.set([]);
}
