import React from 'react';
import { useAppStore } from './store/MoodByteContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

import { HomeTab } from './features/home/HomeTab';
import { AnalyzeTab } from './features/analyze/AnalyzeTab';
import { ScannerTab } from './features/scanner/ScannerTab';
import { HistoryTab } from './features/history/HistoryTab';
import { ProfileTab } from './features/profile/ProfileTab';

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

        <main id="main-content" className="main-content" role="main">
          {renderTab()}
        </main>

        {state.toast && <Toast message={state.toast} onClose={() => dispatch({ type: 'HIDE_TOAST' })} />}
      </div>
    </ErrorBoundary>
  );
};

export default AppContent;
