import { useEffect, useState } from 'react';

type ShareButtonProps = {
  slug: string;
  url: string;
  title: string;
  description?: string;
};

function trackShareClick(slug: string, method: 'native' | 'copy') {
  if (!import.meta.env.PROD) return;
  const umami = (window as any)?.umami;
  if (!umami || typeof umami.track !== 'function') return;

  umami.track('share_click', {
    slug,
    method,
  });
}

export default function ShareButton({ slug, url, title, description }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const id = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(id);
  }, [status]);

  const onClick = async () => {
    const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

    if (canNativeShare) {
      trackShareClick(slug, 'native');
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        setStatus('shared');
        return;
      } catch {
        // Fall through to copy link
      }
    }

    trackShareClick(slug, 'copy');
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      window.prompt('Copy this link:', url);
      setStatus('copied');
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-tertiary px-3 py-1 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-white"
      aria-label="Share this post"
      title="Share this post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C9.886 14.151 11.315 14.625 12.75 14.625c2.485 0 4.5-1.79 4.5-4s-2.015-4-4.5-4c-1.435 0-2.864.474-4.066 1.283M12.75 14.625v6.75m0-6.75c-1.435 0-2.864-.474-4.066-1.283M8.684 13.342c-.9-.606-1.684-1.434-2.184-2.467M8.684 13.342V6.625m0 0V2.25m0 4.375c.9-.606 1.684-1.434 2.184-2.467"
        />
      </svg>
      <span>
        {status === 'shared' ? 'Shared' : status === 'copied' ? 'Copied' : 'Share'}
      </span>
    </button>
  );
}

