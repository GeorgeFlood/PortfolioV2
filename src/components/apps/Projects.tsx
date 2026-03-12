import './Apps.css';

const stack = ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'Railway'];
const apis = ['TfL Journey Planner', 'OpenStreetMap Nominatim'];
const process = ['AI-assisted build', 'Manual PR review', 'Feature iteration'];

function Projects() {
  return (
    <div className="app-content projects">
      <div className="app-hero app-hero--purple">
        <div className="app-hero__text">
          <h1>Projects</h1>
          <p>Things I've built and am actively working on.</p>
        </div>
      </div>

      <div className="app-body projects__body">
        <div className="project-feature">
          <div className="project-feature__header">
            <div className="project-feature__badge">
              <span className="project-feature__badge-dot" aria-hidden="true" />
              Live
            </div>
            <a
              href="https://www.meethere.live"
              target="_blank"
              rel="noreferrer"
              className="project-feature__link"
            >
              meethere.live &rarr;
            </a>
          </div>

          <h3 className="project-feature__title">MeetHere</h3>
          <p className="project-feature__desc">
            A London meet-up planner that finds the fairest place for everyone to
            travel to. Enter postcodes, pick the vibe, and get balanced routes,
            costs, and suggested venues in one pass.
          </p>

          <div className="project-feature__details">
            <div className="project-feature__detail project-feature__detail--stack">
              <span className="project-feature__detail-label">Stack</span>
              <div className="project-feature__detail-tags">
                {stack.map((item) => (
                  <span key={item} className="project-feature__detail-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-feature__detail project-feature__detail--api">
              <span className="project-feature__detail-label">APIs</span>
              <div className="project-feature__detail-tags">
                {apis.map((item) => (
                  <span key={item} className="project-feature__detail-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-feature__detail project-feature__detail--process">
              <span className="project-feature__detail-label">Process</span>
              <div className="project-feature__detail-tags">
                {process.map((item) => (
                  <span key={item} className="project-feature__detail-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-feature__highlights">
            <div className="project-feature__highlight">
              <strong>Real-time sessions</strong>
              <span>Share a link, friends join live, no sign-up needed</span>
            </div>
            <div className="project-feature__highlight">
              <strong>Fair routing</strong>
              <span>Optimises for the fairest travel time spread, not just the shortest average</span>
            </div>
            <div className="project-feature__highlight">
              <strong>Vibe filtering</strong>
              <span>Pick "coffee", "drinks", or "food" to surface relevant meeting spots</span>
            </div>
          </div>
        </div>

        <div className="projects__more">
          <h3>More coming soon</h3>
          <p>
            This portfolio itself is a project — an OS-style interface built with
            React, TypeScript, and CSS. More builds are on the way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
