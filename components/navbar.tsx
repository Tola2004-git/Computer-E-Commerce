"use client";

import { useEffect, useState, useRef } from "react";
import { Cpu, Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCartDrawer } from "@/components/cart-context";
import Link from "next/link";

const links = [
  { label: "Desktops", href: "/categories/desktops" },
  { label: "Laptops", href: "/categories/gaming-laptops" },
  { label: "keyboards", href: "/categories/mechanical-keyboards" },
  { label: "Audio", href: "/categories/monitors-audio" },
];

export function Navbar() {
  const [count, setCount] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const update = () => {
      try {
        const raw = localStorage.getItem("cart");
        const items = raw ? JSON.parse(raw) : [];
        const total = items.reduce((s: number, i: any) => s + (i.qty || 0), 0);
        setCount(total);
      } catch (e) {
        setCount(0);
      }
    };

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "cart") update();
    };
    const cartChangeHandler = () => update();

    update();
    window.addEventListener("storage", storageHandler);
    window.addEventListener("cartchange", cartChangeHandler);
    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("cartchange", cartChangeHandler);
    };
  }, []);

  const { openCart } = useCartDrawer();

  useEffect(() => {
    if (isMenuOpen) {
      // focus the close button for accessibility
      closeBtnRef.current?.focus();
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary glow-border">
            <Cpu className="size-5" />
          </span>
          <span className="font-mono text-lg font-bold tracking-widest text-primary glow-text">
            Computer Shop
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative ml-auto hidden w-full max-w-xs md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search components, rigs..."
            className="h-9 border-input bg-secondary/60 pl-9"
            aria-label="Search products"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Open cart"
            onClick={openCart}
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="size-5" />
        </Button>

        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 transition-opacity duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <aside
              className="h-full w-full max-w-xs bg-card/95 dark:bg-card/95 p-4 shadow-xl transform transition-transform duration-200 border-l border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end">
                <button
                  ref={closeBtnRef}
                  aria-label="Close menu"
                  title="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md bg-black/10 dark:bg-white/10 border border-border text-foreground hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform transform hover:scale-105"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}
