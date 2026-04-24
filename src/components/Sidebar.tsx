import React from 'react';
import { THEME } from '../constants/theme';
import { CONSTANTS } from '../constants';
import { useAppStore } from '../store/MoodByteContext';
import { Icons } from './Icons';
import { useMoodColor } from '../hooks/useMoodColor';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const accentColor = useMoodColor(state.mood);

  return (
    <nav className="glass-nav sidebar" role="tablist" style={{ display: 'flex', flexDirection: 'column', borderRight: `1px solid ${THEME.colors.border}`, padding: '32px 16px' }}>
      
      <div className="sidebar-brand" style={{ marginBottom: '48px', paddingLeft: '8px' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>MoodByte<span style={{ color: THEME.colors.accent }}>.</span></div>
        <div style={{ backgroundColor: 'rgba(48, 209, 88, 0.1)', color: THEME.colors.accent, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.colors.accent, marginRight: '6px', animation: 'fadeIn 1.5s infinite alternate' }} />
          3 Agents Active
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CONSTANTS.TABS.map(tab => {
          const IconComponent = Icons[tab.icon as keyof typeof Icons];
          const isActive = state.currentTab === tab.id;
          const color = isActive ? 'white' : THEME.colors.textSecondary;
          const bg = isActive ? accentColor : 'transparent';
          
          return (
            <button key={tab.id} role="tab" aria-selected={isActive} aria-label={tab.label} onClick={() => dispatch({ type: 'SET_TAB', payload: tab.id })}
              style={{ background: bg, border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '12px 20px', borderRadius: '9999px', transition: THEME.transitions.base }}>
              <IconComponent color={color} size={20} />
              <span className="sidebar-item-label" style={{ fontSize: '15px', fontWeight: 600, color, marginLeft: '16px' }}>
                {tab.id === 'home' ? 'Dashboard' : tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
