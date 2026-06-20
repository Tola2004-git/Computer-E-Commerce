"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, saveCart, type CartItem } from "@/lib/cart";

export default function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(getCart());

    const handler = () => setItems(getCart());
    window.addEventListener("cartchange", handler);
    return () => window.removeEventListener("cartchange", handler);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (items.length === 0) return
    setLoading(true)
    // simulate payment processing
    await new Promise((res) => setTimeout(res, 900))
    // clear cart and navigate to success
    saveCart([])
    setLoading(false)
    router.push("/checkout/success")
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Checkout
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Complete your order
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Review your cart and payment details before placing your order.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6">
        <p className="text-sm text-muted-foreground">
          Checkout flow is ready. Add your payment form here or integrate your
          gateway.
        </p>

        <div className="mt-6 space-y-6">
          <div className="rounded-3xl border border-border bg-secondary/40 p-4">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty. Add products before checking out.
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="truncate">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium text-foreground">
                      ${(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            <div className="mt-4 flex justify-between text-lg font-semibold text-foreground">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              disabled={items.length === 0 || loading}
              onClick={handlePayment}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/60"
            >
              {loading ? "Processing..." : "Continue to payment"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Back to shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
