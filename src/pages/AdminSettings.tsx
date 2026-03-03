import React, { useState, useEffect, useRef } from 'react';
import { Save, Image, Mail, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Upload, Lock, Search } from 'lucide-react';
import { adminFetch } from '../lib/adminFetch';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', new: '', confirm: '' });
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/site')
      .then((r) => r.text())
      .then((t) => { const d = t ? JSON.parse(t) : {}; setSettings(d.settings || {}); })
      .catch(() => setSettings({}));
  }, []);

  const update = (key: string, value: string) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const uploadFile = async (file: File, type: 'logo' | 'favicon') => {
    if (!file.type.startsWith('image/')) {
      alert('Choisissez une image (PNG, JPG, SVG, etc.)');
      return;
    }
    setUploading(type);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('type', type);
      const res = await adminFetch('/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error('Erreur upload');
      const { url } = await res.json();
      const newSettings = { ...settings, [type === 'logo' ? 'logo_url' : 'favicon_url']: url };
      setSettings(newSettings);
      const saveRes = await adminFetch('/settings', { method: 'PUT', body: JSON.stringify(newSettings) });
      if (saveRes.ok) setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur lors du chargement du fichier');
    } finally {
      setUploading(null);
    }
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.new !== pwForm.confirm) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (pwForm.new.length < 6) {
      alert('Le nouveau mot de passe doit faire au moins 6 caractères');
      return;
    }
    setPwLoading(true);
    setPwSuccess(false);
    try {
      const res = await adminFetch('/password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.new }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setPwSuccess(true);
      setPwForm({ current: '', new: '', confirm: '' });
      setTimeout(() => {
        setPwSuccess(false);
        window.location.href = '/admin/login';
      }, 1500);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erreur lors du changement');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Paramètres du site</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Gérez le logo, les contacts et les réseaux sociaux</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Image className="w-5 h-5 text-primary" />
              Identité
            </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Logo</label>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, 'logo'); e.target.value = ''; }}
              />
              <div className="flex items-center gap-4">
                {settings.logo_url && (
                  <img src={settings.logo_url} alt="Logo actuel" className="h-16 object-contain rounded-lg border border-slate-200" referrerPolicy="no-referrer" onError={(e) => e.currentTarget.style.display = 'none'} />
                )}
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploading === 'logo'}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploading === 'logo' ? 'Chargement...' : 'Charger un logo'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Favicon (icône onglet)</label>
              <input
                ref={faviconInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, 'favicon'); e.target.value = ''; }}
              />
              <div className="flex items-center gap-4">
                {settings.favicon_url && (
                  <img src={settings.favicon_url} alt="Favicon actuel" className="h-10 w-10 object-contain rounded border border-slate-200" referrerPolicy="no-referrer" onError={(e) => e.currentTarget.style.display = 'none'} />
                )}
                <button
                  type="button"
                  onClick={() => faviconInputRef.current?.click()}
                  disabled={uploading === 'favicon'}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploading === 'favicon' ? 'Chargement...' : 'Charger un favicon'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Nom du site</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => update('site_name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                placeholder="PeleAI 360°"
              />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Search className="w-5 h-5 text-primary" />
              SEO
            </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Titre de la page (meta title)</label>
              <input
                type="text"
                value={settings.meta_title || ''}
                onChange={(e) => update('meta_title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                placeholder="PeleAI 360° - Solution de Gestion Commerciale"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Description (meta description)</label>
              <textarea
                value={settings.meta_description || ''}
                onChange={(e) => update('meta_description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                rows={2}
                placeholder="Pilotez votre commerce physique et en ligne..."
              />
            </div>
          </div>
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Mail className="w-5 h-5 text-primary" />
              Contact
            </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => update('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Téléphone</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Adresse</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => update('address', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">WhatsApp (numéro sans +)</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => {
                  update('whatsapp_number', e.target.value);
                  update('whatsapp_url', `https://wa.me/${e.target.value.replace(/\D/g, '')}`);
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                placeholder="2250506805382"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Message WhatsApp pré-rempli (bouton « WhatsApp Direct »)</label>
              <textarea
                value={settings.whatsapp_default_message || ''}
                onChange={(e) => update('whatsapp_default_message', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                placeholder="Bonjour, je suis intéressé par la solution PeleAI 360°..."
                rows={2}
              />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
              <MessageSquare className="w-5 h-5 text-primary" />
              Section Contact
            </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Titre de la section contact</label>
              <input
                type="text"
                value={settings.contact_title || ''}
                onChange={(e) => update('contact_title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Sous-titre / description</label>
              <textarea
                value={settings.contact_subtitle || ''}
                onChange={(e) => update('contact_subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                rows={2}
              />
            </div>
          </div>
        </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
            <MessageSquare className="w-5 h-5 text-primary" />
            Réseaux sociaux
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'facebook_url', label: 'Facebook', icon: Facebook },
              { key: 'twitter_url', label: 'Twitter / X', icon: Twitter },
              { key: 'instagram_url', label: 'Instagram', icon: Instagram },
              { key: 'linkedin_url', label: 'LinkedIn', icon: Linkedin },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                  <Icon className="w-4 h-4" /> {label}
                </label>
                <input
                  type="url"
                  value={settings[key] || ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary"
                  placeholder="https://..."
                />
              </div>
            ))}
          </div>
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
          {saved && (
            <span className="text-green-600 font-bold">✓ Enregistré !</span>
          )}
        </div>
      </form>

      <div className="mt-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Sécurité
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Mot de passe actuel</label>
              <input type="password" value={pwForm.current} onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" required placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Nouveau mot de passe (min. 6 caractères)</label>
              <input type="password" value={pwForm.new} onChange={(e) => setPwForm((f) => ({ ...f, new: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" required minLength={6} placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Confirmer le nouveau mot de passe</label>
              <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary" required minLength={6} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={pwLoading} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 disabled:opacity-50">
              {pwLoading ? 'Changement...' : 'Changer le mot de passe'}
            </button>
            {pwSuccess && <span className="text-green-600 font-bold ml-4">✓ Mot de passe modifié. Redirection...</span>}
          </form>
        </div>
      </div>
    </div>
  );
}
