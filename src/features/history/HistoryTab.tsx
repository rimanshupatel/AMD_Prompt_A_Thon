import React, { useMemo } from 'react';
import { THEME } from '../../constants/theme';
import { useAppStore } from '../../store/MoodByteContext';
import { Card } from '../../components/Card';

export const HistoryTab: React.FC = () => {
  const { state } = useAppStore();
  const history = useMemo(() => state.history, [state.history]);

  return (
    <div className="fade-in" style={{ padding: THEME.spacing.paddingSection }}>
      <h2 style={{ ...THEME.typography.title, marginBottom: '24px' }}>Your Food Journey</h2>
      {history.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍃</div>
          <p style={{ color: THEME.colors.textSecondary }}>No scans yet. Analyze your first meal.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {history.map((item, i) => (
            <Card key={i} className="fade-in" style={{ display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '28px', marginRight: '16px' }}>{item.result?.serotonin > 70 ? '😊' : '😐'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>{item.result?.healing_meal?.name || 'Scan'}</div>
                  <div style={{ fontSize: '12px', color: THEME.colors.textSecondary }}>{new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: THEME.colors.textSecondary, marginBottom: '12px', flex: 1 }}>
                Serotonin: <strong style={{ color: THEME.colors.text }}>{item.result?.serotonin || 0}%</strong> • Energy: <strong style={{ color: THEME.colors.text }}>{item.result?.energy_forecast || 'N/A'}</strong>
              </div>
              <button aria-label="Reload" style={{ alignSelf: 'flex-start', background: THEME.colors.surface2, padding: '6px 12px', borderRadius: '12px', border: 'none', color: THEME.colors.text, cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Review Data ↻</button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
