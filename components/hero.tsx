import { Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 grid-bg px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute -right-40 top-0 size-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.18 245) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
          <div className="relative z-10">
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
                Shop Now
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

          <div className="relative z-10">
            <div className="relative ">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-[500px] sm:h-[500px] lg:h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

