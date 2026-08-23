export default function Navbar({ theme, toggleTheme, activeSection }) {
  const links = [
    { href: '#main', label: 'Home', id: 'main' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#tools', label: 'Tools', id: 'tools' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-[var(--color-nav-bg)] backdrop-blur-2xl border-b border-[var(--color-card-border)] transition-[background-color] duration-[350ms]">
      <div className="font-[family-name:var(--font-display)] font-bold text-xl tracking-tight text-gradient-1">
        YN.
      </div>

      <ul className="hidden md:flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={`group relative text-sm font-medium transition-colors duration-[350ms] ${
                activeSection === link.id
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-1 transition-all duration-[350ms] ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
        className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[var(--color-card-bg)] border border-[var(--color-card-border)] text-[var(--color-text-primary)] cursor-pointer transition-all duration-[350ms] hover:border-[var(--color-accent)] hover:scale-[1.08]"
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </nav>
  )
}
