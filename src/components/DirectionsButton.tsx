import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  destination: string;
  /** Optional explicit URL — overrides destination (e.g. a maps.google.com link from data). */
  url?: string;
  label?: string;
  className?: string;
  size?: "sm" | "xs";
};

/**
 * Renders a real <a> tag (target=_blank) so it works inside sandboxed preview
 * iframes. No JS handlers — browsers always honor user-initiated link clicks.
 */
export function DirectionsButton({ destination, url, label, className, size = "xs" }: Props) {
  const href =
    url ??
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${destination} Singapore`
    )}&travelmode=transit`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={`Directions to ${destination}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-muted-foreground font-semibold transition-all shadow-soft no-underline",
        size === "xs" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        className
      )}
    >
      <Navigation className={size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3"} />
      {label ?? "Directions"}
    </a>
  );
}
