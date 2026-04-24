import React, { Suspense } from 'react';
import { useAppStore } from './store/MoodByteContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

const HomeTab = React.lazy(() => import('./features/home/HomeTab').then(m => ({ default: m.HomeTab })));
const AnalyzeTab = React.lazy(() => import('./features/analyze/AnalyzeTab').then(m => ({ default: m.AnalyzeTab })));
const ScannerTab = React.lazy(() => import('./features/scanner/ScannerTab').then(m => ({ default: m.ScannerTab })));
const HistoryTab = React.lazy(() => import('./features/history/HistoryTab').then(m => ({ default: m.HistoryTab })));
const ProfileTab = React.lazy(() => import('./features/profile/ProfileTab').then(m => ({ default: m.ProfileTab })));

const AppContent: React.FC = () => {
  const { state, dispatch, isHydrated } = useAppStore();

  if (!isHydrated) return null;

  const renderTab = () => {
    switch (state.currentTab) {
      case 'home': return <HomeTab />;
      case 'analyze': return <AnalyzeTab />;
      case 'scanner': return <ScannerTab />;
      case 'history': return <HistoryTab />;
      case 'profile': return <ProfileTab />;
      default: return null;
    }
  };

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <div className="app-container">
        <a href="#main-content" className="sr-only">Skip to main content</a>
        
        <Sidebar />

        <main id="main-content" className="main-content" role="main" aria-live="polite">
          <Suspense fallback={<div style={{ padding: '32px', textAlign: 'center' }}>Loading interface...</div>}>
            {renderTab()}
          </Suspense>
        </main>

        {state.toast && <Toast message={state.toast} onClose={() => dispatch({ type: 'HIDE_TOAST' })} />}
      </div>
    </ErrorBoundary>
  );
};

export default AppContent;
