import React from 'react';
import { THEME } from '../../constants/theme';
import { CONSTANTS } from '../../constants';
import { useAppStore } from '../../store/MoodByteContext';
import { Card } from '../../components/Card';

export const ProfileTab: React.FC = () => {
  const { state, dispatch } = useAppStore();

  return (
    <div className="fade-in" style={{ padding: THEME.spacing.paddingSection }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '32px' }}>
        
        {/* Left Col: User info */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: THEME.colors.accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>
              {state.userName.charAt(0) || 'U'}
            </div>
            <input type="text" value={state.userName} onChange={e => dispatch({ type: 'SET_USER_NAME', payload: e.target.value })}
              style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', border: 'none', backgroundColor: 'transparent', width: '200px' }}
              aria-label="User name"
            />
          </div>
          <Card style={{ marginTop: '24px' }}>
            <h3 style={{ ...THEME.typography.headline, marginBottom: '12px' }}>App Info</h3>
            <div style={{ fontSize: '14px', color: THEME.colors.textSecondary }}>Version 1.1.0 (Desktop Ready)</div>
            <div style={{ fontSize: '14px', color: THEME.colors.textSecondary, marginTop: '4px' }}>Built for Prompt-a-thon 2025</div>
          </Card>
        </div>

        {/* Right Col: Settings */}
        <div>
          <h3 style={{ ...THEME.typography.headline, marginBottom: '16px' }}>Your Ayurvedic Dosha</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {CONSTANTS.DOSHAS.map(d => (
              <Card key={d.id} style={{ padding: '16px', marginBottom: 0, border: state.dosha === d.id ? `2px solid ${THEME.colors.accent}` : '2px solid transparent', cursor: 'pointer' }}>
                <div onClick={() => dispatch({ type: 'SET_DOSHA', payload: d.id })}>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: state.dosha === d.id ? THEME.colors.accent : THEME.colors.text }}>{d.id}</div>
                  <div style={{ fontSize: '13px', color: THEME.colors.textSecondary, marginTop: '4px' }}>{d.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
