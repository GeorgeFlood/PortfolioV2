import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import './Apps.css';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function GitHub() {
  const { repos, isLoading, error } = useGitHubRepos(8);
  const username = import.meta.env.VITE_GITHUB_USERNAME ?? '';
  const featuredRepos = repos
    .filter(
      (repo) =>
        Boolean(repo.description?.trim()) &&
        repo.name.toLowerCase() !== username.toLowerCase()
    )
    .slice(0, 6);

  return (
    <div className="app-content github">
      <div className="app-hero app-hero--dark">
        <div className="app-hero__text">
          <h1>GitHub</h1>
          <p>Live repositories pulled from the GitHub API.</p>
        </div>
        <a
          className="github__profile-link"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Profile &rarr;
        </a>
      </div>

      <div className="app-body github__body">
        {isLoading && <p className="github__state">Loading repositories...</p>}
        {error && <p className="github__state github__state--error">{error}</p>}

        {!isLoading && !error && featuredRepos.length === 0 && (
          <p className="github__state">
            Add descriptions to a few repos on GitHub and they will show up here.
          </p>
        )}

        {!isLoading && !error && featuredRepos.length > 0 && (
          <div className="github__list">
            {featuredRepos.map((repo) => (
              <a
                key={repo.id}
                className="github__repo"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="github__repo-top">
                  <h3>{repo.name}</h3>
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
                <p>{repo.description}</p>
                <div className="github__repo-meta">
                  {repo.language && (
                    <span className="github__repo-lang">
                      <span
                        className="github__lang-dot"
                        style={{
                          background:
                            repo.language === 'TypeScript'
                              ? '#3178c6'
                              : repo.language === 'JavaScript'
                                ? '#f1e05a'
                                : repo.language === 'PHP'
                                  ? '#4F5D95'
                                  : repo.language === 'CSS'
                                    ? '#563d7c'
                                    : '#6e7781',
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="github__repo-stat">
                      {repo.stargazers_count} stars
                    </span>
                  )}
                  <span className="github__repo-stat">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                  {repo.homepage && <span className="github__repo-live">Live</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHub;
