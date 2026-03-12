import { feedPosts } from '../../lib/feed';
import { useCommitFeed } from '../../hooks/useCommitFeed';
import avatar from '../../assets/avatar.png';
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
              <img src={avatar} alt="" className="feed__avatar feed__avatar--image" />
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
              <img src={avatar} alt="" className="feed__avatar feed__avatar--image" />
              <div className="feed__body">
                <div className="feed__meta">
                  <strong>George Flood</strong>
                  <span>@GeorgeFlood</span>
                  <span>{timeAgo(commit.timestamp)}</span>
                </div>
                <div className="feed__commit-card">
                  <div className="feed__commit-row">
                    <span className="feed__commit-label">Project</span>
                    <strong className="feed__commit-repo">
                      {formatProjectName(commit.repo)}
                    </strong>
                  </div>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="feed__commit-row feed__commit-row--link"
                  >
                    <span className="feed__commit-label">Commit</span>
                    <span className="feed__commit-msg">{commit.message}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
