import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  destination: string;
  label?: string;
  className?: string;
  size?: "sm" | "xs";
};

/**
 * Opens Google Maps directions from the user's current location to the destination.
 * Works inside sandboxed preview iframes by escaping to the top window when needed.
 */
export function DirectionsButton({ destination, label, className, size = "xs" }: Props) {
  const query = `${destination} Singapore`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    query
  )}&travelmode=transit`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Try opening a new tab first
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return;
    // Fallback for sandboxed iframes (preview): break out of the frame
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = url;
        return;
      }
    } catch {
      /* cross-origin top — fall through */
    }
    // Last resort: navigate current window
    window.location.href = url;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Directions to ${destination}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-muted-foreground font-semibold transition-all shadow-soft cursor-pointer",
        size === "xs" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        className
      )}
    >
      <Navigation className={size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3"} />
      {label ?? "Directions"}
    </button>
  );
}
