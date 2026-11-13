import { useState } from 'react';
import { CheckCircle, LayoutDashboard, Mail, Phone, Workflow, CircleX } from 'lucide-react';
import { Button, LinkedinIcon, WhatsappIcon, Pill, Reveal, Section, SectionHeading, Container } from './ui';
import {
  about, cases, casesIntro, contact, contactCopy, firmMgmtData, problems, problemsIntro,
  profile, services, servicesIntro, skillGroups, solutions, timeline,
} from './content';

/* ============================================================
   HERO — asymmetric 7/5 split. One load sequence, then still.
   ============================================================ */
const rise = (i) => ({ animationDelay: `${i * 80}ms` });

function HeroPreview() {
  const max = Math.max(...firmMgmtData.map((d) => d.revenue));
  return (
    <figure style={rise(3)} className="animate-rise lg:col-span-5">
      <div className="rounded-xl border border-line bg-surface shadow-4">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-line-strong" />)}
          <span className="ml-2 text-caption text-ink-subtle">Firm management dashboard</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-surface-2 p-3">
              <p className="text-caption text-ink-muted">Monthly revenue</p>
              <p className="font-display text-h3 text-ink">₹14.5L</p>
            </div>
            <div className="rounded-lg bg-surface-2 p-3">
              <p className="text-caption text-ink-muted">Overdue tasks</p>
              <p className="font-display text-h3 text-warning">18</p>
            </div>
          </div>
          <div role="img" aria-label="Bar chart of monthly revenue, April to September" className="mt-4 flex h-36 items-end gap-2 rounded-lg bg-surface-2 p-3">
            {firmMgmtData.map((d) => (
              <div key={d.month} className="flex-1 rounded-t bg-[linear-gradient(to_top,rgb(var(--grad-from)),rgb(var(--grad-to)))]" style={{ height: `${(d.revenue / max) * 100}%` }} />
            ))}
          </div>
          <div className="mt-2 flex gap-2 px-3 text-center text-caption text-ink-subtle" aria-hidden="true">
            {firmMgmtData.map((d) => <span key={d.month} className="flex-1">{d.month}</span>)}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-caption text-ink-subtle">Illustrative demo data</figcaption>
    </figure>
  );
}

export function Hero() {
  const h = profile.headline;
  return (
    <section id="home" className="grain relative overflow-hidden">
      <div className="mesh" aria-hidden="true" />
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-7">
          <p style={rise(0)} className="animate-rise glass mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-small font-medium text-ink-muted">
            <Workflow className="h-4 w-4 text-link" aria-hidden="true" /> {profile.badge}
          </p>
          <h1 style={rise(1)} className="animate-rise max-w-[22ch] text-h1 text-ink sm:text-display">
            {h.before} <span className="text-gradient">{h.highlight}</span>
          </h1>
          <p style={rise(2)} className="animate-rise mt-6 max-w-prose text-lead text-ink-muted">{profile.intro}</p>
          <div style={rise(3)} className="animate-rise mt-8 flex flex-wrap gap-3">
            <Button href="#dashboards">View Live Dashboards <LayoutDashboard className="h-5 w-5" aria-hidden="true" /></Button>
            <Button href="#solutions" variant="secondary">See Process Automation <Workflow className="h-5 w-5" aria-hidden="true" /></Button>
          </div>
        </div>
        <HeroPreview />
      </Container>
    </section>
  );
}

/* ============================================================
   WHY AUTOMATE — two cards, the right one carries the weight
   ============================================================ */
export function ProblemSolution() {
  return (
    <Section id="solutions" className="bg-surface-2/40">
      <SectionHeading title={problemsIntro.title} sub={problemsIntro.sub} />
      <Reveal className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <div className="rounded-xl border border-line bg-surface p-8">
          <h3 className="mb-6 text-h4 text-ink">Traditional CA Office</h3>
          <ul className="space-y-4">
            {problems.map((t) => (
              <li key={t} className="flex items-start gap-3 text-ink-muted">
                <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" /><span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/40 bg-surface p-8 shadow-3">
          <h3 className="mb-6 text-h4 text-ink">Modern Automated Workflow</h3>
          <ul className="space-y-4">
            {solutions.map((t) => (
              <li key={t} className="flex items-start gap-3 font-medium text-ink">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-link" aria-hidden="true" /><span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
export function Services() {
  return (
    <Section id="services">
      <SectionHeading title={servicesIntro.title} sub={servicesIntro.sub} />
      <Reveal className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {services.map(({ name, desc, icon: Icon }) => (
          <div key={name} className="rounded-xl border border-line bg-surface p-8 shadow-1">
            <span className="mb-6 grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-link">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mb-3 text-h4 text-ink">{name}</h3>
            <p className="text-ink-muted">{desc}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/* ============================================================
   SCENARIOS — hover lift lives here only
   ============================================================ */
export function CaseStudies() {
  return (
    <Section id="case-studies" className="bg-surface-2/40">
      <SectionHeading title={casesIntro.title} sub={casesIntro.sub} />
      <Reveal className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {cases.map((c) => (
          <div key={c.title}>
            <article className="card-lift flex h-full flex-col rounded-xl border border-line bg-surface p-8 shadow-1">
              <Pill tone="primary" className="mb-5 self-start">Conceptual scenario</Pill>
              <h3 className="mb-5 text-h4 text-ink">{c.title}</h3>
              <dl className="space-y-4 text-small">
                <div><dt className="mb-1 font-semibold text-danger">Challenge</dt><dd className="text-ink-muted">{c.challenge}</dd></div>
                <div className="border-t border-line pt-4"><dt className="mb-1 font-semibold text-link">Solution</dt><dd className="text-ink-muted">{c.solution}</dd></div>
              </dl>
              <div className="mt-auto pt-6">
                <div className="rounded-lg border border-success/30 bg-success/10 p-4">
                  <p className="mb-1 text-small font-semibold text-success">Illustrative outcome</p>
                  <p className="text-small font-medium text-ink">{c.outcome}</p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/* ============================================================
   ROI — the "clients" slider is gone (it never fed the maths).
   The 60% is now an adjustable assumption instead of a hidden one.
   ============================================================ */
function Slider({ id, label, hint, value, min, max, step, unit, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-base font-medium text-ink">
        <span>{label}</span><span className="font-display text-h4 text-link">{value}{unit}</span>
      </label>
      <p className="mb-3 mt-1 text-small text-ink-muted">{hint}</p>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line-strong accent-primary" />
    </div>
  );
}

function Stat({ value, label, strong }) {
  return (
    <div className={`rounded-xl p-6 text-center ${strong ? 'bg-[linear-gradient(135deg,rgb(var(--grad-from)),rgb(var(--grad-to)))] text-white' : 'border border-line bg-surface-2'}`}>
      <p className={`font-display text-display ${strong ? '' : 'text-link'}`}>{value}</p>
      <p className={`mt-1 text-base font-medium ${strong ? 'text-white/90' : 'text-ink-muted'}`}>{label}</p>
    </div>
  );
}

export function Roi() {
  const [hours, setHours] = useState(20);
  const [share, setShare] = useState(60);
  const month = Math.round(hours * 4 * (share / 100));
  const year = month * 12;
  return (
    <Section id="roi">
      <SectionHeading title="Calculate Your ROI" sub="See how many billable hours your firm can recover by automating repetitive manual tasks, data consolidation, and follow-ups." />
      <div className="grid gap-10 rounded-2xl border border-line bg-surface p-6 shadow-2 sm:p-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-8">
          <Slider id="roi-hours" label="Manual reporting hours per week" hint="Time spent on data entry, follow-ups, and MIS creation." value={hours} min={5} max={100} step={5} unit=" hrs" onChange={setHours} />
          <Slider id="roi-share" label="Share of that work automated" hint="Your assumption. Move it to test cautious and optimistic cases." value={share} min={20} max={80} step={5} unit="%" onChange={setShare} />
          <p className="rounded-lg bg-surface-2 p-4 text-small text-ink-muted">Illustrative estimate: weekly hours × 4 weeks × the share you choose. It is not a guarantee of results.</p>
        </div>
        <div className="grid content-center gap-4" aria-live="polite">
          <Stat value={month} label="Estimated hours saved per month" />
          <Stat value={year} label="Recovered billable hours per year" strong />
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   ABOUT — skills grouped, no bars; timeline because roles are a sequence
   ============================================================ */
export function About() {
  return (
    <Section id="about" className="bg-surface-2/40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Pill tone="primary" className="mb-6">{about.badge}</Pill>
          <h2 className="mb-6 max-w-prose text-h2 text-ink">{about.title}</h2>
          <div className="max-w-prose space-y-4 text-lead text-ink-muted">
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>

          <h3 className="mb-4 mt-12 text-h4 text-ink">Core skills and expertise</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title} className="rounded-xl border border-line bg-surface p-5">
                <p className="mb-3 text-small font-semibold text-ink">{g.title}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => <li key={s}><Pill tone="outline">{s}</Pill></li>)}
                </ul>
              </div>
            ))}
          </div>

          <ol className="mb-10 ml-2 mt-12 space-y-8 border-l-2 border-line pl-6">
            {timeline.map((t, i) => (
              <li key={t.title} className="relative">
                <span className={`absolute -left-[33px] top-1.5 h-3 w-3 rounded-full ring-4 ring-bg ${i === 0 ? 'bg-primary' : 'bg-line-strong'}`} aria-hidden="true" />
                <h4 className="text-base font-semibold text-ink">{t.title}</h4>
                <p className="mb-1 text-small font-medium text-link">{t.where}</p>
                <p className="text-small text-ink-muted">{t.text}</p>
              </li>
            ))}
          </ol>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#004182]">
            <LinkedinIcon /> Connect on LinkedIn
          </a>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl bg-[linear-gradient(135deg,rgb(var(--grad-from)),rgb(var(--grad-to)))] p-[2px] shadow-3 lg:sticky lg:top-28">
            <div className="rounded-[calc(var(--radius-2xl)-2px)] bg-surface p-8">
              {profile.photo && <img src={profile.photo} alt={profile.name} className="mb-6 aspect-[4/5] w-full rounded-xl object-cover" />}
              <h3 className="mb-3 text-h3 text-ink">{about.card.title}</h3>
              <p className="text-ink-muted">{about.card.text}</p>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ============================================================
   CONTACT — every card now leads somewhere
   ============================================================ */
export function Contact() {
  const actions = [
    contact.whatsapp && { href: contact.whatsapp, label: 'WhatsApp', icon: <WhatsappIcon className="h-5 w-5" aria-hidden="true" /> },
    contact.email && { href: `mailto:${contact.email}`, label: 'Email me', icon: <Mail className="h-5 w-5" aria-hidden="true" /> },
    contact.phone && { href: `tel:${contact.phone.replace(/\s/g, '')}`, label: 'Call', icon: <Phone className="h-5 w-5" aria-hidden="true" /> },
  ].filter(Boolean);
  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-h1 text-ink">{contactCopy.title}</h2>
        <p className="mt-5 text-lead text-ink-muted">{contactCopy.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-fg shadow-2 transition-colors hover:bg-primary-hover">
            <LinkedinIcon /> Message on LinkedIn
          </a>
          {actions.map((a) => <Button key={a.label} href={a.href} variant="secondary">{a.icon} {a.label}</Button>)}
        </div>
      </div>
      <Reveal className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
        {contactCopy.cards.map((c) => (
          <div key={c.title} className="rounded-xl border border-line bg-surface p-6">
            <h3 className="mb-2 text-h4 text-ink">{c.title}</h3>
            <p className="text-small text-ink-muted">{c.text}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
