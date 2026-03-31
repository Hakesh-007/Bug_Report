import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bug, 
  Mail, 
  Lock, 
  ArrowRight, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  FileText,
  AlertCircle,
  CheckCircle2,
  Circle
} from 'lucide-react';

// --- Types ---
type Screen = 'login' | 'dashboard' | 'report';
type Priority = 'high' | 'low';
type Status = 'open' | 'closed';

interface BugTicket {
  id: string;
  title: string;
  reportedAt: string;
  category: string;
  priority: Priority;
  status: Status;
  assignee: {
    name: string;
    initials: string;
  };
}

// --- Mock Data ---
const MOCK_BUGS: BugTicket[] = [
  {
    id: '#BT-1024',
    title: 'Navigation header overlap on mobile viewport',
    reportedAt: '2 hours ago',
    category: 'UI/UX',
    priority: 'high',
    status: 'open',
    assignee: { name: 'Alex Linden', initials: 'AL' }
  },
  {
    id: '#BT-1023',
    title: 'API Timeout on dashboard heavy load',
    reportedAt: 'yesterday',
    category: 'Backend',
    priority: 'low',
    status: 'open',
    assignee: { name: 'Sarah Kong', initials: 'SK' }
  },
  {
    id: '#BT-1019',
    title: 'Inconsistent padding on status chips',
    reportedAt: '3 days ago',
    category: 'Design System',
    priority: 'low',
    status: 'closed',
    assignee: { name: 'John Doe', initials: 'JD' }
  }
];

// --- Components ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-surface">
    {/* Decorative Background Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-brand/5 blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-brand/5 blur-[120px]" />

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[440px] z-10"
    >
      <div className="bg-surface-lowest glass-panel rounded-xl editorial-shadow p-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-surface-highest rounded-xl flex items-center justify-center mb-6">
            <Bug className="text-primary-brand w-8 h-8" />
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">BugTracker Lite</h1>
          <p className="text-on-surface-variant text-sm">Precision bug tracking for modern teams</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 transition-colors group-focus-within:text-secondary-brand" />
              <input 
                className="w-full bg-surface-low border-none rounded-lg py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="name@company.com" 
                type="email"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant">Password</label>
              <button type="button" className="text-[11px] font-medium uppercase tracking-wider text-secondary-brand hover:text-primary-dim transition-colors">Forgot Password?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 transition-colors group-focus-within:text-secondary-brand" />
              <input 
                className="w-full bg-surface-low border-none rounded-lg py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
          </div>

          <div className="flex items-center px-1">
            <input className="w-4 h-4 rounded border-outline-variant/30 bg-surface-low text-secondary-brand focus:ring-secondary-brand/20" id="remember" type="checkbox" />
            <label className="ml-3 text-sm text-on-surface-variant" htmlFor="remember">Keep me logged in</label>
          </div>

          <button 
            className="w-full login-gradient text-white font-semibold py-4 rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 mt-2 flex items-center justify-center gap-2" 
            type="submit"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-outline-variant/15 text-center">
          <p className="text-on-surface-variant text-sm">
            Don't have an account yet? 
            <button className="text-secondary-brand font-semibold hover:underline ml-1">Request Access</button>
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button className="text-outline text-xs hover:text-on-surface-variant transition-colors">Privacy Policy</button>
        <button className="text-outline text-xs hover:text-on-surface-variant transition-colors">Terms of Service</button>
        <button className="text-outline text-xs hover:text-on-surface-variant transition-colors">Contact Support</button>
      </div>
    </motion.div>

    {/* Footer Metadata */}
    <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none opacity-40 hidden md:block">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-outline">System Status</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-on-secondary-container" />
            <span className="text-[11px] font-medium text-on-surface-variant">Operational</span>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-outline">v2.4.0 Clinical Architect Edition</span>
      </div>
    </div>
  </div>
);

const DashboardScreen = ({ onReport }: { onReport: () => void }) => (
  <div className="min-h-screen bg-surface pb-24 md:pb-8">
    <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Bug className="text-primary-brand w-6 h-6" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">BugTracker Lite</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 mr-6">
          <button className="text-[11px] font-medium uppercase tracking-wider text-primary-brand border-b-2 border-primary-brand pb-1">Dashboard</button>
          <button onClick={onReport} className="text-[11px] font-medium uppercase tracking-wider text-outline hover:text-primary-brand transition-colors">Report</button>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center overflow-hidden border border-outline-variant/15">
          <img 
            alt="User" 
            src="https://picsum.photos/seed/user/100/100" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="col-span-1 md:col-span-2 bg-surface-lowest p-6 rounded-xl editorial-shadow flex flex-col justify-between border border-outline-variant/5">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">System Health</span>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">98.2%</h2>
          </div>
          <div className="mt-4 flex items-center gap-2 text-secondary-brand font-medium">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">+2.4% from last week</span>
          </div>
        </div>
        
        <div className="bg-surface-low p-6 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">Active Issues</span>
            <h2 className="font-headline text-3xl font-bold text-on-surface">24</h2>
          </div>
          <div className="w-full bg-surface-highest h-1 rounded-full mt-4 overflow-hidden">
            <div className="bg-secondary-brand h-full w-3/4" />
          </div>
        </div>

        <div className="bg-tertiary-brand/5 p-6 rounded-xl border border-tertiary-brand/10 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-tertiary-brand uppercase tracking-wider mb-2 block">Urgent Action</span>
            <h2 className="font-headline text-3xl font-bold text-tertiary-brand">03</h2>
          </div>
          <span className="text-xs text-tertiary-brand/80 font-medium">Critical blockers detected</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-grow max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            className="block w-full pl-10 pr-3 py-3 bg-surface-low border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary-container/50 transition-all placeholder:text-outline/70 outline-none" 
            placeholder="Search issues by title, ID or assignee..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-3 bg-surface-highest text-on-surface-variant rounded-xl font-medium text-sm hover:bg-surface-low transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button 
            onClick={onReport}
            className="flex items-center gap-2 px-6 py-3 bg-primary-brand text-white rounded-xl font-semibold text-sm shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Bug List */}
      <div className="bg-surface-low rounded-2xl overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highest/50">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Issue ID</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Bug Title</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Priority</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Assignee</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {MOCK_BUGS.map((bug) => (
                <tr key={bug.id} className="bg-surface-lowest hover:bg-surface-low transition-colors group">
                  <td className="px-6 py-5 font-headline text-sm font-medium text-outline tabular-nums">{bug.id}</td>
                  <td className="px-6 py-5">
                    <span className={`font-semibold text-on-surface block mb-0.5 ${bug.status === 'closed' ? 'text-outline line-through' : ''}`}>
                      {bug.title}
                    </span>
                    <span className="text-xs text-on-surface-variant">Reported {bug.reportedAt} in {bug.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      bug.priority === 'high' ? 'bg-tertiary-brand/10 text-tertiary-brand' : 'bg-secondary-brand/10 text-secondary-brand'
                    }`}>
                      {bug.priority} Priority
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      bug.status === 'open' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-highest text-outline'
                    }`}>
                      {bug.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-highest flex items-center justify-center text-[10px] font-bold">
                        {bug.assignee.initials}
                      </div>
                      <span className={`text-xs font-medium ${bug.status === 'closed' ? 'text-outline' : 'text-on-surface'}`}>
                        {bug.assignee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-outline hover:text-primary-brand transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-surface-highest/20 border-t border-outline-variant/10">
          <span className="text-xs text-on-surface-variant font-medium">Showing 1 to 3 of 42 results</span>
          <div className="flex items-center gap-1">
            <button className="p-2 text-outline hover:bg-surface-highest rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-secondary-brand text-white text-xs font-bold rounded-lg">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-highest text-xs font-bold rounded-lg">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-highest text-xs font-bold rounded-lg">3</button>
            <button className="p-2 text-outline hover:bg-surface-highest rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>

    {/* Mobile Nav */}
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-xl border-t border-outline-variant/15 shadow-xl z-50">
      <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider mt-1">Dashboard</span>
      </button>
      <button onClick={onReport} className="flex flex-col items-center justify-center text-outline px-5 py-1">
        <FileText className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider mt-1">Report</span>
      </button>
    </nav>

    {/* FAB Mobile */}
    <button 
      onClick={onReport}
      className="md:hidden fixed right-6 bottom-24 w-14 h-14 rounded-full login-gradient text-white shadow-xl flex items-center justify-center z-40 active:scale-90 transition-transform"
    >
      <Plus className="w-6 h-6" />
    </button>
  </div>
);

const ReportScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-surface flex flex-col">
    <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Bug className="text-primary-brand w-6 h-6" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">BugTracker Lite</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={onBack} className="text-[11px] font-medium uppercase tracking-wider text-outline hover:text-primary-brand transition-colors">Dashboard</button>
          <button className="text-[11px] font-medium uppercase tracking-wider text-primary-brand border-b-2 border-primary-brand pb-1">Report</button>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center overflow-hidden border border-outline-variant/10">
          <img 
            alt="User" 
            src="https://picsum.photos/seed/user/100/100" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>

    <main className="flex-grow flex flex-col items-center px-6 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-surface-lowest rounded-xl p-8 md:p-12 editorial-shadow"
      >
        <header className="mb-10 text-center md:text-left">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Identify the anomaly.</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Submit a detailed report to help the architecture remain clinical and precise.
          </p>
        </header>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
          <div className="space-y-2">
            <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Title</label>
            <input 
              className="w-full bg-surface-low border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:bg-secondary-container/30 transition-all outline-none" 
              placeholder="Brief summary of the issue..." 
              type="text"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Description</label>
            <textarea 
              className="w-full bg-surface-low border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:bg-secondary-container/30 transition-all resize-none outline-none" 
              placeholder="Detail the steps to reproduce, actual results, and expected behavior..." 
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Priority</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer group">
                  <input className="sr-only peer" name="priority" type="radio" value="high" />
                  <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-tertiary-container peer-checked:text-white group-hover:bg-surface-highest transition-all">
                    <AlertCircle className="mr-2 w-4 h-4" />
                    <span className="text-sm font-semibold">High</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer group">
                  <input defaultChecked className="sr-only peer" name="priority" type="radio" value="low" />
                  <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container group-hover:bg-surface-highest transition-all">
                    <TrendingUp className="mr-2 w-4 h-4" />
                    <span className="text-sm font-semibold">Low</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Status</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer group">
                  <input defaultChecked className="sr-only peer" name="status" type="radio" value="open" />
                  <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container group-hover:bg-surface-highest transition-all">
                    <Circle className="mr-2 w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">Open</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer group">
                  <input className="sr-only peer" name="status" type="radio" value="closed" />
                  <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-surface-highest peer-checked:text-on-surface group-hover:bg-surface-highest transition-all">
                    <CheckCircle2 className="mr-2 w-4 h-4" />
                    <span className="text-sm font-semibold">Closed</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              className="w-full login-gradient text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98]" 
              type="submit"
            >
              Submit Bug
            </button>
          </div>
        </form>
      </motion.div>
    </main>

    {/* Mobile Nav */}
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-xl border-t border-outline-variant/15 shadow-xl z-50">
      <button onClick={onBack} className="flex flex-col items-center justify-center text-outline px-5 py-1">
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider mt-1">Dashboard</span>
      </button>
      <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
        <FileText className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider mt-1">Report</span>
      </button>
    </nav>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  return (
    <div className="min-h-screen font-sans selection:bg-secondary-container selection:text-on-secondary-container">
      <AnimatePresence mode="wait">
        {screen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginScreen onLogin={() => setScreen('dashboard')} />
          </motion.div>
        )}

        {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DashboardScreen onReport={() => setScreen('report')} />
          </motion.div>
        )}

        {screen === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReportScreen onBack={() => setScreen('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
