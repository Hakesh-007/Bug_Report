import React, { useState, useEffect } from 'react';
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
  Circle,
  Settings,
  Bell,
  User as UserIcon,
  LogOut,
  UserPlus
} from 'lucide-react';

// --- Types ---
type Screen = 'login' | 'register' | 'dashboard' | 'report' | 'edit' | 'settings' | 'notifications';
type Priority = 'high' | 'low';
type Status = 'open' | 'closed';

interface User {
  name: string;
  email: string;
  initials: string;
}

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

const LoginScreen = ({ onLogin, onRegisterClick }: { onLogin: (email: string, pass: string) => void, onRegisterClick: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@bugtracker.com' && password === 'password123') {
      onLogin(email, password);
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
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

          {error && (
            <div className="mb-6 p-3 bg-tertiary-brand/10 border border-tertiary-brand/20 rounded-lg text-tertiary-brand text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 transition-colors group-focus-within:text-secondary-brand" />
                <input 
                  className="w-full bg-surface-low border-none rounded-lg py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                  placeholder="name@company.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <button onClick={onRegisterClick} className="text-secondary-brand font-semibold hover:underline ml-1">Register</button>
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
};

const RegisterScreen = ({ onBack, onRegister }: { onBack: () => void, onRegister: (name: string, email: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-surface">
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
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Create Account</h1>
            <p className="text-on-surface-variant text-sm">Join the clinical bug tracking network</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onRegister(name, email); }}>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Full Name</label>
              <input 
                className="w-full bg-surface-low border-none rounded-lg py-3.5 px-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="John Doe" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Email Address</label>
              <input 
                className="w-full bg-surface-low border-none rounded-lg py-3.5 px-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="name@company.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-on-surface-variant mb-2 ml-1">Password</label>
              <input 
                className="w-full bg-surface-low border-none rounded-lg py-3.5 px-4 text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-secondary-brand/20 focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="••••••••" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              className="w-full login-gradient text-white font-semibold py-4 rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 mt-2 flex items-center justify-center gap-2" 
              type="submit"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-outline-variant/15 text-center">
            <p className="text-on-surface-variant text-sm">
              Already have an account? 
              <button onClick={onBack} className="text-secondary-brand font-semibold hover:underline ml-1">Sign In</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TEAM_MEMBERS = [
  { name: 'Alex Linden', initials: 'AL' },
  { name: 'Sarah Kong', initials: 'SK' },
  { name: 'John Doe', initials: 'JD' },
  { name: 'Admin User', initials: 'AU' },
  { name: 'Emma Watson', initials: 'EW' }
];

const DashboardScreen = ({ 
  onReport, 
  bugs, 
  onLogout, 
  onDeleteBug, 
  onEditBug, 
  onAssignBug,
  onSettings,
  onNotifications,
  user
}: { 
  onReport: () => void, 
  bugs: BugTicket[], 
  onLogout: () => void, 
  onDeleteBug: (id: string) => void,
  onEditBug: (bug: BugTicket) => void,
  onAssignBug: (bugId: string, assignee: { name: string, initials: string }) => void,
  onSettings: () => void,
  onNotifications: () => void,
  user: User
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'low'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [assigningBugId, setAssigningBugId] = useState<string | null>(null);
  
  const itemsPerPage = 3;

  // Filtering logic
  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = 
      bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bug.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bug.assignee.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || bug.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  const totalPages = Math.ceil(filteredBugs.length / itemsPerPage);
  const currentBugs = filteredBugs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterPriority]);

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-8" onClick={() => { setActiveMenuId(null); setShowProfileMenu(false); setAssigningBugId(null); }}>
      <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <Bug className="text-primary-brand w-6 h-6" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">BugTracker Lite</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-6">
            <button className="text-[11px] font-medium uppercase tracking-wider text-primary-brand border-b-2 border-primary-brand pb-1">Dashboard</button>
            <button onClick={onReport} className="text-[11px] font-medium uppercase tracking-wider text-outline hover:text-primary-brand transition-colors">Report</button>
          </div>
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}
              className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center overflow-hidden border border-outline-variant/15 hover:ring-2 hover:ring-primary-brand/20 transition-all"
            >
              <img 
                alt="User" 
                src="https://picsum.photos/seed/user/100/100" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-surface-lowest rounded-xl editorial-shadow border border-outline-variant/15 p-2 z-[60]"
                >
                  <div className="px-3 py-2 border-b border-outline-variant/10 mb-1">
                    <p className="text-xs font-bold text-on-surface">{user.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{user.email}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSettings(); }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-highest rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Profile Settings
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNotifications(); }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-highest rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Notification Preferences
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-tertiary-brand hover:bg-tertiary-brand/5 rounded-lg transition-colors mt-1 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
              <h2 className="font-headline text-3xl font-bold text-on-surface">{bugs.length}</h2>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowFilters(!showFilters); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                showFilters || filterPriority !== 'all' ? 'bg-secondary-brand text-white' : 'bg-surface-highest text-on-surface-variant hover:bg-surface-low'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filterPriority === 'all' ? 'Filters' : `${filterPriority.charAt(0).toUpperCase() + filterPriority.slice(1)} Priority`}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-surface-lowest rounded-xl editorial-shadow border border-outline-variant/15 p-2 z-50"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 py-2">Filter by Priority</p>
                  <button 
                    onClick={() => { setFilterPriority('all'); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${filterPriority === 'all' ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-highest'}`}
                  >
                    All Priorities
                  </button>
                  <button 
                    onClick={() => { setFilterPriority('high'); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${filterPriority === 'high' ? 'bg-tertiary-brand/10 text-tertiary-brand' : 'hover:bg-surface-highest'}`}
                  >
                    High Priority
                  </button>
                  <button 
                    onClick={() => { setFilterPriority('low'); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${filterPriority === 'low' ? 'bg-secondary-brand/10 text-secondary-brand' : 'hover:bg-surface-highest'}`}
                  >
                    Low Priority
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

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
        <div className="bg-surface-low rounded-2xl overflow-hidden mb-12 min-h-[400px]">
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
                {currentBugs.length > 0 ? currentBugs.map((bug) => (
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
                    <td className="px-6 py-5 text-right relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === bug.id ? null : bug.id); }}
                        className="text-outline hover:text-primary-brand transition-colors p-1"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      <AnimatePresence>
                        {activeMenuId === bug.id && (
                          <motion.div 
                            initial={{ opacity: 0, x: -10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.95 }}
                            className="absolute right-12 top-1/2 -translate-y-1/2 w-32 bg-surface-lowest rounded-xl editorial-shadow border border-outline-variant/15 p-1.5 z-50"
                          >
                            <button 
                              onClick={(e) => { e.stopPropagation(); onEditBug(bug); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-surface-highest rounded-lg transition-colors"
                            >
                              Edit Bug
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setAssigningBugId(bug.id); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-surface-highest rounded-lg transition-colors"
                            >
                              Assign To
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onDeleteBug(bug.id); setActiveMenuId(null); }}
                              className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-tertiary-brand hover:bg-tertiary-brand/5 rounded-lg transition-colors"
                            >
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 opacity-40">
                        <Bug className="w-10 h-10" />
                        <p className="text-sm font-medium">No issues found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBugs.length > 0 && (
            <div className="px-6 py-4 flex items-center justify-between bg-surface-highest/20 border-t border-outline-variant/10">
              <span className="text-xs text-on-surface-variant font-medium">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBugs.length)} of {filteredBugs.length} results
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-outline hover:bg-surface-highest rounded-lg transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                      currentPage === i + 1 ? 'bg-secondary-brand text-white' : 'hover:bg-surface-highest'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-outline hover:bg-surface-highest rounded-lg transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
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

      {/* Assign Modal */}
      <AnimatePresence>
        {assigningBugId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface/60 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-surface-lowest rounded-2xl editorial-shadow border border-outline-variant/15 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-headline text-lg font-bold text-on-surface">Assign Ticket</h3>
                <button onClick={() => setAssigningBugId(null)} className="text-outline hover:text-on-surface transition-colors">
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>
              <div className="p-2 max-h-[300px] overflow-y-auto">
                {TEAM_MEMBERS.map((member) => (
                  <button 
                    key={member.name}
                    onClick={() => {
                      onAssignBug(assigningBugId, member);
                      setAssigningBugId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-highest rounded-xl transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary-brand/10 text-secondary-brand flex items-center justify-center text-xs font-bold group-hover:bg-secondary-brand group-hover:text-white transition-all">
                      {member.initials}
                    </div>
                    <span className="text-sm font-medium text-on-surface">{member.name}</span>
                    <UserPlus className="w-4 h-4 ml-auto text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReportScreen = ({ onBack, onSubmit }: { onBack: () => void, onSubmit: (bug: Omit<BugTicket, 'id' | 'reportedAt' | 'assignee'>) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('low');
  const [status, setStatus] = useState<Status>('open');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, priority, status, category: 'General' });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
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

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Title</label>
              <input 
                className="w-full bg-surface-low border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:bg-secondary-container/30 transition-all outline-none" 
                placeholder="Brief summary of the issue..." 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Description</label>
              <textarea 
                className="w-full bg-surface-low border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:bg-secondary-container/30 transition-all resize-none outline-none" 
                placeholder="Detail the steps to reproduce, actual results, and expected behavior..." 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[11px] font-medium tracking-wider text-on-surface-variant uppercase">Priority</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer group">
                    <input 
                      className="sr-only peer" 
                      name="priority" 
                      type="radio" 
                      value="high" 
                      checked={priority === 'high'}
                      onChange={() => setPriority('high')}
                    />
                    <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-tertiary-container peer-checked:text-white group-hover:bg-surface-highest transition-all">
                      <AlertCircle className="mr-2 w-4 h-4" />
                      <span className="text-sm font-semibold">High</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer group">
                    <input 
                      className="sr-only peer" 
                      name="priority" 
                      type="radio" 
                      value="low" 
                      checked={priority === 'low'}
                      onChange={() => setPriority('low')}
                    />
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
                    <input 
                      className="sr-only peer" 
                      name="status" 
                      type="radio" 
                      value="open" 
                      checked={status === 'open'}
                      onChange={() => setStatus('open')}
                    />
                    <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-secondary-container peer-checked:text-on-secondary-container group-hover:bg-surface-highest transition-all">
                      <Circle className="mr-2 w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">Open</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer group">
                    <input 
                      className="sr-only peer" 
                      name="status" 
                      type="radio" 
                      value="closed" 
                      checked={status === 'closed'}
                      onChange={() => setStatus('closed')}
                    />
                    <div className="flex items-center justify-center p-3 rounded-lg bg-surface-low text-on-surface-variant peer-checked:bg-surface-highest peer-checked:text-on-surface group-hover:bg-surface-highest transition-all">
                      <CheckCircle2 className="mr-2 w-4 h-4" />
                      <span className="text-sm font-semibold">Closed</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4">
              <button 
                className="flex-1 login-gradient text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98]" 
                type="submit"
              >
                Submit Bug
              </button>
              <button 
                onClick={onBack}
                className="flex-1 bg-surface-highest text-on-surface font-bold py-4 rounded-xl hover:bg-surface-low transition-all" 
                type="button"
              >
                Cancel
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
};

const EditScreen = ({ bug, onBack, onSubmit }: { bug: BugTicket, onBack: () => void, onSubmit: (updatedBug: BugTicket) => void }) => {
  const [title, setTitle] = useState(bug.title);
  const [priority, setPriority] = useState<Priority>(bug.priority);
  const [status, setStatus] = useState<Status>(bug.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...bug, title, priority, status });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <Bug className="text-primary-brand w-6 h-6" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">BugTracker Lite</h1>
        </div>
        <button onClick={onBack} className="text-sm font-bold text-outline hover:text-primary-brand transition-colors">Back to Dashboard</button>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-surface-lowest rounded-2xl p-8 editorial-shadow border border-outline-variant/10"
        >
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Edit Ticket {bug.id}</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-wider text-outline uppercase">Title</label>
              <input 
                className="w-full bg-surface-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-brand/20 outline-none" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wider text-outline uppercase">Priority</label>
                <select 
                  className="w-full bg-surface-low border-none rounded-xl px-4 py-3 text-on-surface outline-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                >
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wider text-outline uppercase">Status</label>
                <select 
                  className="w-full bg-surface-low border-none rounded-xl px-4 py-3 text-on-surface outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button className="flex-1 bg-primary-brand text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all" type="submit">Save Changes</button>
              <button onClick={onBack} className="flex-1 bg-surface-highest text-on-surface font-bold py-4 rounded-xl hover:bg-surface-low transition-all" type="button">Cancel</button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-surface flex flex-col">
    <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        <Bug className="text-primary-brand w-6 h-6" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Settings</h1>
      </div>
      <button onClick={onBack} className="text-sm font-bold text-outline hover:text-primary-brand transition-colors">Back</button>
    </header>
    <main className="flex-grow flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl bg-surface-lowest rounded-2xl p-8 editorial-shadow border border-outline-variant/10">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">Account Configuration</h2>
        <div className="space-y-6">
          <div className="p-4 bg-surface-low rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-on-surface">Dark Mode</p>
              <p className="text-xs text-outline">Adjust the system appearance</p>
            </div>
            <div className="w-12 h-6 bg-secondary-brand rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="p-4 bg-surface-low rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-on-surface">Two-Factor Authentication</p>
              <p className="text-xs text-outline">Add an extra layer of security</p>
            </div>
            <button className="text-xs font-bold text-primary-brand">Enable</button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const NotificationsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-surface flex flex-col">
    <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        <Bug className="text-primary-brand w-6 h-6" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Notifications</h1>
      </div>
      <button onClick={onBack} className="text-sm font-bold text-outline hover:text-primary-brand transition-colors">Back</button>
    </header>
    <main className="flex-grow flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl bg-surface-lowest rounded-2xl p-8 editorial-shadow border border-outline-variant/10">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">Preferences</h2>
        <div className="space-y-4">
          {['Email Notifications', 'Push Notifications', 'Weekly Summary', 'Critical Alerts'].map((pref) => (
            <div key={pref} className="flex items-center justify-between py-3 border-b border-outline-variant/5">
              <span className="text-sm font-medium text-on-surface">{pref}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary-brand" />
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User>({ name: 'Admin User', email: 'admin@bugtracker.com', initials: 'AU' });
  const [bugs, setBugs] = useState<BugTicket[]>(MOCK_BUGS);
  const [editingBug, setEditingBug] = useState<BugTicket | null>(null);

  const handleLogin = (email: string) => {
    const isDefaultAdmin = email === 'admin@bugtracker.com';
    const name = isDefaultAdmin ? 'Admin User' : email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    setUser({
      name,
      email: email,
      initials: isDefaultAdmin ? 'AU' : (name.charAt(0) + (name.charAt(1) || '')).toUpperCase()
    });
    setScreen('dashboard');
  };

  const handleAddBug = (newBug: Omit<BugTicket, 'id' | 'reportedAt' | 'assignee'>) => {
    const bug: BugTicket = {
      ...newBug,
      id: `#BT-${1000 + bugs.length + 1}`,
      reportedAt: 'just now',
      assignee: { name: user.name, initials: user.initials }
    };
    setBugs([bug, ...bugs]);
    setScreen('dashboard');
  };

  const handleUpdateBug = (updatedBug: BugTicket) => {
    setBugs(bugs.map(b => b.id === updatedBug.id ? updatedBug : b));
    setScreen('dashboard');
    setEditingBug(null);
  };

  const handleAssignBug = (bugId: string, assignee: { name: string, initials: string }) => {
    setBugs(bugs.map(b => b.id === bugId ? { ...b, assignee } : b));
  };

  const handleDeleteBug = (id: string) => {
    setBugs(bugs.filter(bug => bug.id !== id));
  };

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
            <LoginScreen 
              onLogin={handleLogin} 
              onRegisterClick={() => setScreen('register')}
            />
          </motion.div>
        )}

        {screen === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterScreen 
              onBack={() => setScreen('login')} 
              onRegister={(name, email) => {
                setUser({ 
                  name, 
                  email, 
                  initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || email.charAt(0).toUpperCase()
                });
                setScreen('dashboard');
              }}
            />
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
            <DashboardScreen 
              onReport={() => setScreen('report')} 
              bugs={bugs}
              onLogout={() => setScreen('login')}
              onDeleteBug={handleDeleteBug}
              onEditBug={(bug) => {
                setEditingBug(bug);
                setScreen('edit');
              }}
              onAssignBug={handleAssignBug}
              onSettings={() => setScreen('settings')}
              onNotifications={() => setScreen('notifications')}
              user={user}
            />
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
            <ReportScreen 
              onBack={() => setScreen('dashboard')} 
              onSubmit={handleAddBug}
            />
          </motion.div>
        )}

        {screen === 'edit' && editingBug && (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditScreen 
              bug={editingBug}
              onBack={() => setScreen('dashboard')}
              onSubmit={handleUpdateBug}
            />
          </motion.div>
        )}

        {screen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SettingsScreen onBack={() => setScreen('dashboard')} />
          </motion.div>
        )}

        {screen === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NotificationsScreen onBack={() => setScreen('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
