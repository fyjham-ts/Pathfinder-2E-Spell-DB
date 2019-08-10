import React from 'react';

export const ThemeContext = React.createContext({
    'darkMode': false,
    'changeDarkMode': m => this.darkMode = m
});