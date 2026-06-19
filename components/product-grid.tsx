"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function ProductGrid({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-sm font-medium text-primary">
            / JUST LANDED
          </p>
          <h2 className="mt-1 text-balance font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            New Arrivals
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
      </div>
      {products.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No products match your current filters. Try lowering the max price or
          clearing selections.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="glow-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              style={{ animationDelay: "0ms" }}
            >
              <div className="relative aspect-square overflow-hidden bg-secondary/40">
                <Image
                  src={p.img ? (p.img.startsWith("/") ? p.img : `/${p.img}`) : "/placeholder.svg"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  quality={65}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i < 6 ? "eager" : "lazy"}
                  priority={i < 6}
                />
                <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground backdrop-blur-md">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-primary/30 bg-primary/10 text-primary"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-2 pt-4">
                  <span className="font-mono text-lg font-bold text-foreground">
                    ${p.price.toLocaleString()}
                  </span>
                  <Button
                    size="default"
                    className="w-full gap-1"
                    onClick={() => onAdd(p)}
                  >
                    <Plus className="size-4" />
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
