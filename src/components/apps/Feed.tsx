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

function formatProjectName(repo: string): string {
  return repo
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatCategoryLabel(category: 'design' | 'process' | 'shipped') {
  if (category === 'shipped') return 'Shipped';
  if (category === 'process') return 'Process';
  return 'Design';
}

function Feed() {
  const { commits, isLoading, error } = useCommitFeed(15);
  const [featuredPost, ...entries] = feedPosts;

  return (
    <div className="app-content feed">
      <div className="app-hero app-hero--dark">
        <div className="app-hero__text">
          <h1>Feed</h1>
          <p>Notes, decisions, and live shipping activity from the work behind the portfolio.</p>
        </div>
      </div>

      <div className="app-body feed__body-shell">
        {featuredPost && (
          <>
            <div className="feed__section-label">Featured note</div>
            <article className="feed__feature">
              <div className="feed__feature-meta">
                <span
                  className={`feed__tag feed__tag--${featuredPost.category}`}
                >
                  {formatCategoryLabel(featuredPost.category)}
                </span>
                <span>{featuredPost.timestamp}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.content}</p>
            </article>
          </>
        )}

        <div className="feed__section-label">Recent notes</div>
        <div className="feed__notes">
          {entries.map((post) => (
            <article key={post.id} className="feed__entry">
              <div className="feed__entry-meta">
                <span className={`feed__tag feed__tag--${post.category}`}>
                  {formatCategoryLabel(post.category)}
                </span>
                <span>{post.timestamp}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </article>
          ))}
        </div>

        <div className="feed__section-label">
          Live shipping
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

        <div className="feed__commit-list">
          {commits.map((commit) => (
            <a
              key={commit.id}
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              className="feed__commit-item"
            >
              <div className="feed__commit-top">
                <div className="feed__commit-project">
                  <span className="feed__commit-dot" aria-hidden="true" />
                  <strong className="feed__commit-repo">
                    {formatProjectName(commit.repo)}
                  </strong>
                </div>
                <span>{timeAgo(commit.timestamp)}</span>
              </div>
              <div className="feed__commit-card">
                <div className="feed__commit-row">
                  <span className="feed__commit-label">Message</span>
                  <span className="feed__commit-msg">{commit.message}</span>
                </div>
                <div className="feed__commit-row">
                  <span className="feed__commit-label">Source</span>
                  <span className="feed__commit-link">View commit on GitHub</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
