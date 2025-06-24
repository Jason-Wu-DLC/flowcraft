// packages/shell/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { ThemeProvider } from './themes/context';
import './App.scss';

// 懒加载页面
const DesignerPage = lazy(() => import('./pages/DesignerPage'));
const PreviewPage = lazy(() => import('./pages/PreviewPage'));
const CollaborationPage = lazy(() => import('./pages/CollaborationPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="app">
            <header className="app-header">
              <Navigation />
            </header>

            <main className="app-main">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/designer/*" element={<DesignerPage />} />
                    <Route path="/preview/*" element={<PreviewPage />} />
                    <Route path="/collaboration/*" element={<CollaborationPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;