import './Apps.css';

function Projects() {
  return (
    <div className="app-content projects">
      <div className="app-hero app-hero--purple">
        <div className="app-hero__text">
          <h1>Projects</h1>
          <p>Things I've built and am actively working on.</p>
        </div>
      </div>

      <div className="app-body">
        <div className="project-feature">
          <div className="project-feature__header">
            <div className="project-feature__badge">Live</div>
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
            A full-stack London transit app that calculates the fairest meeting
            point between multiple people. Enter postcodes, pick a vibe, and
            MeetHere returns journey times, travel costs, and suggested departure
            windows — all powered by the TfL API and OpenStreetMap.
          </p>

          <div className="project-feature__details">
            <div className="project-feature__detail">
              <span className="project-feature__detail-label">Stack</span>
              <span>Laravel, vanilla JS, MySQL, Railway</span>
            </div>
            <div className="project-feature__detail">
              <span className="project-feature__detail-label">APIs</span>
              <span>TfL Journey Planner, OpenStreetMap Nominatim</span>
            </div>
            <div className="project-feature__detail">
              <span className="project-feature__detail-label">Process</span>
              <span>Built with Claude, manually reviewing and adding to every PR</span>
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

          <div className="project-card__tags" style={{ marginTop: 16 }}>
            <span className="project-card__tag">Laravel</span>
            <span className="project-card__tag">PHP</span>
            <span className="project-card__tag">JavaScript</span>
            <span className="project-card__tag">MySQL</span>
            <span className="project-card__tag">TfL API</span>
            <span className="project-card__tag">OpenStreetMap</span>
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
