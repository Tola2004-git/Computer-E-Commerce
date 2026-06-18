import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "CUSTOM DESKTOPS",
    desc: "Hand-built towers",
    img: "/cat-desktop.png",
    slug: "custom-desktops",
  },
  {
    title: "GAMING LAPTOPS",
    desc: "Portable powerhouses",
    img: "/cat-laptop.png",
    slug: "gaming-laptops",
  },
  {
    title: "MECHANICAL KEYBOARDS",
    desc: "Tactile precision",
    img: "/cat-keyboard.png",
    slug: "mechanical-keyboards",
  },
  {
    title: "MONITORS & AUDIO",
    desc: "Immersive output",
    img: "/cat-monitor.png",
    slug: "monitors-audio",
  },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-mono text-sm font-medium text-primary">
            / EXPLORE
          </p>
          <h2 className="mt-1 text-balance font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Categories
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.title}
            href={`/categories/${cat.slug}`}
            className="glow-hover group relative overflow-hidden rounded-xl border border-border bg-card animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={cat.img ? (cat.img.startsWith("/") ? cat.img : `/${cat.img}`) : "/placeholder.svg"}
                alt={cat.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-mono text-sm font-bold tracking-wide text-foreground">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
              <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
