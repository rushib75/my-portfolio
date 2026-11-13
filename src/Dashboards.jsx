import { useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { Building, Database, FileText, ShieldCheck, Users, Workflow, Zap } from 'lucide-react';
import { Section, SectionHeading } from './ui';
import { auditData, firmMgmtData, gstData, onboardingData, prodData } from './content';

/* Chart colours read the same CSS variables as the rest of the site,
   so charts follow light/dark mode automatically. */
const C = {
  primary: 'rgb(var(--primary))', accent: 'rgb(var(--accent))', grid: 'rgb(var(--border))',
  axis: 'rgb(var(--text-subtle))', track: 'rgb(var(--border-strong))',
  success: 'rgb(var(--success))', warning: 'rgb(var(--warning))', danger: 'rgb(var(--danger))',
};
const formatINR = (v) => (v >= 100000
  ? `₹${(v / 100000).toFixed(1)}L`
  : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v));

// Spread these instead of wrapping components: recharts reads its direct children.
const gridProps = { strokeDasharray: '3 3', stroke: C.grid, vertical: false };
const axisProps = { axisLine: false, tickLine: false, tick: { fill: C.axis, fontSize: 12 } };
const tipProps = {
  contentStyle: { background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 10, color: 'rgb(var(--text))' },
  cursor: { fill: 'rgb(var(--primary) / .06)' },
};
const legendProps = {};

const TONE = { muted: 'text-ink-muted', success: 'text-success', warning: 'text-warning', alert: 'text-danger' };

function Kpi({ title, value, note, tone = 'muted' }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-surface p-5 shadow-1">
      <h4 className="mb-2 text-small font-medium text-ink-muted">{title}</h4>
      <p className="font-display text-h3 text-ink">{value}</p>
      <p className={`mt-2 text-caption font-medium ${TONE[tone]}`}>{note}</p>
    </div>
  );
}

function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-line bg-surface p-6 shadow-1 ${className}`}>
      <h3 className="mb-6 text-h4 text-ink">{title}</h3>
      {children}
    </div>
  );
}

const kpiRow = (cols, items) => (
  <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
    {items.map((k) => <Kpi key={k.title} {...k} />)}
  </div>
);

const TABS = [
  {
    label: 'Firm Management', icon: Building,
    render: () => (
      <>
        {kpiRow(4, [
          { title: 'Active Clients', value: '245', note: '+12 this month' },
          { title: 'Monthly Revenue', value: '₹14.5L', note: '+8% vs last month' },
          { title: 'Total Assignments', value: '1,204', note: 'Active & Pending' },
          { title: 'Overdue Tasks', value: '18', note: '-5 vs last week', tone: 'warning' },
        ])}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Revenue Trend (Actual vs Target)">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={firmMgmtData}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis tickFormatter={formatINR} {...axisProps} />
                <Tooltip {...tipProps} formatter={(v) => formatINR(v)} />
                <Legend {...legendProps} />
                <Bar dataKey="revenue" name="Actual Revenue" fill={C.primary} radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="target" name="Target" stroke={C.accent} strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Assignments by Month">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={firmMgmtData}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tipProps} />
                <Bar dataKey="assignments" name="Total Assignments" fill={C.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </>
    ),
  },
  {
    label: 'GST Compliance', icon: ShieldCheck,
    render: () => (
      <>
        {kpiRow(4, [
          { title: 'Total GST Clients', value: '145', note: 'Active' },
          { title: 'GSTR-1 Filed', value: '132', note: '91% Completion', tone: 'success' },
          { title: 'Pending Filings', value: '13', note: 'Action Required', tone: 'warning' },
          { title: 'Upcoming Deadline', value: '11th Oct', note: 'GSTR-1', tone: 'alert' },
        ])}
        <ChartCard title="Compliance Filing Status (6 Months)">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={gstData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tipProps} />
              <Legend {...legendProps} />
              <Bar dataKey="filed" stackId="a" name="Filed on Time" fill={C.success} />
              <Bar dataKey="pending" stackId="a" name="Pending" fill={C.warning} />
              <Bar dataKey="overdue" stackId="a" name="Overdue" fill={C.danger} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </>
    ),
  },
  {
    label: 'Task Management', icon: Users,
    render: () => (
      <>
        {kpiRow(3, [
          { title: 'Total Tasks Assigned', value: '237', note: 'Current Week' },
          { title: 'Completion Rate', value: '91.5%', note: 'Target: 95%' },
          { title: 'Avg Turnaround', value: '2.4 Days', note: '-0.3 days vs last month', tone: 'success' },
        ])}
        <ChartCard title="Employee Workload & Performance">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={prodData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid {...gridProps} vertical horizontal={false} />
              <XAxis type="number" {...axisProps} />
              <YAxis dataKey="name" type="category" {...axisProps} />
              <Tooltip {...tipProps} />
              <Legend {...legendProps} />
              <Bar dataKey="assigned" name="Total Assigned" fill={C.track} radius={[0, 4, 4, 0]} />
              <Bar dataKey="completed" name="Completed" fill={C.primary} radius={[0, 4, 4, 0]} />
              <Bar dataKey="overdue" name="Overdue" fill={C.danger} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </>
    ),
  },
  {
    label: 'Client Onboarding', icon: FileText,
    render: () => (
      <>
        {kpiRow(4, [
          { title: 'New Clients', value: '45', note: 'This Quarter' },
          { title: 'Fully Onboarded', value: '32', note: '71% Success Rate', tone: 'success' },
          { title: 'Pending KYC', value: '8', note: 'Requires Follow-up', tone: 'warning' },
          { title: 'Avg Onboarding Time', value: '4.2 Days', note: '-1.5 Days', tone: 'success' },
        ])}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Onboarding Stages Completion">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={onboardingData}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="step" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tipProps} />
                <Legend {...legendProps} />
                <Bar dataKey="completed" stackId="a" name="Completed" fill={C.success} />
                <Bar dataKey="pending" stackId="a" name="Pending" fill={C.warning} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface p-6 text-center shadow-1">
            <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-link">
              <Workflow className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="mb-2 text-h4 text-ink">Automated Power App Flow</h3>
            <p className="max-w-sm text-small text-ink-muted">
              This dashboard reflects data collected directly from a custom Power App used by clients to submit documents, automatically stored in SharePoint.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    label: 'Audit Tracking', icon: Database,
    render: () => (
      <>
        {kpiRow(4, [
          { title: 'Total Audits', value: '235', note: 'Annual Plan' },
          { title: 'Executed', value: '215', note: 'On Schedule', tone: 'success' },
          { title: 'Delayed', value: '20', note: 'Resource Bottleneck', tone: 'alert' },
          { title: 'Efficiency Rate', value: '91.4%', note: '+2% vs Last Year', tone: 'success' },
        ])}
        <ChartCard title="Audit Execution Timeline">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={auditData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="qtr" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tipProps} />
              <Legend {...legendProps} />
              <Line type="monotone" dataKey="planned" name="Planned Audits" stroke={C.axis} strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="executed" name="Executed Audits" stroke={C.primary} strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="delayed" name="Delayed Audits" stroke={C.danger} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </>
    ),
  },
];

export default function Dashboards() {
  const [active, setActive] = useState(0);

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <Section id="dashboards">
      <SectionHeading
        title="Interactive Management Dashboards"
        sub="Stop relying on stale Excel reports. Experience real-time visibility into your entire practice using Microsoft Power BI integration."
      />
      <p className="-mt-6 mb-6 inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-caption font-medium text-warning lg:-mt-8">
        <Zap className="h-3 w-3" aria-hidden="true" /> Illustrative demo data only
      </p>

      <div className="overflow-hidden rounded-xl border border-line bg-surface-2/50">
        <div role="tablist" aria-label="Dashboard examples" onKeyDown={onKeyDown}
          className="no-scrollbar flex overflow-x-auto border-b border-line bg-surface px-2">
          {TABS.map(({ label, icon: Icon }, i) => (
            <button key={label} id={`tab-${i}`} role="tab" aria-selected={active === i} aria-controls="dash-panel"
              tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-small font-medium transition-colors ${
                active === i ? 'border-primary text-link' : 'border-transparent text-ink-muted hover:text-ink'}`}>
              <Icon className="h-4 w-4" aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        <div id="dash-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active} className="animate-rise space-y-6 p-4 sm:p-6">
          {TABS[active].render()}
        </div>
      </div>
    </Section>
  );
}
