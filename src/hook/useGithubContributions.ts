import useSWR from "swr";
import { type ContributionDay, fetchGithubContributions } from "../api/github";

export function useGithubContributions(username: string) {
  const { data, error, isLoading, mutate } = useSWR<ContributionDay[]>(
    ["github-contributions", username],
    () => fetchGithubContributions(username),
    {
      refreshInterval: 60000,

      revalidateOnFocus: true,

      revalidateOnReconnect: true,

      dedupingInterval: 10000,

      keepPreviousData: true,
    },
  );

  return {
    contributions: data || [],
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
