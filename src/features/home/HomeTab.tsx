import React, { useMemo } from 'react';
import { THEME } from '../../constants/theme';
import { useAppStore } from '../../store/MoodByteContext';
import { useMoodColor } from '../../hooks/useMoodColor';
import { Card } from '../../components/Card';

export const HomeTab: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const accentColor = useMoodColor(state.mood);
  const recentHistory = useMemo(() => state.history.slice(0, 3), [state.history]);
  
  return (
    <div className="fade-in" style={{ padding: THEME.spacing.paddingSection }}>
      <div style={{ marginBottom: '32px', marginTop: '16px' }}>
        <h1 style={{ ...THEME.typography.largeTitle, color: THEME.colors.text }}>How's your brain today?</h1>
        <p style={{ ...THEME.typography.body, color: THEME.colors.textSecondary, marginTop: '8px' }}>
          {state.history.length > 0 ? `Last scan: ${new Date(state.history[0].timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'No scans yet today'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', textAlign: 'center', marginBottom: 0 }}>
          <div style={{ ...THEME.typography.caption, color: THEME.colors.textSecondary, marginBottom: '8px' }}>Energy</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: THEME.colors.accentAmber }}>{state.energy * 10}%</div>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center', marginBottom: 0 }}>
          <div style={{ ...THEME.typography.caption, color: THEME.colors.textSecondary, marginBottom: '8px' }}>Dopamine</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: THEME.colors.accentBlue }}>↑</div>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center', marginBottom: 0 }}>
          <div style={{ ...THEME.typography.caption, color: THEME.colors.textSecondary, marginBottom: '8px' }}>Mood</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: accentColor, textTransform: 'capitalize' }}>{state.mood}</div>
        </Card>
      </div>

      <button 
        onClick={() => dispatch({ type: 'SET_TAB', payload: 'analyze' })}
        style={{ width: '100%', padding: '16px', backgroundColor: accentColor, color: 'white', borderRadius: THEME.borderRadius.input, border: 'none', fontWeight: 700, fontSize: '16px', marginBottom: '32px', cursor: 'pointer', transition: 'transform 0.1s' }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Quick Check →
      </button>

      <div>
        <h2 style={{ ...THEME.typography.headline, marginBottom: '16px' }}>Recent History</h2>
        {recentHistory.length === 0 ? (
          <p style={{ color: THEME.colors.textSecondary, fontSize: '14px' }}>No meals analyzed yet.</p>
        ) : (
          recentHistory.map((item, i) => (
            <Card key={i} style={{ padding: '16px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '24px', marginRight: '16px' }}>{item.result?.mood_in_2hrs?.length > 5 ? '🍽️' : '🧠'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.result?.healing_meal?.name || item.result?.antidote_meal?.name || 'Meal'}</div>
                <div style={{ fontSize: '12px', color: THEME.colors.textSecondary }}>{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
