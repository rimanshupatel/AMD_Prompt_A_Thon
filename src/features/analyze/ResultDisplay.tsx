import React, { useRef, useEffect } from 'react';
import { THEME } from '../../constants/theme';
import { useAppStore } from '../../store/MoodByteContext';
import { useChartJs } from '../../hooks/useChartJs';
import { Card } from '../../components/Card';

export const ResultDisplay: React.FC<{ result: any; accentColor: string }> = ({ result, accentColor }) => {
  const { dispatch } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const chartLoaded = useChartJs();

  useEffect(() => {
    if (!chartLoaded || !canvasRef.current || !result.future_24hrs?.chart_data) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const data = result.future_24hrs.chart_data;
    chartInstance.current = new (window as any).Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: ['Now', '4hrs', '12hrs', '24hrs'],
        datasets: [
          { label: 'With Healing Meal', data: data.with_meal, borderColor: THEME.colors.accent, backgroundColor: 'rgba(48, 209, 88, 0.1)', fill: true, tension: 0.4 },
          { label: 'Without Meal', data: data.without_meal, borderColor: THEME.colors.accentRed, borderDash: [5, 5], tension: 0.4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { position: 'bottom' } } }
    });
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [result, chartLoaded, accentColor]);

  const handleSave = () => {
    dispatch({ type: 'ADD_HISTORY', payload: { timestamp: new Date().toISOString(), type: 'analyze', result } });
    dispatch({ type: 'SHOW_TOAST', payload: 'Saved to History!' });
  };

  return (
    <div aria-live="polite" style={{ marginTop: '32px' }} className="fade-in">
      <h3 style={{ ...THEME.typography.title, marginBottom: '16px' }}>Your Brain Report</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        {[['Serotonin', `${result.serotonin}%`, '↑'], ['Dopamine', `${result.dopamine_percent}%`, result.dopamine_trend === 'rising' ? '↑' : '↓'], ['Energy', result.energy_forecast, '→'], ['Mood in 2h', result.mood_in_2hrs, '']].map((s, i) => (
          <Card key={i} className={`fade-in stagger-${i%3}`} style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>{s[1]}</div>
            <div style={{ ...THEME.typography.caption, color: THEME.colors.textSecondary, marginTop: '4px' }}>{s[0]} <span style={{ color: s[2] === '↑' ? THEME.colors.accent : THEME.colors.accentRed }}>{s[2]}</span></div>
          </Card>
        ))}
      </div>

      <p className="fade-in stagger-1" style={{ ...THEME.typography.body, color: THEME.colors.textSecondary, fontStyle: 'italic', borderLeft: `3px solid ${accentColor}`, paddingLeft: '12px', marginBottom: '24px' }}>
        {result.brain_analysis}
      </p>

      {result.healing_meal && (
        <Card className="fade-in stagger-2" style={{ borderLeft: `4px solid ${THEME.colors.accent}` }}>
          <h4 style={{ ...THEME.typography.caption, color: THEME.colors.textSecondary, textTransform: 'uppercase' }}>Your Healing Meal</h4>
          <div style={{ fontSize: '22px', fontWeight: 700, color: THEME.colors.accent, marginTop: '4px', marginBottom: '4px' }}>{result.healing_meal.name}</div>
          <p style={{ fontSize: '13px', color: THEME.colors.textSecondary, marginBottom: '12px' }}>{result.healing_meal.why}</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {result.healing_meal.ingredients?.map((ing: string, i: number) => (
              <span key={i} style={{ backgroundColor: THEME.colors.surface2, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>{ing}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ backgroundColor: 'rgba(255, 159, 10, 0.1)', color: THEME.colors.accentAmber, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>⏰ {result.healing_meal.when_to_eat}</span>
            <span style={{ fontSize: '12px', color: THEME.colors.textSecondary }}>Antidote for: <b>{result.healing_meal.antidote_for}</b></span>
          </div>
        </Card>
      )}

      {result.future_24hrs && (
        <Card className="fade-in stagger-3">
          <h4 style={{ ...THEME.typography.headline, marginBottom: '16px' }}>Future You — 24hrs</h4>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, backgroundColor: THEME.colors.surface2, padding: '10px', borderRadius: '10px', fontSize: '13px' }}><b>Energy:</b> {result.future_24hrs.energy_change}</div>
            <div style={{ flex: 1, backgroundColor: THEME.colors.surface2, padding: '10px', borderRadius: '10px', fontSize: '13px' }}><b>Mood:</b> {result.future_24hrs.mood_shift}</div>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', color: THEME.colors.accentRed, padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>
            ⚠️ {result.future_24hrs.warning}
          </div>
          <div style={{ height: '200px', width: '100%' }}><canvas ref={canvasRef} aria-label="Energy forecast chart" role="img"></canvas></div>
        </Card>
      )}

      <button onClick={handleSave} style={{ width: '100%', padding: '15px', backgroundColor: THEME.colors.surface2, color: THEME.colors.text, borderRadius: THEME.borderRadius.input, border: 'none', fontWeight: 600, fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
        Save to History
      </button>
    </div>
  );
};
