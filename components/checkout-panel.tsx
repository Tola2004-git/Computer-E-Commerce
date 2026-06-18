"use client";

import { ShieldCheck, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export type CartItem = Product & { qty: number };

export function CheckoutPanel({
  items,
  onRemove,
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  return (
    <aside className="rounded-xl border border-primary/30 bg-card p-5 glow-border">
      <h3 className="font-mono text-sm font-bold tracking-wide text-foreground">
        CHECKOUT SUMMARY
      </h3>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
            Your cart is empty. Add some gear!
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/40">
                <img
                  src={
                    item.img ? (item.img.startsWith("/") ? item.img : `/${item.img}`) : "/placeholder.svg"
                  }
                  alt={item.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {item.qty} × ${item.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name}`}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="size-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="my-4 h-px bg-border" />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-mono text-foreground">
            ${subtotal.toLocaleString()}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="flex items-center gap-1.5 text-muted-foreground">
            <Truck className="size-3.5" /> Shipping
          </dt>
          <dd className="font-mono text-foreground">${shipping}</dd>
        </div>
        <div className="flex justify-between pt-1">
          <dt className="font-semibold text-foreground">Total</dt>
          <dd className="font-mono text-lg font-bold text-primary glow-text">
            ${total.toLocaleString()}
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-wide text-primary">
            KHQR PAYMENT
          </span>
          <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary">
            BAKONG
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Scan with any Bakong-enabled banking app to pay.
        </p>
        <div className="mx-auto mt-3 w-fit rounded-lg border border-border bg-background p-2">
          <img
            src="/khqr.png"
            alt="Bakong KHQR payment code"
            className="size-32 rounded"
          />
        </div>
        <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
          Amount:{" "}
          <span className="text-foreground">${total.toLocaleString()} USD</span>
        </p>
      </div>

      <Button
        className="mt-4 h-11 w-full glow-border"
        disabled={items.length === 0}
      >
        CONFIRM ORDER
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 text-primary" />
        Secured by Bakong &middot; 256-bit encryption
      </p>
    </aside>
  );
}
