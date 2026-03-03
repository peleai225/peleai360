import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Video, Building2, ExternalLink, Users, Eye } from 'lucide-react';

import { adminFetch } from '../lib/adminFetch';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<{ visitors: number; visitorsToday: number; videosCount: number } | null>(null);

  useEffect(() => {
    adminFetch('/stats')
      .then((r) => {
        if (r.status === 401) {
          navigate('/admin/login', { replace: true });
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => data && setStats(data))
      .catch(() => setStats({ visitors: 0, visitorsToday: 0, videosCount: 0 }));
  }, [navigate]);

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1">Bienvenue dans le backoffice PeleAI 360°</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-colors shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Voir le site
        </a>
      </div>

      <section className="mb-12">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Visiteurs totaux</p>
                <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats?.visitors ?? '—'}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Aujourd'hui</p>
                <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats?.visitorsToday ?? '—'}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Vidéos</p>
                <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats?.videosCount ?? '—'}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/settings"
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Settings className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Paramètres</h3>
              <p className="text-slate-500 text-sm truncate">Logo, contacts, SEO</p>
            </div>
          </Link>
          <Link
            to="/admin/videos"
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Video className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Vidéos</h3>
              <p className="text-slate-500 text-sm truncate">Démonstrations</p>
            </div>
          </Link>
          <Link
            to="/admin/about"
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">À propos</h3>
              <p className="text-slate-500 text-sm truncate">Section Agence</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
