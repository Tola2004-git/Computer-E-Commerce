"use client";

import { Cpu, Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const links = ["Custom PCs", "Laptops", "Keyboards", "Audio"];

export function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary glow-border">
            <Cpu className="size-5" />
          </span>
          <span className="font-mono text-lg font-bold tracking-widest text-primary glow-text">
            Computer Shop
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link}
            </a>
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
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>
    </header>
  );
}
