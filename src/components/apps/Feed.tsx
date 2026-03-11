import { feedPosts } from '../../lib/feed';
import { useCommitFeed } from '../../hooks/useCommitFeed';
import './Apps.css';

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  return `${Math.floor(days / 30)}mo`;
}

function Feed() {
  const { commits, isLoading, error } = useCommitFeed(15);

  return (
    <div className="app-content feed">
      <div className="app-hero app-hero--cyan">
        <div className="app-hero__text">
          <h1>Feed</h1>
          <p>Pinned thoughts and live commit activity from GitHub.</p>
        </div>
      </div>

      <div className="app-body">
        {/* Pinned posts */}
        <div className="feed__section-label">Pinned</div>
        <div className="feed__timeline">
          {feedPosts.map((post) => (
            <article key={post.id} className="feed__post">
              <div
                className="feed__avatar"
                style={{
                  background: `linear-gradient(135deg, ${post.accent}, #111827)`,
                }}
              >
                G
              </div>
              <div className="feed__body">
                <div className="feed__meta">
                  <strong>{post.author}</strong>
                  <span>{post.handle}</span>
                  <span className="feed__pin-badge">pinned</span>
                </div>
                <p>{post.content}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Live commits */}
        <div className="feed__section-label">
          Recent commits
          {isLoading && <span className="feed__loading-dot" />}
        </div>

        {error && (
          <div className="feed__notice">
            {error.includes('VITE_GITHUB_USERNAME')
              ? 'Set VITE_GITHUB_USERNAME in .env.local to see live commits here.'
              : error}
          </div>
        )}

        {!error && !isLoading && commits.length === 0 && (
          <div className="feed__notice">No recent public commits found.</div>
        )}

        <div className="feed__timeline">
          {commits.map((commit) => (
            <article key={commit.id} className="feed__post feed__post--commit">
              <div className="feed__commit-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.25a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
                </svg>
              </div>
              <div className="feed__body">
                <div className="feed__meta">
                  <strong className="feed__commit-repo">{commit.repo}</strong>
                  <span>{timeAgo(commit.timestamp)}</span>
                </div>
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="feed__commit-msg"
                >
                  {commit.message}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
