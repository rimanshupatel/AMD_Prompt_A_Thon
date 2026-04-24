import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import type { AppState, ActionType } from './types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialState: AppState = {
  currentTab: 'home', mood: 'calm', stress: 5, sleep: 7, energy: 6, foodInput: '', scanInput: '',
  loading: false, scanLoading: false, result: null, scanResult: null, history: [], dosha: 'Vata',
  userName: 'Arjun', toast: null
};

function reducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case 'SET_TAB': return { ...state, currentTab: action.payload };
    case 'SET_MOOD': return { ...state, mood: action.payload };
    case 'SET_INPUT': return { ...state, [action.field]: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_SCAN_LOADING': return { ...state, scanLoading: action.payload };
    case 'SET_RESULT': return { ...state, result: action.payload, loading: false };
    case 'SET_SCAN_RESULT': return { ...state, scanResult: action.payload, scanLoading: false };
    case 'ADD_HISTORY': return { ...state, history: [action.payload, ...state.history] };
    case 'SET_HISTORY': return { ...state, history: action.payload };
    case 'SET_DOSHA': return { ...state, dosha: action.payload };
    case 'SET_USER_NAME': return { ...state, userName: action.payload };
    case 'SHOW_TOAST': return { ...state, toast: action.payload };
    case 'HIDE_TOAST': return { ...state, toast: null };
    case 'HYDRATE': return { ...state, ...action.payload };
    default: return state;
  }
}

interface ContextProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  isHydrated: boolean;
}

const MoodByteContext = createContext<ContextProps | undefined>(undefined);

export const MoodByteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [storedData, setStoredData] = useLocalStorage('moodbyte_data', null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (storedData && !isHydrated) {
      dispatch({ type: 'HYDRATE', payload: storedData as Partial<AppState> });
    }
    setIsHydrated(true);
  }, [storedData, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      const { history, dosha, userName } = state;
      setStoredData({ history, dosha, userName });
    }
  }, [state.history, state.dosha, state.userName, isHydrated, setStoredData]);

  return (
    <MoodByteContext.Provider value={{ state, dispatch, isHydrated }}>
      {children}
    </MoodByteContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(MoodByteContext);
  if (!context) throw new Error('useAppStore must be used within a MoodByteProvider');
  return context;
};
