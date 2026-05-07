export interface ContributionDay {
  date: string;
  count: number;
}

export async function fetchGithubContributions(
  username: string,
): Promise<ContributionDay[]> {
  // GitHub public events API (safe, no token needed)
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  const events = await response.json();

  // Convert events into pseudo contribution data
  const map: Record<string, number> = {};

  events.forEach((event: any) => {
    const date = event.created_at?.split("T")[0];
    if (!date) return;

    map[date] = (map[date] || 0) + 1;
  });

  return Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));
}
