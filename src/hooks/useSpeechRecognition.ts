import { useCallback } from 'react';

export function useSpeechRecognition(onResult: (text: string) => void) {
  return useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      if (event.results.length > 0) {
        onResult(event.results[0][0].transcript);
      }
    };
    recognition.start();
  }, [onResult]);
}
