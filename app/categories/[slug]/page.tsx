import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const categoryMapping: Record<string, { title: string; description: string }> =
  {
    "custom-desktops": {
      title: "CUSTOM DESKTOPS",
      description: "Hand-built towers tailored to your performance needs",
    },
    "gaming-laptops": {
      title: "GAMING LAPTOPS",
      description: "Portable powerhouses for gaming on the go",
    },
    "mechanical-keyboards": {
      title: "MECHANICAL KEYBOARDS",
      description: "Tactile precision for the ultimate typing experience",
    },
    "monitors-audio": {
      title: "MONITORS & AUDIO",
      description: "Immersive output devices for your setup",
    },
  };

const categoryProducts: Record<string, string[]> = {
  "custom-desktops": ["apex-x9"],
  "gaming-laptops": ["blade-16"],
  "mechanical-keyboards": ["vortex-tkl"],
  "monitors-audio": ["flux-pro"],
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryMapping[slug];

  if (!category) {
    notFound();
  }

  const categoryProductIds = categoryProducts[slug] || [];
  const filteredProducts = products.filter((p) =>
    categoryProductIds.includes(p.id),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-sm font-medium text-primary">
            / {slug.toUpperCase().replace("-", " ")}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glow-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={
                      product.img
                        ? product.img.startsWith("/")
                          ? product.img
                          : `/${product.img}`
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-mono font-bold tracking-wide">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-mono text-lg font-bold">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      className="rounded-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No products available in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
