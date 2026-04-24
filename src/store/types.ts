export interface HistoryItem {
  timestamp: string;
  type: string;
  result: any;
}

export interface AppState {
  currentTab: string;
  mood: string;
  stress: number;
  sleep: number;
  energy: number;
  foodInput: string;
  scanInput: string;
  loading: boolean;
  scanLoading: boolean;
  result: any | null;
  scanResult: any | null;
  history: HistoryItem[];
  dosha: string;
  userName: string;
  toast: string | null;
}

export type ActionType = 
  | { type: 'SET_TAB'; payload: string }
  | { type: 'SET_MOOD'; payload: string }
  | { type: 'SET_INPUT'; field: string; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SCAN_LOADING'; payload: boolean }
  | { type: 'SET_RESULT'; payload: any }
  | { type: 'SET_SCAN_RESULT'; payload: any }
  | { type: 'ADD_HISTORY'; payload: HistoryItem }
  | { type: 'SET_HISTORY'; payload: HistoryItem[] }
  | { type: 'SET_DOSHA'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SHOW_TOAST'; payload: string }
  | { type: 'HIDE_TOAST' }
  | { type: 'HYDRATE'; payload: Partial<AppState> };
