import React, { useCallback, useState, useEffect } from 'react';
import { CONSTANTS } from '../../constants';
import { THEME } from '../../constants/theme';
import { useAppStore } from '../../store/MoodByteContext';
import { useMoodColor } from '../../hooks/useMoodColor';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { getCity } from '../../hooks/useGeolocation';
import { apiService } from '../../services/apiService';
import { Card } from '../../components/Card';
import { Icons } from '../../components/Icons';
import { ResultDisplay } from './ResultDisplay';

export const AnalyzeTab: React.FC = () => {
  const { state, dispatch } = useAppStore();
  const accentColor = useMoodColor(state.mood);
  const [city, setCity] = useState<string>('Detecting location...');

  useEffect(() => {
    getCity().then(setCity);
  }, []);
  
  const handleMicResult = useCallback((text: string) => {
    dispatch({ type: 'SET_INPUT', field: 'foodInput', payload: state.foodInput ? state.foodInput + ' ' + text : text });
  }, [state.foodInput, dispatch]);
  const startListening = useSpeechRecognition(handleMicResult);

  const handleAnalyze = async () => {
    if (!state.foodInput.trim()) {
      dispatch({ type: 'SHOW_TOAST', payload: 'Please enter what you ate.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_RESULT', payload: null });
    try {
      const res = await apiService.analyzeMood({
        mood: state.mood,
        stress: state.stress,
        sleep: state.sleep,
        energy: state.energy,
        foodInput: state.foodInput,
        dosha: state.dosha,
        city: city
      });
      dispatch({ type: 'SET_RESULT', payload: res });
    } catch (err: any) {
      const msg = err.message === 'RATE_LIMIT' ? 'Too many requests. Wait 10 seconds.' : 'Agent connection failed. Try again.';
      dispatch({ type: 'SHOW_TOAST', payload: msg });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="fade-in" style={{ padding: THEME.spacing.paddingSection }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ ...THEME.typography.title }}>How do you feel?</h2>
        <div style={{ fontSize: '13px', color: THEME.colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>📍</span> Based on your location: <strong style={{ color: THEME.colors.text }}>{city}</strong>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: state.result ? '1fr 1fr' : '1fr', gap: '32px', transition: 'all 0.3s ease' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px' }}>
            {CONSTANTS.MOODS.map(m => {
              const isSelected = state.mood === m;
              const bg = isSelected ? useMoodColor(m) : THEME.colors.surface2;
              return (
                <button key={m} onClick={() => dispatch({ type: 'SET_MOOD', payload: m })}
                  style={{ padding: '8px 16px', borderRadius: THEME.borderRadius.pill, border: 'none', fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer', whiteSpace: 'nowrap', backgroundColor: bg, color: isSelected ? 'white' : THEME.colors.textSecondary, transform: isSelected ? 'scale(1.05)' : 'scale(1)', transition: THEME.transitions.base }}
                  aria-pressed={isSelected}
                >{m}</button>
              );
            })}
          </div>

          <Card style={{ marginTop: '8px' }}>
            <h3 style={{ ...THEME.typography.headline, marginBottom: '16px' }}>Body signals</h3>
            {[
              { label: 'Stress', val: state.stress, max: 10, field: 'stress' },
              { label: 'Sleep', val: state.sleep, max: 12, field: 'sleep' },
              { label: 'Energy', val: state.energy, max: 10, field: 'energy' }
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ width: '60px', ...THEME.typography.body, fontWeight: 500 }}>{row.label}</span>
                <input type="range" min="0" max={row.max} value={row.val} onChange={e => dispatch({ type: 'SET_INPUT', field: row.field, payload: Number(e.target.value) })}
                  className="slider-track" style={{ flex: 1, margin: '0 16px', background: `linear-gradient(to right, ${accentColor} ${(row.val/row.max)*100}%, #d1d1d6 ${(row.val/row.max)*100}%)` }}
                  aria-label={`${row.label} slider`}
                />
                <span style={{ width: '30px', textAlign: 'right', ...THEME.typography.body, color: THEME.colors.textSecondary }}>{row.val}</span>
              </div>
            ))}
          </Card>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="foodInput" style={{ ...THEME.typography.headline, display: 'block', marginBottom: '8px' }}>What did you eat?</label>
            <div style={{ position: 'relative' }}>
              <textarea id="foodInput" value={state.foodInput} onChange={e => dispatch({ type: 'SET_INPUT', field: 'foodInput', payload: e.target.value })}
                placeholder="Describe your meals today... (e.g., poha for breakfast, dal rice for lunch)"
                style={{ width: '100%', height: '120px', backgroundColor: THEME.colors.surface2, border: 'none', borderRadius: THEME.borderRadius.input, padding: '16px', paddingRight: '48px', fontSize: '15px', resize: 'vertical' }}
              />
              <button onClick={startListening} aria-label="Use voice input"
                style={{ position: 'absolute', right: '12px', bottom: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <Icons.Mic color={THEME.colors.accentBlue} size={20} />
              </button>
            </div>
          </div>

          <button onClick={handleAnalyze} disabled={state.loading}
            style={{ width: '100%', padding: '15px', backgroundColor: accentColor, color: 'white', borderRadius: THEME.borderRadius.input, border: 'none', fontWeight: 700, fontSize: '15px', cursor: state.loading ? 'not-allowed' : 'pointer', opacity: state.loading ? 0.6 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.1s' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            {state.loading ? <><div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' }} /> 3 agents thinking...</> : 'Analyze My Brain →'}
          </button>
        </div>

        {state.result && (
          <div style={{ borderLeft: `1px solid ${THEME.colors.border}`, paddingLeft: '32px' }}>
            <ResultDisplay result={state.result} accentColor={accentColor} />
          </div>
        )}
      </div>
    </div>
  );
};
