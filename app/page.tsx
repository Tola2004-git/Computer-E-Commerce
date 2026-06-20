"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { ProductGrid } from "@/components/product-grid"
import { products as allProducts, type Product } from "@/lib/products"
import { addToCart as addCartItem } from "@/lib/cart"
import { useCartDrawer } from "@/components/cart-context"
import { FilterSidebar, initialFilterSelections, type FilterState } from "@/components/filter-sidebar"
import { Footer } from "@/components/footer"

export default function Page() {
  const [filters, setFilters] = useState<FilterState>({
    selectedFilters: initialFilterSelections,
    maxPrice: 2500,
  })

  const filteredProducts = allProducts.filter((product) => {
    const priceMatch = product.price <= filters.maxPrice
    const selectionMatch = Object.values(filters.selectedFilters).every(
      (selectedItems) =>
        selectedItems.length === 0 ||
        selectedItems.some(
          (item) =>
            product.tags.includes(item) ||
            product.category === item ||
            product.name.includes(item),
        ),
    )

    return priceMatch && selectionMatch
  })

  const { openCart } = useCartDrawer()

  const resetFilters = () => {
    setFilters({
      selectedFilters: initialFilterSelections,
      maxPrice: 2500,
    })
  }

  const addToCart = (product: Product) => {
    addCartItem(product)
    openCart()
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Categories />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="lg:sticky lg:top-20 lg:h-fit">
              <FilterSidebar
                selectedFilters={filters.selectedFilters}
                maxPrice={filters.maxPrice}
                onChange={setFilters}
                onReset={resetFilters}
              />
            </div>
            <div>
              <ProductGrid products={filteredProducts} onAdd={addToCart} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
