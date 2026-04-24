export const CONSTANTS = {
  MOODS: ['calm', 'stressed', 'tired', 'focused', 'anxious', 'happy'],
  DOSHAS: [
    { id: 'Vata', desc: 'Creative, anxious tendencies — needs warmed grounding foods' },
    { id: 'Pitta', desc: 'Driven, inflammatory — needs cooling foods' },
    { id: 'Kapha', desc: 'Steady, slow — needs light stimulating foods' }
  ],
  TABS: [
    { id: 'home', label: 'Home', icon: 'House' },
    { id: 'analyze', label: 'Analyze', icon: 'Brain' },
    { id: 'scanner', label: 'Scanner', icon: 'Search' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'profile', label: 'Profile', icon: 'Person' }
  ],
  MOOD_COLORS: {
    calm: '#30d158',
    stressed: '#30d158',
    tired: '#0a84ff',
    focused: '#ff9f0a',
    anxious: '#30d158',
    happy: '#ff9f0a'
  } as Record<string, string>
};
