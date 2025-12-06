import { useEffect, useRef } from 'react';

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
  lang?: string;
}

export default function Giscus({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  term,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'bottom',
  lang = 'en',
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isConfigured = repoId && categoryId;

  useEffect(() => {
    if (!ref.current || !isConfigured) return;

    // Clear any existing giscus elements
    const existingScript = ref.current.querySelector('script');
    const existingWidget = ref.current.querySelector('.giscus');
    if (existingScript) existingScript.remove();
    if (existingWidget) existingWidget.remove();

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (term) script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', emitMetadata ? '1' : '0');
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', 'dark_dimmed');
    script.setAttribute('data-lang', lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      const widget = ref.current?.querySelector('.giscus');
      const scriptEl = ref.current?.querySelector('script');
      if (widget) widget.remove();
      if (scriptEl) scriptEl.remove();
    };
  }, [repo, repoId, category, categoryId, mapping, term, reactionsEnabled, emitMetadata, inputPosition, lang, isConfigured]);

  return (
    <section 
      ref={ref} 
      className="giscus-wrapper mt-12 border-t border-[var(--color-border)] pt-8"
      aria-label="Comments"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">Comments</h2>
      {!isConfigured && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
          <p className="text-[var(--color-text-muted)]">
            Comments are powered by{' '}
            <a 
              href="https://giscus.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              Giscus
            </a>
            . To enable comments, configure your GitHub repository settings.
          </p>
        </div>
      )}
    </section>
  );
}

