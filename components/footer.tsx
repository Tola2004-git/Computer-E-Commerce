import { Cpu } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: ["Custom PCs", "Gaming Laptops", "Keyboards", "Monitors & Audio"],
  },
  {
    title: "Support",
    links: ["Build Guides", "Warranty", "Track Order", "Contact"],
  },
  { title: "Company", links: ["About", "Careers", "Press", "Affiliates"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary glow-border">
                <Cpu className="size-5" />
              </span>
              <span className="font-mono text-lg font-bold tracking-widest text-primary glow-text">
                TECHNEST
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium custom PCs and elite peripherals engineered for gamers,
              creators, and AI builders.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold tracking-wide text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TECHNEST Systems. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
