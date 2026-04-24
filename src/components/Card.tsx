import React, { memo } from 'react';

export const Card = memo(({ children, style = {}, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) => (
  <article className={`dashboard-card ${className}`} style={{ marginBottom: '16px', ...style }}>
    {children}
  </article>
));
Card.displayName = 'Card';
