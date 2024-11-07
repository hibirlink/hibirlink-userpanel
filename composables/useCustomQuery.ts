import { useQuery } from "@vue/apollo-composable";
export const useCustomQuery = async (
  query: any,
  variable:any = null,
  debounce: number = 0,
  enabled: boolean = true
) => {



  const { error, fetchMore, result, loading, onResult, onError, refetch } =
    useQuery(
      query,
      variable
      ,
      { debounce, fetchPolicy: "no-cache", enabled }
    );
  return {
    error,
    fetchMore,
    result,
    loading,
    onResult,
    onError,
    refetch,
  };
};
