import React, { useState, useEffect, useCallback } from 'react';
import { Activity, Crosshair, ShieldAlert, CalendarClock, ChevronRight, UserCircle2, CreditCard, Star, LogIn, ChevronDown, Menu, X, Type, ImageIcon, RotateCcw, Settings } from 'lucide-react';
import { loadContentFromFirebase, saveContentToFirebase } from './firebase.js';

const STORAGE_KEY = 'trinity-soccer-content';

const defaultContent = {
  // Hero
  heroTagline: 'Holistic Approach',
  heroHeadline1: 'Experience',
  heroHeadline2: 'Transformation',
  heroSubheadline: 'At Trinity Soccer, we engineer players for the modern game. Superior IQ. Elite Ability. Unbreakable Confidence.',
  heroCta: 'Initialize Training',
  // Logo & Brand
  brandPrefix: '///',
  brandName: 'TRINITY SOCCER',
  footerBrand: 'TRINITY SOCCER PERFORMANCE © 2026',
  // Core Architecture
  coreSectionTitle: 'Core Architecture',
  focus1Title: 'GAME IQ',
  focus1Desc: 'Players understanding of the game of Soccer will be next level.',
  focus2Title: 'ABILITY',
  focus2Desc: 'Players will experience new levels of technical ability.',
  focus3Title: 'COURAGE',
  focus3Desc: 'Players will be able to face pressure with unshakeable confidence.',
  // Development Plans
  plansSectionTitle: 'Development Plans',
  program1Title: 'PHASE I',
  program1Duration: '1 MONTH',
  program1Desc: 'Intensive introduction to our holistic approach.',
  program1Price: '$199',
  program2Title: 'PHASE II',
  program2Duration: '3 MONTHS',
  program2Desc: 'Deep dive into tactical IQ and technical habits.',
  program2Price: '$499',
  program3Title: 'PHASE III',
  program3Duration: '6 MONTHS',
  program3Desc: 'Complete transformation in ability and confidence.',
  program3Price: '$899',
  selectButton: 'Select',
  recommendedBadge: 'Recommended',
  // Reviews
  reviewsSectionTitle: 'Performance Reviews',
  review1Name: 'Sarah J.',
  review1Text: "Trinity completely changed my son's game. His confidence on the ball is unmatched now.",
  review2Name: 'Marcus T.',
  review2Text: "The focus on soccer IQ is what sets this apart. My daughter reads the game so much better.",
  // Interest Form
  formTitle: 'Initiate Contact',
  formSubtitle: 'Submit your details to schedule your intake evaluation.',
  formNameLabel: 'Subject Name',
  formEmailLabel: 'Comm Link (Email)',
  formDayLabel: 'Preferred Day',
  formTimeLabel: 'Time Window',
  formSubmitButton: 'Transmit Request',
  // Login
  loginTitle: 'Secure Portal',
  loginSubtitle: 'Authenticate to view session logs.',
  loginEmailLabel: 'Identification (Email)',
  loginPasswordLabel: 'Access Code',
  loginButton: 'Initialize Access',
  // Images
  heroImage: '',
  logoImage: '',
  focus1Image: '',
  focus2Image: '',
  focus3Image: '',
  review1Image: '',
  review2Image: '',
};

function loadContentFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultContent, ...JSON.parse(saved) };
  } catch (_) {}
  return null;
}

export default function App() {
  const [content, setContent] = useState({ ...defaultContent });
  const [contentLoaded, setContentLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const fromFirebase = await loadContentFromFirebase();
      if (cancelled) return;
      if (fromFirebase && typeof fromFirebase === 'object') {
        setContent({ ...defaultContent, ...fromFirebase });
      } else {
        const fromLocal = loadContentFromLocalStorage();
        if (fromLocal) setContent(fromLocal);
      }
      setContentLoaded(true);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const updateContent = useCallback((key, value) => {
    setContent(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      saveContentToFirebase(next);
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    setContent({ ...defaultContent });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
    saveContentToFirebase(defaultContent);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar */}
      <nav className="bg-zinc-950 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-black italic uppercase tracking-tighter cursor-pointer flex items-center gap-2"
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
          >
            {content.logoImage ? (
              <img src={content.logoImage} alt={content.brandName} className="h-8 object-contain" />
            ) : (
              <>
                <span className="text-red-600">{content.brandPrefix}</span> {content.brandName}
              </>
            )}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 items-center font-bold text-xs uppercase tracking-widest text-zinc-400">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
            <button
              onClick={() => setShowAdminPanel(true)}
              className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2"
              title="Edit Site Content"
            >
              <Type size={14} /> Edit
            </button>
            {isLoggedIn ? (
              <>
                <button onClick={() => setCurrentView('dashboard')} className="text-red-500 hover:text-red-400 transition-colors">Portal</button>
                <button onClick={() => { setIsLoggedIn(false); setCurrentView('home'); }} className="hover:text-white transition-colors">Logout</button>
              </>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="text-white hover:text-red-500 flex items-center gap-2 transition-colors"
              >
                <LogIn size={14} /> SIGN IN
              </button>
            )}
          </div>

          {/* Mobile: cog + burger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="p-2 text-amber-500 hover:text-amber-400"
              title="Edit Site Content"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-zinc-950 border-t border-zinc-800 py-4 px-6 flex flex-col gap-2">
            <button onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="text-left font-bold text-xs uppercase tracking-widest text-zinc-400 hover:text-white py-2">Home</button>
            {isLoggedIn ? (
              <>
                <button onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className="text-left font-bold text-xs uppercase tracking-widest text-red-500 hover:text-red-400 py-2">Portal</button>
                <button onClick={() => { setIsLoggedIn(false); setCurrentView('home'); setMobileMenuOpen(false); }} className="text-left font-bold text-xs uppercase tracking-widest text-zinc-400 hover:text-white py-2">Logout</button>
              </>
            ) : (
              <button onClick={() => { setCurrentView('login'); setMobileMenuOpen(false); }} className="text-left font-bold text-xs uppercase tracking-widest text-white py-2 flex items-center gap-2">
                <LogIn size={14} /> SIGN IN
              </button>
            )}
          </div>
        )}
      </nav>

      <main>
        {currentView === 'home' && <HomeView setCurrentView={setCurrentView} content={content} />}
        {currentView === 'login' && <LoginView handleLogin={handleLogin} content={content} />}
        {currentView === 'dashboard' && <DashboardView content={content} />}
      </main>

      <footer className="bg-zinc-950 py-12 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest mt-20">
        <span className="text-red-600 mr-2">{content.brandPrefix}</span> {content.footerBrand}
      </footer>

      {showAdminPanel && (
        <EditSiteContentPanel
          content={content}
          updateContent={updateContent}
          resetContent={resetContent}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
}

function EditorSection({ id, title, expandedSection, setExpandedSection, children }) {
  return (
    <div
      className={`border rounded-lg mb-2 overflow-hidden ${expandedSection === id ? 'border-amber-500' : 'border-zinc-200'}`}
    >
      <button
        type="button"
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-zinc-50 text-left font-bold text-zinc-900"
      >
        {title}
        <span className="text-amber-500 text-xl">{expandedSection === id ? '−' : '+'}</span>
      </button>
      {expandedSection === id && <div className="p-4 bg-zinc-50 border-t border-zinc-200">{children}</div>}
    </div>
  );
}

function EditSiteContentPanel({ content, updateContent, resetContent, onClose }) {
  const [activeTab, setActiveTab] = useState('text');
  const [expandedSection, setExpandedSection] = useState('hero');
  const sectionProps = { expandedSection, setExpandedSection };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[14rem] bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <h2 className="text-xl font-black text-zinc-900">Edit Site Content</h2>
          <div className="flex items-center gap-2">
            <button onClick={resetContent} className="p-2 text-zinc-500 hover:text-amber-600" title="Reset to defaults">
              <RotateCcw size={20} />
            </button>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-zinc-200">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm ${activeTab === 'text' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-zinc-500'}`}
          >
            <Type size={18} /> Text
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm ${activeTab === 'images' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-zinc-500'}`}
          >
            <ImageIcon size={18} /> Images
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'text' && (
            <>
              <EditorSection id="hero" title="Hero Section" {...sectionProps}>
                <TextField label="Tagline" contentKey="heroTagline" value={content.heroTagline} updateContent={updateContent} />
                <TextField label="Headline Line 1" contentKey="heroHeadline1" value={content.heroHeadline1} updateContent={updateContent} />
                <TextField label="Headline Line 2" contentKey="heroHeadline2" value={content.heroHeadline2} updateContent={updateContent} />
                <TextField label="Subheadline" contentKey="heroSubheadline" value={content.heroSubheadline} updateContent={updateContent} />
                <TextField label="CTA Button" contentKey="heroCta" value={content.heroCta} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="brand" title="Logo & Brand" {...sectionProps}>
                <TextField label="Brand Prefix" contentKey="brandPrefix" value={content.brandPrefix} updateContent={updateContent} />
                <TextField label="Brand Name" contentKey="brandName" value={content.brandName} updateContent={updateContent} />
                <TextField label="Footer Text" contentKey="footerBrand" value={content.footerBrand} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="core" title="Core Architecture" {...sectionProps}>
                <TextField label="Section Title" contentKey="coreSectionTitle" value={content.coreSectionTitle} updateContent={updateContent} />
                <TextField label="Focus 1 Title" contentKey="focus1Title" value={content.focus1Title} updateContent={updateContent} />
                <TextField label="Focus 1 Description" contentKey="focus1Desc" value={content.focus1Desc} updateContent={updateContent} />
                <TextField label="Focus 2 Title" contentKey="focus2Title" value={content.focus2Title} updateContent={updateContent} />
                <TextField label="Focus 2 Description" contentKey="focus2Desc" value={content.focus2Desc} updateContent={updateContent} />
                <TextField label="Focus 3 Title" contentKey="focus3Title" value={content.focus3Title} updateContent={updateContent} />
                <TextField label="Focus 3 Description" contentKey="focus3Desc" value={content.focus3Desc} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="plans" title="Development Plans" {...sectionProps}>
                <TextField label="Section Title" contentKey="plansSectionTitle" value={content.plansSectionTitle} updateContent={updateContent} />
                <TextField label="Program 1 Title" contentKey="program1Title" value={content.program1Title} updateContent={updateContent} />
                <TextField label="Program 1 Duration" contentKey="program1Duration" value={content.program1Duration} updateContent={updateContent} />
                <TextField label="Program 1 Description" contentKey="program1Desc" value={content.program1Desc} updateContent={updateContent} />
                <TextField label="Program 1 Price" contentKey="program1Price" value={content.program1Price} updateContent={updateContent} />
                <TextField label="Program 2 Title" contentKey="program2Title" value={content.program2Title} updateContent={updateContent} />
                <TextField label="Program 2 Duration" contentKey="program2Duration" value={content.program2Duration} updateContent={updateContent} />
                <TextField label="Program 2 Description" contentKey="program2Desc" value={content.program2Desc} updateContent={updateContent} />
                <TextField label="Program 2 Price" contentKey="program2Price" value={content.program2Price} updateContent={updateContent} />
                <TextField label="Program 3 Title" contentKey="program3Title" value={content.program3Title} updateContent={updateContent} />
                <TextField label="Program 3 Duration" contentKey="program3Duration" value={content.program3Duration} updateContent={updateContent} />
                <TextField label="Program 3 Description" contentKey="program3Desc" value={content.program3Desc} updateContent={updateContent} />
                <TextField label="Program 3 Price" contentKey="program3Price" value={content.program3Price} updateContent={updateContent} />
                <TextField label="Select Button" contentKey="selectButton" value={content.selectButton} updateContent={updateContent} />
                <TextField label="Recommended Badge" contentKey="recommendedBadge" value={content.recommendedBadge} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="reviews" title="Performance Reviews" {...sectionProps}>
                <TextField label="Section Title" contentKey="reviewsSectionTitle" value={content.reviewsSectionTitle} updateContent={updateContent} />
                <TextField label="Review 1 Name" contentKey="review1Name" value={content.review1Name} updateContent={updateContent} />
                <TextField label="Review 1 Text" contentKey="review1Text" value={content.review1Text} updateContent={updateContent} />
                <TextField label="Review 2 Name" contentKey="review2Name" value={content.review2Name} updateContent={updateContent} />
                <TextField label="Review 2 Text" contentKey="review2Text" value={content.review2Text} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="form" title="Interest Form" {...sectionProps}>
                <TextField label="Form Title" contentKey="formTitle" value={content.formTitle} updateContent={updateContent} />
                <TextField label="Form Subtitle" contentKey="formSubtitle" value={content.formSubtitle} updateContent={updateContent} />
                <TextField label="Name Label" contentKey="formNameLabel" value={content.formNameLabel} updateContent={updateContent} />
                <TextField label="Email Label" contentKey="formEmailLabel" value={content.formEmailLabel} updateContent={updateContent} />
                <TextField label="Day Label" contentKey="formDayLabel" value={content.formDayLabel} updateContent={updateContent} />
                <TextField label="Time Label" contentKey="formTimeLabel" value={content.formTimeLabel} updateContent={updateContent} />
                <TextField label="Submit Button" contentKey="formSubmitButton" value={content.formSubmitButton} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="login" title="Login / Portal" {...sectionProps}>
                <TextField label="Login Title" contentKey="loginTitle" value={content.loginTitle} updateContent={updateContent} />
                <TextField label="Login Subtitle" contentKey="loginSubtitle" value={content.loginSubtitle} updateContent={updateContent} />
                <TextField label="Email Label" contentKey="loginEmailLabel" value={content.loginEmailLabel} updateContent={updateContent} />
                <TextField label="Password Label" contentKey="loginPasswordLabel" value={content.loginPasswordLabel} updateContent={updateContent} />
                <TextField label="Login Button" contentKey="loginButton" value={content.loginButton} updateContent={updateContent} />
              </EditorSection>
            </>
          )}

          {activeTab === 'images' && (
            <>
              <EditorSection id="img-hero" title="Hero Section" {...sectionProps}>
                <ImageField label="Hero Background" contentKey="heroImage" value={content.heroImage} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="img-brand" title="Logo & Brand" {...sectionProps}>
                <ImageField label="Logo" contentKey="logoImage" value={content.logoImage} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="img-focus" title="Core Architecture" {...sectionProps}>
                <ImageField label="Focus 1" contentKey="focus1Image" value={content.focus1Image} updateContent={updateContent} />
                <ImageField label="Focus 2" contentKey="focus2Image" value={content.focus2Image} updateContent={updateContent} />
                <ImageField label="Focus 3" contentKey="focus3Image" value={content.focus3Image} updateContent={updateContent} />
              </EditorSection>
              <EditorSection id="img-reviews" title="Performance Reviews" {...sectionProps}>
                <ImageField label="Review 1 Avatar" contentKey="review1Image" value={content.review1Image} updateContent={updateContent} />
                <ImageField label="Review 2 Avatar" contentKey="review2Image" value={content.review2Image} updateContent={updateContent} />
              </EditorSection>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } } .animate-slide-in { animation: slide-in 0.2s ease-out; }`}</style>
    </div>
  );
}

function HomeView({ setCurrentView, content }) {
  const focuses = [
    { title: content.focus1Title, desc: content.focus1Desc, icon: Activity, image: content.focus1Image },
    { title: content.focus2Title, desc: content.focus2Desc, icon: Crosshair, image: content.focus2Image },
    { title: content.focus3Title, desc: content.focus3Desc, icon: ShieldAlert, image: content.focus3Image },
  ];
  const programs = [
    { title: content.program1Title, duration: content.program1Duration, desc: content.program1Desc, price: content.program1Price },
    { title: content.program2Title, duration: content.program2Duration, desc: content.program2Desc, price: content.program2Price, popular: true },
    { title: content.program3Title, duration: content.program3Duration, desc: content.program3Desc, price: content.program3Price },
  ];
  const reviews = [
    { name: content.review1Name, text: content.review1Text, image: content.review1Image },
    { name: content.review2Name, text: content.review2Text, image: content.review2Image },
  ];

  return (
    <div className="space-y-0">
      <section className={`bg-zinc-950 text-white py-32 relative overflow-hidden ${content.heroImage ? '' : ''}`} style={content.heroImage ? { backgroundImage: `url(${content.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        {!content.heroImage && <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600 transform skew-x-12 translate-x-32 opacity-10"></div>}
        {content.heroImage && <div className="absolute inset-0 bg-zinc-950/50"></div>}
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <p className="text-red-600 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            <Activity size={18} /> {content.heroTagline}
          </p>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">
            {content.heroHeadline1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{content.heroHeadline2}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mb-12">
            {content.heroSubheadline}
          </p>
          <button
            onClick={() => document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-black italic uppercase tracking-widest transform -skew-x-12 hover:scale-105 transition-all"
          >
            <span className="inline-block transform skew-x-12">{content.heroCta}</span>
          </button>
        </div>
      </section>

      <section className="bg-zinc-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">{content.coreSectionTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {focuses.map((focus, i) => (
              <div key={i} className="bg-white p-10 shadow-xl shadow-zinc-200/50 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-zinc-950 text-red-500 flex items-center justify-center mb-6 rounded-tl-xl rounded-br-xl group-hover:bg-red-600 group-hover:text-white transition-colors overflow-hidden">
                  {focus.image ? <img src={focus.image} alt="" className="w-full h-full object-cover" /> : <focus.icon size={24} />}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-3">{focus.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{focus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900 mb-16 text-center">{content.plansSectionTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={i} className={`bg-zinc-950 text-white p-8 flex flex-col ${prog.popular ? 'border-l-4 border-red-600 scale-105 shadow-2xl shadow-red-900/20' : 'border-l-4 border-zinc-800'}`}>
                {prog.popular && <p className="text-red-500 font-bold text-xs tracking-widest uppercase mb-4">{content.recommendedBadge}</p>}
                <h3 className="text-3xl font-black italic uppercase tracking-tight mb-1">{prog.title}</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">{prog.duration}</p>
                <div className="text-5xl font-black tracking-tighter mb-6">{prog.price}</div>
                <p className="text-zinc-400 mb-8 flex-1">{prog.desc}</p>
                <button className={`w-full py-4 font-black italic uppercase tracking-widest transform -skew-x-12 ${prog.popular ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  <span className="inline-block transform skew-x-12">{content.selectButton}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-16 text-center">{content.reviewsSectionTitle}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {reviews.map((review, i) => (
              <div key={i} className="bg-zinc-900 p-8 border border-zinc-800 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 flex justify-end items-start p-4 text-red-500">
                  <Star size={20} fill="currentColor" />
                </div>
                {review.image && <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full object-cover mb-4" />}
                <p className="text-zinc-300 font-medium text-lg leading-relaxed mb-6 italic">"{review.text}"</p>
                <p className="font-bold uppercase tracking-widest text-sm text-red-500">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="interest-form" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white p-12 shadow-2xl shadow-zinc-200/50 border-t-4 border-red-600">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{content.formTitle}</h2>
            <p className="text-zinc-500 font-medium mb-8">{content.formSubtitle}</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.formNameLabel}</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.formEmailLabel}</label>
                  <input type="email" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.formDayLabel}</label>
                  <div className="relative">
                    <select className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 appearance-none">
                      <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.formTimeLabel}</label>
                  <div className="relative">
                    <select className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 appearance-none">
                      <option>Morning</option><option>Afternoon</option><option>Evening</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-zinc-950 text-white hover:bg-red-600 font-black italic uppercase tracking-widest py-4 mt-4 transition-colors">
                {content.formSubmitButton}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginView({ handleLogin, content }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-zinc-100">
      <div className="bg-white p-12 shadow-2xl w-full max-w-md border-t-4 border-red-600">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-center text-zinc-900">{content.loginTitle}</h2>
        <p className="text-zinc-500 font-medium mb-8 text-center text-sm">{content.loginSubtitle}</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.loginEmailLabel}</label>
            <input type="email" defaultValue="player@example.com" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
          </div>
          <div>
            <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">{content.loginPasswordLabel}</label>
            <input type="password" defaultValue="password123" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700 font-black italic uppercase tracking-widest py-4 mt-4 transition-colors">
            {content.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardView({ content }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-32">
      <div className="flex items-end justify-between border-b-2 border-zinc-200 pb-6 mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900">Dashboard</h1>
          <p className="text-red-600 font-bold uppercase tracking-widest text-xs mt-2">Active Status: Operational</p>
        </div>
        <div className="text-zinc-400"><Activity size={32} /></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
            <CalendarClock size={16} /> Scheduled Evolutions
          </h2>
          <div className="space-y-4">
            {[
              { date: '10.15.26', time: '1600 HRS', type: 'TECHNICAL DRILLS' },
              { date: '10.18.26', time: '1730 HRS', type: 'TACTICAL IQ SYNC' },
              { date: '10.22.26', time: '1600 HRS', type: 'PRESSURE SIMULATION' },
            ].map((session, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-zinc-200 shadow-sm hover:border-red-600 transition-colors">
                <div>
                  <h4 className="font-black italic text-xl uppercase tracking-tight text-zinc-900">{session.type}</h4>
                  <p className="font-bold text-zinc-500 text-sm tracking-widest mt-1">
                    {session.date} <span className="text-red-500 mx-2">///</span> {session.time}
                  </p>
                </div>
                <button className="hidden sm:flex text-red-600 hover:text-red-800 items-center gap-1 font-bold text-xs tracking-widest uppercase">
                  Details <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
              <UserCircle2 size={16} /> Subject Profile
            </h2>
            <div className="bg-zinc-950 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 opacity-20 transform rotate-45 translate-x-8 -translate-y-8"></div>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mb-1">Designation</p>
                  <p className="font-bold text-lg">Alex Johnson</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mb-1">Comm Link</p>
                  <p className="font-medium text-zinc-300">player@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
              <CreditCard size={16} /> Financial Status
            </h2>
            <div className="bg-white border border-zinc-200 p-6 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                <p className="font-bold text-xs tracking-widest uppercase text-zinc-500">Active Tier</p>
                <p className="bg-zinc-100 text-zinc-900 font-black italic px-3 py-1 text-sm">PHASE II (3-MO)</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-xs tracking-widest uppercase text-zinc-500">Method</p>
                <p className="font-bold text-zinc-900 flex items-center gap-2">
                  <span className="bg-zinc-900 text-white text-[10px] px-1 rounded-sm">VISA</span> •••• 4242
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField({ label, contentKey, value, updateContent }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => updateContent(contentKey, e.target.value)}
        className="w-full bg-zinc-100 border border-zinc-200 rounded p-3 text-sm focus:outline-none focus:border-amber-500"
      />
    </div>
  );
}

function ImageField({ label, contentKey, value, updateContent }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => updateContent(contentKey, reader.result);
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Paste image URL"
          value={value?.startsWith('http') ? value : ''}
          onChange={(e) => updateContent(contentKey, e.target.value)}
          className="flex-1 bg-zinc-100 border border-zinc-200 rounded p-3 text-sm focus:outline-none focus:border-amber-500"
        />
        <label className="shrink-0 px-4 py-3 bg-amber-500 text-white text-xs font-bold uppercase rounded cursor-pointer hover:bg-amber-600">
          Upload
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {value && <img src={value} alt="" className="mt-2 h-20 object-cover rounded border border-zinc-200" onError={(e) => e.target.style.display = 'none'} />}
    </div>
  );
}
