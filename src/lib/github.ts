export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface CommitEvent {
  id: string;
  repo: string;
  message: string;
  timestamp: string;
  url: string;
}

function getUsername() {
  return import.meta.env.VITE_GITHUB_USERNAME ?? '';
}

function getHeaders() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Repos ──

interface FetchReposOptions {
  username?: string;
  token?: string;
  limit?: number;
}

export async function fetchGitHubRepos({
  username,
  token,
  limit = 6,
}: FetchReposOptions = {}) {
  // To enable this:
  // 1. Create a `.env.local` file in the project root.
  // 2. Add `VITE_GITHUB_USERNAME=your-github-username`.
  // 3. Optional, for higher rate limits on private/admin setups:
  //    add `VITE_GITHUB_TOKEN=your_github_personal_access_token`.
  // 4. Restart the dev server after adding env vars.
  const resolvedUsername = username ?? getUsername();
  const resolvedToken = token ?? import.meta.env.VITE_GITHUB_TOKEN;

  if (!resolvedUsername) {
    throw new Error(
      'Missing VITE_GITHUB_USERNAME. Add it in .env.local to enable GitHub integration.',
    );
  }

  const response = await fetch(
    `https://api.github.com/users/${resolvedUsername}/repos?sort=updated&per_page=${limit}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(resolvedToken ? { Authorization: `Bearer ${resolvedToken}` } : {}),
      },
    },
  );

  if (!response.ok) {
    throw new Error('Unable to load GitHub repositories right now.');
  }

  const data = (await response.json()) as GitHubRepo[];

  return data
    .filter(repo => !repo.name.startsWith('.'))
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
}

// ── Commit Events ──

const NOISE_PATTERNS = [
  /^merge/i,
  /^wip$/i,
  /^fix$/i,
  /^update$/i,
  /^\.$/,
  /^initial commit$/i,
  /^first commit$/i,
];

function isNoisyMessage(msg: string): boolean {
  const trimmed = msg.trim();
  if (trimmed.length < 6) return true;
  return NOISE_PATTERNS.some(p => p.test(trimmed));
}

interface PushEventPayload {
  commits?: { message: string; url: string; sha: string }[];
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: PushEventPayload;
  created_at: string;
}

export async function fetchCommitEvents(limit = 20): Promise<CommitEvent[]> {
  const username = getUsername();
  if (!username) {
    throw new Error(
      'Missing VITE_GITHUB_USERNAME. Add it in .env.local to enable the commit feed.',
    );
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/events?per_page=100`,
    { headers: getHeaders() },
  );

  if (!response.ok) {
    throw new Error('Unable to load GitHub activity right now.');
  }

  const events = (await response.json()) as GitHubEvent[];

  const commits: CommitEvent[] = [];

  for (const event of events) {
    if (event.type !== 'PushEvent') continue;
    const payload = event.payload;
    if (!payload.commits) continue;

    for (const commit of payload.commits) {
      const firstLine = commit.message.split('\n')[0];
      if (isNoisyMessage(firstLine)) continue;

      const repoShort = event.repo.name.replace(`${username}/`, '');
      const htmlUrl = `https://github.com/${event.repo.name}/commit/${commit.sha}`;

      commits.push({
        id: commit.sha,
        repo: repoShort,
        message: firstLine,
        timestamp: event.created_at,
        url: htmlUrl,
      });
    }

    if (commits.length >= limit) break;
  }

  return commits.slice(0, limit);
}

export interface RepoMeta {
  displayName?: string;
  summary?: string;
  featured?: boolean;
  hidden?: boolean;
  status?: 'live' | 'in-progress' | 'archieved';
}

export const repoMeta: Record<string, RepoMeta> = {
  PortfolioV2: {
    displayName: 'OS Portfolio',
    summary: 'OS-inspired portfolio built with React & Typescript',
    featured: true,
    hidden: false,
    status: 'live',
  },
  'where-should-we-meet': {
    displayName: 'MidMeet',
    summary: 'London meet-up planner using TfL API',
    featured: true,
    hidden: false,
    status: 'live',
  },
};

export function enrichRepoWithMeta(
  repo: GitHubRepo,
  meta?: RepoMeta,
): GitHubRepo & { meta?: RepoMeta } {
  return {
    ...repo,
    meta,
    description: meta?.summary ?? repo.description ?? null,
    name: meta?.displayName ?? repo.name,
  };
}
