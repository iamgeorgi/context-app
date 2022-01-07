# What is Context?

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

# How to use it?
## Context Provider
*First you need to make a Context Provider component where the global data can be stored.*

    import React, { createContext } from 'react';
    
    export const ThemeContext = createContext();
    
    class ThemeContextProvider extends React.Component {
      state = {
        isLightTheme: true,
        light: { synthax: '#555', ui: '#ddd', bg: '#eee'},
        dark: { synthax: '#ddd', ui: '#333', bg: '#555'},
      }
      toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme })
      }
      render() { 
        return (
          <ThemeContext.Provider value={{...this.state, toggleTheme: this.toggleTheme }}>
          // The value prop stores the global data and other components can access it
            {this.props.children}
          // You need to specify all child component that will use that data
          </ThemeContext.Provider>
        );
      }
    }
     
    export default ThemeContextProvider;

## Wrap the components which will use the data

*Inside App.js you need to add ThemeContextProvider and now other compoents will access the data from it.*

    function App() {
      return (
        <div className="App">
          <AuthContextProvider>
            <ThemeContextProvider>
              <Navbar />
              <BookList />
              <ThemeToggle />
            </ThemeContextProvider>
          </AuthContextProvider>
        </div>
      );
    }

## Use the Context Data inside child component

*You need to import ThemeContext which was representation of createContet() function earlier and use Consumer property to access the data.*

    import React, { Component } from 'react';
    import { ThemeContext } from '../contexts/ThemeContext';
    
    class Navbar extends Component {
      render() {
    
        return (
            <ThemeContext.Consumer>{(context) => {
              // we get access to context data inside that function
              const { isAuthenticated, toggleAuth } = authContext;
              const { isLightTheme, light, dark } = context;
              const theme = isLightTheme ? light : dark;
    
              return (
                <nav style={{ background: theme.ui, color: theme.synthax }}>
                  <h1>Context App</h1>
                  <div onClick={toggleAuth}>
                    { isAuthenticated ? 'Logged in' : 'Logged out' }
                  </div>
                  <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                  </ul>
                </nav>
              )
            }}
            </ThemeContext.Consumer>
          )}
        )
      }
    }
    
    export default Navbar;

## Multiple Context providers

*You can use multiple prividers by wrapping each provider you wan't to use.*

    import React, { Component } from 'react';
    import { AuthContext } from '../contexts/AuthContext';
    import { ThemeContext } from '../contexts/ThemeContext';
    
    class Navbar extends Component {
      render() {
    
        return (
          <AuthContext.Consumer>{(authContext) => (
            <ThemeContext.Consumer>{(context) => {
              // we get access to context data inside that function
              const { isAuthenticated, toggleAuth } = authContext;
              const { isLightTheme, light, dark } = context;
              const theme = isLightTheme ? light : dark;
    
              return (
                <nav style={{ background: theme.ui, color: theme.synthax }}>
                  <h1>Context App</h1>
                  <div onClick={toggleAuth}>
                    { isAuthenticated ? 'Logged in' : 'Logged out' }
                  </div>
                  <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                  </ul>
                </nav>
              )
            }}
            </ThemeContext.Consumer>
          )}
          </AuthContext.Consumer>
        )
      }
    }
    
    export default Navbar;
