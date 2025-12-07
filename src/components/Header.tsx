interface HeaderProps {
  siteName?: string;
}

export default function Header({ siteName = 'Sneyder\'s Chronicles' }: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-[var(--color-accent)]"
        >
          {siteName}
        </a>
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="/"
              className="text-[var(--color-text-muted)] transition-colors hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="https://sneyder-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] transition-colors hover:text-white"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Sneyder2328"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] transition-colors hover:text-white"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

