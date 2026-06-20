"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, ShoppingCart, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartDrawer } from "@/components/cart-context"
import { getCart, removeCartItem, updateCartItemQty, saveCart } from "@/lib/cart"
import type { Product } from "@/lib/products"

type CartItem = Product & { qty: number }

export function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer()
  const [items, setItems] = useState<CartItem[]>([])
  const [undoState, setUndoState] = useState<{ visible: boolean; prevCart: CartItem[] | null; timerId?: number }>({
    visible: false,
    prevCart: null,
  })
  const undoTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isOpen) return
    setItems(getCart())
  }, [isOpen])

  useEffect(() => {
    const handler = () => {
      if (isOpen) setItems(getCart())
    }
    window.addEventListener("cartchange", handler)
    return () => window.removeEventListener("cartchange", handler)
  }, [isOpen])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isOpen])

  const handleQtyChange = (id: string, delta: number) => {
    setItems(updateCartItemQty(id, delta))
  }

  const handleRemove = (id: string) => {
    const prev = getCart()
    setItems(removeCartItem(id))
    // show undo snackbar for 5s
    if (undoTimer.current) window.clearTimeout(undoTimer.current)
    const t = window.setTimeout(() => {
      setUndoState({ visible: false, prevCart: null })
      undoTimer.current = undefined
    }, 5000)
    undoTimer.current = t
    setUndoState({ visible: true, prevCart: prev, timerId: t })
  }

  const handleUndo = () => {
    if (!undoState.prevCart) return
    // restore previous cart
    saveCart(undoState.prevCart)
    setItems(undoState.prevCart)
    if (undoTimer.current) {
      window.clearTimeout(undoTimer.current)
      undoTimer.current = undefined
    }
    setUndoState({ visible: false, prevCart: null })
  }

  const router = useRouter()

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 0 ? 25 : 0
  const total = subtotal + shipping

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-end bg-black/40 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeCart}
    >
      <aside
        className={`relative h-full w-full max-w-md bg-background p-6 shadow-xl transition-transform duration-300 sm:w-[420px] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="size-5 text-primary" />
            Cart
          </div>
          <button aria-label="Close cart" onClick={closeCart} className="text-muted-foreground transition hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-secondary/50 p-6 text-center text-sm text-muted-foreground">
              Your cart is empty. Add some gear!
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="size-14 shrink-0 overflow-hidden rounded-2xl bg-secondary/40">
                    <img
                      src={item.img ? (item.img.startsWith("/") ? item.img : `/${item.img}`) : "/placeholder.svg"}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.qty} × ${item.price.toLocaleString()}</span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">
                        ${ (item.price * item.qty).toLocaleString() }
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (item.qty === 1 ? handleRemove(item.id) : handleQtyChange(item.id, -1))}
                        className="h-8 w-8 rounded-full"
                        aria-label={item.qty === 1 ? `Remove ${item.name}` : `Decrease quantity of ${item.name}`}
                        title={item.qty === 1 ? `Remove ${item.name}` : `Decrease ${item.name} quantity`}
                      >
                        -
                      </Button>
                      <span className="min-w-[2rem] text-center font-mono text-sm">{item.qty}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQtyChange(item.id, 1)}
                        className="h-8 w-8 rounded-full"
                        aria-label={`Increase quantity of ${item.name}`}
                        title={`Increase ${item.name} quantity`}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="mt-3 flex justify-between text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="size-4" /> Shipping
            </span>
            <span>${shipping}</span>
          </div>
          <div className="mt-4 flex justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        <Button className="mt-auto w-full h-12" disabled={items.length === 0} onClick={handleCheckout}>
          Checkout
        </Button>

        {undoState.visible && (
          <div className="absolute left-1/2 bottom-28 z-50 w-[90%] -translate-x-1/2 transform">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-3 shadow-md">
              <div className="text-sm text-muted-foreground">Item removed</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  className="rounded-md bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
                >
                  Undo
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between text-[10px] font-semibold text-primary">
            <span>KHQR PAYMENT</span>
            <span>BAKONG</span>
          </div>
          <p className="mt-2">Scan with any Bakong-enabled banking app to pay.</p>
          <div className="mx-auto my-4 w-fit rounded-2xl border border-border bg-background p-2">
            <img src="/khqr.png" alt="Bakong KHQR payment code" className="size-28 rounded-xl" />
          </div>
          <p className="text-center">Amount: ${total.toLocaleString()} USD</p>
        </div>
      </aside>
    </div>
  )
}
