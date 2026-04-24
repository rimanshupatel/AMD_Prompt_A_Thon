import { useState, useEffect } from 'react';

export function useChartJs() {
  const [loaded, setLoaded] = useState(!!(window as any).Chart);
  
  useEffect(() => {
    if ((window as any).Chart) return;
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);
  
  return loaded;
}
