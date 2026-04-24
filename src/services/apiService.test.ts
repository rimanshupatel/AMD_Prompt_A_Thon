import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './apiService';

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_GEMINI_API_KEY', 'your_api_key_here'); // Mock default missing key
  });

  it('should return mock analyze response when API key is missing or default', async () => {
    const data = {
      mood: 'calm',
      stress: 5,
      sleep: 7,
      energy: 6,
      foodInput: 'apple',
      dosha: 'Vata',
      city: 'Test City'
    };
    
    const result = await apiService.analyzeMood(data);
    
    expect(result).toBeDefined();
    expect(result.serotonin).toBe(85);
    expect(result.healing_meal.name).toBe('Golden Turmeric Khichdi');
  });

  it('should return mock scan response when API key is missing or default', async () => {
    const result = await apiService.scanFood('samosa');
    
    expect(result).toBeDefined();
    expect(result.damage_score).toBe(8);
    expect(result.antidote_meal.name).toBe('Spiced Moong Dal Soup');
  });

  it('should attempt fetch when valid Gemini API key is provided', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'AIza_VALID_MOCK_KEY');
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        candidates: [{
          content: { parts: [{ text: '{"serotonin": 90, "healing_meal": {"name": "Test Meal"}}' }] }
        }]
      })
    });
    
    global.fetch = mockFetch;

    const data = {
      mood: 'happy', stress: 2, sleep: 8, energy: 9, foodInput: 'salad', dosha: 'Pitta', city: 'Test City'
    };
    
    const result = await apiService.analyzeMood(data);
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.serotonin).toBe(90);
    expect(result.healing_meal.name).toBe('Test Meal');
  });
});
