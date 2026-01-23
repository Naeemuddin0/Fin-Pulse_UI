import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  User,
  Building2,
  Users,
  FileUp,
  ArrowLeftRight,
  Receipt,
  Landmark,
  Scale,
  BookOpen,
  TrendingUp,
  LayoutDashboard,
  Gauge,
  Bot,
  History,
  FileBarChart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuGroups = [
  {
    title: 'DASHBOARD',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'SETUP & CONFIGURATION',
    items: [
      { name: 'User Profiling', path: '/user-profile', icon: User },
      { name: 'Business Setup', path: '/business-setup', icon: Building2 },
      { name: 'Vendor Management', path: '/vendors', icon: Users },
      { name: 'Document Upload', path: '/documents', icon: FileUp },
    ],
  },
  {
    title: 'FINANCIAL OPERATIONS',
    items: [
      { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
      { name: 'Bills & Invoices', path: '/bills', icon: Receipt },
      { name: 'Bank Accounts', path: '/bank-accounts', icon: Landmark },
      { name: 'Reconciliation', path: '/reconciliation', icon: Scale },
    ],
  },
  {
    title: 'ACCOUNTING & ANALYSIS',
    items: [
      { name: 'General Ledger', path: '/ledger', icon: BookOpen },
      { name: 'Cash Flow', path: '/cash-flow', icon: TrendingUp },
      { name: 'Expense Tracking', path: '/expenses', icon: Gauge },
    ],
  },
  {
    title: 'REPORTING',
    items: [
      { name: 'Reports', path: '/reports', icon: FileBarChart },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { name: 'Agent Centre', path: '/agent', icon: Bot },
      { name: 'Audit Trail', path: '/audit', icon: History },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        {!isCollapsed && (
          <span className="text-lg font-bold tracking-tight text-gray-900">FIN-PULSE</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("text-gray-500 hover:bg-gray-100", isCollapsed ? "mx-auto" : "ml-auto")}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="py-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={group.title} className={cn("px-3 mb-6", isCollapsed && "px-2")}>
              {!isCollapsed && (
                <h3 className="mb-2 px-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all',
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <Icon className={cn("shrink-0", isActive ? "text-white" : "text-gray-500")} size={18} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                  );
                })}
              </div>
              {groupIndex < menuGroups.length - 1 && isCollapsed && (
                <div className="my-4 border-t border-gray-100" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
