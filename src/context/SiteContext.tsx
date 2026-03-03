import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface SiteData {
  settings: Record<string, string>;
  videos: Array<{
    id: number;
    url: string;
    title: string;
    description: string;
    thumbnail_url: string;
    is_preview: number;
    sort_order: number;
  }>;
}

const defaultData: SiteData = {
  settings: {},
  videos: [],
};

const SiteContext = createContext<{
  data: SiteData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}>({
  data: defaultData,
  loading: true,
  error: null,
  refresh: async () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/site');
      if (!res.ok) throw new Error('Erreur chargement');
      const text = await res.text();
      let json = { settings: {}, videos: [] };
      try { json = text ? JSON.parse(text) : json; } catch { /* réponse invalide */ }
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
      setData({ settings: {}, videos: [] });
      console.warn('API /api/site indisponible. Démarrez le serveur avec: npm run dev');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const favicon = data.settings?.favicon_url || data.settings?.logo_url;
    if (favicon) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
      link.type = favicon.match(/\.svg$/i) ? 'image/svg+xml' : 'image/png';
    }
  }, [data.settings?.favicon_url, data.settings?.logo_url]);

  useEffect(() => {
    const title = data.settings?.meta_title || data.settings?.site_name || 'PeleAI 360°';
    const desc = data.settings?.meta_description || '';
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, [data.settings?.meta_title, data.settings?.meta_description, data.settings?.site_name]);

  return (
    <SiteContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

export function useSetting(key: string): string {
  const { data } = useSite();
  return data.settings[key] ?? '';
}
