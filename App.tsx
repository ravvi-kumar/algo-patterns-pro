import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import { PATTERNS } from './data';
import Dashboard from './pages/Dashboard';
import PatternDetail from './pages/PatternDetail';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';
import { Github, Code2, LayoutGrid, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 border-b ${isLanding ? 'bg-background/80 backdrop-blur-md border-transparent' : 'bg-background/80 backdrop-blur-md border-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary/10 border border-primary/20 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Code2 className="text-primary" size={20} strokeWidth={2} />
            </div>
            <span className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-white transition-colors">
              AlgoPattern<span className="text-primary font-extrabold">.Pro</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            {!isLanding && (
               <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Patterns</span>
                </Link>
                <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
               </>
            )}
            
            {isLanding && (
               <Link to="/dashboard" className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Dashboard
               </Link>
            )}

            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
              LeetCode
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  // Calculate total problems once
  const totalProblemsCount = PATTERNS.reduce((acc, curr) => acc + curr.problems.length, 0);

  return (
    <LanguageProvider>
      <ProgressProvider totalProblemsCount={totalProblemsCount}>
        <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background flex flex-col font-sans text-slate-200 selection:bg-primary/30 selection:text-primary-100">

          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pattern/:id" element={<PatternDetail />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-background border-t border-slate-900 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              <p className="mb-4 font-light text-slate-400">Master the code. Own the interview.</p>
              <p className="text-slate-600">&copy; {new Date().getFullYear()} AlgoPattern Pro. Engineered for excellence.</p>
            </div>
          </footer>

        </div>
      </HashRouter>
    </ProgressProvider>
    </LanguageProvider>
  );
};

export default App;