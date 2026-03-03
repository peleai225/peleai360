/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function TermsPage() {
  const { data } = useSite();
  const siteName = data.settings?.site_name || 'PeleAI 360°';

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Conditions d'utilisation</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-slate-500 text-sm mb-8">Dernière mise à jour : mars 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Objet</h2>
            <p className="text-slate-600 leading-relaxed">
              Les présentes conditions régissent l'utilisation du site {siteName} et des services proposés par PeleAI 360° Technology Group.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Acceptation</h2>
            <p className="text-slate-600 leading-relaxed">
              L'accès et l'utilisation du site impliquent l'acceptation des présentes conditions. Nous nous réservons le droit de les modifier à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Propriété intellectuelle</h2>
            <p className="text-slate-600 leading-relaxed">
              Le contenu du site (textes, images, logos) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Pour toute question relative aux conditions d'utilisation, contactez-nous via la section Contact du site.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
