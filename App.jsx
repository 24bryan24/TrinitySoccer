import React, { useState } from 'react';
import { Activity, Crosshair, ShieldAlert, CalendarClock, ChevronRight, UserCircle2, CreditCard, Star, LogIn, ChevronDown } from 'lucide-react';

// Shared Mock Data
const focuses = [
  { title: 'GAME IQ', desc: 'Players understanding of the game of Soccer will be next level.', icon: Activity },
  { title: 'ABILITY', desc: 'Players will experience new levels of technical ability.', icon: Crosshair },
  { title: 'COURAGE', desc: 'Players will be able to face pressure with unshakeable confidence.', icon: ShieldAlert }
];

const programs = [
  { title: 'PHASE I', duration: '1 MONTH', desc: 'Intensive introduction to our holistic approach.', price: '$199' },
  { title: 'PHASE II', duration: '3 MONTHS', desc: 'Deep dive into tactical IQ and technical habits.', price: '$499', popular: true },
  { title: 'PHASE III', duration: '6 MONTHS', desc: 'Complete transformation in ability and confidence.', price: '$899' },
];

const reviews = [
  { name: 'Sarah J.', text: 'Trinity completely changed my son\'s game. His confidence on the ball is unmatched now.' },
  { name: 'Marcus T.', text: 'The focus on soccer IQ is what sets this apart. My daughter reads the game so much better.' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            onClick={() => setCurrentView('home')}
          >
            <span className="text-red-600">///</span> TRINITY SOCCER
          </div>
          <div className="flex gap-8 items-center font-bold text-xs uppercase tracking-widest text-zinc-400">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Home</button>
            {isLoggedIn ? (
              <>
                <button onClick={() => setCurrentView('dashboard')} className="text-red-500 hover:text-red-400 transition-colors">Portal</button>
                <button onClick={() => {setIsLoggedIn(false); setCurrentView('home');}} className="hover:text-white transition-colors">Logout</button>
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
        </div>
      </nav>

      <main>
        {currentView === 'home' && <HomeView setCurrentView={setCurrentView} />}
        {currentView === 'login' && <LoginView handleLogin={handleLogin} />}
        {currentView === 'dashboard' && <DashboardView />}
      </main>
      
      <footer className="bg-zinc-950 py-12 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest mt-20">
        <span className="text-red-600 mr-2">///</span> TRINITY SOCCER PERFORMANCE © 2026
      </footer>
    </div>
  );
}

function HomeView({ setCurrentView }) {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-zinc-950 text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600 transform skew-x-12 translate-x-32 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <p className="text-red-600 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            <Activity size={18} /> Holistic Approach
          </p>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">
            Experience <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Transformation</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mb-12">
            At Trinity Soccer, we engineer players for the modern game. Superior IQ. Elite Ability. Unbreakable Confidence.
          </p>
          <button 
            onClick={() => document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-black italic uppercase tracking-widest transform -skew-x-12 hover:scale-105 transition-all"
          >
            <span className="inline-block transform skew-x-12">Initialize Training</span>
          </button>
        </div>
      </section>

      {/* Focuses */}
      <section className="bg-zinc-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">Core Architecture</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {focuses.map((focus, i) => (
              <div key={i} className="bg-white p-10 shadow-xl shadow-zinc-200/50 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-zinc-950 text-red-500 flex items-center justify-center mb-6 rounded-tl-xl rounded-br-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <focus.icon size={24} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-3">{focus.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{focus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900 mb-16 text-center">Development Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={i} className={`bg-zinc-950 text-white p-8 flex flex-col ${prog.popular ? 'border-l-4 border-red-600 scale-105 shadow-2xl shadow-red-900/20' : 'border-l-4 border-zinc-800'}`}>
                {prog.popular && <p className="text-red-500 font-bold text-xs tracking-widest uppercase mb-4">Recommended</p>}
                <h3 className="text-3xl font-black italic uppercase tracking-tight mb-1">{prog.title}</h3>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">{prog.duration}</p>
                <div className="text-5xl font-black tracking-tighter mb-6">{prog.price}</div>
                <p className="text-zinc-400 mb-8 flex-1">{prog.desc}</p>
                <button className={`w-full py-4 font-black italic uppercase tracking-widest transform -skew-x-12 ${prog.popular ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  <span className="inline-block transform skew-x-12">Select</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-zinc-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-16 text-center">Performance Reviews</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {reviews.map((review, i) => (
              <div key={i} className="bg-zinc-900 p-8 border border-zinc-800 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 flex justify-end items-start p-4 text-red-500">
                   <Star size={20} fill="currentColor" />
                </div>
                <p className="text-zinc-300 font-medium text-lg leading-relaxed mb-6 italic">"{review.text}"</p>
                <p className="font-bold uppercase tracking-widest text-sm text-red-500">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="interest-form" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white p-12 shadow-2xl shadow-zinc-200/50 border-t-4 border-red-600">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Initiate Contact</h2>
            <p className="text-zinc-500 font-medium mb-8">Submit your details to schedule your intake evaluation.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Subject Name</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Comm Link (Email)</label>
                  <input type="email" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Preferred Day</label>
                  <div className="relative">
                    <select className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 appearance-none">
                      <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Time Window</label>
                   <div className="relative">
                    <select className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 appearance-none">
                      <option>Morning</option><option>Afternoon</option><option>Evening</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-zinc-950 text-white hover:bg-red-600 font-black italic uppercase tracking-widest py-4 mt-4 transition-colors">
                Transmit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginView({ handleLogin }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-zinc-100">
      <div className="bg-white p-12 shadow-2xl w-full max-w-md border-t-4 border-red-600">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-center text-zinc-900">Secure Portal</h2>
        <p className="text-zinc-500 font-medium mb-8 text-center text-sm">Authenticate to view session logs.</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Identification (Email)</label>
            <input type="email" defaultValue="player@example.com" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
          </div>
          <div>
            <label className="block font-bold text-xs uppercase tracking-widest text-zinc-400 mb-2">Access Code</label>
            <input type="password" defaultValue="password123" className="w-full bg-zinc-50 border border-zinc-200 p-4 font-medium focus:outline-none focus:border-red-600 transition-colors" required />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700 font-black italic uppercase tracking-widest py-4 mt-4 transition-colors">
            Initialize Access
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardView() {
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
        {/* Sessions Data */}
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

        {/* User Data Panel */}
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
