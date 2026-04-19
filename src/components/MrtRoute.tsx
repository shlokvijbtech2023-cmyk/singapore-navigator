import { ArrowDown, Footprints, TrainFront, Bus, Repeat } from "lucide-react";
import { TransitLeg, MrtLine, LINE_META } from "@/data/itinerary";
import { cn } from "@/lib/utils";

const lineColorVar: Record<MrtLine, string> = {
  purple: "var(--mrt-purple)",
  yellow: "var(--mrt-yellow)",
  red: "var(--mrt-red)",
  blue: "var(--mrt-blue)",
  green: "var(--mrt-green)",
  monorail: "var(--mrt-monorail)",
  bus: "var(--mrt-bus)",
  walk: "var(--muted-foreground)",
};

const lineTextOnColor: Record<MrtLine, string> = {
  purple: "white",
  yellow: "black",
  red: "white",
  blue: "white",
  green: "white",
  monorail: "white",
  bus: "white",
  walk: "white",
};

function StationNode({ name, interchange }: { name: string; interchange?: boolean }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="relative">
        <div
          className={cn(
            "w-4 h-4 rounded-full bg-card border-2 border-foreground/80 shadow-mrt transition-all",
            interchange && "w-5 h-5 ring-2 ring-highlight ring-offset-2 ring-offset-background animate-pulse-glow"
          )}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-display font-semibold text-sm md:text-base text-foreground">
          {name}
        </span>
        {interchange && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-highlight/15 text-highlight border border-highlight/30">
            <Repeat className="w-2.5 h-2.5" /> Interchange
          </span>
        )}
      </div>
    </div>
  );
}

function LineConnector({ leg }: { leg: TransitLeg }) {
  const isWalk = leg.line === "walk";
  const isBus = leg.line === "bus";
  const meta = LINE_META[leg.line];
  const color = `hsl(${lineColorVar[leg.line]})`;

  return (
    <div className="flex items-stretch gap-3 pl-1">
      {/* vertical colored bar */}
      <div className="relative w-4 flex justify-center">
        <div
          className={cn("w-1.5 rounded-full", isWalk && "border-l-2 border-dashed border-muted-foreground/50 bg-transparent w-0")}
          style={isWalk ? undefined : { backgroundColor: color }}
        />
        <ArrowDown
          className="absolute -bottom-1 w-3.5 h-3.5"
          style={{ color: isWalk ? "hsl(var(--muted-foreground))" : color }}
        />
      </div>
      <div className="flex-1 py-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
            style={{
              backgroundColor: isWalk ? "hsl(var(--muted))" : color,
              color: isWalk ? "hsl(var(--muted-foreground))" : lineTextOnColor[leg.line],
            }}
          >
            {isWalk ? <Footprints className="w-3 h-3" /> : isBus ? <Bus className="w-3 h-3" /> : <TrainFront className="w-3 h-3" />}
            {meta.short} · {meta.name}
          </span>
          {leg.stops != null && (
            <span className="text-xs font-semibold text-foreground/80">
              {leg.stops} {leg.stops === 1 ? "stop" : "stops"}
            </span>
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {leg.direction && <>Platform <span className="text-foreground/80 font-medium">{leg.direction}</span></>}
          {leg.note && <span>{leg.direction ? " · " : ""}{leg.note}</span>}
        </div>
      </div>
    </div>
  );
}

export function MrtRoute({ legs }: { legs: TransitLeg[] }) {
  // Build station list: from of leg0, to of every leg
  const stations: { name: string; interchange?: boolean }[] = [];
  legs.forEach((leg, i) => {
    if (i === 0) stations.push({ name: leg.from });
    const prev = stations[stations.length - 1];
    const isInterchange = !!legs[i + 1] && legs[i + 1].interchange && legs[i + 1].from === leg.to;
    if (prev.name !== leg.to) stations.push({ name: leg.to, interchange: isInterchange });
    else prev.interchange = prev.interchange || isInterchange;
  });

  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-4 md:p-5 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Route</span>
          <span className="h-px w-8 bg-border" />
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground">
          {legs.filter(l => l.line !== "walk").length} transit · {legs.filter(l => l.line === "walk").length} walk
        </span>
      </div>

      <div className="space-y-0">
        {stations.map((s, i) => (
          <div key={i}>
            <StationNode name={s.name} interchange={s.interchange} />
            {legs[i] && <LineConnector leg={legs[i]} />}
          </div>
        ))}
      </div>
    </div>
  );
}
