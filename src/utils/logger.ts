export const logger = {
  log: (...args: any[]) => {
    if (import.meta.env.PROD) return;
    console.log(...args);
  },
  error: (...args: any[]) => {
    if (import.meta.env.PROD) return;
    console.error(...args);
  }
};
