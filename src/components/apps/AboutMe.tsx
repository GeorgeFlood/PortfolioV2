import headshot from '../../assets/headshot.png';
import './Apps.css';

const skillGroups = [
  {
    label: 'Backend',
    items: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Eloquent ORM', 'MVC'],
  },
  {
    label: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'Redux', 'HTML5', 'CSS3/SASS', 'Tailwind CSS'],
  },
  {
    label: 'Infrastructure',
    items: ['AWS (EC2, S3, Route 53)', 'Ubuntu', 'Nginx', 'SSL', 'DNS', 'CI/CD'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Figma', 'Composer', 'npm', 'Linux CLI', 'VS Code'],
  },
  {
    label: 'Other',
    items: ['React Native', 'Three.js', 'SEO', 'Agile'],
  },
];

function AboutMe() {
  return (
    <div className="app-content about">
      <div className="app-hero app-hero--blue">
        <img src={headshot} alt="George Flood" className="about__avatar" />
        <div className="about__hero-text">
          <h1>George Flood</h1>
          <p>Web Developer &middot; London, UK</p>
          <div className="about__links">
            <a href="https://www.linkedin.com/in/george-flood/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/GeorgeFlood" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="app-body">
        <p className="about__bio">
          Web developer with over a year of in-house experience building
          Laravel/PHP features and managing AWS infrastructure across 200+ sites.
          Two years prior freelancing for small businesses. Self-taught, coming
          from a hospitality management background. Looking for a role where I can
          keep building, keep learning, and contribute to a team that cares about
          the quality of what they ship.
        </p>

        <div className="about__section">
          <h2>Technical Skills</h2>
          <div className="about__skill-groups">
            {skillGroups.map((group) => (
              <div key={group.label} className="about__skill-group">
                <span className="about__skill-label">{group.label}</span>
                <div className="about__skills">
                  {group.items.map((skill) => (
                    <span key={skill} className="about__skill">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about__section">
          <h2>Experience</h2>

          <div className="about__experience-item">
            <div className="about__exp-header">
              <h4>Junior Web Developer</h4>
              <span className="about__exp-date">Sep 2024 – Dec 2025</span>
            </div>
            <p className="about__exp-company">Hydro Cleansing &middot; London, UK</p>
            <ul className="about__exp-bullets">
              <li>Built a custom Laravel CMS from scratch handling 200+ content pages with structured blocks, SEO fields, and role-based access</li>
              <li>Collaborated with a UI/UX designer to implement pixel-perfect front-end layouts from Figma designs into responsive Blade templates</li>
              <li>Wrote Eloquent ORM queries, built database migrations, and designed MySQL schemas for dynamic content and internal tooling</li>
              <li>Introduced Git-based version control for content updates with review capability and safe rollback across all managed sites</li>
              <li>Managed AWS-hosted Ubuntu/Nginx infrastructure running 200+ websites — deployments, virtual hosts, SSL renewals</li>
              <li>Prototyped a React Native (Android) app for internal compliance workflows, used to secure stakeholder buy-in</li>
            </ul>
          </div>

          <div className="about__experience-item">
            <div className="about__exp-header">
              <h4>Freelance Web Developer</h4>
              <span className="about__exp-date">Aug 2022 – Sep 2024</span>
            </div>
            <p className="about__exp-company">Self-Employed (Fiverr / Upwork) &middot; Remote</p>
            <ul className="about__exp-bullets">
              <li>Built responsive brochure sites and landing pages for small business clients with mobile-first design and cross-browser support</li>
              <li>Managed full project lifecycle from requirements gathering through design, development, deployment, and post-launch support</li>
              <li>Applied on-page SEO best practices including semantic HTML, structured data, and performance optimisation</li>
            </ul>
          </div>

          <div className="about__experience-item">
            <div className="about__exp-header">
              <h4>Hospitality Management</h4>
              <span className="about__exp-date">Apr 2018 – Aug 2024</span>
            </div>
            <p className="about__exp-company">Young's Pubs / Costa Coffee &middot; London, UK</p>
            <ul className="about__exp-bullets">
              <li>Progressed from barista to manager across multiple venues, overseeing daily operations, staff training, and customer experience</li>
              <li>Developed strong communication, problem-solving, and team leadership skills in high-pressure environments</li>
            </ul>
          </div>
        </div>

        <div className="about__section">
          <h2>Projects</h2>
          <div className="about__experience-item">
            <div className="about__exp-header">
              <h4>MeetHere</h4>
              <a href="https://meethere.live" target="_blank" rel="noreferrer" className="about__project-link">meethere.live</a>
            </div>
            <ul className="about__exp-bullets">
              <li>Full-stack London transit app that calculates the fairest meeting point between multiple people using the TfL API and OpenStreetMap</li>
              <li>Stack: Laravel, vanilla JavaScript, MySQL — hosted on Railway with a custom domain</li>
              <li>Building features independently and raising PRs to deepen full-stack understanding</li>
            </ul>
          </div>
        </div>

        <div className="about__section">
          <h2>Education</h2>
          <div className="about__experience-item">
            <h4>Treehouse TechDegree</h4>
            <p className="about__exp-company">HTML, CSS &amp; JavaScript</p>
            <p className="about__exp-company">Self-taught through online resources, documentation, and hands-on project work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
