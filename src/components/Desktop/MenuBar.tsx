import { useState, useEffect } from 'react';

function MenuBar({ activeApp }: { activeApp: string | null }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className="menubar">
      <div className="menubar__left">
        <span className="menubar__app-name">
          {activeApp || 'George Flood'}
        </span>
      </div>
      <div className="menubar__right">
        <span className="menubar__status">
          <span className="menubar__status-dot" />
          Available
        </span>
        <span className="menubar__item">{formattedDate}</span>
        <span className="menubar__item menubar__time">{formattedTime}</span>
      </div>
    </header>
  );
}

export default MenuBar;
