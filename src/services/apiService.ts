import { THEME } from '../constants/theme';

const MOCK_ANALYZE_RESPONSE = {
  serotonin: 85,
  dopamine_trend: "rising",
  dopamine_percent: 70,
  energy_forecast: "High",
  mood_in_2hrs: "Calm",
  brain_analysis: "Your brain is adapting well to the current inputs, but adding specific Ayurvedic ingredients will stabilize your neurotransmitters.",
  healing_meal: {
    name: "Golden Turmeric Khichdi",
    why: "Balances Vata dosha and reduces cortisol spikes.",
    ingredients: ["rice", "moong dal", "turmeric", "ghee"],
    when_to_eat: "Within the next 2 hours",
    antidote_for: "Stress and fatigue"
  },
  future_24hrs: {
    energy_change: "+15% by evening",
    mood_shift: "Noticeably calmer and focused",
    warning: "Skipping meals may lead to a sudden dopamine crash.",
    chart_data: {
      with_meal: [50, 70, 85, 90],
      without_meal: [50, 45, 30, 20]
    },
    neurotransmitter_tip: "Stay hydrated to maintain serotonin levels."
  }
};

const MOCK_SCAN_RESPONSE = {
  food_verdict: "High glycemic index detected. Incoming dopamine spike followed by a severe crash.",
  damage_score: 8,
  primary_damage: "Dopamine receptors and cortisol levels",
  recovery_timeline: "3-4 hours with proper antidote",
  antidote_meal: {
    name: "Spiced Moong Dal Soup",
    why: "High protein and fiber to slow down glucose absorption."
  },
  hydration_plan: "Drink 2 glasses of warm lemon water immediately.",
  next_meal_fix: "Leafy greens and lean protein.",
  avoid_for_hours: 12
};

export const apiService = {
  async analyzeMood(data: { mood: string; stress: number; sleep: number; energy: number; foodInput: string; dosha: string; city: string }): Promise<any> {
    const activeKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!activeKey || activeKey === 'your_api_key_here') {
      console.warn("Using mock analyze response due to missing or invalid API key.");
      return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYZE_RESPONSE), 1500));
    }

    const systemPrompt = `You are MoodByte AI — a neuro-nutrition expert combining modern neuroscience with Indian Ayurvedic food wisdom. You have 3 specialist agents. Always respond ONLY with raw JSON. Schema:
{
  "serotonin": 85,
  "dopamine_trend": "rising",
  "dopamine_percent": 70,
  "energy_forecast": "High",
  "mood_in_2hrs": "Calm",
  "brain_analysis": "Your brain is...",
  "healing_meal": { "name": "Khichdi", "why": "reason", "ingredients": ["rice", "dal"], "when_to_eat": "Now", "antidote_for": "stress" },
  "future_24hrs": { "energy_change": "+10%", "mood_shift": "calmer", "warning": "warning", "chart_data": { "with_meal": [50, 60, 70, 80], "without_meal": [50, 40, 30, 20] }, "neurotransmitter_tip": "tip" }
}`;
    const userMessage = `Current mood: ${data.mood}. Stress: ${data.stress}/10. Sleep: ${data.sleep}h. Energy: ${data.energy}/10. Food: ${data.foodInput}. Dosha: ${data.dosha}. Location: ${data.city}. Analyze and suggest an Indian healing meal.`;

    try {
      if (activeKey.startsWith('AIza')) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (!response.ok) throw new Error(response.status === 429 ? "RATE_LIMIT" : "API_ERROR");
        const json = await response.json();
        return JSON.parse(json.candidates[0].content.parts[0].text);
      } else {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': activeKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1000,
            system: systemPrompt,
            messages: [{ role: "user", content: userMessage }]
          })
        });
        if (!response.ok) throw new Error(response.status === 429 ? "RATE_LIMIT" : "API_ERROR");
        const json = await response.json();
        const text = json.content[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : text);
      }
    } catch (error) {
      console.error("API Call failed:", error);
      console.warn("Falling back to mock analyze response.");
      return MOCK_ANALYZE_RESPONSE;
    }
  },

  async scanFood(scanInput: string): Promise<any> {
    const activeKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!activeKey || activeKey === 'your_api_key_here') {
      console.warn("Using mock scan response due to missing or invalid API key.");
      return new Promise(resolve => setTimeout(() => resolve(MOCK_SCAN_RESPONSE), 1500));
    }

    const systemPrompt = `You are the MoodByte Antidote Agent. Analyze junk food impact on brain chemistry and suggest Indian food antidotes. Respond ONLY in raw JSON. Schema:
{"food_verdict": "sentence", "damage_score": 8, "primary_damage": "dopamine crash", "recovery_timeline": "3 hours", "antidote_meal": {"name": "Dal", "why": "reason"}, "hydration_plan": "Drink water", "next_meal_fix": "Salad", "avoid_for_hours": 12}`;
    const userMessage = `I just ate: ${scanInput}. Analyze damage and give antidote.`;

    try {
      if (activeKey.startsWith('AIza')) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (!response.ok) throw new Error(response.status === 429 ? "RATE_LIMIT" : "API_ERROR");
        const json = await response.json();
        return JSON.parse(json.candidates[0].content.parts[0].text);
      } else {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': activeKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1000,
            system: systemPrompt,
            messages: [{ role: "user", content: userMessage }]
          })
        });
        if (!response.ok) throw new Error(response.status === 429 ? "RATE_LIMIT" : "API_ERROR");
        const json = await response.json();
        const text = json.content[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : text);
      }
    } catch (error) {
      console.error("API Call failed:", error);
      console.warn("Falling back to mock scan response.");
      return MOCK_SCAN_RESPONSE;
    }
  }
};
