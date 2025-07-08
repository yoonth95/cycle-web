type NavItemType = {
  id: number;
  slug: string;
  type: "group" | "single";
  order: number;
  items: string[] | null;
};

export type NavType = NavItemType[];
