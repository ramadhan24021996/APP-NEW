export const redis = {
  get: (key, defaultValue) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  },
  del: (key) => {
    localStorage.removeItem(key);
  },
  flushdb: () => {
    localStorage.clear();
  }
};
