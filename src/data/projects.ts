export type ProjectMeta = {
  slug: string;
  accent: string;
  dot: string;
  link?: string;
  image?: string;
};

export const HOME_PROJECTS_LIMIT = 5;

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "armonia2",
    accent: "#f59e0b",
    dot: "bg-amber-400",
    link: "https://armonia2.ro",
    image: "/projects/armonia2.png",
  },
  {
    slug: "filo",
    accent: "#6366f1",
    dot: "bg-indigo-400",
    link: "https://github.com/Scroti/Filo",
    image: "/projects/filo.svg",
  },
  {
    slug: "teamlatch",
    accent: "#0ea5e9",
    dot: "bg-sky-400",
    link: "https://github.com/Scroti/DevHacks-Project-Zbubble-Sort-",
    image: "/projects/teamlatch.svg",
  },
  {
    slug: "item-shop",
    accent: "#7c3aed",
    dot: "bg-violet-400",
    image: "/projects/item-shop.svg",
  },
  {
    slug: "bonusbot",
    accent: "#2563eb",
    dot: "bg-blue-400",
    image: "/projects/bonusbot.svg",
  },
  {
    slug: "metin2-bot",
    accent: "#059669",
    dot: "bg-emerald-400",
    image: "/projects/metin2-bot.svg",
  },
  {
    slug: "scrotios",
    accent: "#db2777",
    dot: "bg-pink-400",
    image: "/projects/scrotios.svg",
  },
];

export function getProjectMeta(slug: string): ProjectMeta {
  return (
    projectsMeta.find((m) => m.slug === slug) ?? {
      slug,
      accent: "#71717a",
      dot: "bg-zinc-400",
    }
  );
}
