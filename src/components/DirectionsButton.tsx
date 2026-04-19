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
 * Uses the universal Maps URL with `&dir_action=navigate` so mobile opens the app
 * and desktop opens Maps in browser. "Current location" is the default origin
 * when none is supplied.
 */
export function DirectionsButton({ destination, label, className, size = "xs" }: Props) {
  const query = `${destination} Singapore`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&travelmode=transit`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title={`Directions to ${destination}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-muted-foreground font-semibold transition-all shadow-soft",
        size === "xs" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        className
      )}
    >
      <Navigation className={size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3"} />
      {label ?? "Directions"}
    </a>
  );
}
