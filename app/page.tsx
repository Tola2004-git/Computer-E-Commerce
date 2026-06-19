"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";
import { products as allProducts, type Product } from "@/lib/products";
import {
  FilterSidebar,
  initialFilterSelections,
  type FilterState,
} from "@/components/filter-sidebar";
import { CheckoutPanel, type CartItem } from "@/components/checkout-panel";
import { Footer } from "@/components/footer";

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    selectedFilters: initialFilterSelections,
    maxPrice: 2500,
  });

  const filteredProducts = allProducts.filter((product) => {
    const priceMatch = product.price <= filters.maxPrice;
    const selectionMatch = Object.values(filters.selectedFilters).every(
      (selectedItems) =>
        selectedItems.length === 0 ||
        selectedItems.some(
          (item) =>
            product.tags.includes(item) ||
            product.category === item ||
            product.name.includes(item),
        ),
    );

    return priceMatch && selectionMatch;
  });

  const resetFilters = () => {
    setFilters({
      selectedFilters: initialFilterSelections,
      maxPrice: 2500,
    });
  };

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) {
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} />
      <main>
        <Hero />
        <Categories />
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr_320px]">
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
            <div className="lg:sticky lg:top-20 lg:h-fit">
              <CheckoutPanel items={cart} onRemove={removeFromCart} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
