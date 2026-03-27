export const logger = {
  info: (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
      console.info(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
  }
};
