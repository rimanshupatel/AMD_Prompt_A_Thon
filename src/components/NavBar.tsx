import React from 'react';
import { THEME } from '../constants/theme';
import { useAppStore } from '../store/MoodByteContext';

export const NavBar: React.FC = () => {
  const { state } = useAppStore();
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'morning';
    if (hr < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${THEME.colors.border}` }}>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>MoodByte<span style={{ color: THEME.colors.accent }}>.</span></div>
        <div style={{ fontSize: '12px', color: THEME.colors.textSecondary, marginTop: '2px' }}>Good {getGreeting()}, {state.userName}</div>
      </div>
      <div style={{ backgroundColor: 'rgba(48, 209, 88, 0.1)', color: THEME.colors.accent, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.colors.accent, marginRight: '6px', animation: 'fadeIn 1.5s infinite alternate' }} />
        3 Agents Active
      </div>
    </header>
  );
};
