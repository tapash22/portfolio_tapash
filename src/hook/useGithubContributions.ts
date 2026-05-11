import useSWR from "swr";
import { fetchGithubContributions, type ContributionDay } from "../api/github";

export function useGithubContributions(username: string) {
  const { data, error, isLoading, mutate } = useSWR<ContributionDay[]>(
    username ? ["github", username] : null,
    () => fetchGithubContributions(username),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000 * 60 * 60,
    },
  );

  return {
    contributions: data || [],
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
