/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function PrivacyPolicy() {
  const { data } = useSite();
  const siteName = data.settings?.site_name || 'PeleAI 360°';

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Politique de confidentialité</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-slate-500 text-sm mb-8">Dernière mise à jour : mars 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Responsable du traitement</h2>
            <p className="text-slate-600 leading-relaxed">
              {siteName} (PeleAI 360° Technology Group) est responsable du traitement des données personnelles collectées via ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Données collectées</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Nous pouvons collecter :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Les données que vous nous transmettez via les formulaires (contact, newsletter)</li>
              <li>Des données techniques (adresse IP, type de navigateur) pour le bon fonctionnement du site</li>
              <li>Des informations de visite agrégées (nombre de visiteurs) sans identification personnelle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Finalités</h2>
            <p className="text-slate-600 leading-relaxed">
              Vos données sont utilisées pour répondre à vos demandes, améliorer nos services et assurer la sécurité du site. Nous ne vendons pas vos données à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Vos droits (RGPD)</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous pour exercer ces droits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Pour plus d'informations sur l'utilisation des cookies, consultez notre <Link to="/cookies" className="text-primary font-medium hover:underline">Politique des cookies</Link>.
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
