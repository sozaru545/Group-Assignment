// context/ThemeContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return a default implementation if not wrapped in provider
    // This prevents errors when components use useTheme without provider
    return {
      theme: 'light',
      setTheme: () => {},
      isLoading: false,
      setIsLoading: () => {}
    };
  }
  return context;
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get initial theme from localStorage or default to 'light'
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Update theme and save to localStorage
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const value = {
    theme,
    setTheme: updateTheme,
    isLoading,
    setIsLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;