export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {currentYear} Built By Sneyder Angulo with <a href="https://astro.build" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]">Astro</a> & <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]">React</a>.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sneyder-angulo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              LinkedIn
            </a>
            <a
              href="https://medium.com/@sneyderangulo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              Medium
            </a>
            <a
              href="https://x.com/sneyderhack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

