/* ============================================================
   content.js — every word and number on the site, in one place.
   Copy is taken from your original App.jsx. Nothing has been added.
   Lines marked REVIEW are claims worth double-checking before you
   send the link to a prospect.
   ============================================================ */
import { BarChart, LayoutDashboard, Workflow } from 'lucide-react';

export const LINKEDIN = 'https://www.linkedin.com/in/rushikeshraj75';

export const profile = {
  name: 'Rushikesh Bhosale',
  role: 'Power Platform Developer',
  badge: 'Live Pitch Showcase',
  headline: { before: 'Interactive Dashboards & Workflows for', highlight: 'CA Firms & Banking' },
  intro: 'A demonstration of custom Power BI, Power Apps, and Power Automate solutions built to eliminate manual reporting and streamline financial operations.',
  photo: '', // e.g. '/headshot.jpg' (put the file in /public). Leave '' to hide.
};

// Fill these in and the Contact section shows real buttons. Empty = hidden.
export const contact = { email: 'rushikeshraj.bhosale@gmail.com', phone: '', linkedin: LINKEDIN , whatsapp: 'https://wa.link/rushikesh75'};

export const nav = [
  { label: 'Showcase', href: '#dashboards' },
  { label: 'Why automate', href: '#solutions' },
  { label: 'Services', href: '#services' },
  { label: 'Scenarios', href: '#case-studies' },
  { label: 'ROI', href: '#roi' },
  { label: 'About', href: '#about' },
];

export const socials = [{ label: 'LinkedIn', href: LINKEDIN }];
export const footer = { statement: 'Independent Power Platform Developer.' };

/* ---------- Problem / solution ---------- */
export const problemsIntro = {
  title: 'The Cost of Traditional Workflows',
  sub: 'See how smart automation bridges the gap between chaotic manual operations and streamlined, data-driven efficiency.',
};
export const problems = [
  'Maintaining multiple disconnected Excel workbooks',
  'Manually following up for documents via WhatsApp/Email',
  'Copy-pasting data between software and reports',
  'Missing crucial GST/TDS deadlines due to manual tracking',
  'Scattered client folders leading to lost documents',
  'Zero real-time visibility into employee productivity',
];
export const solutions = [
  'Centralised database integrated with Power BI',
  'Automated document collection via Client Portals',
  'Seamless data flows via Power Automate',
  'Automated compliance trackers and deadline alerts',
  'Structured SharePoint document management',
  'Live dashboards for workload & billing management',
];

/* ---------- Services ---------- */
export const servicesIntro = {
  title: 'Core Automation Services',
  sub: 'As an independent developer, I specialize in the Microsoft Power Platform, building robust financial and operational solutions tailored exactly to your needs.',
};
export const services = [
  { name: 'Power BI Dashboards', desc: 'Interactive management dashboards, GST tracking, and client-wise profitability analytics.', icon: BarChart },
  { name: 'Power Apps Development', desc: 'Custom internal apps for employee task management and client document submission.', icon: LayoutDashboard },
  { name: 'Power Automate Workflows', desc: 'Automated reminders, email notifications, and data synchronization between systems.', icon: Workflow },
];

/* ---------- Scenarios (all conceptual, and labelled as such on the page) ---------- */
export const casesIntro = {
  title: 'Transformation in Action',
  sub: 'Conceptual case studies demonstrating how automated workflows solve common operational bottlenecks in Indian CA practices.',
};
export const cases = [
  {
    title: 'Automated GST Compliance Tracker',
    challenge: 'Firm managing 300+ GST clients struggled with missed GSTR-1/3B deadlines due to manual tracking in shared Excel sheets.',
    solution: 'SharePoint list connected to Power Automate for daily status checks. Alerts sent via Teams. Power BI dashboard visualises firm-wide compliance health.',
    outcome: 'Zero missed deadlines, 10 hours saved per week on status review meetings.',
  },
  {
    title: 'Client Document Collection Portal',
    challenge: 'Audit team wasted days following up for bank statements and vouchers via WhatsApp, leading to scattered data.',
    // REVIEW: Power Pages is not in your skills list. Keep it only if you have built one.
    solution: 'Power Pages portal for client uploads. Documents automatically route to structured SharePoint folders. Power Automate sends weekly nudges for pending items.',
    outcome: '75% reduction in manual follow-ups. Centralised, secure audit trails.',
  },
  {
    title: 'Automated MIS Consolidation',
    challenge: 'Preparing monthly MIS for 15 retainership clients required 4 days of manual data export, cleaning, and formatting by senior resources.',
    solution: 'Power Query automates data extraction from Tally exports. Automated Excel scripts format the data. Power Automate emails the final PDFs to clients on the 5th.',
    // REVIEW: "100% error reduction" is the line a sceptical CA partner will question.
    outcome: 'MIS generation time reduced from 4 days to 4 hours. 100% error reduction.',
  },
];

/* ---------- About ---------- */
export const about = {
  badge: 'Rushikesh Bhosale | Power Platform Developer',
  title: 'Bridging the Gap Between Finance and Technology',
  paragraphs: [
    'As an independent Data Analyst & Power Platform Developer, I design automated solutions that actually make sense for CA firms, banking workflows, and financial professionals.',
    'With a strong foundation in Microsoft technologies and financial domain operations, I build tools that save hundreds of billable hours, moving away from fragmented Excel sheets to cohesive Power BI insights and scalable Power App inputs.',
  ],
  card: {
    title: 'Solution Architecture',
    // REVIEW: Power BI sharing needs Pro licences and Dataverse / Power Pages need premium licensing,
    // so "standard Microsoft 365 licenses" may not hold for every solution. Check before a client does.
    text: 'Every dashboard and workflow demonstrated here is built on standard Microsoft 365 licenses, ensuring low maintenance and high security.',
  },
};
// Same eight skills as your original list, only grouped. No skills added.
export const skillGroups = [
  { title: 'Power Platform', skills: ['Power BI (DAX & Power Query)', 'Power Apps (Canvas & Model-Driven)', 'Power Automate Workflows', 'Dataverse & SharePoint'] },
  { title: 'Data and analytics', skills: ['Financial Data Analytics', 'SQL & Database Management'] },
  { title: 'Domain and process', skills: ['Banking Workflow Automation', 'Business Process Optimization'] },
];
export const timeline = [
  { title: 'Independent Consultant & Developer', where: 'CA Firms & Banking Sector', text: 'Designing end-to-end automation architectures for tax compliance tracking, client onboarding, and management information systems (MIS).' },
  { title: 'Power Platform Specialist', where: 'Financial Operations Analytics', text: 'Developing interactive dashboards and operational trackers that eliminate manual copy-pasting and reduce human error in reporting workflows.' },
];

/* ---------- Contact ---------- */
export const contactCopy = {
  title: "Let's Discuss Your Specific Use Case",
  text: "Thank you for exploring this live portfolio demonstration. The datasets and workflows shown here can be entirely customized to match your firm's exact reporting needs.",
  cards: [
    { title: 'Email', text: 'Reach out for a detailed technical walkthrough.' },
    { title: 'Teams / Zoom', text: 'Schedule a live screen-share demonstration.' },
    { title: 'Direct Contact', text: 'Available for consulting & contract engagements.' },
  ],
};

/* ---------- Demo data for the dashboards (illustrative, labelled on the page) ---------- */
export const firmMgmtData = [
  { month: 'Apr', revenue: 850000, target: 800000, assignments: 42 },
  { month: 'May', revenue: 920000, target: 850000, assignments: 48 },
  { month: 'Jun', revenue: 1150000, target: 900000, assignments: 55 },
  { month: 'Jul', revenue: 1350000, target: 1000000, assignments: 72 },
  { month: 'Aug', revenue: 1250000, target: 1100000, assignments: 68 },
  { month: 'Sep', revenue: 1450000, target: 1200000, assignments: 85 },
];
export const gstData = [
  { month: 'Apr', filed: 120, pending: 5, overdue: 0 },
  { month: 'May', filed: 125, pending: 8, overdue: 1 },
  { month: 'Jun', filed: 130, pending: 2, overdue: 0 },
  { month: 'Jul', filed: 135, pending: 15, overdue: 3 },
  { month: 'Aug', filed: 142, pending: 10, overdue: 1 },
  { month: 'Sep', filed: 145, pending: 12, overdue: 2 },
];
export const prodData = [
  { name: 'Rahul', assigned: 45, completed: 42, overdue: 1 },
  { name: 'Priya', assigned: 52, completed: 50, overdue: 0 },
  { name: 'Amit', assigned: 38, completed: 30, overdue: 4 },
  { name: 'Neha', assigned: 60, completed: 55, overdue: 2 },
  { name: 'Vikram', assigned: 42, completed: 40, overdue: 1 },
];
export const onboardingData = [
  { step: 'Docs Col', pending: 15, completed: 85 },
  { step: 'KYC Verif', pending: 22, completed: 78 },
  { step: 'Sys Setup', pending: 5, completed: 95 },
  { step: 'Welcome', pending: 30, completed: 70 },
];
export const auditData = [
  { qtr: 'Q1', planned: 45, executed: 42, delayed: 3 },
  { qtr: 'Q2', planned: 50, executed: 48, delayed: 2 },
  { qtr: 'Q3', planned: 60, executed: 55, delayed: 5 },
  { qtr: 'Q4', planned: 80, executed: 70, delayed: 10 },
];
