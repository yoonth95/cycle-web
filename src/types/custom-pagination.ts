type CustomPaginationBaseProps = {
  totalPages: number;
  currentPage: number;
};

type CustomPaginationWithLink = CustomPaginationBaseProps & {
  mode: "link";
  createHref: (page: number) => string;
};

type CustomPaginationWithButton = CustomPaginationBaseProps & {
  mode: "button";
  onPageChange: (page: number) => void;
};

export type CustomPaginationProps = CustomPaginationWithLink | CustomPaginationWithButton;
