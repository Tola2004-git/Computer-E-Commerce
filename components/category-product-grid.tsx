"use client"

import Image from "next/image"
import { useCallback } from "react"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartDrawer } from "@/components/cart-context"
import type { Product } from "@/lib/products"
import { addToCart as addCartItem } from "@/lib/cart"

export function CategoryProductGrid({ products }: { products: Product[] }) {
  const { openCart } = useCartDrawer()

  const addToCart = useCallback(
    (product: Product) => {
      addCartItem(product)
      openCart()
    },
    [openCart],
  )

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="glow-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          style={{ animationDelay: "0ms" }}
        >
          <div className="relative aspect-square overflow-hidden bg-secondary/40">
            <Image
              src={product.img ? (product.img.startsWith("/") ? product.img : `/${product.img}`) : "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={65}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground backdrop-blur-md">
              {product.category}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border border-primary/30 bg-primary/10 text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-2 pt-4">
              <span className="font-mono text-lg font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              <Button
                size="default"
                className="w-full gap-1"
                onClick={() => addToCart(product)}
              >
                <Plus className="size-4" />
                ADD TO CART
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
