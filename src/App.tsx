import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import { PATTERNS } from './data';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatternDetail from './pages/PatternDetail';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  // Calculate total problems once
  const totalProblemsCount = PATTERNS.reduce((acc, curr) => acc + curr.problems.length, 0);

  return (
    <LanguageProvider>
      <ProgressProvider totalProblemsCount={totalProblemsCount}>
        
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="pattern/:id" element={
                <ProtectedRoute>
                  <PatternDetail />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
      </ProgressProvider>
    </LanguageProvider>
  );
};

export default App;