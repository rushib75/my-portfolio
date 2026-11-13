import { useEffect, useRef, useState } from 'react';

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-container px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/** Vertical rhythm: 64px mobile, 80px tablet, 112px desktop */
export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ title, sub, className = '' }) {
  return (
    <div className={`mb-10 max-w-prose lg:mb-14 ${className}`}>
      <h2 className="text-h2 text-ink">{title}</h2>
      {sub && <p className="mt-3 text-lead text-ink-muted">{sub}</p>}
    </div>
  );
}

export function Pill({ children, tone = 'soft', className = '' }) {
  const tones = {
    soft: 'border-transparent bg-surface-2 text-ink-muted',
    outline: 'border-line-strong bg-transparent text-ink-muted',
    primary: 'border-primary/30 bg-primary/10 text-link',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-small font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Button({ href, variant = 'primary', children, className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200';
  const v = {
    primary: 'bg-primary text-primary-fg shadow-2 hover:bg-primary-hover',
    secondary: 'border border-line-strong bg-surface text-ink hover:border-primary/50',
  };
  return <a href={href} className={`${base} ${v[variant]} ${className}`} {...rest}>{children}</a>;
}

/** Children fade up once when scrolled into view. Disabled for reduced motion (see index.css). */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-shown={shown} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/** lucide-react v1 has no brand icons, so LinkedIn stays a local SVG */
export function LinkedinIcon({ size = 20, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function WhatsappIcon({ size = 20, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}