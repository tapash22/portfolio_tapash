export interface ContributionDay {
  date: string;
  count: number;
}

export async function fetchGithubContributions(
  username: string,
): Promise<ContributionDay[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("htt://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data");
  }

  const json = await response.json();

  const weeks =
    json.data.user.contributionsCollection.contributionCalendar.weeks;

  return weeks.flatMap((week: any) =>
    week.contributionDays.map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  );
}
