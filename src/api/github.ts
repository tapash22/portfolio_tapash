export interface ContributionDay {
  date: string;
  count: number;
}

export async function fetchGithubContributions(
  username: string,
): Promise<ContributionDay[]> {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: username },
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  const json = await res.json();

  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ||
    [];

  const days = weeks.flatMap((w: any) => w.contributionDays);

  return days.map((d: any) => ({
    date: d.date,
    count: d.contributionCount,
  }));
}
