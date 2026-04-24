# MoodByte AI

MoodByte AI is a scalable, neuro-nutrition AI health app built for the Prompt-a-thon 2025 hackathon. It utilizes Google Gemini (and supports Anthropic Claude) directly from the frontend to analyze your daily meals and mood, offering personalized Indian Ayurvedic healing meals and real-time physical/mental state forecasting.

## 🌟 Features

- **Brain Report**: Logs your meals via text or voice, processes it with AI agents, and maps your emotional state to specific neurotransmitter needs.
- **Healing Meals**: Recommends personalized Indian healing meals to act as an antidote to stress, dopamine crashes, and inflammatory diets.
- **Junk Food Scanner**: Analyzes junk food impact on brain chemistry and provides an immediate recovery timeline and hydration plan.
- **iOS Light Theme**: Built strictly utilizing an iOS design token object with glassmorphism, native Apple typography, and smooth micro-animations.
- **Accessibility**: 100% ARIA-compliant, responsive, and keyboard accessible.
- **Local Persistence**: History and settings stored locally using a robust `useLocalStorage` custom hook.
- **Dynamic Charting**: Features Chart.js to map out 24-hour energy projections.

## 🛠️ Tech Stack

- **React 18** with strictly typed Hooks (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`)
- **Vite** + **TypeScript** for scalable project architecture and build tooling.
- **Pure CSS-in-JS**: Built completely with inline styling mapped to a global token system (No external UI libraries like Tailwind or Material UI).
- **Google Gemini API** (via `generativelanguage.googleapis.com`) called entirely client-side.
- **Chart.js** via dynamic CDN injection.

## 🚀 Installation & Setup

1. **Clone the repository** (if applicable) and navigate to the folder:
   ```bash
   cd moodbyte-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If the variable is not set, the app will gracefully prompt you for an API key on the first load.)*

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📁 Folder Structure

```
/src
  /components     # Reusable UI shells (Card, Icons, Toast, NavBar)
  /constants      # Theme tokens and app-wide constants
  /features       # Tab-specific views (home, analyze, scanner, history, profile)
  /hooks          # Custom React hooks (storage, charts, mic, geolocator)
  /services       # Centralized API logic (apiService.ts)
  /store          # Global State Context & useReducer implementation
  /styles         # Global injected styles (CSS reset & animations)
  /utils          # Helper functions (Environment-aware logging)
  App.tsx         # Main entry shell tying together Context and Navigation
  main.tsx        # React DOM Root
```

## 🧠 How the AI Works

MoodByte AI uses an advanced prompt chain to act as an Ayurvedic Neuro-Nutrition expert. 
1. When you analyze a meal, `apiService.ts` combines your `mood`, `stress`, `sleep`, `energy`, `foodInput`, and `dosha` type.
2. It makes a direct client-side fetch call to Google Gemini (or Anthropic Claude depending on the key format).
3. The AI is strictly instructed to return *only* a heavily typed JSON schema containing serotonin mapping, energy forecasts, and tailored Indian healing meals.
4. The React state hydrates this payload into a visually rich `ResultDisplay` and `Chart.js` graph.

## 📸 Screenshots

*(Replace this placeholder with screenshots of your iOS Light Theme views!)*
