import { useEffect, useRef } from 'react';

type UmamiPostTrackerProps = {
  slug: string;
  tags: string[];
  readingTimeMinutes: number;
  engagedTimeMs?: number;
  engagedScrollRatio?: number; // 0..1
  completedScrollRatio?: number; // 0..1
};

function getScrollProgressRatio(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const viewportHeight = window.innerHeight || doc.clientHeight || 0;
  const scrollHeight = doc.scrollHeight || 0;

  if (scrollHeight <= 0) return 0;

  const ratio = (scrollTop + viewportHeight) / scrollHeight;
  return Math.max(0, Math.min(1, ratio));
}

function trackUmami(event: string, data: Record<string, string | number | boolean>) {
  const umami = (window as any)?.umami;
  if (!umami || typeof umami.track !== 'function') return;
  umami.track(event, data);
}

export default function UmamiPostTracker({
  slug,
  tags,
  readingTimeMinutes,
  engagedTimeMs = 15_000,
  engagedScrollRatio = 0.5,
  completedScrollRatio = 0.9,
}: UmamiPostTrackerProps) {
  const engagedFiredRef = useRef(false);
  const completedFiredRef = useRef(false);
  const timeThresholdMetRef = useRef(false);
  const scrollThresholdMetRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    engagedFiredRef.current = false;
    completedFiredRef.current = false;
    timeThresholdMetRef.current = false;
    scrollThresholdMetRef.current = false;

    const tagsString = tags.join(',');

    const maybeFireEngaged = () => {
      if (engagedFiredRef.current) return;
      if (!timeThresholdMetRef.current) return;
      if (!scrollThresholdMetRef.current) return;

      trackUmami('post_engaged', {
        slug,
        tags: tagsString,
        readingTimeMinutes,
      });
      engagedFiredRef.current = true;
    };

    const maybeFireCompleted = (scrollRatio: number) => {
      if (completedFiredRef.current) return;
      if (scrollRatio < completedScrollRatio) return;

      trackUmami('post_completed', {
        slug,
        tags: tagsString,
        readingTimeMinutes,
      });
      completedFiredRef.current = true;
    };

    const onScrollOrResize = () => {
      const scrollRatio = getScrollProgressRatio();
      if (scrollRatio >= engagedScrollRatio) {
        scrollThresholdMetRef.current = true;
      }
      maybeFireEngaged();
      maybeFireCompleted(scrollRatio);
    };

    const timerId = window.setTimeout(() => {
      timeThresholdMetRef.current = true;
      maybeFireEngaged();
    }, engagedTimeMs);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true } as AddEventListenerOptions);

    // Run once on mount (handles short posts that fit in viewport)
    onScrollOrResize();

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [slug, tags, readingTimeMinutes, engagedTimeMs, engagedScrollRatio, completedScrollRatio]);

  return null;
}

