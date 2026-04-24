import { CONSTANTS } from '../constants';
import { THEME } from '../constants/theme';

export function useMoodColor(mood: string): string {
  return CONSTANTS.MOOD_COLORS[mood] || THEME.colors.accent;
}
