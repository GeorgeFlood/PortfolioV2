import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type PointerEvent,
} from 'react';
import AboutMe from '../apps/AboutMe';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';
import GitHub from '../apps/GitHub';
import Feed from '../apps/Feed';
import { useWallpaperCycle } from '../../hooks/useWallpaperCycle';
import mobileWp1 from '../../assets/mobileWallpapers/andriodWallpaper.jpg';
import mobileWp2 from '../../assets/mobileWallpapers/andriodwallpaper2.jpg';
import mobileWp3 from '../../assets/mobileWallpapers/andriodwallpaper3.jpeg';
import './Mobile.css';

const mobileWallpapers = [mobileWp1, mobileWp2, mobileWp3];
const LONG_PRESS_MS = 220;
const DRAG_CANCEL_DISTANCE = 10;
const APP_ORDER_STORAGE_KEY = 'portfolio-mobile-app-order';

interface MobileApp {
  id: string;
  name: string;
  color: string;
  icon: ReactNode;
  content: ReactNode;
}

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

const apps: MobileApp[] = [
  {
    id: 'about',
    name: 'About Me',
    color: '#4285F4',
    icon: <PersonIcon />,
    content: <AboutMe />,
  },
  {
    id: 'projects',
    name: 'Projects',
    color: '#7C4DFF',
    icon: <CodeIcon />,
    content: <Projects />,
  },
  {
    id: 'feed',
    name: 'Feed',
    color: '#0EA5E9',
    icon: <FeedIcon />,
    content: <Feed />,
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#1e293b',
    icon: <GitHubIcon />,
    content: <GitHub />,
  },
  {
    id: 'contact',
    name: 'Contact',
    color: '#00C853',
    icon: <MailIcon />,
    content: <Contact />,
  },
];

const appMap = Object.fromEntries(apps.map(app => [app.id, app] as const));
const defaultAppOrder = apps.map(app => app.id);

function normalizeAppOrder(order: string[]) {
  const validIds = order.filter(id => defaultAppOrder.includes(id));
  const missingIds = defaultAppOrder.filter(id => !validIds.includes(id));
  return [...validIds, ...missingIds];
}

function moveApp(order: string[], sourceId: string, targetId: string) {
  if (sourceId === targetId) return order;

  const next = [...order];
  const sourceIndex = next.indexOf(sourceId);
  const targetIndex = next.indexOf(targetId);

  if (sourceIndex === -1 || targetIndex === -1) return order;

  next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, sourceId);
  return next;
}

function Mobile() {
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [appOrder, setAppOrder] = useState(() => {
    if (typeof window === 'undefined') return defaultAppOrder;

    const stored = window.localStorage.getItem(APP_ORDER_STORAGE_KEY);
    if (!stored) return defaultAppOrder;

    try {
      return normalizeAppOrder(JSON.parse(stored) as string[]);
    } catch {
      return defaultAppOrder;
    }
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const pressTimerRef = useRef<number | null>(null);
  const pressStateRef = useRef<{
    appId: string;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const suppressOpenRef = useRef(false);

  const { currentWallpaper, nextWallpaper, isFading, fadeDuration } =
    useWallpaperCycle({
      wallpapers: mobileWallpapers,
      interval: 20_000,
      fadeDuration: 2_500,
    });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      APP_ORDER_STORAGE_KEY,
      JSON.stringify(appOrder),
    );
  }, [appOrder]);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const orderedApps = appOrder.map(id => appMap[id]).filter(Boolean);
  const currentApp = openApp ? appMap[openApp] : null;

  const clearPressTimer = () => {
    if (pressTimerRef.current !== null) {
      window.clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const finishDrag = (
    sourceId?: string,
    clientX?: number,
    clientY?: number,
  ) => {
    if (
      sourceId &&
      typeof clientX === 'number' &&
      typeof clientY === 'number'
    ) {
      const target = document
        .elementFromPoint(clientX, clientY)
        ?.closest<HTMLElement>('[data-app-id]');
      const targetId = target?.dataset.appId;

      if (targetId && targetId !== sourceId) {
        setAppOrder(prev => moveApp(prev, sourceId, targetId));
      }
    }

    setDraggingId(null);
    setDropTargetId(null);
    setDragOffset({ x: 0, y: 0 });
    pressStateRef.current = null;
    suppressOpenRef.current = true;
    window.setTimeout(() => {
      suppressOpenRef.current = false;
    }, 0);
  };

  const handlePointerDown = (
    appId: string,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    pressStateRef.current = {
      appId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };

    clearPressTimer();
    pressTimerRef.current = window.setTimeout(() => {
      setDraggingId(appId);
      setDropTargetId(appId);
      setDragOffset({ x: 0, y: 0 });
      suppressOpenRef.current = true;
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (
    appId: string,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const press = pressStateRef.current;
    if (!press || press.appId !== appId || press.pointerId !== event.pointerId)
      return;

    const x = event.clientX - press.startX;
    const y = event.clientY - press.startY;

    if (draggingId !== appId) {
      if (Math.hypot(x, y) > DRAG_CANCEL_DISTANCE) {
        clearPressTimer();
      }
      return;
    }

    event.preventDefault();
    setDragOffset({ x, y });

    const hovered = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-app-id]');

    const hoveredId = hovered?.dataset.appId ?? null;
    setDropTargetId(hoveredId && hoveredId !== appId ? hoveredId : null);
  };

  const handlePointerUp = (
    appId: string,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const press = pressStateRef.current;
    if (!press || press.appId !== appId || press.pointerId !== event.pointerId)
      return;

    clearPressTimer();

    if (draggingId === appId) {
      finishDrag(appId, event.clientX, event.clientY);
      return;
    }

    pressStateRef.current = null;
  };

  const handlePointerCancel = (
    appId: string,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const press = pressStateRef.current;
    if (!press || press.appId !== appId || press.pointerId !== event.pointerId)
      return;

    clearPressTimer();

    if (draggingId === appId) {
      finishDrag();
      return;
    }

    pressStateRef.current = null;
  };

  const handleAppOpen = (appId: string) => {
    if (suppressOpenRef.current || draggingId) return;
    setOpenApp(appId);
  };

  return (
    <div className="android">
      <div
        className="android__wallpaper"
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />
      {nextWallpaper && (
        <div
          className={`android__wallpaper android__wallpaper--next ${isFading ? 'android__wallpaper--fading' : ''}`}
          style={{
            backgroundImage: `url(${nextWallpaper})`,
            transitionDuration: `${fadeDuration}ms`,
          }}
        />
      )}

      {/* Status Bar */}
      <div
        className={`android__status ${openApp ? 'android__status--app' : ''}`}
      >
        <span className="android__status-time">{formattedTime}</span>
        <div className="android__status-icons">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
          </svg>
        </div>
      </div>

      {openApp && currentApp ? (
        /* ── App View ── */
        <div
          className="android__activity"
          style={{ '--app-color': currentApp.color } as React.CSSProperties}
        >
          <div className="android__app-bar">
            <button
              className="android__back-btn"
              onClick={() => setOpenApp(null)}
              aria-label="Go back"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <span className="android__app-bar-title">{currentApp.name}</span>
          </div>
          <div className="android__app-content">{currentApp.content}</div>
        </div>
      ) : (
        /* ── Home Screen ── */
        <div className="android__home">
          <div className="android__widget">
            <span className="android__widget-time">{formattedTime}</span>
            <span className="android__widget-date">{formattedDate}</span>
          </div>

          <div className="android__grid">
            {orderedApps.map(app => (
              <button
                key={app.id}
                className={`android__app-icon ${
                  draggingId === app.id ? 'android__app-icon--dragging' : ''
                } ${dropTargetId === app.id ? 'android__app-icon--target' : ''}`}
                data-app-id={app.id}
                onClick={() => handleAppOpen(app.id)}
                onPointerDown={event => handlePointerDown(app.id, event)}
                onPointerMove={event => handlePointerMove(app.id, event)}
                onPointerUp={event => handlePointerUp(app.id, event)}
                onPointerCancel={event => handlePointerCancel(app.id, event)}
                style={
                  draggingId === app.id
                    ? {
                        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.08)`,
                      }
                    : undefined
                }
              >
                <div
                  className="android__icon-shape"
                  style={{ background: app.color }}
                >
                  {app.icon}
                </div>
                <span className="android__app-label">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="android__navbar"></div>
    </div>
  );
}

export default Mobile;
