export type NavSubItem = {
  id: number;
  slug: string;
  link: string;
  order: number;
};

type NavGroupItem = {
  id: number;
  slug: string;
  link: string;
  type: "group";
  order: number;
  items: NavSubItem[];
};

type NavSingleItem = {
  id: number;
  slug: string;
  link: string;
  type: "single";
  order: number;
};

export type NavItem = NavGroupItem | NavSingleItem;
export type NavType = NavItem[];
