import { useState } from "react";
import { TimelineItem } from "@/data/itinerary";
import { MrtRoute } from "./MrtRoute";
import { DirectionsButton } from "./DirectionsButton";
import { cn } from "@/lib/utils";
import {
  Train, Sparkles, Utensils, Trees, ShoppingBag, BedDouble,
  Hotel, Ticket, Waves, Stars, ChevronDown, ChevronUp,
  AlertTriangle, Check, MapPin
} from "lucide-react";

const ICONS = {
  transport: Train,
  show: Sparkles,
  food: Utensils,
  nature: Trees,
  shopping: ShoppingBag,
  rest: BedDouble,
  hotel: Hotel,
  ticket: Ticket,
  beach: Waves,
  sparkle: Stars,
} as const;

type Props = {
  item: TimelineItem;
  showTransit: boolean;
  done: boolean;
  onToggleDone: () => void;
};

export function TimelineCard({ item, showTransit, done, onToggleDone }: Props) {
  const hasTransit = item.transit && item.transit.length > 0;
  // Routes default collapsed (mobile-friendly), places stay expanded
  const [open, setOpen] = useState(!hasTransit);
  const Icon = ICONS[item.icon ?? "transport"];

  return (
    <div className="relative pl-10 md:pl-14 pb-6 group animate-fade-in">
      {/* timeline rail */}
      <div className="absolute left-3 md:left-5 top-2 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent" />
      {/* node */}
      <div
        className={cn(
          "absolute left-0 top-1 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-border shadow-soft transition-transform group-hover:scale-110",
          done && "bg-primary text-primary-foreground border-transparent",
          !done && item.highlight && "bg-gradient-highlight text-white border-transparent",
          !done && !item.highlight && "bg-card text-primary"
        )}
      >
        {done ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />}
      </div>

      {/* Reminder banner */}
      {item.reminder && (
        <div className="mb-2 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive px-3 py-2 flex items-start gap-2 animate-fade-in">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="text-xs font-semibold leading-snug">
            <span className="uppercase tracking-wider text-[10px] block opacity-80">Reminder</span>
            {item.reminder}
          </div>
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl border bg-gradient-card p-4 md:p-5 transition-all",
          done && "opacity-60",
          item.highlight
            ? "border-highlight/40 shadow-card glow-highlight"
            : "border-border shadow-soft hover:shadow-card"
        )}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 font-display font-bold text-base md:text-lg tracking-tight text-foreground">
                <span className="text-muted-foreground/70 text-xs md:text-sm">⏰</span>
                {item.time}
              </span>
              {item.highlight && item.highlightLabel && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-highlight text-white shadow-soft">
                  <Sparkles className="w-2.5 h-2.5" /> {item.highlightLabel}
                </span>
              )}
              {item.optional && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Optional
                </span>
              )}
            </div>
            <h4 className={cn("mt-0.5 font-display font-semibold text-foreground text-[15px] md:text-base", done && "line-through")}>
              {item.title}
            </h4>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            )}
            {!hasTransit && (
              <div className="mt-3 flex flex-wrap gap-2">
                <DirectionsButton
                  destination={item.title}
                  url={item.mapsUrl}
                  label={item.mapsUrl ? "Open in Maps" : "Get directions"}
                  size="sm"
                />
                {item.mapsUrl && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.title + " Singapore")}&travelmode=transit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-primary px-2 py-1 rounded-md hover:bg-muted transition no-underline"
                  >
                    <MapPin className="w-3 h-3" /> Directions
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {hasTransit && showTransit && (
              <button
                onClick={() => setOpen(o => !o)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition"
                aria-label="Toggle route"
              >
                {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {open ? "Hide" : "Show"} Route
              </button>
            )}
            <button
              onClick={onToggleDone}
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition",
                done
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              )}
              aria-pressed={done}
            >
              {done ? "✓ Done" : "Mark done"}
            </button>
          </div>
        </div>

        {hasTransit && showTransit && open && (
          <div className="mt-4 animate-slide-down">
            <MrtRoute legs={item.transit!} />
          </div>
        )}
      </div>
    </div>
  );
}
