import React, { useEffect } from 'react';
import { THEME } from '../constants/theme';

export const Toast: React.FC<{ message: string; type?: 'error' | 'success'; onClose: () => void }> = ({ message, type = 'error', onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  const bgColor = type === 'error' ? THEME.colors.accentRed : THEME.colors.accent;
  
  return (
    <div role="alert" aria-live="assertive" style={{
      position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: bgColor, color: 'white', padding: '12px 24px', borderRadius: THEME.borderRadius.pill,
      boxShadow: THEME.colors.shadow, zIndex: 1000, animation: 'slideUp 0.3s ease', fontWeight: 600, fontSize: '14px'
    }}>
      {message}
    </div>
  );
};
