import { useState, useEffect, useCallback } from 'react';

interface WallpaperCycleOptions {
  wallpapers: string[];
  interval?: number;
  fadeDuration?: number;
}

export function useWallpaperCycle({
  wallpapers,
  interval = 25_000,
  fadeDuration = 3_000,
}: WallpaperCycleOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  const startFade = useCallback(() => {
    if (wallpapers.length <= 1) return;
    const next = (currentIndex + 1) % wallpapers.length;
    setNextIndex(next);
    requestAnimationFrame(() => setIsFading(true));
  }, [currentIndex, wallpapers.length]);

  useEffect(() => {
    if (wallpapers.length <= 1) return;
    const timer = setInterval(startFade, interval);
    return () => clearInterval(timer);
  }, [startFade, interval, wallpapers.length]);

  useEffect(() => {
    if (!isFading || nextIndex === null) return;
    const timer = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
      setIsFading(false);
    }, fadeDuration);
    return () => clearTimeout(timer);
  }, [isFading, nextIndex, fadeDuration]);

  return {
    currentWallpaper: wallpapers[currentIndex],
    nextWallpaper: nextIndex !== null ? wallpapers[nextIndex] : null,
    isFading,
    fadeDuration,
  };
}
