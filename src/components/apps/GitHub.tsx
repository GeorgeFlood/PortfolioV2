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

  return (
    <div className="app-content github">
      <div className="app-hero app-hero--dark">
        <div className="app-hero__text">
          <h1>GitHub</h1>
          <p>Live repositories pulled from the GitHub API.</p>
        </div>
        <a
          className="github__profile-link"
          href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME ?? ''}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Profile &rarr;
        </a>
      </div>

      <div className="app-body">
        {isLoading && <p className="github__state">Loading repositories...</p>}
        {error && <p className="github__state github__state--error">{error}</p>}

        {!isLoading && !error && (
          <div className="github__list">
            {repos.map((repo) => (
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
                <p>{repo.description || 'No description added yet.'}</p>
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
                    <span>{repo.stargazers_count} stars</span>
                  )}
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
