import React from 'react';
import { THEME } from '../../constants/theme';
import { useAppStore } from '../../store/MoodByteContext';
import { apiService } from '../../services/apiService';
import { Card } from '../../components/Card';

export const ScannerTab: React.FC = () => {
  const { state, dispatch } = useAppStore();

  const handleScan = async () => {
    if (!state.scanInput.trim()) return dispatch({ type: 'SHOW_TOAST', payload: 'Please enter junk food.' });
    dispatch({ type: 'SET_SCAN_LOADING', payload: true });
    dispatch({ type: 'SET_SCAN_RESULT', payload: null });
    try {
      const res = await apiService.scanFood(state.scanInput);
      dispatch({ type: 'SET_SCAN_RESULT', payload: res });
    } catch (err) {
      dispatch({ type: 'SHOW_TOAST', payload: 'Scan failed.' });
    } finally {
      dispatch({ type: 'SET_SCAN_LOADING', payload: false });
    }
  };

  return (
    <div className="fade-in" style={{ padding: THEME.spacing.paddingSection }}>
      <h2 style={{ ...THEME.typography.title }}>Junk Food Antidote Scanner</h2>
      <p style={{ ...THEME.typography.body, color: THEME.colors.textSecondary, marginBottom: '24px' }}>Caught eating something bad? We'll fix it.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: state.scanResult ? '1fr 1fr' : 'max-width(600px)', gap: '32px', maxWidth: state.scanResult ? '100%' : '600px' }}>
        <div>
          <input type="text" value={state.scanInput} onChange={e => dispatch({ type: 'SET_INPUT', field: 'scanInput', payload: e.target.value })}
            placeholder="Type the food you just ate... (e.g. samosa)"
            style={{ width: '100%', padding: '16px', borderRadius: THEME.borderRadius.input, border: `1px solid ${THEME.colors.border}`, marginBottom: '16px', fontSize: '16px' }}
          />
          <button onClick={handleScan} disabled={state.scanLoading}
            style={{ width: '100%', padding: '15px', backgroundColor: THEME.colors.text, color: 'white', borderRadius: THEME.borderRadius.input, border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: state.scanLoading ? 0.6 : 1 }}>
            {state.scanLoading ? 'Analyzing damage...' : 'Scan & Fix →'}
          </button>
        </div>

        {state.scanResult && (
          <div aria-live="polite" className="fade-in">
            <Card>
              <h3 style={{ ...THEME.typography.headline, color: THEME.colors.accentRed, marginBottom: '8px' }}>Damage Report</h3>
              <div style={{ width: '100%', height: '8px', backgroundColor: THEME.colors.surface2, borderRadius: '4px', marginBottom: '16px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${state.scanResult.damage_score * 10}%`, backgroundColor: THEME.colors.accentRed, animation: 'fillBar 1s ease' }} />
              </div>
              <p style={{ color: THEME.colors.accentRed, fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>{state.scanResult.food_verdict}</p>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{ backgroundColor: 'rgba(255, 159, 10, 0.1)', color: THEME.colors.accentAmber, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>⏳ {state.scanResult.recovery_timeline}</span>
                <span style={{ backgroundColor: THEME.colors.surface2, color: THEME.colors.textSecondary, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>Avoid similar for {state.scanResult.avoid_for_hours}h</span>
              </div>

              <div style={{ backgroundColor: 'rgba(48, 209, 88, 0.1)', borderLeft: `4px solid ${THEME.colors.accent}`, padding: '12px', borderRadius: '0 8px 8px 0', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, color: THEME.colors.accent, marginBottom: '4px' }}>Antidote: {state.scanResult.antidote_meal?.name}</div>
                <div style={{ fontSize: '13px', color: THEME.colors.text }}>{state.scanResult.antidote_meal?.why}</div>
              </div>

              <div style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)', borderLeft: `4px solid ${THEME.colors.accentBlue}`, padding: '12px', borderRadius: '0 8px 8px 0', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, color: THEME.colors.accentBlue, fontSize: '13px' }}>💧 Hydration: {state.scanResult.hydration_plan}</div>
              </div>
              
              <div style={{ fontSize: '13px', color: THEME.colors.textSecondary, marginTop: '16px' }}><b>Next meal fix:</b> {state.scanResult.next_meal_fix}</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
