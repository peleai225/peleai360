import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Video, Building2, LogOut, ExternalLink, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    navigate('/admin/login');
    window.location.reload();
  };

  const navLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/admin/settings', icon: Settings, label: 'Paramètres' },
    { to: '/admin/videos', icon: Video, label: 'Vidéos' },
    { to: '/admin/about', icon: Building2, label: 'À propos' },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} aria-hidden="true" />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-slate-900 text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/95">
          <div>
            <h2 className="text-lg font-bold text-white">PeleAI 360°</h2>
            <p className="text-slate-400 text-xs mt-0.5">Backoffice</p>
          </div>
          <button onClick={closeSidebar} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} onClick={closeSidebar} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium">
              <Icon className="w-5 h-5 shrink-0 opacity-80" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-0.5 bg-slate-900/95">
          <a href="/" target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
            <ExternalLink className="w-5 h-5 shrink-0" />
            Voir le site
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm text-left">
            <LogOut className="w-5 h-5 shrink-0" />
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-3 lg:px-8 flex items-center gap-4 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
          <span className="text-sm font-medium text-slate-500 lg:hidden">Menu</span>
        </header>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
