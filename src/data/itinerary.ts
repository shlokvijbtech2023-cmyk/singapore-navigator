import day1Img from "@/assets/day1.jpg";
import day2Img from "@/assets/day2.jpg";
import day3Img from "@/assets/day3.jpg";
import day4Img from "@/assets/day4.jpg";
import day5Img from "@/assets/day5.jpg";

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
  /** Direct Google Maps URL for the place. */
  mapsUrl?: string;
  /** Reminder/alert shown above this card. */
  reminder?: string;
  /** Marks an optional/skippable item. */
  optional?: boolean;
};

export type Day = {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  mapEmbed: string;
  sections: { label: string; range: string; items: TimelineItem[] }[];
};

const mapFor = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const DAYS: Day[] = [
  {
    id: 1,
    title: "Arrival, Jewel & Marina Bay",
    subtitle: "Jewel Changi · Clarke Quay · Gardens by the Bay",
    summary: "Land at Jewel, settle in, then chase Singapore's iconic light shows.",
    image: day1Img,
    mapEmbed: mapFor("Jewel Changi, Clarke Quay, Gardens by the Bay Singapore"),
    sections: [
      {
        label: "Arrival",
        range: "Early Morning · 1–1.5 hrs",
        items: [
          {
            time: "Arrival",
            title: "Jewel Changi Airport",
            description: "Rain Vortex · indoor garden · breakfast.",
            icon: "sparkle",
            highlight: true,
            highlightLabel: "Rain Vortex",
            mapsUrl: "https://maps.google.com/?q=Jewel+Changi+Airport",
          },
          {
            time: "Transfer",
            title: "Airport → Hotel",
            icon: "transport",
            transit: [
              { line: "green", from: "Changi Airport MRT", to: "Tanah Merah", direction: "towards Tanah Merah", stops: 2 },
              { line: "green", from: "Tanah Merah", to: "Outram Park", direction: "towards City (Tuas Link)", stops: 6, interchange: true },
              { line: "walk", from: "Outram Park", to: "Holiday Inn Singapore Atrium", note: "Short walk or bus" },
            ],
          },
          {
            time: "Check-in",
            title: "Holiday Inn Singapore Atrium",
            icon: "hotel",
            mapsUrl: "https://maps.google.com/?q=Holiday+Inn+Singapore+Atrium",
          },
        ],
      },
      {
        label: "Morning",
        range: "9:30 AM – 2:30 PM",
        items: [
          { time: "9:30 AM", title: "Clarke Quay", description: "River views & photos.", icon: "nature", mapsUrl: "https://maps.google.com/?q=Clarke+Quay" },
          { time: "10:30 AM", title: "Chinatown", description: "Temples, street markets & shops.", icon: "shopping", mapsUrl: "https://maps.google.com/?q=Chinatown+Singapore" },
          { time: "12:30 PM", title: "Annalakshmi", description: "Soulful Indian vegetarian.", icon: "food", mapsUrl: "https://maps.google.com/?q=Annalakshmi+Singapore" },
          { time: "1:30 PM", title: "Robertson Quay", description: "Riverside stroll & cafés.", icon: "nature", mapsUrl: "https://maps.google.com/?q=Robertson+Quay" },
          { time: "2:30 PM", title: "Return to hotel · rest", icon: "rest" },
        ],
      },
      {
        label: "Evening",
        range: "4:30 PM – 11:00 PM",
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
          { time: "5:00 PM", title: "Gardens by the Bay", description: "Cloud Forest + Flower Dome.", icon: "nature", mapsUrl: "https://maps.google.com/?q=Gardens+by+the+Bay" },
          {
            time: "7:45 PM",
            title: "Supertree Light Show",
            description: "Garden Rhapsody at the Supertree Grove.",
            icon: "show",
            highlight: true,
            highlightLabel: "Garden Rhapsody",
            reminder: "Arrive by 7:40 PM to grab a good spot for the Supertree Show.",
            mapsUrl: "https://maps.google.com/?q=Supertree+Grove",
          },
          { time: "8:10 PM", title: "Marina Bay Walk", description: "Gardens → MBS → Helix Bridge → Merlion. Visit MBS rooftop.", icon: "nature", mapsUrl: "https://maps.google.com/?q=Marina+Bay+Sands" },
          {
            time: "9:00 PM",
            title: "Spectra Light & Water Show",
            description: "Free outdoor show at Marina Bay Sands.",
            icon: "show",
            highlight: true,
            highlightLabel: "Spectra",
            reminder: "Arrive by 8:50 PM for a clear view of Spectra.",
            mapsUrl: "https://maps.google.com/?q=Marina+Bay+Sands",
          },
          { time: "9:30 PM", title: "Lau Pa Sat", description: "Iconic hawker centre — try satay street.", icon: "food", mapsUrl: "https://maps.google.com/?q=Lau+Pa+Sat" },
          { time: "10:30 PM", title: "Clarke Quay stroll", description: "Optional nightcap by the river.", icon: "nature", optional: true, mapsUrl: "https://maps.google.com/?q=Clarke+Quay" },
          {
            time: "11:00 PM",
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
    summary: "A full day across Singapore's wildlife parks, ending with the Night Safari.",
    image: day2Img,
    mapEmbed: mapFor("Mandai Wildlife Reserve Singapore"),
    sections: [
      {
        label: "All Day",
        range: "8:30 AM – 10:30 PM",
        items: [
          {
            time: "8:30 AM",
            title: "Hotel → Mandai",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "Dhoby Ghaut", direction: "towards Punggol", stops: 1 },
              { line: "red", from: "Dhoby Ghaut", to: "Khatib", direction: "towards Jurong East", stops: 6, interchange: true },
              { line: "bus", from: "Khatib MRT", to: "Mandai Wildlife Reserve", note: "Mandai Shuttle Bus — exit Khatib, follow 'Mandai Shuttle' signs (~15–20 min)" },
            ],
          },
          { time: "9:45 AM", title: "Singapore Zoo", description: "Open-concept zones (~2–2.5 hrs).", icon: "nature", highlight: true, highlightLabel: "Open-concept Zoo", mapsUrl: "https://maps.google.com/?q=Singapore+Zoo" },
          { time: "12:15 PM", title: "River Wonders", description: "Pandas + boat ride (~1.5–2 hrs).", icon: "nature", mapsUrl: "https://maps.google.com/?q=River+Wonders" },
          { time: "2:00 PM", title: "Lunch break", description: "Mandai food court.", icon: "food" },
          { time: "3:00 PM", title: "Bird Paradise", description: "Aviaries + bird shows (~2 hrs).", icon: "nature", mapsUrl: "https://maps.google.com/?q=Bird+Paradise" },
          {
            time: "7:15 PM",
            title: "Night Safari entry",
            icon: "ticket",
            reminder: "Reach Night Safari by 7:15 PM to clear entry before the tram.",
            mapsUrl: "https://maps.google.com/?q=Night+Safari",
          },
          { time: "7:45 PM", title: "Night Safari Tram Ride", description: "Open-air safari after dark.", icon: "sparkle", highlight: true, highlightLabel: "Tram Ride" },
          { time: "8:30 PM", title: "Walking Trails", description: "Leopard / Fishing Cat Trail.", icon: "nature", optional: true },
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
    title: "Universal Studios & Aquarium",
    subtitle: "USS · S.E.A. Aquarium · VivoCity",
    summary: "Theme park thrills, marine wonder, and a chill waterfront night.",
    image: day3Img,
    mapEmbed: mapFor("Sentosa Island Singapore Universal Studios"),
    sections: [
      {
        label: "All Day",
        range: "9:00 AM – 10:30 PM",
        items: [
          {
            time: "9:00 AM",
            title: "Hotel → Sentosa",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT", note: "~10 min walk" },
              { line: "purple", from: "Clarke Quay", to: "HarbourFront", direction: "towards HarbourFront", stops: 4 },
              { line: "walk", from: "HarbourFront MRT", to: "VivoCity L3", note: "Follow signs" },
              { line: "monorail", from: "VivoCity", to: "Waterfront Station", direction: "Sentosa Express", stops: 1 },
            ],
          },
          { time: "10:00 AM", title: "Universal Studios Singapore", description: "Main rides + shows (~6+ hrs).", icon: "ticket", highlight: true, highlightLabel: "USS", mapsUrl: "https://maps.google.com/?q=Universal+Studios+Singapore" },
          { time: "6:30 PM", title: "Leave Universal Studios", icon: "rest" },
          { time: "6:45 PM", title: "S.E.A. Aquarium", description: "Relaxed visit (~1.5 hrs).", icon: "nature", mapsUrl: "https://maps.google.com/?q=SEA+Aquarium" },
          { time: "8:30 PM", title: "VivoCity waterfront", description: "Dinner + chill by the harbor.", icon: "food", mapsUrl: "https://maps.google.com/?q=VivoCity+Singapore" },
          {
            time: "10:00 PM",
            title: "Return to hotel",
            icon: "transport",
            transit: [
              { line: "walk", from: "VivoCity", to: "HarbourFront MRT" },
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
    title: "IMM & Sentosa Evening",
    subtitle: "IMM Mall · Cable Car · Siloso · Wings of Time",
    summary: "Outlet shopping by day, a cable car ride and beachfront fireworks finale.",
    image: day4Img,
    mapEmbed: mapFor("IMM Singapore Sentosa Cable Car Siloso Beach"),
    sections: [
      {
        label: "Morning – Afternoon",
        range: "10:00 AM – 3:30 PM",
        items: [
          {
            time: "10:00 AM",
            title: "Hotel → IMM",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Clarke Quay MRT" },
              { line: "purple", from: "Clarke Quay", to: "Outram Park", direction: "towards HarbourFront", stops: 2 },
              { line: "green", from: "Outram Park", to: "Jurong East", direction: "towards Tuas Link", stops: 6, interchange: true },
              { line: "walk", from: "Jurong East MRT", to: "IMM Mall", note: "~5 min walk" },
            ],
          },
          { time: "10:30 AM", title: "IMM Mall", description: "Singapore's biggest outlet mall.", icon: "shopping", mapsUrl: "https://maps.google.com/?q=IMM+Singapore" },
          { time: "1:30 PM", title: "Lunch at IMM", icon: "food" },
          {
            time: "3:00 PM",
            title: "IMM → HarbourFront",
            icon: "transport",
            transit: [
              { line: "walk", from: "IMM Mall", to: "Jurong East MRT" },
              { line: "green", from: "Jurong East", to: "Outram Park", direction: "towards Pasir Ris", stops: 6 },
              { line: "purple", from: "Outram Park", to: "HarbourFront", direction: "towards HarbourFront", stops: 2, interchange: true },
            ],
          },
        ],
      },
      {
        label: "Evening",
        range: "4:30 PM – 10:30 PM",
        items: [
          { time: "4:30 PM", title: "Singapore Cable Car", description: "Mount Faber → Sentosa with harbor views.", icon: "ticket", highlight: true, highlightLabel: "Cable Car", mapsUrl: "https://maps.google.com/?q=Singapore+Cable+Car" },
          { time: "6:00 PM", title: "Siloso Beach", description: "Sunset + chill + photos.", icon: "beach", mapsUrl: "https://maps.google.com/?q=Siloso+Beach" },
          {
            time: "7:20 PM",
            title: "Wings of Time seating",
            description: "Arrive early for better seats.",
            icon: "rest",
            reminder: "Reach the Wings of Time seating area by 7:20 PM.",
          },
          { time: "7:40 PM", title: "Wings of Time Show", description: "Light + water + fireworks (~20 min).", icon: "show", highlight: true, highlightLabel: "Wings of Time", mapsUrl: "https://maps.google.com/?q=Wings+of+Time" },
          { time: "8:15 PM", title: "Dinner at the beach", description: "Beachside cafés / food court.", icon: "food" },
          {
            time: "9:30 PM",
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
    id: 5,
    title: "Botanic, Marina, Orchard & Bugis",
    subtitle: "Botanic Gardens · Gardens by the Bay · Orchard · Bugis",
    summary: "A relaxed wind-down through gardens and shopping streets, ending with airport transfer.",
    image: day5Img,
    mapEmbed: mapFor("Singapore Botanic Gardens, Orchard Road, Bugis"),
    sections: [
      {
        label: "Morning",
        range: "9:00 AM – 1:00 PM",
        items: [
          {
            time: "9:00 AM",
            title: "Havelock → Botanic Gardens",
            icon: "transport",
            transit: [
              { line: "walk", from: "Hotel", to: "Havelock MRT", note: "~8 min walk" },
              { line: "blue", from: "Havelock", to: "Newton", direction: "towards Bukit Panjang", stops: 4 },
              { line: "red", from: "Newton", to: "Orchard", direction: "towards Jurong East", stops: 1, interchange: true },
              { line: "yellow", from: "Orchard → Botanic Gardens", to: "Botanic Gardens", direction: "via Circle Line", stops: 2, interchange: true, note: "Walk to Botanic Gardens MRT (Circle Line)" },
            ],
          },
          { time: "9:45 AM", title: "Singapore Botanic Gardens", description: "Orchid Garden + relaxed walk.", icon: "nature", highlight: true, highlightLabel: "UNESCO Garden", mapsUrl: "https://maps.google.com/?q=Singapore+Botanic+Gardens" },
          { time: "12:30 PM", title: "Lunch", icon: "food" },
        ],
      },
      {
        label: "Afternoon",
        range: "1:30 PM – 5:00 PM",
        items: [
          {
            time: "1:30 PM",
            title: "Botanic → Bayfront",
            icon: "transport",
            transit: [
              { line: "yellow", from: "Botanic Gardens", to: "Promenade", direction: "towards Marina Bay", stops: 6 },
              { line: "yellow", from: "Promenade", to: "Bayfront", direction: "towards Marina Bay", stops: 1 },
            ],
          },
          { time: "2:00 PM", title: "Gardens by the Bay (encore)", description: "Outdoor gardens + lake walk.", icon: "nature", mapsUrl: "https://maps.google.com/?q=Gardens+by+the+Bay" },
          {
            time: "4:00 PM",
            title: "Bayfront → Orchard",
            icon: "transport",
            transit: [
              { line: "yellow", from: "Bayfront", to: "Dhoby Ghaut", direction: "towards Dhoby Ghaut", stops: 2 },
              { line: "red", from: "Dhoby Ghaut", to: "Orchard", direction: "towards Jurong East", stops: 1, interchange: true },
            ],
          },
          { time: "4:15 PM", title: "Orchard Road", description: "Malls + street lights.", icon: "shopping", mapsUrl: "https://maps.google.com/?q=Orchard+Road" },
        ],
      },
      {
        label: "Evening & Departure",
        range: "5:00 PM – 6:20 PM",
        items: [
          {
            time: "5:00 PM",
            title: "Orchard → Bugis",
            icon: "transport",
            transit: [
              { line: "red", from: "Orchard", to: "Dhoby Ghaut", direction: "towards Marina South Pier", stops: 1 },
              { line: "blue", from: "Dhoby Ghaut", to: "Bugis", direction: "towards Expo", stops: 2, interchange: true },
            ],
          },
          { time: "5:15 PM", title: "Bugis Street", description: "Last-minute street shopping.", icon: "shopping", mapsUrl: "https://maps.google.com/?q=Bugis+Street" },
          {
            time: "5:50 PM",
            title: "Return to Clarke Quay",
            icon: "transport",
            transit: [
              { line: "blue", from: "Bugis", to: "Promenade", direction: "towards Bukit Panjang", stops: 1 },
              { line: "yellow", from: "Promenade", to: "Dhoby Ghaut", direction: "towards Dhoby Ghaut", stops: 2, interchange: true },
              { line: "purple", from: "Dhoby Ghaut", to: "Clarke Quay", direction: "towards HarbourFront", stops: 1, interchange: true },
            ],
          },
          {
            time: "6:20 PM",
            title: "Airport Transfer",
            description: "Leave hotel for Changi Airport.",
            icon: "transport",
            highlight: true,
            highlightLabel: "Departure",
            reminder: "Leave by 6:20 PM sharp to make the flight comfortably.",
            mapsUrl: "https://maps.google.com/?q=Changi+Airport+Singapore",
          },
        ],
      },
    ],
  },
];
