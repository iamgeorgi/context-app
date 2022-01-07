import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends React.Component {
  render() { 
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { toggleTheme } = context;
          return (
            <button onClick={toggleTheme}>Toggle the theme</button>
          )
        }}
      </ThemeContext.Consumer>
    );
  }
}
 
export default ThemeToggle;