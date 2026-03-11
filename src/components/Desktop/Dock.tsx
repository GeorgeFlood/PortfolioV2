import type { ReactNode } from 'react';

export interface DockApp {
  id: string;
  name: string;
  color: string;
  icon: ReactNode;
}

interface DockProps {
  apps: DockApp[];
  openApps: string[];
  onAppClick: (id: string) => void;
}

function Dock({ apps, openApps, onAppClick }: DockProps) {
  return (
    <nav className="dock">
      <div className="dock__container">
        <div className="dock__reflection" />
        {apps.map((app) => (
          <button
            key={app.id}
            className={`dock__item ${openApps.includes(app.id) ? 'dock__item--open' : ''}`}
            onClick={() => onAppClick(app.id)}
            aria-label={`Open ${app.name}`}
          >
            <div className="dock__icon" style={{ background: app.color }}>
              {app.icon}
            </div>
            <span className="dock__tooltip">{app.name}</span>
            {openApps.includes(app.id) && (
              <span className="dock__indicator" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Dock;
