export type MrtLine = "purple" | "yellow" | "red" | "blue" | "green" | "monorail" | "bus" | "walk";

export const LINE_META: Record<MrtLine, { name: string; short: string }> = {
  purple: { name: "North-East Line", short: "NE" },
  yellow: { name: "Circle Line", short: "CC" },
  red: { name: "North-South Line", short: "NS" },
  blue: { name: "Downtown Line", short: "DT" },
  green: { name: "East-West Line", short: "EW" },
  monorail: { name: "Sentosa Express", short: "SE" },
  bus: { name: "Mandai Shuttle Bus", short: "BUS" },
  walk: { name: "Walk", short: "WALK" },
};

export type TransitLeg = {
  line: MrtLine;
  from: string;
  to: string;
  direction?: string;
  stops?: number;
  interchange?: boolean;
  note?: string;
};

export type TimelineItem = {
  time: string;
  title: string;
  description?: string;
  icon?: "transport" | "show" | "food" | "nature" | "shopping" | "rest" | "hotel" | "ticket" | "beach" | "sparkle";
  highlight?: boolean;
  highlightLabel?: string;
  transit?: TransitLeg[];
};

export type Day = {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  mapEmbed: string;
  sections: { label: string; range: string; items: TimelineItem[] }[];
};

// Google Maps embed (search-based, no API key needed)
const mapFor = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const DAYS: Day[] = [
  {
    id: 1,
    title: "Old Town & Marina Magic",
    subtitle: "Clarke Quay · Chinatown · Gardens by the Bay",
    summary: "Heritage streets by morning, futuristic light shows by night.",
    mapEmbed: mapFor("Clarke Quay, Chinatown, Gardens by the Bay Singapore"),
    sections: [
      {
        label: "Morning",
        range: "8:00 AM – 2:30 PM",
        items: [
          { time: "8:00 AM", title: "Leave hotel", description: "Walk ~10 min to Clarke Quay for river views & photos.", icon: "hotel" },
          { time: "8:45 AM", title: "Walk to Chinatown", description: "Explore temples, street markets & shops (~1.5 hrs).", icon: "nature" },
          { time: "10:30 AM", title: "Brunch at Annalakshmi", description: "Cheap, soulful Indian vegetarian.", icon: "food" },
          { time: "11:30 AM", title: "Singapore Riverside Walk", description: "Stroll to Robertson Quay, relax at cafés.", icon: "nature" },
          { time: "2:30 PM", title: "Return to hotel · check-in & rest", icon: "rest" },
        ],
      },
      {
        label: "Evening",
        range: "4:30 PM – 10:30 PM",
        items: [
          {
            time: "4:30 PM",
            title: "Head to Gardens by the Bay",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "yellow", from: "Dhoby Ghaut", to: "Bayfront", direction: "towards Marina Bay", stops: 2, interchange: true },
              { line: "walk", from: "Bayfront MRT", to: "Gardens by the Bay", note: "Follow exit signs" },
            ],
          },
          { time: "5:00 PM", title: "Cloud Forest", description: "~45 min misty mountain experience.", icon: "nature" },
          { time: "5:45 PM", title: "Flower Dome", description: "~45 min seasonal blooms.", icon: "nature" },
          { time: "7:45 PM", title: "Supertree Light Show", description: "Garden Rhapsody at the Supertree Grove — must-watch.", icon: "show", highlight: true, highlightLabel: "Garden Rhapsody" },
          { time: "8:10 PM", title: "Marina Bay Walk", description: "Gardens → MBS → Helix Bridge → Merlion Park.", icon: "nature" },
          { time: "9:00 PM", title: "Spectra Light & Water Show", description: "Free outdoor show at Marina Bay Sands.", icon: "show", highlight: true, highlightLabel: "Spectra" },
          { time: "9:30 PM", title: "Dinner at Lau Pa Sat", description: "Iconic hawker centre — try satay street.", icon: "food" },
          {
            time: "10:30 PM",
            title: "Return to hotel",
            icon: "transport",
            transit: [
              { line: "walk", from: "Lau Pa Sat", to: "Raffles Place MRT", note: "~8–10 min walk" },
              { line: "red", from: "Raffles Place", to: "Dhoby Ghaut", direction: "towards Jurong East", stops: 1 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
              { line: "walk", from: "Clarke Quay MRT", to: "Hotel", note: "~10 min walk" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Mandai Wildlife Day",
    subtitle: "Zoo · River Wonders · Bird Paradise · Night Safari",
    summary: "A full day across Singapore's four wildlife parks, ending with the iconic Night Safari tram.",
    mapEmbed: mapFor("Mandai Wildlife Reserve Singapore"),
    sections: [
      {
        label: "All Day",
        range: "8:30 AM – 10:30 PM",
        items: [
          {
            time: "8:30 AM",
            title: "Leave hotel for Mandai",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "red", from: "Dhoby Ghaut", to: "Khatib", direction: "towards Jurong East", stops: 6, interchange: true },
              { line: "bus", from: "Khatib MRT", to: "Mandai Wildlife Reserve", note: "Mandai Shuttle Bus ~15–20 min" },
            ],
          },
          { time: "9:45 AM", title: "Singapore Zoo", description: "Explore major zones (~2–2.5 hrs).", icon: "nature", highlight: true, highlightLabel: "Open-concept Zoo" },
          { time: "12:15 PM", title: "River Wonders", description: "Panda zone + boat ride (~1.5–2 hrs).", icon: "nature" },
          { time: "2:00 PM", title: "Lunch break", description: "Mandai food court / quick meal.", icon: "food" },
          { time: "3:00 PM", title: "Bird Paradise", description: "Aviaries + bird shows (~2 hrs).", icon: "nature" },
          { time: "7:15 PM", title: "Night Safari entry", icon: "ticket" },
          { time: "7:45 PM", title: "Night Safari Tram Ride", description: "Main highlight — open-air safari after dark.", icon: "sparkle", highlight: true, highlightLabel: "Tram Ride" },
          { time: "8:30 PM", title: "Walking Trails", description: "Leopard Trail / Fishing Cat Trail.", icon: "nature" },
          {
            time: "9:45 PM",
            title: "Return to hotel",
            icon: "transport",
            transit: [
              { line: "bus", from: "Night Safari", to: "Khatib MRT", note: "Mandai Shuttle Bus" },
              { line: "red", from: "Khatib", to: "Dhoby Ghaut", direction: "towards Marina South Pier", stops: 6 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
              { line: "walk", from: "Clarke Quay MRT", to: "Hotel", note: "~10 min walk" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Sentosa Adventure",
    subtitle: "Universal Studios · Aquarium · Beach · Wings of Time",
    summary: "Theme park thrills, marine wonder, sunset on Siloso, fireworks finale.",
    mapEmbed: mapFor("Sentosa Island Singapore Universal Studios"),
    sections: [
      {
        label: "All Day",
        range: "9:00 AM – 10:30 PM",
        items: [
          {
            time: "9:00 AM",
            title: "Head to Sentosa",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "HarbourFront", direction: "towards HarbourFront", stops: 4 },
              { line: "walk", from: "HarbourFront MRT", to: "VivoCity L3", note: "Follow signs" },
              { line: "monorail", from: "VivoCity", to: "Waterfront Station", direction: "Sentosa Express", stops: 1 },
            ],
          },
          { time: "10:00 AM", title: "Universal Studios Singapore", description: "Main rides + shows (~6+ hrs, no rush).", icon: "ticket", highlight: true, highlightLabel: "USS" },
          { time: "4:30 PM", title: "Leave Universal Studios", icon: "rest" },
          { time: "4:45 PM", title: "S.E.A. Aquarium", description: "Relaxed visit (~1.5–2 hrs).", icon: "nature" },
          { time: "6:45 PM", title: "Head to Beach", description: "Walk or take Sentosa Beach Shuttle.", icon: "transport" },
          { time: "7:00 PM", title: "Siloso Beach", description: "Sunset + chill + photos.", icon: "beach" },
          { time: "7:20 PM", title: "Reach Wings of Time seating", description: "Arrive early for better seats.", icon: "rest" },
          { time: "7:40 PM", title: "Wings of Time Show", description: "Light + water + fireworks (~20 min).", icon: "show", highlight: true, highlightLabel: "Wings of Time" },
          { time: "8:15 PM", title: "Dinner", description: "Beachside cafés / food court.", icon: "food" },
          {
            time: "9:15 PM",
            title: "Return to hotel",
            icon: "transport",
            transit: [
              { line: "walk", from: "Beach", to: "Waterfront Station", note: "Walk or shuttle" },
              { line: "monorail", from: "Waterfront", to: "VivoCity / HarbourFront", direction: "Sentosa Express", stops: 1 },
              { line: "purple", from: "HarbourFront", to: "Clarke Quay", direction: "towards Punggol", stops: 4 },
              { line: "walk", from: "Clarke Quay MRT", to: "Hotel", note: "~10 min walk" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Skyline & Shopping",
    subtitle: "Singapore Flyer · Bugis · Orchard Road",
    summary: "Sky-high views by day, neon street markets and Orchard glamour by night.",
    mapEmbed: mapFor("Singapore Flyer, Bugis, Orchard Road Singapore"),
    sections: [
      {
        label: "Morning – Afternoon",
        range: "10:00 AM – 2:30 PM",
        items: [
          {
            time: "10:00 AM",
            title: "Head to Singapore Flyer",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "yellow", from: "Dhoby Ghaut", to: "Promenade", direction: "towards Promenade", stops: 2, interchange: true },
              { line: "walk", from: "Promenade MRT", to: "Singapore Flyer", note: "~5–7 min walk" },
            ],
          },
          { time: "10:30 AM", title: "Singapore Flyer", description: "Observation ride + queue (~30–40 min).", icon: "ticket", highlight: true, highlightLabel: "Skyline View" },
          { time: "11:30 AM", title: "Marina Bay Walk", description: "Waterfront views + photos. Optional MBS mall.", icon: "nature" },
          { time: "1:00 PM", title: "Lunch", description: "Marina Bay food court.", icon: "food" },
          {
            time: "2:30 PM",
            title: "Return to hotel · rest",
            icon: "transport",
            transit: [
              { line: "walk", from: "Marina Bay", to: "Promenade MRT" },
              { line: "yellow", from: "Promenade", to: "Dhoby Ghaut", direction: "towards Dhoby Ghaut", stops: 2 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
              { line: "walk", from: "Clarke Quay MRT", to: "Hotel", note: "~10 min walk" },
            ],
          },
        ],
      },
      {
        label: "Evening",
        range: "6:00 PM – 10:30 PM",
        items: [
          {
            time: "6:00 PM",
            title: "Head to Bugis Street",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "blue", from: "Dhoby Ghaut", to: "Bugis", direction: "towards Expo", stops: 2, interchange: true },
            ],
          },
          { time: "6:30 PM", title: "Bugis Street", description: "Street shopping + local vibe (~1.5 hrs).", icon: "shopping" },
          {
            time: "8:00 PM",
            title: "Bugis → Orchard",
            icon: "transport",
            transit: [
              { line: "blue", from: "Bugis", to: "Newton", direction: "towards Bukit Panjang", stops: 2 },
              { line: "red", from: "Newton", to: "Orchard", direction: "towards Jurong East", stops: 1, interchange: true },
            ],
          },
          { time: "8:30 PM", title: "Orchard Road", description: "Malls + street lights + nightlife.", icon: "shopping" },
          { time: "9:30 PM", title: "Dinner", icon: "food" },
          {
            time: "10:00 PM",
            title: "Return to hotel",
            icon: "transport",
            transit: [
              { line: "red", from: "Orchard", to: "Dhoby Ghaut", direction: "towards Marina South Pier", stops: 1 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
              { line: "walk", from: "Clarke Quay MRT", to: "Hotel", note: "~10 min walk" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Nature, Culture & Rooftop Finale",
    subtitle: "Gardens · Little India · River Cruise · Rooftop Dinner",
    summary: "A relaxed wind-down with rooftop dining as the grand finale.",
    mapEmbed: mapFor("Gardens by the Bay, Little India, Clarke Quay Singapore"),
    sections: [
      {
        label: "Morning",
        range: "9:30 AM – 1:30 PM",
        items: [
          {
            time: "9:30 AM",
            title: "Head to Gardens by the Bay",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "yellow", from: "Dhoby Ghaut", to: "Bayfront", direction: "towards Marina Bay", stops: 2, interchange: true },
              { line: "walk", from: "Bayfront MRT", to: "Gardens by the Bay" },
            ],
          },
          { time: "10:00 AM", title: "Explore Gardens (slow & relaxed)", description: "Cloud Forest (less crowd in morning), Flower Dome, outdoor gardens & lake walk.", icon: "nature" },
          { time: "1:00 PM", title: "Lunch near Marina Bay", icon: "food" },
          {
            time: "2:30 PM",
            title: "Return to hotel · rest",
            icon: "transport",
            transit: [
              { line: "yellow", from: "Bayfront", to: "Dhoby Ghaut", direction: "towards Dhoby Ghaut", stops: 2 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
            ],
          },
        ],
      },
      {
        label: "Evening",
        range: "5:30 PM – 10:30 PM",
        items: [
          {
            time: "5:30 PM",
            title: "Head to Little India",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "blue", from: "Dhoby Ghaut", to: "Little India", direction: "towards Bukit Panjang", stops: 2, interchange: true },
            ],
          },
          { time: "6:00 PM", title: "Little India", description: "Street shopping + temples. Optional: Mustafa Centre.", icon: "shopping" },
          {
            time: "7:15 PM",
            title: "Return to Clarke Quay",
            icon: "transport",
            transit: [
              { line: "blue", from: "Little India", to: "Dhoby Ghaut", direction: "towards Bugis", stops: 2 },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
            ],
          },
          { time: "7:30 PM", title: "Singapore River Cruise", description: "Night boat ride (~40 min).", icon: "nature", highlight: true, highlightLabel: "River Cruise" },
          { time: "8:45 PM", title: "Rooftop Dinner", description: "CÉ LA VI or Level 33 — the grand finale.", icon: "food", highlight: true, highlightLabel: "Main Highlight" },
          { time: "10:30 PM", title: "Return to hotel", icon: "hotel" },
        ],
      },
    ],
  },
];
