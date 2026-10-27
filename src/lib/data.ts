import monsoon from "@/assets/art-monsoon.jpg";
import flower from "@/assets/art-flower.jpg";
import blueCity from "@/assets/art-blue-city.jpg";
import fragments from "@/assets/art-fragments.jpg";
import temple from "@/assets/art-temple.jpg";
import sunday from "@/assets/art-sunday.jpg";
import abstractArt from "@/assets/art-abstract.jpg";
import portrait from "@/assets/art-portrait.jpg";
import warli from "@/assets/artist-3.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export type Availability = "available" | "reserved" | "sold";

export type Artist = {
  slug: string;
  name: string;
  location: string;
  medium: string;
  bio: string;
  statement: string;
  portrait: string;
  languages: string;
  stall: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: string; // slug
  medium: string;
  category: string;
  price: number;
  w: number;
  h: number;
  dims: string;
  year: number;
  description: string;
  inspiration?: string;
  availability: Availability;
  image: string;
  added: string;
};

export const CATEGORIES = [
  "Paintings",
  "Sketches and Illustrations",
  "Portraits",
  "Indian Folk Art",
  "Abstract and Experimental Art",
  "Mixed Media",
  "Handmade Art",
  "Photography",
] as const;

export const artists: Artist[] = [
  {
    slug: "raghav-kulkarni",
    name: "Raghav Kulkarni",
    location: "Kala Ghoda, Mumbai",
    medium: "Watercolour & acrylic",
    bio: "Paints the city as it is lived in — wet streets, crowded platforms, flower markets at dawn. Twenty years of Mumbai, one sheet of paper at a time.",
    statement: "I paint what I pass every day, so that someone else might stop and look at it properly.",
    portrait: artist1,
    languages: "Marathi, Hindi, English",
    stall: "Rampart Row, near the café corner",
  },
  {
    slug: "meher-shah",
    name: "Meher Shah",
    location: "Fort, Mumbai",
    medium: "Ink, illustration & gouache",
    bio: "An illustrator who carries her sketchbook everywhere. Her pen drawings of old Bombay architecture and Sunday footpaths fill notebooks — and now walls.",
    statement: "Every building has a face if you draw it slowly enough.",
    portrait: artist2,
    languages: "Gujarati, Hindi, English",
    stall: "Outside the art gallery steps, weekends",
  },
  {
    slug: "sunanda-patil",
    name: "Sunanda Patil",
    location: "Colaba, Mumbai",
    medium: "Folk-inspired painting & mixed media",
    bio: "Works with earth pigments, handmade paper and collage. Her practice draws on memories of village walls and the textures of home.",
    statement: "I keep what others throw away — paper, cloth, stamps — and give it a second life.",
    portrait: artist3,
    languages: "Marathi, Hindi",
    stall: "Kala Ghoda footpath, Saturdays",
  },
];

export const artworks: Artwork[] = [
  { id: "monsoon-at-dadar", title: "Monsoon at Dadar", artist: "raghav-kulkarni", medium: "Watercolour on paper", category: "Paintings", price: 2400, w: 896, h: 1152, dims: "30 × 38 cm", year: 2025, description: "Black umbrellas, yellow-top taxis and the glow of shop signs reflected on a flooded street outside Dadar station.", inspiration: "Painted the week the first rains arrived, from sketches made under a bus shelter.", availability: "available", image: monsoon, added: "2026-09-12" },
  { id: "the-flower-seller", title: "The Flower Seller", artist: "raghav-kulkarni", medium: "Acrylic on canvas", category: "Portraits", price: 4800, w: 1024, h: 1024, dims: "60 × 60 cm", year: 2025, description: "A marigold seller pauses between garlands. Bold brushwork in saffron, terracotta and deep green.", availability: "available", image: flower, added: "2026-08-03" },
  { id: "fragments-of-home", title: "Fragments of Home", artist: "sunanda-patil", medium: "Mixed media collage", category: "Mixed Media", price: 1800, w: 832, h: 1024, dims: "28 × 35 cm", year: 2024, description: "Torn handmade paper, old postcards, fabric and gold leaf assembled into a map of remembered places.", inspiration: "Made from paper and cloth collected over many years.", availability: "available", image: fragments, added: "2026-07-20" },
  { id: "a-city-in-blue", title: "A City in Blue", artist: "meher-shah", medium: "Ink and watercolour", category: "Sketches and Illustrations", price: 3200, w: 1152, h: 832, dims: "42 × 30 cm", year: 2026, description: "The balconies and domes of Kala Ghoda drawn in fine pen and washed in shades of indigo.", availability: "reserved", image: blueCity, added: "2026-10-01" },
  { id: "sunday-on-the-footpath", title: "Sunday on the Footpath", artist: "meher-shah", medium: "Illustration, ink and flat colour", category: "Sketches and Illustrations", price: 1200, w: 1152, h: 896, dims: "30 × 23 cm", year: 2026, description: "Cutting chai, cyclists and second-hand booksellers along the sea face on a slow Sunday morning.", availability: "available", image: sunday, added: "2026-10-15" },
  { id: "quiet-temple-morning", title: "Quiet Temple Morning", artist: "meher-shah", medium: "Gouache on paper", category: "Paintings", price: 2600, w: 1024, h: 1280, dims: "32 × 40 cm", year: 2025, description: "Dawn light over a temple courtyard; oil lamps still burning, the first visitors arriving.", availability: "available", image: temple, added: "2026-06-11" },
  { id: "tide-and-rust", title: "Tide and Rust", artist: "raghav-kulkarni", medium: "Acrylic and palette knife on board", category: "Abstract and Experimental Art", price: 5400, w: 1024, h: 1024, dims: "50 × 50 cm", year: 2026, description: "Layers of indigo, rust and ochre scraped back to suggest a monsoon sea horizon.", availability: "available", image: abstractArt, added: "2026-10-20" },
  { id: "the-old-fisherman", title: "The Old Fisherman", artist: "sunanda-patil", medium: "Charcoal and pencil", category: "Portraits", price: 2000, w: 832, h: 1088, dims: "30 × 40 cm", year: 2024, description: "A portrait study drawn at Sassoon Dock, with fishing boats and the skyline behind.", availability: "sold", image: portrait, added: "2026-05-02" },
  { id: "village-wall", title: "Village Wall (work in progress)", artist: "sunanda-patil", medium: "White pigment on earth-toned ground", category: "Indian Folk Art", price: 3600, w: 896, h: 1152, dims: "60 × 45 cm", year: 2026, description: "A folk-inspired composition of trees, animals and dancers, shown here in the artist's studio while being painted.", inspiration: "Inspired by wall paintings the artist grew up around; made with respect for the tradition rather than as a copy of it.", availability: "available", image: warli, added: "2026-10-22" },
];

export const stories = [
  { slug: "monsoon", title: "Painting the City One Monsoon at a Time.", artist: "raghav-kulkarni", image: monsoon, excerpt: "Why the rains are the best time of year to paint Mumbai — and the worst time to run a footpath stall." },
  { slug: "sketch", title: "Why This Artist Never Throws Away a Sketch.", artist: "meher-shah", image: blueCity, excerpt: "Forty notebooks, one building at a time. On drawing slowly in a fast city." },
  { slug: "studio", title: "A Small Studio Full of Big Ideas.", artist: "sunanda-patil", image: fragments, excerpt: "Collected paper, saved cloth, a single window. Inside a one-room studio in Colaba." },
];

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);
export const getArtwork = (id: string) => artworks.find((a) => a.id === id);
export const worksBy = (slug: string) => artworks.filter((a) => a.artist === slug);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
