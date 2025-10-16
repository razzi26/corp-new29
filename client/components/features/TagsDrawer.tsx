import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function TagsDrawer({
  open,
  onOpenChange,
  allTags,
  draft,
  setDraft,
  onApply,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  allTags: string[];
  draft: Set<string>;
  setDraft: (s: Set<string>) => void;
  onApply: () => void;
}) {
  const toggle = (tag: string) => {
    setDraft(((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    }) as any);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Tags</SheetTitle>
        </SheetHeader>
        <div className="max-h-[55vh] overflow-auto px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <button
              className="text-sm text-[hsl(var(--brand-end))] hover:underline"
              onClick={() => setDraft(new Set())}
            >
              Clear all
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {allTags.map((tag) => {
              const active = draft.has(tag);
              return (
                <li key={tag}>
                  <button
                    onClick={() => toggle(tag)}
                    aria-pressed={active}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border text-sm font-semibold transition",
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
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={onApply}
            className="w-full inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-sm font-semibold shadow"
          >
            Show Results
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
