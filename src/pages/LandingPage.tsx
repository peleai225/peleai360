/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config';
import {
  ShoppingCart, Package, ArrowRight, PlayCircle, CheckCircle2, ChevronRight, ChevronDown,
  Mail, MapPin, Menu, X, Database, MessageSquare, Play, Facebook, Twitter, Instagram, Linkedin,
  Phone, Send, Zap, ShieldCheck, Users2, Sparkles, Tablet, LayoutDashboard, Globe,
  Target, Users, Heart, Headphones, CheckCircle, Smartphone, BarChart3, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSite();
  const logo = data.settings?.logo_url || 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png';
  const siteName = data.settings?.site_name || 'PeleAI 360°';

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="relative group cursor-pointer block">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <img src={logo} alt={`${siteName} Logo`} className="h-12 md:h-14 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
            <span className="hidden text-xl font-bold text-primary tracking-tight relative z-10">{siteName}</span>
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {['Solutions', 'Tarifs', 'À Propos', 'FAQ', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200 relative inline-block py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">{item}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#tarifs" className="hidden md:block bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5">Démarrer</a>
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-b border-slate-200/60 overflow-hidden">
            <div className="flex flex-col p-6 gap-1">
              {['Solutions', 'Tarifs', 'À Propos', 'FAQ', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="py-3 text-base font-medium text-slate-600 hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>{item}</a>
              ))}
              <a href="#tarifs" onClick={() => setIsOpen(false)} className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-semibold text-center block">Démarrer</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-white">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[150px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]"></div>
    </div>
    <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 text-slate-600 text-[11px] font-semibold uppercase tracking-widest border border-slate-200/60">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> Une solution exclusive signée PeleAI
        </motion.div>
        <div className="relative">
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.08] tracking-tight text-slate-900 max-w-5xl">
            Pilotez votre commerce <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_auto] animate-gradient">physique et en ligne</span> <br className="hidden md:block" />
            d'une seule main.
          </h1>
        </div>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
          Gérez vos stocks, scannez vos produits en caisse et vendez sur internet 24h/7j depuis votre tablette. La solution 360° complète, sans abonnement, pour seulement 350 000 FCFA.
        </p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="flex flex-wrap justify-center gap-4 mt-2">
          <a href="#tarifs" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-base hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group active:scale-[0.98]">
            Obtenir la Solution PeleAI 360° <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
        <div className="grid grid-cols-3 gap-6 md:gap-16 pt-16 border-t border-slate-200/60 w-full max-w-3xl mt-10">
          {[{ icon: ShieldCheck, label: "Sécurisé", color: "text-emerald-500", bg: "bg-emerald-50" }, { icon: Zap, label: "Ultra-Rapide", color: "text-amber-500", bg: "bg-amber-50" }, { icon: Globe, label: "Multi-Canal", color: "text-primary", bg: "bg-primary/5" }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex flex-col items-center gap-3 group cursor-default">
              <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data } = useSite();
  const previewVideo = data.videos?.find((v: { is_preview: number }) => v.is_preview === 1) || data.videos?.[0];
  const defaultVideo = { url: 'https://www.youtube.com/embed/v74_j_6L_X0', title: 'Découvrez l\'Innovation en Action', description: 'Voyez comment PeleAI transforme la gestion quotidienne de centaines de marchands grâce à l\'intelligence artificielle.', thumbnail_url: 'https://picsum.photos/seed/digital-business/1920/1080' };
  const v = previewVideo || defaultVideo;
  const embedUrl = v.url?.includes('embed') ? v.url : `https://www.youtube.com/embed/${v.url?.split('v=')[1]?.split('&')[0] || 'v74_j_6L_X0'}`;

  return (
    <section className="px-6 py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(43,76,140,0.2)] ring-1 ring-slate-200/50 group">
          <div className="aspect-video relative bg-slate-900">
            {!isPlaying ? (
              <>
                <img alt="Démo PeleAI" className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
                  src={v.thumbnail_url || 'https://picsum.photos/seed/digital-business/1920/1080'} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(true)}
                    className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 mb-8 group/play cursor-pointer">
                    <Play className="w-10 h-10 md:w-14 md:h-14 fill-current ml-2 group-hover/play:scale-110 transition-transform" />
                  </motion.button>
                  <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{v.title || 'Découvrez l\'Innovation en Action'}</h3>
                  <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed">{v.description || ''}</p>
                </div>
              </>
            ) : (
              <iframe className="w-full h-full" src={`${embedUrl}?autoplay=1`} title="PeleAI Demo" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            )}
          </div>
          <div className="bg-slate-900/95 backdrop-blur-sm p-6 md:p-8 flex flex-wrap items-center justify-center gap-8 md:gap-12 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Live Demo Available</span>
            </div>
            <div className="flex items-center gap-3"><Users2 className="w-5 h-5 text-primary" /><span className="text-white/60 text-[10px] font-black uppercase tracking-widest">2,000+ Active Users</span></div>
            <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-primary" /><span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Enterprise Grade Security</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const pillars = [
    { icon: Globe, title: "E-Commerce", subtitle: "Front-Office", desc: "L'interface visible par les clients pour commander depuis leur salon.", items: ["Boutique en ligne responsive", "Catalogue dynamique", "Système de commande intuitif", "Personnalisation d'apparence", "Suivi de commande en temps réel"] },
    { icon: Package, title: "Stock & Logistique", subtitle: "Le Cœur du Réacteur", desc: "Ne soyez plus jamais en rupture de stock.", items: ["Inventaire en temps réel", "Gestion des fournisseurs", "Module Dropshipping intégré", "Alertes de stock critique"] },
    { icon: Tablet, title: "Point de Vente", subtitle: "Smart POS", desc: "Transformez votre tablette en caisse enregistreuse ultra-moderne.", items: ["Scan Caisse via Caméra", "Générateur de Codes-Barres", "Générateur de QR Codes", "Édition de tickets thermique"] },
    { icon: LayoutDashboard, title: "Administration", subtitle: "Back-Office 360°", desc: "Le tableau de bord pour piloter l'ensemble du business.", items: ["Gestion 100% Mobile", "Gestion du personnel & droits", "Moteur de Codes Promo", "Paramétrage complet boutique", "Statistiques de vente avancées"] }
  ];
  return (
    <section id="solutions" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-primary font-semibold text-xs uppercase tracking-[0.25em] mb-4 block">Arsenal Complet</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">Un Écosystème <span className="text-primary">Intégré</span></h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">Ce n'est pas juste un site web, c'est un écosystème où votre boutique en ligne communique instantanément avec votre caisse physique.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group p-6 md:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">{React.createElement(p.icon, { className: 'w-7 h-7' })}</div>
              <div className="mb-5">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1 block">{p.subtitle}</span>
                <h4 className="text-xl font-bold text-slate-900 leading-tight">{p.title}</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{p.desc}</p>
              <ul className="space-y-3 mt-auto">
                {p.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="tarifs" className="px-6 py-24 md:py-32 bg-slate-50/80 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14 md:mb-16">
        <span className="text-primary font-semibold text-xs uppercase tracking-[0.25em] mb-3 block">Innovation Digitale</span>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-5 mb-5">
          <h2 className="text-slate-900 text-3xl md:text-5xl font-bold tracking-tight">La Solution PeleAI 360°</h2>
          <span className="inline-flex px-4 py-2 bg-slate-900 text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full border border-primary/30 w-fit mx-auto sm:mx-0">Propriété Totale</span>
        </div>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">L'innovation par l'intelligence artificielle au service de votre commerce. Une transformation digitale complète et sans compromis.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        <div className="lg:flex-1 lg:min-w-0 bg-white rounded-2xl p-8 md:p-10 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3"><Sparkles className="w-6 h-6 text-primary" /> L'Arsenal PeleAI 360°</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {[{ title: "E-Commerce Complet", desc: "Boutique responsive, catalogue dynamique et suivi temps réel." }, { title: "Stock & Logistique", desc: "Inventaire auto, alertes ruptures et module Dropshipping." }, { title: "Smart POS", desc: "Scan caisse tablette, QR codes et édition de tickets." }, { title: "Back-Office 360°", desc: "Gestion 100% mobile, personnel et statistiques avancées." }, { title: "Marketing Intégré", desc: "Moteur de codes promo et fidélisation client automatisée." }, { title: "Écosystème Connecté", desc: "Votre site web parle directement à votre caisse magasin." }].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full h-fit shrink-0"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  <div><h4 className="font-bold text-slate-900 mb-1">{item.title}</h4><p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold"><ShieldCheck className="w-5 h-5 text-green-500 shrink-0" /> Mises à jour gratuites</div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold"><Users2 className="w-5 h-5 text-blue-500 shrink-0" /> Formation incluse</div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold"><Zap className="w-5 h-5 text-yellow-500 shrink-0" /> Installation express</div>
            </div>
          </div>
        </div>

        <div className="lg:w-[400px] lg:shrink-0 relative group">
          <div className="absolute -inset-px bg-gradient-to-br from-primary/60 via-blue-500/60 to-primary/60 rounded-2xl blur-sm group-hover:blur-md opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
          <div className="relative h-full flex flex-col bg-slate-900 rounded-2xl p-8 md:p-10 text-white overflow-hidden shadow-xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <Database className="w-7 h-7 text-primary/40 shrink-0" />
                <span className="px-4 py-1.5 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/30">Propriété Totale</span>
              </div>
              <div className="mb-8">
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">Investissement Unique</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-black tracking-tighter">350k</span>
                  <span className="text-xl font-bold text-slate-400">FCFA</span>
                </div>
                <p className="text-primary font-black text-xs mt-3 uppercase tracking-widest">CAPEX vs OPEX : Zéro abonnement</p>
              </div>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0"><Sparkles className="w-5 h-5 text-white" /></div>
                  <div><p className="font-bold text-sm">Licence à vie</p><p className="text-xs text-slate-400">Vous êtes propriétaire de l'outil</p></div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0"><ShieldCheck className="w-5 h-5 text-white" /></div>
                  <div><p className="font-bold text-sm">Garantie & Support</p><p className="text-xs text-slate-400">Accompagnement technique complet</p></div>
                </div>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg shadow-primary/30 group/btn mt-auto">Commander le Pack <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const About = () => {
  const { data } = useSite();
  const s = data.settings || {};
  const stats = [
    { label: "Marchands Actifs", value: s.about_stat_marchands || "500+", icon: Users, color: "text-primary", bg: "bg-primary/5" },
    { label: "Satisfaction Client", value: s.about_stat_satisfaction || "98%", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
    { label: "Support Local", value: s.about_stat_support || "24/7", icon: Headphones, color: "text-green-500", bg: "bg-green-50" },
    { label: "Frais Mensuels", value: s.about_stat_frais || "0", icon: CheckCircle, color: "text-yellow-500", bg: "bg-yellow-50" }
  ];
  return (
    <section id="à-propos" className="px-6 py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-map-dots"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
            <div className="relative aspect-square bg-slate-50 rounded-[3rem] border border-slate-200 overflow-hidden p-8 flex items-center justify-center shadow-inner group">
              <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div><div className="w-2 h-2 rounded-full bg-yellow-400"></div><div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-4 w-32 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-24 bg-primary/5 rounded-xl border border-primary/10 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary" /></div>
                      <div className="space-y-1"><div className="h-2 w-12 bg-slate-200 rounded-full"></div><div className="h-4 w-20 bg-slate-900 rounded-full"></div></div>
                    </div>
                    <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 p-4">
                      <div className="flex gap-2 items-end h-full">
                        <div className="flex-1 bg-primary/20 rounded-t-sm h-[40%]"></div><div className="flex-1 bg-primary/40 rounded-t-sm h-[70%]"></div><div className="flex-1 bg-primary rounded-t-sm h-[90%]"></div><div className="flex-1 bg-primary/60 rounded-t-sm h-[50%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-40 bg-slate-900 rounded-xl p-4 flex flex-col justify-between overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full"></div>
                      <div className="relative z-10">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-4"><Package className="w-4 h-4 text-white" /></div>
                        <div className="h-2 w-16 bg-white/20 rounded-full mb-2"></div><div className="h-5 w-24 bg-white rounded-full"></div>
                      </div>
                      <div className="relative z-10 flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">{i}</div>)}
                      </div>
                    </div>
                    <div className="h-16 bg-blue-50 rounded-xl border border-blue-100 p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-blue-500" /></div>
                      <div className="h-2 w-16 bg-blue-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 -right-4 w-48 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-green-500" /></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobilité</p><p className="text-sm font-bold text-slate-900">Scan Instantané</p></div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-4 -left-4 w-48 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyses</p><p className="text-sm font-bold text-slate-900">Rapports 360°</p></div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-10">
            <div>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">{s.about_subtitle || "L'Agence PeleAI 360°"}</span>
              <h2 className="text-slate-900 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight mb-8">{s.about_title || "Propulser les marchands africains vers le futur."}</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 font-medium">{s.about_desc1 || "Nous ne sommes pas juste une boîte de logiciels. Nous sommes vos partenaires de croissance. PeleAI est née de la volonté de briser les barrières technologiques pour les commerçants locaux."}</p>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">{s.about_desc2 || "Notre mission est claire : démocratiser l'accès aux outils de gestion de classe mondiale. Nous combinons une expertise technique pointue avec une connaissance profonde des réalités du marché africain pour créer des solutions qui fonctionnent vraiment."}</p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"><Users className="w-4 h-4 text-primary/60" /></div>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-black text-white">{s.about_experts_count || '+12'}</div>
                </div>
                <div className="h-px w-12 bg-slate-200"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.about_experts_label || 'Experts à votre service'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8 relative">
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-12 -right-12 w-40 bg-white p-4 rounded-2xl shadow-xl border border-primary/10 hidden xl:block z-20">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><Target className="w-4 h-4 text-primary" /></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.about_vision_label || "Vision"}</p>
                <p className="text-xs font-bold text-slate-900 leading-tight">{s.about_vision_text || "Innovation sans frontières"}</p>
              </motion.div>
              {stats.map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>{React.createElement(stat.icon, { className: `w-6 h-6 ${stat.color}` })}</div>
                  <h4 className="text-slate-900 text-3xl md:text-4xl font-black tracking-tighter mb-1">{stat.value}</h4>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="pt-4">
              <a href={s.about_button_link || '#'} className="inline-flex px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg items-center gap-4 hover:bg-slate-800 transition-all group shadow-xl shadow-slate-200">
                {s.about_button_text || "En savoir plus sur notre vision"} <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { data } = useSite();
  const s = data.settings || {};
  const waNumber = (s.whatsapp_number || '2250506805382').replace(/\D/g, '');
  const waBase = s.whatsapp_url || `https://wa.me/${waNumber}`;
  const waDirectMsg = s.whatsapp_default_message || "Bonjour, je suis intéressé par la solution PeleAI 360°. J'aimerais avoir plus d'informations.";
  const waDirectUrl = `${waBase}${waBase.includes('?') ? '&' : '?'}text=${encodeURIComponent(waDirectMsg)}`;

  const [form, setForm] = useState({ prenom: '', nom: '', email: '', projet: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom.trim() || !form.email.trim()) {
      alert('Veuillez remplir au moins le prénom et l\'email.');
      return;
    }
    setSending(true);
    const msg = `Bonjour, je suis intéressé par la solution PeleAI 360°.

*Coordonnées :*
• Prénom : ${form.prenom.trim()}
• Nom : ${form.nom.trim()}
• Email : ${form.email.trim()}

*Mon projet :*
${form.projet.trim() || '(Non renseigné)'}

Merci de me recontacter.`;
    window.open(`${waBase}${waBase.includes('?') ? '&' : '?'}text=${encodeURIComponent(msg)}`, '_blank');
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-6 block">Contactez-nous</span>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{s.contact_title || "Prêt à digitaliser votre commerce ?"}</h3>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">{s.contact_subtitle || "Notre équipe d'experts est prête à vous accompagner. Discutons de vos besoins spécifiques et voyons comment PeleAI peut vous aider."}</p>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"><Mail className="w-6 h-6" /></div>
                  <div><p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Email</p><p className="text-lg font-bold">{s.email || 'peleai.ci@gmail.com'}</p></div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"><Phone className="w-6 h-6" /></div>
                  <div><p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Téléphone</p><p className="text-lg font-bold">{s.phone || '+225 05 06 80 53 82'}</p></div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"><MapPin className="w-6 h-6" /></div>
                  <div><p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Localisation</p><p className="text-lg font-bold">{s.address || 'Cocody, Abidjan, CI'}</p></div>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-10 border-t border-white/10 relative z-10">
              <a className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-2xl font-black transition-all shadow-xl shadow-green-500/20 text-lg" href={waDirectUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-6 h-6 fill-current" /> WhatsApp Direct
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white rounded-2xl p-10 md:p-14 border border-slate-200/80 shadow-sm">
            <h4 className="text-2xl font-black text-slate-900 mb-10">Envoyez-nous un message</h4>
            <p className="text-slate-500 text-sm mb-6">Remplissez le formulaire puis envoyez via WhatsApp. Vous recevrez une réponse rapide.</p>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Prénom *</label>
                  <input required value={form.prenom} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary px-6 py-4 font-bold text-slate-900 placeholder:text-slate-300 transition-all" placeholder="Jean" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nom</label>
                  <input value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary px-6 py-4 font-bold text-slate-900 placeholder:text-slate-300 transition-all" placeholder="Koffi" type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Professionnel *</label>
                <input required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary px-6 py-4 font-bold text-slate-900 placeholder:text-slate-300 transition-all" placeholder="jean.koffi@entreprise.ci" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Votre Projet</label>
                <textarea value={form.projet} onChange={(e) => setForm((f) => ({ ...f, projet: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary px-6 py-4 font-bold text-slate-900 placeholder:text-slate-300 transition-all resize-none" placeholder="Décrivez brièvement votre activité et vos besoins..." rows={5}></textarea>
              </div>
              <button disabled={sending} className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 text-lg group disabled:opacity-70" type="submit">
                {sending ? 'Ouverture de WhatsApp...' : <>Envoyer via WhatsApp <MessageSquare className="w-5 h-5 fill-current" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const allFaqs = [
    { q: "Pourquoi le prix est-il de 350 000 FCFA sans abonnement ?", a: "Contrairement aux solutions classiques qui vous facturent chaque mois, PeleAI prône la propriété. Vous payez une fois pour l'installation et la configuration de votre licence à vie. Vous ne payez que votre hébergement annuel (serveur)." },
    { q: "Y a-t-il des frais cachés ?", a: "Aucun frais caché sur le logiciel. Les seuls frais récurrents sont le nom de domaine et l'hébergement web (renouvelables annuellement), que nous pouvons gérer pour vous." },
    { q: "Ai-je vraiment besoin d'un ordinateur pour gérer ma boutique ?", a: "Non. La solution a été pensée pour la mobilité. Une simple tablette (Android ou iPad) suffit pour scanner les produits, gérer les stocks et suivre vos ventes en ligne." },
    { q: "Comment fonctionne le système de scan en caisse ?", a: "Le système utilise la caméra de votre tablette ou de votre smartphone pour scanner les codes-barres et les QR codes que le logiciel génère automatiquement pour vos produits. C'est instantané et fluide." },
    { q: "Puis-je changer le design de mon site moi-même ?", a: "Oui. Le back-office vous permet de changer de template et de modifier les couleurs ou les thèmes pour adapter le site à l'évolution de votre marque." },
    { q: "Est-ce que la solution gère le Dropshipping ?", a: "Absolument. Vous pouvez enregistrer vos fournisseurs, gérer les produits de tiers et automatiser le suivi des commandes sans avoir de stock physique si vous le souhaitez." },
    { q: "Puis-je créer plusieurs accès pour mes employés ?", a: "Oui, vous pouvez créer des comptes avec des droits restreints. Par exemple, un compte 'Caissier' qui ne peut que vendre, et un compte 'Gestionnaire' qui a accès aux stocks et aux rapports." },
    { q: "Que se passe-t-il si j'ai un problème technique ?", a: "L'agence PeleAI assure un support technique après installation. En tant qu'experts en consommation digitale, nous ne vous laissons pas seul avec l'outil." },
    { q: "Combien de temps prend l'installation ?", a: "Une fois vos informations de boutique reçues, nous déployons votre solution complète (Site + Back-office 360°) sous un délai de 5 à 7 jours ouvrés." },
    { q: "Est-ce que mes clients peuvent payer en ligne ?", a: "Le système permet de recevoir des commandes. Nous pouvons intégrer des modules de paiement locaux (Mobile Money) selon vos besoins spécifiques lors de l'installation." }
  ];
  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50/80 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-xs uppercase tracking-[0.25em] mb-3 block">Centre d'Assistance</span>
          <h2 className="text-slate-900 text-3xl md:text-5xl font-bold mb-5 tracking-tight">Questions Fréquentes</h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">Tout ce que vous devez savoir sur la révolution digitale PeleAI.</p>
        </div>
        <div className="space-y-3">
          {allFaqs.map((faq, i) => (
            <motion.details key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="group rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 open:border-primary/20 open:shadow-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6 list-none">
                <h4 className="text-slate-900 font-semibold text-base md:text-lg tracking-tight group-open:text-primary transition-colors">{faq.q}</h4>
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-open:bg-primary group-open:text-white transition-all duration-300 shrink-0">
                  <ChevronDown className="w-6 h-6 transition-transform duration-500 group-open:rotate-180" />
                </div>
              </summary>
              <div className="px-8 pb-8">
                <div className="h-px w-full bg-slate-100 mb-6"></div>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { data } = useSite();
  const s = data.settings || {};
  const logo = s.logo_url || 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png';
  const siteName = s.site_name || 'PeleAI 360°';
  const socials = [
    { Icon: Facebook, url: s.facebook_url || '#' },
    { Icon: Twitter, url: s.twitter_url || '#' },
    { Icon: Instagram, url: s.instagram_url || '#' },
    { Icon: Linkedin, url: s.linkedin_url || '#' },
  ];
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 overflow-hidden relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col">
              <img src={logo} alt={`${siteName} Logo`} className="h-16 w-auto object-contain self-start" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <span className="hidden text-3xl font-black text-white tracking-tighter">{siteName}</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">La solution digitale de gestion tout-en-un conçue pour l'innovation et la performance des marchands en Afrique.</p>
            <div className="flex gap-4">
              {socials.map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <h5 className="text-sm font-black uppercase tracking-widest text-primary">Solutions</h5>
            <ul className="space-y-4">
              {['Smart POS', 'E-Commerce', 'Gestion Stock', 'Analyses IA', 'Marketing'].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <h5 className="text-sm font-black uppercase tracking-widest text-primary">Agence</h5>
            <ul className="space-y-4">
              {['À Propos', 'Nos Réalisations', 'Blog', 'Carrières', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <h5 className="text-sm font-black uppercase tracking-widest text-primary">Newsletter</h5>
            <p className="text-slate-400 text-sm leading-relaxed">Recevez nos conseils pour booster votre commerce et nos dernières mises à jour.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="votre@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-primary focus:border-primary transition-all" />
              <button className="bg-primary p-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"><ArrowRight className="w-5 h-5" /></button>
            </form>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-medium">© 2024 PeleAI 360° Technology Group. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link to="/confidentialite" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Confidentialité</Link>
            <Link to="/conditions" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Conditions</Link>
            <Link to="/cookies" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const { loading, error } = useSite();

  useEffect(() => {
    const key = 'peleai_visit_' + new Date().toDateString();
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    fetch(`${API_BASE}/api/visit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).catch(() => {});
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-white text-red-600">Erreur de chargement. Assurez-vous que le serveur API tourne.</div>;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <Features />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
