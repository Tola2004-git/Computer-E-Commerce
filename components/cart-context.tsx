"use client"

import { createContext, useContext, useState } from "react"

type CartContextValue = {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  return (
    <CartContext.Provider value={{ isOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartDrawer() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartDrawer must be used within a CartProvider")
  }
  return context
}
