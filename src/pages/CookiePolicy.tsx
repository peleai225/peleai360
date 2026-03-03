/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function CookiePolicy() {
  const { data } = useSite();
  const siteName = data.settings?.site_name || 'PeleAI 360°';

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Politique des cookies</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-slate-500 text-sm mb-8">Dernière mise à jour : mars 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p className="text-slate-600 leading-relaxed">
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Il permet au site de mémoriser des informations sur votre visite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Cookies utilisés sur {siteName}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Notre site utilise les types de cookies suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (ex. authentification administrateur). Ils ne peuvent pas être désactivés.</li>
              <li><strong>Stockage local (localStorage / sessionStorage)</strong> : nous utilisons le stockage local du navigateur pour mémoriser certaines préférences et limiter le comptage des visites à une par jour. Ces données restent sur votre appareil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Cookies tiers</h2>
            <p className="text-slate-600 leading-relaxed">
              Actuellement, nous n&apos;utilisons pas de cookies tiers (analytics, publicité, etc.). Si nous en ajoutons à l&apos;avenir, nous vous demanderons votre consentement préalable et mettrons à jour cette politique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Gestion de vos préférences</h2>
            <p className="text-slate-600 leading-relaxed">
              Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies. Notez que la désactivation des cookies essentiels peut empêcher l&apos;accès à certaines fonctionnalités du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Pour toute question concernant notre politique des cookies, contactez-nous via la section Contact du site.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
