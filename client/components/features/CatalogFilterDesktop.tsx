import { cn } from "@/lib/utils";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

interface CatalogFilterDesktopProps {
  query: string;
  onQueryChange: (q: string) => void;
  allTags: string[];
  selectedTags: Set<string>;
  onTagsChange: (tags: Set<string>) => void;
  allCategories: string[];
  selectedCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  onScroll?: () => void;
}

export function CatalogFilterDesktop({
  query,
  onQueryChange,
  allTags,
  selectedTags,
  onTagsChange,
  allCategories,
  selectedCategory,
  onCategoryChange,
  onScroll,
}: CatalogFilterDesktopProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleTag = (tag: string) => {
    const next = new Set(selectedTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    onTagsChange(next);
  };

  const handleCategoryChange = (cat: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set("category", cat);
    else next.delete("category");
    setSearchParams(next, { replace: true });
    onCategoryChange(cat);
    onScroll?.();
  };

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
      <div className="bg-white">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Search
          </label>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 pr-9 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onQueryChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Tags above Categories */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Tags</h3>
            <button
              className="text-xs text-[hsl(var(--brand-end))] hover:underline"
              onClick={() => onTagsChange(new Set())}
              aria-label="Clear tag filters"
            >
              Clear
            </button>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = selectedTags.has(tag);
              return (
                <li key={tag}>
                  <button
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={cn(
                      "px-3 py-1 rounded-full border text-xs font-semibold transition",
                      active
                        ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                        : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
                    )}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-800">Categories</h3>
          <ul className="mt-3 rounded-lg border border-slate-300 overflow-hidden divide-y divide-slate-200">
            <li>
              <button
                onClick={() => handleCategoryChange(null)}
                aria-pressed={selectedCategory === null}
                className={cn(
                  "w-full text-left px-3 py-2 transition block",
                  selectedCategory === null
                    ? "bg-[hsl(var(--brand-end))] text-white"
                    : "bg-white text-slate-800 hover:bg-slate-50",
                )}
              >
                All
              </button>
            </li>
            {allCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <li key={cat}>
                  <button
                    onClick={() => {
                      handleCategoryChange(
                        selectedCategory === cat ? null : cat,
                      );
                    }}
                    aria-pressed={active}
                    className={cn(
                      "w-full text-left px-3 py-2 transition block",
                      active
                        ? "bg-[hsl(var(--brand-end))] text-white"
                        : "bg-white text-slate-800 hover:bg-slate-50",
                    )}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
