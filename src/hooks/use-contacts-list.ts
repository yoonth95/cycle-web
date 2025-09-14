import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getContactListFromAPI } from "@/lib/contact/client";
import type { ContactsListParamsType } from "@/types/contact";

export function useContactsList(defaultParams: ContactsListParamsType) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const params: ContactsListParamsType = {
    ...defaultParams,
    page: currentPage,
  };

  const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
    queryKey: ["contacts-list", currentPage],
    queryFn: () => getContactListFromAPI(params),
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
