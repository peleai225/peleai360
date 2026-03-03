import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Star, Video, Upload } from 'lucide-react';
import { adminFetch } from '../lib/adminFetch';

interface VideoItem {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnail_url: string;
  is_preview: number;
  sort_order: number;
}

export default function AdminVideos() {
  const navigate = useNavigate();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<VideoItem | null>(null);
  const [form, setForm] = useState({ url: '', title: '', description: '', thumbnail_url: '' });
  const [uploadingThumb, setUploadingThumb] = useState(false);

  const load = () => {
    adminFetch('/videos')
      .then(async (r) => {
        if (r.status === 401) {
          setVideos([]);
          navigate('/admin/login', { replace: true });
          return null;
        }
        return r.text();
      })
      .then((t) => {
        if (t === null) return;
        try {
          const data = t ? JSON.parse(t) : [];
          setVideos(Array.isArray(data) ? data : []);
        } catch {
          setVideos([]);
        }
      })
      .catch(() => setVideos([]));
  };

  useEffect(() => load(), []);

  const extractYoutubeId = (url: string) => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
    return m ? m[1] : url;
  };

  const getEmbedUrl = (url: string) => {
    const id = extractYoutubeId(url);
    return id.startsWith('http') ? url : `https://www.youtube.com/embed/${id}`;
  };

  const save = async () => {
    const embedUrl = getEmbedUrl(form.url);
    try {
      if (editing) {
        await adminFetch(`/videos/${editing.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...form, url: embedUrl }),
        });
      } else {
        await adminFetch('/videos', {
          method: 'POST',
          body: JSON.stringify({ ...form, url: embedUrl }),
        });
      }
      setForm({ url: '', title: '', description: '', thumbnail_url: '' });
      setShowForm(false);
      setEditing(null);
      load();
    } catch {
      alert('Erreur');
    }
  };

  const setPreview = async (id: number) => {
    await adminFetch(`/videos/${id}/preview`, { method: 'PUT' });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Supprimer cette vidéo ?')) return;
    await adminFetch(`/videos/${id}`, { method: 'DELETE' });
    load();
  };

  const uploadThumbnail = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Choisissez une image (PNG, JPG, WebP, etc.)');
      return;
    }
    setUploadingThumb(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('type', 'thumbnail');
      const res = await adminFetch('/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Erreur upload');
      const { url } = await res.json();
      setForm((f) => ({ ...f, thumbnail_url: url }));
    } catch {
      alert('Erreur lors du chargement de l\'image');
    } finally {
      setUploadingThumb(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Vidéos</h1>
          <p className="text-slate-500 text-sm md:text-base mt-1">Gérez les vidéos affichées sur le site</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ url: '', title: '', description: '', thumbnail_url: '' }); }}
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 w-fit shrink-0"
        >
          <Plus className="w-5 h-5" />
          Ajouter une vidéo
        </button>
      </div>

      {(showForm || editing) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">{editing ? 'Modifier la vidéo' : 'Nouvelle vidéo'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-600 mb-2">URL YouTube</label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Image de prévisualisation</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.thumbnail_url}
                  onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="URL ou chargez une image"
                />
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadThumbnail(f); e.target.value = ''; }}
                />
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current?.click()}
                  disabled={uploadingThumb}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploadingThumb ? 'Chargement...' : 'Charger une image'}
                </button>
              </div>
              {form.thumbnail_url && (
                <img src={form.thumbnail_url} alt="Aperçu" className="mt-2 h-20 w-auto rounded-lg border border-slate-200 object-cover" referrerPolicy="no-referrer" onError={(e) => e.currentTarget.style.display = 'none'} />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-600 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90">
              Enregistrer
            </button>
            <button
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {videos.length === 0 && !showForm && !editing && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Video className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium mb-2">Aucune vidéo</p>
          <p className="text-slate-400 text-sm mb-6">Ajoutez votre première vidéo pour l'afficher sur le site</p>
          <button
            onClick={() => { setShowForm(true); setForm({ url: '', title: '', description: '', thumbnail_url: '' }); }}
            className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold inline-flex items-center gap-2 hover:bg-primary/90"
          >
            <Plus className="w-5 h-5" />
            Ajouter une vidéo
          </button>
        </div>
      )}

      {videos.length > 0 && (
      <div className="grid grid-cols-1 gap-4">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 shadow-sm hover:border-slate-300 transition-colors"
          >
            <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              {v.thumbnail_url ? (
                <img src={v.thumbnail_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-10 h-10 text-slate-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-slate-900 truncate">{v.title || 'Sans titre'}</h4>
                {v.is_preview === 1 && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
                    Vidéo principale
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm truncate">{v.description || v.url}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {v.is_preview !== 1 && (
                <button
                  onClick={() => setPreview(v.id)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-primary/20 text-slate-600 hover:text-primary"
                  title="Définir comme vidéo principale"
                >
                  <Star className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => { setEditing(v); setForm({ url: v.url, title: v.title, description: v.description, thumbnail_url: v.thumbnail_url }); }}
                className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600"
              >
                Modifier
              </button>
              <button
                onClick={() => remove(v.id)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
