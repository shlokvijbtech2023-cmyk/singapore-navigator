import { Day } from "@/data/itinerary";
import { TimelineCard } from "./TimelineCard";
import { MapPin } from "lucide-react";

export function DayView({ day, showTransit }: { day: Day; showTransit: boolean }) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-6 md:p-10 shadow-elevated">
        <div className="absolute inset-0 opacity-20"
             style={{ background: "radial-gradient(circle at 80% 0%, white, transparent 50%)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-white/15 backdrop-blur px-3 py-1 rounded-full">
            Day {day.id} of 5
          </div>
          <h1 className="mt-3 font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.05]">
            {day.title}
          </h1>
          <p className="mt-2 text-white/80 font-medium text-sm md:text-base">{day.subtitle}</p>
          <p className="mt-4 max-w-2xl text-white/70 text-sm md:text-base">{day.summary}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 mt-6">
        {/* Timeline */}
        <div className="space-y-8">
          {day.sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight">{section.label}</h2>
                <span className="text-xs font-semibold text-muted-foreground">{section.range}</span>
              </div>
              <div>
                {section.items.map((item, i) => (
                  <TimelineCard key={i} item={item} showTransit={showTransit} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky map */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-card">
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-sm">Day {day.id} Map</span>
            </div>
            <div className="aspect-square lg:aspect-[4/5] w-full bg-muted">
              <iframe
                title={`Map for Day ${day.id}`}
                src={day.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
