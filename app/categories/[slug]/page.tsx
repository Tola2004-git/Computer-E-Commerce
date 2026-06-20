import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { CategoryProductGrid } from "@/components/category-product-grid";

const categoryMapping: Record<string, { title: string; description: string }> =
  {
    desktops: {
      title: "DESKTOPS",
      description: "Ready-to-use desktops",
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
  desktops: ["desktop-1", "desktop-2", "desktop-3", "desktop-4", "desktop-5"],
  "gaming-laptops": ["laptop-1", "laptop-2", "laptop-3", "laptop-4"],
  "mechanical-keyboards": [
    "keyboard-1",
    "keyboard-2",
    "keyboard-3",
    "keyboard-4",
    "keyboard-5",
  ],
  "monitors-audio": ["mouse-1", "mouse-2", "mouse-3", "mouse-5"],
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
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "")
      .replace(/s$/, "");

  const filteredProducts = products.filter((p) => {
    if (categoryProductIds.length > 0) return categoryProductIds.includes(p.id);
    return normalize(p.category) === normalize(category.title);
  });

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
        <CategoryProductGrid products={filteredProducts} />
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
