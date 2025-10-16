import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function CategoriesDrawer({
  open,
  onOpenChange,
  categories,
  selectedCategory,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  categories: string[];
  selectedCategory: string | null;
  onSelect: (cat: string | null) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="max-h-[65vh] overflow-auto px-4 py-2">
          <button
            className={cn(
              "w-full text-left px-3 py-3 rounded-md border mb-2",
              selectedCategory === null
                ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
            )}
            onClick={() => onSelect(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={cn(
                "w-full text-left px-3 py-3 rounded-md border mb-2",
                selectedCategory === c
                  ? "bg-[hsl(var(--brand-end))] text-white border-transparent"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
              )}
              onClick={() => onSelect(selectedCategory === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
