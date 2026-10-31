
import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

const STORAGE_KEY = "shasar-theme-v2";

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    return localStorage.getItem(STORAGE_KEY) || "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
