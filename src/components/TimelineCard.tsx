import { useState } from "react";
import { TimelineItem } from "@/data/itinerary";
import { MrtRoute } from "./MrtRoute";
import { DirectionsButton } from "./DirectionsButton";
import { cn } from "@/lib/utils";
import {
  Train, Sparkles, Utensils, Trees, ShoppingBag, BedDouble,
  Hotel, Ticket, Waves, Stars, ChevronDown, ChevronUp
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

export function TimelineCard({ item, showTransit }: { item: TimelineItem; showTransit: boolean }) {
  const [open, setOpen] = useState(true);
  const Icon = ICONS[item.icon ?? "transport"];
  const hasTransit = item.transit && item.transit.length > 0;

  return (
    <div className="relative pl-10 md:pl-14 pb-6 group">
      {/* timeline rail */}
      <div className="absolute left-3 md:left-5 top-2 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent" />
      {/* node */}
      <div
        className={cn(
          "absolute left-0 top-1 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-border shadow-soft transition-transform group-hover:scale-110",
          item.highlight ? "bg-gradient-highlight text-white border-transparent" : "bg-card text-primary"
        )}
      >
        <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
      </div>

      <div
        className={cn(
          "rounded-2xl border bg-gradient-card p-4 md:p-5 transition-all",
          item.highlight
            ? "border-highlight/40 shadow-card glow-highlight"
            : "border-border shadow-soft hover:shadow-card"
        )}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-base md:text-lg tracking-tight text-foreground">
                {item.time}
              </span>
              {item.highlight && item.highlightLabel && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-highlight text-white shadow-soft">
                  <Sparkles className="w-2.5 h-2.5" /> {item.highlightLabel}
                </span>
              )}
            </div>
            <h4 className="mt-0.5 font-display font-semibold text-foreground text-[15px] md:text-base">
              {item.title}
            </h4>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            )}
            {!hasTransit && (
              <div className="mt-2">
                <DirectionsButton destination={item.title} label="Get directions" size="sm" />
              </div>
            )}
          </div>
          {hasTransit && showTransit && (
            <button
              onClick={() => setOpen(o => !o)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition"
              aria-label="Toggle route"
            >
              {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              Route
            </button>
          )}
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
