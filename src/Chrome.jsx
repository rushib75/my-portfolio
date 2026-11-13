import { useEffect, useState } from 'react';
import { Container } from './ui';
import { footer, nav, profile, socials } from './content';

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage blocked: theme still applies for this visit */ }
    setTheme(next);
  };
  return [theme, toggle];
}

const Icon = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const SUN = 'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z';
const MOON = 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z';
const MENU = 'M4 7h16M4 12h16M4 17h16';
const CLOSE = 'M6 6l12 12M18 6L6 18';
const YEAR = new Date().getFullYear();

export function Navbar() {
  const [theme, toggleTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    // sections load lazily, so re-check shortly after mount as well
    const observe = () => nav.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) io.observe(el);
    });
    observe();
    const t = setTimeout(observe, 1500);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const themeBtn = (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:text-ink"
    >
      <Icon d={theme === 'dark' ? SUN : MOON} />
    </button>
  );

  return (
    <header className={`glass sticky top-0 z-50 border-b transition-[border-color,box-shadow] duration-200 ${scrolled ? 'border-line shadow-1' : 'border-transparent'}`}>
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-h4 text-ink">{profile.name}</a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map(({ label, href }) => {
            const on = active === href.slice(1);
            return (
              <a key={href} href={href} aria-current={on ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-small font-medium transition-colors ${on ? 'bg-primary/10 text-link' : 'text-ink-muted hover:text-ink'}`}>
                {label}
              </a>
            );
          })}
          <a href="#contact" className="ml-2 rounded-full bg-primary px-5 py-2 text-small font-semibold text-primary-fg transition-colors hover:bg-primary-hover">Contact</a>
          <span className="ml-2">{themeBtn}</span>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {themeBtn}
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-10 w-10 place-items-center rounded-full text-ink">
            <Icon d={open ? CLOSE : MENU} />
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="animate-rise border-t border-line lg:hidden">
          <Container className="flex flex-col py-3">
            {[...nav, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-md py-3 text-base font-medium text-ink">{label}</a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--grad-from)/.7),rgb(var(--grad-to)/.7),transparent)]" />
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-h3 text-ink">{profile.name}</p>
          <p className="mt-3 max-w-prose text-base text-ink-muted">{footer.statement}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="mb-3 text-small font-semibold text-ink">Pages</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="text-base text-ink-muted transition-colors hover:text-ink">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-3 text-small font-semibold text-ink">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-base text-link underline-offset-4 hover:underline">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex items-center justify-between border-t border-line py-6 text-small text-ink-subtle">
        <p>© {YEAR} {profile.name}</p>
        <a href="#home" className="transition-colors hover:text-ink">Back to top</a>
      </Container>
    </footer>
  );
}
