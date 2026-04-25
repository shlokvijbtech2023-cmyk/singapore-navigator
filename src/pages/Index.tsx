import { useEffect, useState } from "react";
import { DAYS } from "@/data/itinerary";
import { DayView } from "@/components/DayView";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plane, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sg-itinerary-done-v1";

const Index = () => {
  const [active, setActive] = useState(1);
  const [showTransit, setShowTransit] = useState(true);
  const [doneIds, setDoneIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(doneIds)));
    } catch {
      /* ignore */
    }
  }, [doneIds]);

  const day = DAYS.find(d => d.id === active)!;

  const toggleDone = (id: string) => {
    setDoneIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border">
        <div className="container py-3 md:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero text-white flex items-center justify-center shadow-soft">
              <Plane className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold tracking-tight text-base md:text-lg">Singapore · 5 Days</div>
              <div className="text-[11px] text-muted-foreground hidden sm:block">Visual itinerary · MRT routing · maps</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTransit(s => !s)}
              className={cn(
                "h-10 px-3 rounded-full border border-border bg-card hover:bg-muted text-xs font-semibold inline-flex items-center gap-1.5 shadow-soft transition",
                !showTransit && "text-muted-foreground"
              )}
            >
              {showTransit ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">MRT Routes</span>
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Top tabs (hidden on small screens — replaced by bottom nav) */}
        <nav className="container pb-3 -mt-1 overflow-x-auto hidden md:block">
          <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border min-w-min">
            {DAYS.map(d => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={cn(
                  "relative px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-display font-semibold whitespace-nowrap transition-all",
                  active === d.id
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 block leading-none">Day</span>
                <span className="text-base md:text-lg leading-tight">{d.id}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="container py-6 md:py-10">
        <DayView day={day} showTransit={showTransit} doneIds={doneIds} onToggleDone={toggleDone} />
      </main>

      <footer className="container py-10 text-center text-xs text-muted-foreground hidden md:block">
        Crafted for an unforgettable Singapore adventure ✨
      </footer>

      {/* Sticky bottom nav (mobile-first) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-5 gap-1 p-2 safe-area-inset">
          {DAYS.map(d => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 rounded-xl text-xs font-display font-semibold transition-all",
                active === d.id
                  ? "bg-gradient-hero text-white shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 leading-none">Day</span>
              <span className="text-base leading-tight mt-0.5">{d.id}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
