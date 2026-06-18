import { ArrowRight, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 grid-bg">
      <div
        className="pointer-events-none absolute -right-40 top-0 size-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.18 245) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        <div className="relative z-10 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Zap className="size-3.5" />
            Next-Gen Hardware In Stock
          </div>
          <h1 className="mt-6 text-balance font-mono text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            POWERED BY{" "}
            <span className="text-primary glow-text">NEXT-GEN AI</span> & GAMING
          </h1>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Engineer your perfect rig with elite components, instant
            compatibility checks, and showroom-grade RGB. Built for creators,
            gamers, and AI workloads.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 gap-2 px-6 glow-border">
              <Cpu className="size-4" />
              Build Your PC
            </Button>
            <Button variant="outline" size="lg" className="h-11 gap-2 px-6">
              Shop Laptops
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              { v: "50K+", l: "Rigs Built" },
              { v: "4.9/5", l: "Avg Rating" },
              { v: "24/7", l: "Pro Support" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-mono text-2xl font-bold text-foreground">
                  {s.v}
                </dt>
                <dd className="text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card glow-border animate-pop" style={{ animationDelay: "200ms" }}>
            <img
              src="/hero-pc.png"
              alt="Custom gaming PC case with electric blue RGB lighting"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-xl border border-border/60 bg-background/80 px-4 py-2 backdrop-blur-md">
              <p className="font-mono text-xs text-muted-foreground">
                FLAGSHIP BUILD
              </p>
              <p className="font-mono text-sm font-bold text-primary">
                TECHNEST APEX X9
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
