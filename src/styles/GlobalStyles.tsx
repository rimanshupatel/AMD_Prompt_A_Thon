import React from 'react';
import { THEME } from '../constants/theme';

export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${THEME.typography.fontFamily};
      background-color: ${THEME.colors.background};
      color: ${THEME.colors.text};
      -webkit-font-smoothing: antialiased;
    }
    input, textarea, button { font-family: inherit; }
    button:focus-visible, input:focus-visible, textarea:focus-visible {
      outline: 2px solid ${THEME.colors.accentBlue};
      outline-offset: 2px;
    }
    
    /* Layout Foundations */
    .app-container {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100vh;
      max-width: 1400px;
      margin: 0 auto;
      background-color: ${THEME.colors.background};
    }
    .main-content {
      padding: 32px;
      overflow-y: auto;
      height: 100vh;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .app-container {
        grid-template-columns: 1fr;
      }
      .sidebar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 70px;
        flex-direction: row !important;
        justify-content: space-around;
        padding: 10px;
        z-index: 50;
      }
      .sidebar-brand { display: none; }
      .sidebar-item-label { display: none; }
      .main-content { padding: 16px; height: calc(100vh - 70px); }
    }

    /* Cards */
    .dashboard-card {
      background-color: ${THEME.colors.surface};
      border-radius: ${THEME.borderRadius.card};
      padding: 24px;
      box-shadow: ${THEME.colors.shadow};
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dashboard-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05);
    }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      .dashboard-card:hover { transform: none; }
    }
    
    .slider-track {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
      background: #d1d1d6;
      border-radius: 3px;
      outline: none;
    }
    .slider-track::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      cursor: pointer;
    }
    
    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
    }
    
    .fade-in { animation: fadeIn 0.4s ease forwards; }
    .stagger-1 { animation-delay: 0.1s; opacity: 0; }
    .stagger-2 { animation-delay: 0.2s; opacity: 0; }
    .stagger-3 { animation-delay: 0.3s; opacity: 0; }
  `}</style>
);
