import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { Save, Building2, BarChart3, Target, ExternalLink } from 'lucide-react';
import { adminFetch } from '../lib/adminFetch';

export default function AdminAbout() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/site`)
      .then((r) => r.text())
      .then((t) => { const d = t ? JSON.parse(t) : {}; setSettings(d.settings || {}); })
      .catch(() => setSettings({}));
  }, []);

  const update = (key: string, value: string) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      const res = await adminFetch('/settings', { method: 'PUT', body: JSON.stringify(settings) });
      if (!res.ok) throw new Error('Erreur');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: 'Contenu',
      icon: Building2,
      keys: ['about_subtitle', 'about_title', 'about_desc1', 'about_desc2'],
      labels: {
        about_subtitle: "Sous-titre (ex: L'Agence PeleAI 360°)",
        about_title: 'Titre principal',
        about_desc1: 'Premier paragraphe',
        about_desc2: 'Deuxième paragraphe',
      },
    },
    {
      title: 'Statistiques',
      icon: BarChart3,
      keys: ['about_stat_marchands', 'about_stat_satisfaction', 'about_stat_support', 'about_stat_frais', 'about_experts_count', 'about_experts_label'],
      labels: {
        about_stat_marchands: 'Marchands actifs (ex: 500+)',
        about_stat_satisfaction: 'Satisfaction client (ex: 98%)',
        about_stat_support: 'Support local (ex: 24/7)',
        about_stat_frais: 'Frais mensuels (ex: 0)',
        about_experts_count: 'Experts : nombre (ex: +12)',
        about_experts_label: 'Experts : texte (ex: Experts à votre service)',
      },
    },
    {
      title: 'Vision',
      icon: Target,
      keys: ['about_vision_label', 'about_vision_text'],
      labels: {
        about_vision_label: 'Label Vision',
        about_vision_text: 'Texte Vision',
      },
    },
    {
      title: 'Bouton',
      icon: ExternalLink,
      keys: ['about_button_text', 'about_button_link'],
      labels: {
        about_button_text: 'Texte du bouton',
        about_button_link: 'Lien du bouton',
      },
    },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Section À propos</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Modifiez les informations de L'Agence PeleAI 360°</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map(({ title, icon: Icon, keys, labels }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Icon className="w-5 h-5 text-primary" />
                {title}
              </h3>
              <div className="space-y-4">
                {keys.map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-slate-600 mb-2">{labels[key]}</label>
                    {key.includes('desc') || key.includes('vision_text') ? (
                      <textarea
                        value={settings[key] || ''}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[key] || ''}
                        onChange={(e) => update(key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          {saved && <span className="text-green-600 font-bold">✓ Enregistré !</span>}
        </div>
      </form>
    </div>
  );
}
