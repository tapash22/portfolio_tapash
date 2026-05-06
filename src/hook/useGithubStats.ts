import { useEffect, useState } from "react";

export const useGithubStats = (username: string) => {
  const [repos, setRepos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // example API call
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      setRepos(data.public_repos || 0);
      setLoading(false);
    };

    fetchData();
  }, [username]);

  return { repos, loading };
};
