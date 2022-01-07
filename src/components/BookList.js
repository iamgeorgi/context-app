import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class BookList extends React.Component {
  static contextType = ThemeContext; // have an access to the data from ThemeContext.Provider and takes his value
  render() {
    console.log(this.context); // it logs the value from ThemeContext.Provider
    
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;

    return (
      <div className="book-list" style={{ color: theme.synthax, background: theme.bg }}>
        <ul>
          <li style={{ background: theme.ui }}>the way of kings</li>
          <li style={{ background: theme.ui }}>the name of the wind</li>
          <li style={{ background: theme.ui }}>the final empire</li>
        </ul>
      </div>
    )
  }
}
 
export default BookList;