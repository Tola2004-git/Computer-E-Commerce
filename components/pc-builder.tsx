"use client";

import { useMemo, useState, type ElementType } from "react";
import { Cpu, MemoryStick, HardDrive, Box, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Option = { name: string; price: number; spec: string };
type Step = {
  key: string;
  label: string;
  icon: ElementType;
  options: Option[];
};

const steps: Step[] = [
  {
    key: "cpu",
    label: "Processor",
    icon: Cpu,
    options: [
      { name: "Intel Core i7-14700K", price: 399, spec: "20 cores" },
      { name: "Intel Core i9-14900K", price: 589, spec: "24 cores" },
      { name: "AMD Ryzen 9 7950X", price: 649, spec: "16 cores" },
    ],
  },
  {
    key: "gpu",
    label: "Graphics Card",
    icon: Box,
    options: [
      { name: "RTX 5070 Ti", price: 799, spec: "16GB" },
      { name: "RTX 5080", price: 1199, spec: "16GB" },
      { name: "RTX 5090", price: 1999, spec: "32GB" },
    ],
  },
  {
    key: "ram",
    label: "Memory",
    icon: MemoryStick,
    options: [
      { name: "32GB DDR5 6000MHz", price: 129, spec: "32GB" },
      { name: "64GB DDR5 6400MHz", price: 269, spec: "64GB" },
      { name: "128GB DDR5 6000MHz", price: 549, spec: "128GB" },
    ],
  },
  {
    key: "storage",
    label: "Storage",
    icon: HardDrive,
    options: [
      { name: "1TB NVMe Gen4", price: 99, spec: "1TB" },
      { name: "2TB NVMe Gen4", price: 179, spec: "2TB" },
      { name: "4TB NVMe Gen5", price: 399, spec: "4TB" },
    ],
  },
  {
    key: "case",
    label: "Case",
    icon: Box,
    options: [
      { name: "Stealth Mid Tower", price: 149, spec: "ATX" },
      { name: "Apex RGB Full Tower", price: 279, spec: "E-ATX" },
      { name: "Prism Panoramic", price: 349, spec: "E-ATX" },
    ],
  },
];

export function PcBuilder() {
  const [selected, setSelected] = useState<Record<string, number>>({
    cpu: 1,
    gpu: 1,
    ram: 0,
    storage: 1,
    case: 1,
  });

  const total = useMemo(
    () =>
      steps.reduce(
        (sum, step) => sum + step.options[selected[step.key]].price,
        0,
      ),
    [selected],
  );

  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="font-mono text-sm font-medium text-primary">
            / CONFIGURE
          </p>
          <h2 className="mt-1 text-balance font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Build Your Custom PC
          </h2>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Select your components and watch your build come to life in real
            time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      STEP {i + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {step.label}
                    </h3>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {step.options.map((opt, idx) => {
                      const active = selected[step.key] === idx;
                      return (
                        <button
                          key={opt.name}
                          onClick={() =>
                            setSelected((s) => ({ ...s, [step.key]: idx }))
                          }
                          className={cn(
                            "relative rounded-lg border p-3 text-left transition-all",
                            active
                              ? "border-primary bg-primary/10 glow-border"
                              : "border-border bg-secondary/40 hover:border-primary/40",
                          )}
                        >
                          {active && (
                            <Check
                              className="absolute right-2 top-2 size-4 text-primary"
                              aria-hidden="true"
                            />
                          )}
                          <p className="pr-5 text-sm font-medium text-foreground">
                            {opt.name}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {opt.spec}
                          </p>
                          <p className="mt-2 font-mono text-sm font-bold text-primary">
                            ${opt.price}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-xl border border-primary/30 bg-card p-5 glow-border">
              <h3 className="font-mono text-sm font-bold tracking-wide text-foreground">
                YOUR BUILD
              </h3>
              <div className="mt-4 space-y-2.5">
                {steps.map((step) => {
                  const opt = step.options[selected[step.key]];
                  return (
                    <div
                      key={step.key}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <span className="text-muted-foreground">{opt.name}</span>
                      <span className="shrink-0 font-mono text-foreground">
                        ${opt.price}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="my-4 h-px bg-border" />
              <div className="flex items-end justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Build
                </span>
                <span className="font-mono text-2xl font-bold text-primary glow-text">
                  ${total.toLocaleString()}
                </span>
              </div>
              <Button
                className="mt-4 h-11 w-full glow-border"
                onClick={() => {
                  console.log("Build added: ", selected, total);
                }}
              >
                Add Build to Cart
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
