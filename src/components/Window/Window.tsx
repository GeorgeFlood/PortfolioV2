import { useState, useEffect, useRef, type ReactNode } from 'react';
import './Window.css';

interface WindowProps {
  title: string;
  isActive: boolean;
  zIndex: number;
  initialX: number;
  initialY: number;
  onClose: () => void;
  onFocus: () => void;
  children: ReactNode;
}

function Window({
  title,
  isActive,
  zIndex,
  initialX,
  initialY,
  onClose,
  onFocus,
  children,
}: WindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newY = Math.max(28, e.clientY - dragOffset.current.y);
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: newY,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window__btn')) return;
    onFocus();
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
  };

  return (
    <div
      className={`window ${isActive ? 'window--active' : ''} ${isDragging ? 'window--dragging' : ''}`}
      style={{ left: position.x, top: position.y, zIndex }}
      onMouseDown={onFocus}
    >
      <div className="window__titlebar" onMouseDown={handleTitleBarMouseDown}>
        <div className="window__traffic-lights">
          <button
            className="window__btn window__btn--close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close window"
          />
          <button
            className="window__btn window__btn--minimize"
            aria-label="Minimize window"
          />
          <button
            className="window__btn window__btn--fullscreen"
            aria-label="Fullscreen window"
          />
        </div>
        <span className="window__title">{title}</span>
      </div>
      <div className="window__content">{children}</div>
    </div>
  );
}

export default Window;
