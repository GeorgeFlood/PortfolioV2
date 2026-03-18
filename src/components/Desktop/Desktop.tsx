import { useState, useCallback } from 'react';
import MenuBar from './MenuBar';
import Dock, { type DockApp } from './Dock';
import Window from '../Window/Window';
import AboutMe from '../apps/AboutMe';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';
import GitHub from '../apps/GitHub';
import Feed from '../apps/Feed';
import { useWallpaperCycle } from '../../hooks/useWallpaperCycle';
import macOSAurora from '../../assets/desktopWallpapers/MacOSAurora.jpg';
import windows95 from '../../assets/desktopWallpapers/windows95.jpg';
import windowsXP from '../../assets/desktopWallpapers/windowsXP.jpg';
import './Desktop.css';

const desktopWallpapers = [macOSAurora, windowsXP, windows95];

const PersonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21v-2a5 5 0 0 1 10 0v2" />
  </svg>
);

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.49 0 12.26c0 5.42 3.44 10.01 8.21 11.64.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.24-3.34.75-4.04-1.47-4.04-1.47-.55-1.44-1.34-1.82-1.34-1.82-1.09-.77.08-.76.08-.76 1.2.09 1.83 1.28 1.83 1.28 1.07 1.89 2.81 1.35 3.49 1.03.11-.8.42-1.35.76-1.66-2.66-.31-5.47-1.37-5.47-6.12 0-1.35.47-2.46 1.24-3.33-.13-.31-.54-1.58.12-3.29 0 0 1.01-.34 3.3 1.27a11.2 11.2 0 013-.42c1.02 0 2.05.14 3 .42 2.3-1.61 3.3-1.27 3.3-1.27.66 1.71.25 2.98.12 3.29.77.87 1.24 1.98 1.24 3.33 0 4.76-2.81 5.8-5.49 6.1.43.39.82 1.16.82 2.35 0 1.7-.02 3.08-.02 3.5 0 .32.22.7.83.58A12.33 12.33 0 0024 12.26C24 5.49 18.63 0 12 0z" />
  </svg>
);

const FeedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-7l-3 8-3-16-3 8H2" />
  </svg>
);

const dockApps: DockApp[] = [
  { id: 'about', name: 'About Me', color: '#007AFF', icon: <PersonIcon /> },
  { id: 'projects', name: 'Projects', color: '#5856D6', icon: <CodeIcon /> },
  { id: 'github', name: 'GitHub', color: '#111827', icon: <GitHubIcon /> },
  { id: 'feed', name: 'Feed', color: '#0EA5E9', icon: <FeedIcon /> },
  { id: 'contact', name: 'Contact', color: '#34C759', icon: <MailIcon /> },
];

const appContent: Record<string, { title: string; element: React.ReactNode }> =
  {
    about: { title: 'About Me', element: <AboutMe /> },
    projects: { title: 'Projects', element: <Projects /> },
    github: { title: 'GitHub', element: <GitHub /> },
    feed: { title: 'Blog Feed', element: <Feed /> },
    contact: { title: 'Contact', element: <Contact /> },
  };

function Desktop() {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);

  const { currentWallpaper, nextWallpaper, isFading, fadeDuration } =
    useWallpaperCycle({
      wallpapers: desktopWallpapers,
      interval: 25_000,
      fadeDuration: 3_000,
    });

  const openApp = useCallback((id: string) => {
    setOpenApps(prev => {
      if (prev.includes(id)) {
        setFocusedApp(id);
        return [...prev.filter(a => a !== id), id];
      }
      return [...prev, id];
    });
    setFocusedApp(id);
  }, []);

  const closeApp = useCallback((id: string) => {
    setOpenApps(prev => prev.filter(a => a !== id));
    setFocusedApp(prev => (prev === id ? null : prev));
  }, []);

  const focusApp = useCallback((id: string) => {
    setFocusedApp(id);
    setOpenApps(prev => [...prev.filter(a => a !== id), id]);
  }, []);

  const activeAppName = focusedApp
    ? (appContent[focusedApp]?.title ?? null)
    : null;

  return (
    <div className="desktop">
      <MenuBar activeApp={activeAppName} />

      <div
        className="desktop__wallpaper"
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />
      {nextWallpaper && (
        <div
          className={`desktop__wallpaper desktop__wallpaper--next ${isFading ? 'desktop__wallpaper--fading' : ''}`}
          style={{
            backgroundImage: `url(${nextWallpaper})`,
            transitionDuration: `${fadeDuration}ms`,
          }}
        />
      )}

      <div className="desktop__canvas">
        {openApps.length === 0 && (
          <div className="desktop__hint">
            <span className="desktop__hint-text">
              Web Developer &middot; Open to work
            </span>
          </div>
        )}

        {openApps.map((appId, index) => {
          const app = appContent[appId];
          if (!app) return null;
          return (
            <Window
              key={appId}
              title={app.title}
              isActive={focusedApp === appId}
              zIndex={index + 1}
              initialX={Math.max(
                20,
                (window.innerWidth - 720) / 2 + index * 100,
              )}
              initialY={Math.max(48, 80 + index * 28)}
              onClose={() => closeApp(appId)}
              onFocus={() => focusApp(appId)}
            >
              {app.element}
            </Window>
          );
        })}
      </div>

      <Dock apps={dockApps} openApps={openApps} onAppClick={openApp} />
    </div>
  );
}

export default Desktop;
