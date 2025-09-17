import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

interface UseTableListProps<TParams, TResponse> {
  defaultParams: TParams;
  queryKey: string;
  queryFn: (params: TParams) => Promise<TResponse>;
}
export function useTableList<TParams, TResponse>({
  defaultParams,
  queryKey,
  queryFn,
}: UseTableListProps<TParams, TResponse>) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const params: TParams = {
    ...defaultParams,
    page: currentPage,
  };

  const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
    queryKey: [queryKey, currentPage],
    queryFn: () => queryFn(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("page", page.toString());

    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({ page }, "", newUrl);
  };

  return {
    data: data,
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
    currentPage,
    handlePageChange,
  };
}
