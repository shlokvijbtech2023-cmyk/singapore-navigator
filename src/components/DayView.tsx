import { Day } from "@/data/itinerary";
import { TimelineCard } from "./TimelineCard";
import { MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

type Props = {
  day: Day;
  showTransit: boolean;
  doneIds: Set<string>;
  onToggleDone: (id: string) => void;
};

export function DayView({ day, showTransit, doneIds, onToggleDone }: Props) {
  const allItems = useMemo(
    () => day.sections.flatMap((s, si) => s.items.map((it, ii) => ({ id: `${day.id}-${si}-${ii}`, it }))),
    [day]
  );
  const total = allItems.length;
  const completed = allItems.filter(({ id }) => doneIds.has(id)).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="animate-fade-in">
      {/* Hero with image */}
      <div className="relative overflow-hidden rounded-3xl shadow-elevated">
        <img
          src={day.image}
          alt={`${day.title} — Singapore Day ${day.id}`}
          width={1280}
          height={640}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="relative p-6 md:p-10 text-white">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-white/15 backdrop-blur px-3 py-1 rounded-full">
            Day {day.id} of 5
          </div>
          <h1 className="mt-3 font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.05]">
            {day.title}
          </h1>
          <p className="mt-2 text-white/85 font-medium text-sm md:text-base">{day.subtitle}</p>
          <p className="mt-3 max-w-2xl text-white/75 text-sm md:text-base">{day.summary}</p>

          {/* Progress */}
          <div className="mt-5 max-w-md">
            <div className="flex items-center justify-between text-[11px] font-semibold text-white/80 mb-1.5">
              <span className="uppercase tracking-wider">Day Progress</span>
              <span>{completed}/{total} · {pct}%</span>
            </div>
            <Progress value={pct} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 mt-6">
        {/* Timeline */}
        <div className="space-y-8">
          {day.sections.map((section, si) => (
            <div key={si}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight">{section.label}</h2>
                <span className="text-xs font-semibold text-muted-foreground">{section.range}</span>
              </div>
              <div>
                {section.items.map((item, ii) => {
                  const id = `${day.id}-${si}-${ii}`;
                  return (
                    <TimelineCard
                      key={id}
                      item={item}
                      showTransit={showTransit}
                      done={doneIds.has(id)}
                      onToggleDone={() => onToggleDone(id)}
                    />
                  );
                })}
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
