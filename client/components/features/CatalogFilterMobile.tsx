import { CategoriesDrawer } from "./CategoriesDrawer";
import { TagsDrawer } from "./TagsDrawer";

interface CatalogFilterMobileProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: string | null;
  allCategories: string[];
  onCategoryChange: (cat: string | null) => void;
  selectedTags: Set<string>;
  allTags: string[];
  openCatSheet: boolean;
  setOpenCatSheet: (open: boolean) => void;
  openTagSheet: boolean;
  setOpenTagSheet: (open: boolean) => void;
  draftTags: Set<string>;
  setDraftTags: (tags: Set<string>) => void;
  onTagsApply: () => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams, options: { replace: boolean }) => void;
}

export function CatalogFilterMobile({
  query,
  onQueryChange,
  selectedCategory,
  allCategories,
  onCategoryChange,
  selectedTags,
  allTags,
  openCatSheet,
  setOpenCatSheet,
  openTagSheet,
  setOpenTagSheet,
  draftTags,
  setDraftTags,
  onTagsApply,
  searchParams,
  setSearchParams,
}: CatalogFilterMobileProps) {
  return (
    <>
      <div className="lg:hidden mb-6">
        <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 -mx-4 px-4 py-3">
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
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setOpenCatSheet(true)}
                className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 flex-1"
              >
                {selectedCategory ? (
                  <>
                    <span className="truncate">{selectedCategory}</span>
                    <span
                      className="ml-auto inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 w-5 h-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = new URLSearchParams(searchParams);
                        next.delete("category");
                        setSearchParams(next, { replace: true });
                        onCategoryChange(null);
                      }}
                      aria-label="Clear category"
                    >
                      ×
                    </span>
                  </>
                ) : (
                  <span>Categories</span>
                )}
              </button>

              <button
                onClick={() => {
                  setDraftTags(new Set(selectedTags));
                  setOpenTagSheet(true);
                }}
                className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 flex-1"
              >
                {selectedTags.size > 0 ? (
                  <>
                    <span className="truncate">
                      {Array.from(selectedTags)[0]}
                    </span>
                    {selectedTags.size > 1 && (
                      <span className="text-slate-500">
                        +{selectedTags.size - 1}
                      </span>
                    )}
                    <span
                      className="ml-auto inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 w-5 h-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryChange(null);
                      }}
                      aria-label="Clear tags"
                    >
                      ×
                    </span>
                  </>
                ) : (
                  <span>Tags</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CategoriesDrawer
        open={openCatSheet}
        onOpenChange={setOpenCatSheet}
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelect={(cat) => {
          const next = new URLSearchParams(searchParams);
          if (cat) next.set("category", cat);
          else next.delete("category");
          setSearchParams(next, { replace: true });
          onCategoryChange(cat);
          setOpenCatSheet(false);
        }}
      />

      <TagsDrawer
        open={openTagSheet}
        onOpenChange={setOpenTagSheet}
        allTags={allTags}
        draft={draftTags}
        setDraft={setDraftTags}
        onApply={onTagsApply}
      />
    </>
  );
}
