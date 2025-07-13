export type NavigationSubItem = {
  id: number;
  slug: string;
  link: string;
  order: number;
};

type NavigationGroupItem = {
  id: number;
  slug: string;
  link: string;
  type: "group";
  order: number;
  items: NavigationSubItem[];
};

type NavigationSingleItem = {
  id: number;
  slug: string;
  link: string;
  type: "single";
  order: number;
};

export type NavigationItem = NavigationGroupItem | NavigationSingleItem;
export type NavigationDataType = NavigationItem[];
