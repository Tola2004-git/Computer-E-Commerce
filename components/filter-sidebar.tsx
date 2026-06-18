"use client";

import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const filterGroups = [
  {
    title: "PROCESSOR",
    items: ["Intel Core i9", "Intel Core i7", "AMD Ryzen 9", "AMD Ryzen 7"],
  },
  {
    title: "GRAPHICS CARD",
    items: ["RTX 5090", "RTX 5080", "RTX 5070 Ti", "RTX 5070"],
  },
  { title: "COMPATIBILITY", items: ["Windows", "macOS", "Linux"] },
] as const;

export const initialFilterSelections = filterGroups.reduce<
  Record<string, string[]>
>((acc, group) => {
  acc[group.title] = [];
  return acc;
}, {});

export type FilterState = {
  selectedFilters: Record<string, string[]>;
  maxPrice: number;
};

type FilterSidebarProps = {
  selectedFilters: Record<string, string[]>;
  maxPrice: number;
  onChange: (state: FilterState) => void;
  onReset: () => void;
};

export function FilterSidebar({
  selectedFilters,
  maxPrice,
  onChange,
  onReset,
}: FilterSidebarProps) {
  const toggleFilter = (groupTitle: string, item: string) => {
    const currentGroup = selectedFilters[groupTitle] ?? [];
    const isSelected = currentGroup.includes(item);

    const nextFilters = {
      ...selectedFilters,
      [groupTitle]: isSelected
        ? currentGroup.filter((value) => value !== item)
        : [...currentGroup, item],
    };

    onChange({ selectedFilters: nextFilters, maxPrice });
  };

  return (
    <aside className="rounded-xl border border-border bg-card p-5">
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h3 className="font-mono text-sm font-bold tracking-wide text-foreground">
            FILTERS
          </h3>
        </div>
        <Button size="sm" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <fieldset key={group.title}>
            <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <span>{group.title}</span>
              {selectedFilters[group.title]?.length ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {selectedFilters[group.title].length}
                </span>
              ) : null}
            </legend>

            <div className="space-y-2.5">
              {group.items.map((item) => {
                const itemId = `${group.title}-${item}`;
                const isChecked = selectedFilters[group.title]?.includes(item);

                return (
                  <label
                    key={item}
                    htmlFor={itemId}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Checkbox
                      id={itemId}
                      checked={isChecked}
                      onChange={() => toggleFilter(group.title, item)}
                      className="border-input"
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <fieldset>
          <legend className="mb-3 font-mono text-xs font-semibold tracking-wide text-primary">
            MAX PRICE
          </legend>
          <input
            type="range"
            value={maxPrice}
            onChange={(e) =>
              onChange({
                selectedFilters,
                maxPrice: parseInt(e.target.value, 10),
              })
            }
            min={100}
            max={5000}
            step={50}
            aria-label="Maximum price"
            className="w-full h-1 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
          />
          <p className="mt-3 font-mono text-sm text-foreground">
            Up to{" "}
            <span className="font-bold text-primary">
              ${maxPrice.toLocaleString()}
            </span>
          </p>
        </fieldset>
      </div>
    </aside>
  );
}
