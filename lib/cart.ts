import type { Product } from "@/lib/products"

export type CartItem = Product & { qty: number }
const CART_KEY = "cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    window.dispatchEvent(new Event("cartchange"))
  } catch {
    // ignore localStorage failures
  }
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart()
  const existing = cart.find((item) => item.id === product.id)
  const nextCart = existing
    ? cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
      )
    : [...cart, { ...product, qty: 1 }]
  saveCart(nextCart)
  return nextCart
}

export function removeCartItem(id: string): CartItem[] {
  const cart = getCart().filter((item) => item.id !== id)
  saveCart(cart)
  return cart
}

export function updateCartItemQty(id: string, delta: number): CartItem[] {
  const cart = getCart()
  const nextCart = cart
    .map((item) =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
    )
    .filter((item) => item.qty > 0)
  saveCart(nextCart)
  return nextCart
}
