import { useEffect, useState } from 'react';
import { fetchCommitEvents, type CommitEvent } from '../lib/github';

export function useCommitFeed(limit?: number) {
  const [commits, setCommits] = useState<CommitEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCommitEvents(limit);
        if (!isMounted) return;
        setCommits(data);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : 'Failed to load commits.'
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { commits, isLoading, error };
}
