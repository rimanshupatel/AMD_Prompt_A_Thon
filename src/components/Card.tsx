import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ children, style = {}, className = '' }) => (
  <div className={`dashboard-card ${className}`} style={{ marginBottom: '16px', ...style }}>
    {children}
  </div>
);
