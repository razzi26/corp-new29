import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  label?: string;
  className?: string;
}

export function LoadingIndicator({ label = "Loading", className }: LoadingIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-10", className)}>
      <span
        aria-hidden
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[hsl(var(--brand-start))]/30 border-t-[hsl(var(--brand-end))]"
      />
      <span className="text-sm font-medium text-slate-600" aria-live="polite">
        {label}
      </span>
    </div>
  );
}
