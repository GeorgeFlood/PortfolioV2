import { useEffect, useState } from 'react';
import { fetchGitHubRepos, type GitHubRepo } from '../lib/github';

export function useGitHubRepos(limit?: number) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchGitHubRepos({ limit });

        if (!isMounted) return;
        setRepos(data);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load GitHub.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  console.log(repos);

  return { repos, isLoading, error };
}
