import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ComposedChart, PieChart, Pie, Cell
} from 'recharts';
import {
  ArrowRight, BarChart3, Building2, CheckCircle2, ChevronRight, Database, FileText, 
  IndianRupee, LayoutDashboard, Mail, MessageSquare, Phone, PieChart as PieChartIcon, 
  Settings, Users, Workflow, XCircle, Zap, Calculator, Briefcase, FileSpreadsheet,
  Clock, ShieldCheck, Check
} from 'lucide-react';

const Linkedin = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// --- FORMATTERS ---
const formatINR = (value) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

// --- DATA SETS ---
const firmMgmtData = [
  { month: 'Apr', revenue: 850000, target: 800000, assignments: 42 },
  { month: 'May', revenue: 920000, target: 850000, assignments: 48 },
  { month: 'Jun', revenue: 1150000, target: 900000, assignments: 55 },
  { month: 'Jul', revenue: 1350000, target: 1000000, assignments: 72 }, // Tax season
  { month: 'Aug', revenue: 1250000, target: 1100000, assignments: 68 },
  { month: 'Sep', revenue: 1450000, target: 1200000, assignments: 85 }  // Audit season
];

const gstData = [
  { month: 'Apr', filed: 120, pending: 5, overdue: 0 },
  { month: 'May', filed: 125, pending: 8, overdue: 1 },
  { month: 'Jun', filed: 130, pending: 2, overdue: 0 },
  { month: 'Jul', filed: 135, pending: 15, overdue: 3 },
  { month: 'Aug', filed: 142, pending: 10, overdue: 1 },
  { month: 'Sep', filed: 145, pending: 12, overdue: 2 }
];

const docCollectionData = [
  { name: 'Received on Time', value: 65, color: '#0078D4' },
  { name: 'Pending < 5 Days', value: 20, color: '#00B4D8' },
  { name: 'Overdue > 5 Days', value: 10, color: '#F59E0B' },
  { name: 'Critical/Missing', value: 5, color: '#EF4444' }
];

const prodData = [
  { name: 'Rahul', assigned: 45, completed: 42, overdue: 1 },
  { name: 'Priya', assigned: 52, completed: 50, overdue: 0 },
  { name: 'Amit', assigned: 38, completed: 30, overdue: 4 },
  { name: 'Neha', assigned: 60, completed: 55, overdue: 2 },
  { name: 'Vikram', assigned: 42, completed: 40, overdue: 1 }
];

const financialData = [
  { month: 'Apr', billed: 900000, collected: 820000 },
  { month: 'May', billed: 950000, collected: 880000 },
  { month: 'Jun', billed: 1200000, collected: 1050000 },
  { month: 'Jul', billed: 1400000, collected: 1100000 },
  { month: 'Aug', billed: 1300000, collected: 1250000 },
  { month: 'Sep', billed: 1500000, collected: 1350000 }
];

const onboardingData = [
  { step: 'Docs Col', pending: 15, completed: 85 },
  { step: 'KYC Verif', pending: 22, completed: 78 },
  { step: 'Sys Setup', pending: 5, completed: 95 },
  { step: 'Welcome', pending: 30, completed: 70 }
];

const auditData = [
  { qtr: 'Q1', planned: 45, executed: 42, delayed: 3 },
  { qtr: 'Q2', planned: 50, executed: 48, delayed: 2 },
  { qtr: 'Q3', planned: 60, executed: 55, delayed: 5 },
  { qtr: 'Q4', planned: 80, executed: 70, delayed: 10 }
];

// --- COMPONENTS ---

const Nav = () => (
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#0078D4] to-[#00B4D8] flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-[#0A192F]">Rushikesh Bhosale</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#solutions" className="hover:text-[#0078D4] transition-colors">Concept</a>
          <a href="#dashboards" className="hover:text-[#0078D4] transition-colors">Live Showcase</a>
          <a href="#roi" className="hover:text-[#0078D4] transition-colors">ROI Impact</a>
          <a href="#case-studies" className="hover:text-[#0078D4] transition-colors">Scenarios</a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative bg-[#0A192F] overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#0078D4] rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#00B4D8] rounded-full blur-[100px] opacity-20"></div>
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#00B4D8] text-sm font-medium mb-8">
          <Workflow className="w-4 h-4" />
          <span>Live Pitch Showcase</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Interactive Dashboards & Workflows for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078D4] to-[#00B4D8]">
            CA Firms & Banking
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          A demonstration of custom Power BI, Power Apps, and Power Automate solutions built to eliminate manual reporting and streamline financial operations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#dashboards" className="w-full sm:w-auto bg-[#0078D4] hover:bg-[#006CBE] text-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-xl shadow-[#0078D4]/30 flex items-center justify-center gap-2">
            View Live Dashboards <LayoutDashboard className="w-5 h-5" />
          </a>
          <a href="#solutions" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-gray-600 px-8 py-4 rounded-md font-medium text-lg transition-all flex items-center justify-center gap-2">
            See Process Automation <Workflow className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Abstract Dashboard Mockup */}
      <div className="mt-20 relative mx-auto max-w-5xl">
        <div className="rounded-xl border border-gray-700 bg-[#0f2545] p-2 shadow-2xl">
          <div className="rounded-lg bg-[#0A192F] overflow-hidden border border-gray-800 flex flex-col h-[400px]">
            <div className="h-10 border-b border-gray-800 flex items-center px-4 gap-2 bg-[#0d203f]">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 p-6 grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="flex gap-4">
                  <div className="h-24 flex-1 rounded bg-gray-800/50 border border-gray-700/50 p-4">
                    <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="w-3/4 h-8 bg-blue-500/20 rounded"></div>
                  </div>
                  <div className="h-24 flex-1 rounded bg-gray-800/50 border border-gray-700/50 p-4">
                    <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="w-3/4 h-8 bg-cyan-500/20 rounded"></div>
                  </div>
                </div>
                <div className="h-48 rounded bg-gray-800/50 border border-gray-700/50 p-4 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-[#0078D4] to-[#00B4D8] rounded-t opacity-80" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 space-y-6">
                <div className="h-full rounded bg-gray-800/50 border border-gray-700/50 p-4 space-y-4">
                  <div className="w-1/2 h-4 bg-gray-700 rounded mb-6"></div>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                      <div className="flex-1 space-y-2">
                        <div className="w-full h-2 bg-gray-700 rounded"></div>
                        <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section id="solutions" className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">The Cost of Traditional Workflows</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">See how smart automation bridges the gap between chaotic manual operations and streamlined, data-driven efficiency.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* The Problem */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Traditional CA Office</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Maintaining multiple disconnected Excel workbooks",
              "Manually following up for documents via WhatsApp/Email",
              "Copy-pasting data between software and reports",
              "Missing crucial GST/TDS deadlines due to manual tracking",
              "Scattered client folders leading to lost documents",
              "Zero real-time visibility into employee productivity"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-xl shadow-xl shadow-blue-900/5 border border-blue-100 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-[#0078D4]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Modern Automated Workflow</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Centralised database integrated with Power BI",
              "Automated document collection via Client Portals",
              "Seamless data flows via Power Automate",
              "Automated compliance trackers and deadline alerts",
              "Structured SharePoint document management",
              "Live dashboards for workload & billing management"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-800 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0078D4] shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Dashboards = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: <Building2 className="w-4 h-4"/>, label: "Firm Management" },
    { icon: <ShieldCheck className="w-4 h-4"/>, label: "GST Compliance" },
    { icon: <Users className="w-4 h-4"/>, label: "Task Management" },
    { icon: <FileText className="w-4 h-4"/>, label: "Client Onboarding" },
    { icon: <Database className="w-4 h-4"/>, label: "Audit Tracking" }
  ];

  return (
    <section id="dashboards" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Interactive Management Dashboards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stop relying on stale Excel reports. Experience real-time visibility into your entire practice using Microsoft Power BI integration.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Zap className="w-3 h-3" /> Illustrative demo data only
          </div>
        </div>

        {/* Dashboard UI Container */}
        <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-4 flex overflow-x-auto no-scrollbar">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === idx 
                    ? 'border-[#0078D4] text-[#0078D4]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            {activeTab === 0 && (
              <div className="space-y-6 animation-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <KPICard title="Active Clients" value="245" trend="+12 this month" />
                  <KPICard title="Monthly Revenue" value="₹14.5L" trend="+8% vs last month" isCurrency />
                  <KPICard title="Total Assignments" value="1,204" trend="Active & Pending" />
                  <KPICard title="Overdue Tasks" value="18" trend="-5 vs last week" type="warning" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ChartCard title="Revenue Trend (Actual vs Target)">
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={firmMgmtData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <YAxis tickFormatter={formatINR} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <RechartsTooltip formatter={(val) => formatINR(val)} />
                        <Legend />
                        <Bar dataKey="revenue" name="Actual Revenue" fill="#0078D4" radius={[4,4,0,0]} />
                        <Line type="monotone" dataKey="target" name="Target" stroke="#00B4D8" strokeWidth={3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <ChartCard title="Assignments by Month">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={firmMgmtData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                        <RechartsTooltip />
                        <Bar dataKey="assignments" name="Total Assignments" fill="#0A192F" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-6 animation-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <KPICard title="Total GST Clients" value="145" trend="Active" />
                  <KPICard title="GSTR-1 Filed" value="132" trend="91% Completion" type="success" />
                  <KPICard title="Pending Filings" value="13" trend="Action Required" type="warning" />
                  <KPICard title="Upcoming Deadline" value="11th Oct" trend="GSTR-1" type="alert" />
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0A192F] mb-6">Compliance Filing Status (6 Months)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={gstData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="filed" stackId="a" name="Filed on Time" fill="#10B981" radius={[0,0,0,0]} />
                      <Bar dataKey="pending" stackId="a" name="Pending" fill="#F59E0B" radius={[0,0,0,0]} />
                      <Bar dataKey="overdue" stackId="a" name="Overdue" fill="#EF4444" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6 animation-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <KPICard title="Total Tasks Assigned" value="237" trend="Current Week" />
                  <KPICard title="Completion Rate" value="91.5%" trend="Target: 95%" />
                  <KPICard title="Avg Turnaround" value="2.4 Days" trend="-0.3 days vs last month" type="success" />
                </div>
                <ChartCard title="Employee Workload & Performance">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={prodData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB"/>
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="assigned" name="Total Assigned" fill="#E5E7EB" radius={[0,4,4,0]} />
                        <Bar dataKey="completed" name="Completed" fill="#0078D4" radius={[0,4,4,0]} />
                        <Bar dataKey="overdue" name="Overdue" fill="#EF4444" radius={[0,4,4,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6 animation-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <KPICard title="New Clients" value="45" trend="This Quarter" />
                  <KPICard title="Fully Onboarded" value="32" trend="71% Success Rate" type="success" />
                  <KPICard title="Pending KYC" value="8" trend="Requires Follow-up" type="warning" />
                  <KPICard title="Avg Onboarding Time" value="4.2 Days" trend="-1.5 Days" type="success" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ChartCard title="Onboarding Stages Completion">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={onboardingData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                        <XAxis dataKey="step" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" name="Completed" fill="#10B981" radius={[0,0,0,0]} />
                        <Bar dataKey="pending" stackId="a" name="Pending" fill="#F59E0B" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Workflow className="w-8 h-8 text-[#0078D4]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A192F] mb-2">Automated Power App Flow</h3>
                    <p className="text-gray-500 text-sm">
                      This dashboard reflects data collected directly from a custom Power App used by clients to submit documents, automatically stored in SharePoint.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6 animation-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <KPICard title="Total Audits" value="235" trend="Annual Plan" />
                  <KPICard title="Executed" value="215" trend="On Schedule" type="success" />
                  <KPICard title="Delayed" value="20" trend="Resource Bottleneck" type="alert" />
                  <KPICard title="Efficiency Rate" value="91.4%" trend="+2% vs Last Year" type="success" />
                </div>
                <ChartCard title="Audit Execution Timeline">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={auditData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                      <XAxis dataKey="qtr" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="planned" name="Planned Audits" stroke="#6B7280" strokeDasharray="5 5" strokeWidth={2} />
                      <Line type="monotone" dataKey="executed" name="Executed Audits" stroke="#0078D4" strokeWidth={3} />
                      <Line type="monotone" dataKey="delayed" name="Delayed Audits" stroke="#EF4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components for Dashboards
const KPICard = ({ title, value, trend, type = 'default', isCurrency = false }) => {
  const colors = {
    default: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-amber-600',
    alert: 'text-red-600'
  };
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <h4 className="text-sm font-medium text-gray-500 mb-2">{title}</h4>
      <p className="text-2xl font-bold text-[#0A192F]">{value}</p>
      {trend && <p className={`text-xs mt-2 font-medium ${colors[type]}`}>{trend}</p>}
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h3 className="text-lg font-bold text-[#0A192F] mb-6">{title}</h3>
    {children}
  </div>
);

const ROICalculator = () => {
  const [clients, setClients] = useState(50);
  const [hours, setHours] = useState(20);
  
  // Calculations
  const weeklyManualHours = hours;
  const monthlyManualHours = weeklyManualHours * 4;
  // Assume automation saves 60% of manual repetitive work
  const estimatedHoursSavedMonth = Math.round(monthlyManualHours * 0.6);
  const estimatedHoursSavedYear = estimatedHoursSavedMonth * 12;

  return (
    <section id="roi" className="py-24 bg-[#0A192F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Calculator className="w-12 h-12 text-[#00B4D8] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Calculate Your ROI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">See how many billable hours your firm can recover by automating repetitive manual tasks, data consolidation, and follow-ups.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <label className="flex justify-between text-sm font-medium mb-4">
                <span>Number of Clients</span>
                <span className="text-[#00B4D8] text-xl font-bold">{clients}</span>
              </label>
              <input 
                type="range" min="10" max="500" step="10" value={clients} 
                onChange={(e) => setClients(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
              />
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium mb-4">
                <span>Manual Reporting Hrs/Week</span>
                <span className="text-[#00B4D8] text-xl font-bold">{hours} hrs</span>
              </label>
              <p className="text-xs text-gray-400 mb-2">Time spent on data entry, follow-ups, and MIS creation.</p>
              <input 
                type="range" min="5" max="100" step="5" value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
              />
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/20 text-sm text-gray-300">
              * Assumption: Microsoft automation can typically eliminate 60% of repetitive data manipulation and manual tracking.
            </div>
          </div>

          {/* Outputs */}
          <div className="grid gap-6">
            <div className="bg-white rounded-xl p-6 text-center transform transition-transform hover:scale-105">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Estimated Hours Saved</p>
              <div className="text-5xl font-black text-[#0078D4] mb-2">{estimatedHoursSavedMonth}</div>
              <p className="text-gray-600 font-medium">Hours / Month</p>
            </div>
            <div className="bg-gradient-to-br from-[#0078D4] to-[#00B4D8] rounded-xl p-6 text-center transform transition-transform hover:scale-105 shadow-xl shadow-blue-900/50">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Annual Productivity Gain</p>
              <div className="text-5xl font-black text-white mb-2">{estimatedHoursSavedYear}</div>
              <p className="text-white/90 font-medium">Recovered Billable Hours / Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const tools = [
    {
      name: "Power BI Dashboards", desc: "Interactive management dashboards, GST tracking, and client-wise profitability analytics.",
      icon: <BarChart3 className="w-8 h-8 text-[#F2C811]" />
    },
    {
      name: "Power Apps Development", desc: "Custom internal apps for employee task management and client document submission.",
      icon: <LayoutDashboard className="w-8 h-8 text-[#742774]" />
    },
    {
      name: "Power Automate Workflows", desc: "Automated reminders, email notifications, and data synchronization between systems.",
      icon: <Workflow className="w-8 h-8 text-[#0066FF]" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Core Automation Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">As an independent developer, I specialize in the Microsoft Power Platform, building robust financial and operational solutions tailored exactly to your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="mb-6 p-4 bg-gray-50 rounded-xl inline-block group-hover:bg-blue-50 transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.name}</h3>
              <p className="text-gray-600 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => (
  <section id="case-studies" className="py-24 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Transformation in Action</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Conceptual case studies demonstrating how automated workflows solve common operational bottlenecks in Indian CA practices.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Automated GST Compliance Tracker",
            challenge: "Firm managing 300+ GST clients struggled with missed GSTR-1/3B deadlines due to manual tracking in shared Excel sheets.",
            solution: "SharePoint list connected to Power Automate for daily status checks. Alerts sent via Teams. Power BI dashboard visualises firm-wide compliance health.",
            outcome: "Zero missed deadlines, 10 hours saved per week on status review meetings."
          },
          {
            title: "Client Document Collection Portal",
            challenge: "Audit team wasted days following up for bank statements and vouchers via WhatsApp, leading to scattered data.",
            solution: "Power Pages portal for client uploads. Documents automatically route to structured SharePoint folders. Power Automate sends weekly nudges for pending items.",
            outcome: "75% reduction in manual follow-ups. Centralised, secure audit trails."
          },
          {
            title: "Automated MIS Consolidation",
            challenge: "Preparing monthly MIS for 15 retainership clients required 4 days of manual data export, cleaning, and formatting by senior resources.",
            solution: "Power Query automates data extraction from Tally exports. Automated Excel scripts format the data. Power Automate emails the final PDFs to clients on the 5th.",
            outcome: "MIS generation time reduced from 4 days to 4 hours. 100% error reduction."
          }
        ].map((study, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
            <div className="p-8">
              <div className="w-10 h-10 bg-blue-50 text-[#0078D4] rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-4">{study.title}</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-bold text-red-500 block mb-1">Challenge:</span>
                  <p className="text-gray-600">{study.challenge}</p>
                </div>
                <div className="border-t border-gray-100 my-4"></div>
                <div>
                  <span className="font-bold text-[#0078D4] block mb-1">Solution:</span>
                  <p className="text-gray-600">{study.solution}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mt-6">
                  <span className="font-bold text-green-700 flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4" /> Illustrative Outcome
                  </span>
                  <p className="text-green-800 text-sm font-medium">{study.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutDeveloper = () => (
  <section id="about" className="py-24 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0078D4] text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>Rushikesh Bhosale | Power Platform Developer</span>
          </div>
          <h2 className="text-3xl font-bold text-[#0A192F] mb-6">Bridging the Gap Between Finance and Technology</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            As an independent Data Analyst & Power Platform Developer, I design automated solutions that actually make sense for CA firms, banking workflows, and financial professionals.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            With a strong foundation in Microsoft technologies and financial domain operations, I build tools that save hundreds of billable hours, moving away from fragmented Excel sheets to cohesive Power BI insights and scalable Power App inputs.
          </p>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Core Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Power BI (DAX & Power Query)', 
                'Power Apps (Canvas & Model-Driven)', 
                'Power Automate Workflows', 
                'Dataverse & SharePoint', 
                'Financial Data Analytics', 
                'Banking Workflow Automation', 
                'SQL & Database Management', 
                'Business Process Optimization'
              ].map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm rounded-md font-medium shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8 space-y-5 border-l-2 border-blue-100 pl-5 ml-2">
             <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-[#0078D4] rounded-full ring-4 ring-white"></div>
                <h4 className="font-bold text-gray-900 text-md">Independent Consultant & Developer</h4>
                <p className="text-sm text-[#0078D4] font-medium mb-1">CA Firms & Banking Sector</p>
                <p className="text-gray-600 text-sm leading-relaxed">Designing end-to-end automation architectures for tax compliance tracking, client onboarding, and management information systems (MIS).</p>
             </div>
             <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3 h-3 bg-gray-300 rounded-full ring-4 ring-white"></div>
                <h4 className="font-bold text-gray-900 text-md">Power Platform Specialist</h4>
                <p className="text-sm text-[#0078D4] font-medium mb-1">Financial Operations Analytics</p>
                <p className="text-gray-600 text-sm leading-relaxed">Developing interactive dashboards and operational trackers that eliminate manual copy-pasting and reduce human error in reporting workflows.</p>
             </div>
          </div>
          
          <a 
            href="https://www.linkedin.com/in/rushikeshraj75" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-6 py-3 rounded-md font-medium transition-all shadow-md shadow-[#0077b5]/20"
          >
            <Linkedin className="w-5 h-5" /> Connect on LinkedIn
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0078D4] to-[#00B4D8] rounded-2xl transform rotate-3 opacity-20"></div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl relative z-10 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
               <Settings className="w-12 h-12 text-gray-400" /> 
            </div>
            <h3 className="text-xl font-bold text-center text-[#0A192F] mb-2">Solution Architecture</h3>
            <p className="text-center text-gray-600 mb-4 text-sm">Every dashboard and workflow demonstrated here is built on standard Microsoft 365 licenses, ensuring low maintenance and high security.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-24 bg-[#0A192F] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0078D4] to-[#00B4D8]"></div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="text-white mb-12">
        <h2 className="text-4xl font-bold mb-6">Let's Discuss Your Specific Use Case</h2>
        <p className="text-xl text-gray-400 mb-8">
          Thank you for exploring this live portfolio demonstration. The datasets and workflows shown here can be entirely customized to match your firm's exact reporting needs.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm grid md:grid-cols-3 gap-6 text-white text-center">
         <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <div className="w-12 h-12 bg-[#0078D4]/20 rounded-full flex items-center justify-center text-[#00B4D8]">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg">Email</h4>
            <p className="text-gray-400 text-sm">Reach out for a detailed technical walkthrough.</p>
         </div>
         <div className="flex flex-col items-center justify-center space-y-4 p-4 border-t md:border-t-0 md:border-l border-white/10">
            <div className="w-12 h-12 bg-[#0078D4]/20 rounded-full flex items-center justify-center text-[#00B4D8]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg">Teams / Zoom</h4>
            <p className="text-gray-400 text-sm">Schedule a live screen-share demonstration.</p>
         </div>
         <div className="flex flex-col items-center justify-center space-y-4 p-4 border-t md:border-t-0 md:border-l border-white/10">
            <div className="w-12 h-12 bg-[#0078D4]/20 rounded-full flex items-center justify-center text-[#00B4D8]">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg">Direct Contact</h4>
            <p className="text-gray-400 text-sm">Available for consulting & contract engagements.</p>
         </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#050c17] py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Zap className="text-[#00B4D8] w-5 h-5" />
        <span className="font-bold text-xl text-white">Rushikesh Bhosale</span>
      </div>
      <div className="text-gray-500 text-sm">
        © 2026 Rushikesh Bhosale. Independent Power Platform Developer.
      </div>
      <div className="flex gap-4 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Nav />
      <Hero />
      <ProblemSolution />
      <Dashboards />
      <ROICalculator />
      <TechStack />
      <CaseStudies />
      <AboutDeveloper />
      <Contact />
      <Footer />
    </div>
  );
}