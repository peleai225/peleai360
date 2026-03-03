/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'peleai_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    if (localStorage.getItem(STORAGE_KEY) === null) {
      setVisible(true);
    }
  }, [location.pathname]);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 id="cookie-banner-title" className="font-bold text-white text-sm md:text-base">
              Ce site utilise des cookies
            </h2>
            <p id="cookie-banner-desc" className="text-slate-400 text-sm mt-1">
              Nous utilisons des cookies essentiels pour le fonctionnement du site et le stockage local pour mémoriser vos préférences. Aucun cookie tiers (analytics, publicité) n&apos;est utilisé.{' '}
              <Link to="/cookies" className="text-primary hover:underline font-medium">
                En savoir plus
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2.5 rounded-xl border border-slate-500 text-slate-400 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
