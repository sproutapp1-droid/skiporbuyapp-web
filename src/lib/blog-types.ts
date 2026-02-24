export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  category: string;
  keywords: string[];
  readingTime: number;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  readingTime: number;
}

export const CATEGORIES = [
  { name: "Impulse Buying", gradient: "from-amber-400 to-orange-500" },
  { name: "No Spend Challenges", gradient: "from-purple-400 to-pink-500" },
  { name: "Cost Per Use", gradient: "from-mint to-emerald-400" },
  { name: "Budgeting & Saving", gradient: "from-blue-400 to-cyan-400" },
  { name: "Smart Shopping", gradient: "from-violet-400 to-fuchsia-500" },
  { name: "App & Product", gradient: "from-mint to-emerald-400" },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];

export function getCategoryGradient(category: string): string {
  const found = CATEGORIES.find((c) => c.name === category);
  return found ? found.gradient : "from-mint to-emerald-400";
}
