import { createContext } from 'react';

// Note this is how context works for hooks
// You can pass anything into context, here we are passing state with a blank updater funciton
const ThemeContext = createContext(['blue', () => {}]);

export default ThemeContext;
