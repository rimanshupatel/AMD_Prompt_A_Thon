import React, { Component, ReactNode } from 'react';
import { THEME } from '../constants/theme';
import { logger } from '../utils/logger';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { logger.error("ErrorBoundary caught an error", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: THEME.colors.accentRed, textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '10px', borderRadius: THEME.borderRadius.pill, background: THEME.colors.accentBlue, color: 'white', border: 'none' }}>Reload App</button>
        </div>
      );
    }
    return this.props.children;
  }
}
