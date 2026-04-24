import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContent from './App.tsx'
import { MoodByteProvider } from './store/MoodByteContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MoodByteProvider>
      <AppContent />
    </MoodByteProvider>
  </React.StrictMode>,
)
