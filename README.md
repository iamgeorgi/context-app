# React Hooks

They are special functions, that help us do adittional things inside functional components.

 - Use state
 - Run code when a component render or rerenders
 - Consume context in a functional component
> **Note:** **Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls. More on that at https://reactjs.org/docs/hooks-rules.html#explanation


## useState
It's a function that returns an array, the first value is the current state, the second item is an function that can update the current state

      const [songs, setSongs] = useState([
         { title: 'almost home', id: 1 },
         { title: 'memory gospel', id: 2 },
         { title: 'this wild darkness', id: 3 },
      ]); // we invoke useState function and add a addition data to it

      const addSong = (title) => {
        setSongs([...songs, { title, id: 4 }]);
      }; // we use setSongs function to update the state

## useEffect
useEffect is kind of lifecycle methods in Class Components
> **Note:** Lifecycle methods can't be used inside functional components

useEffect function can be invoked during a component beign rendered or by data beign changed.

      useEffect(() => {
        console.log('useEffect hook ran again > songs');
      }, [songs]); // our useEffect function listens for changes in songs data, the the declaration in the function is beign returned


Why we cant use hooks inside loops or conditionals
Why we cant you if, else conditionals and functions inside jsx {} brackets?

## useContext
It's a hook for using context provider between components.

 ### Initialize Provider Component

    import React, { createContext, useState } from 'react';
    
    export const BookContext = createContext();
    
    const BookContextProvider = (props) => {
      const [books, setBooks] = useState([
        {title: 'name of the wind', id: 1},
        {title: 'the way of kings', id: 2},
        {title: 'the final empire', id: 3},
        {title: 'the hero of ages', id: 4}
      ]);
    
      const addBooks = () => {
        setBooks([...books, {title: 'new book', id: 5}])
      }
    
      return ( 
        <BookContext.Provider value={{books, addBooks}}>
          {props.children}
        </BookContext.Provider>
       );
    }
     
    export default BookContextProvider;


### Wrap components that you would like to provide this context
          <BookContextProvider>
            <Navbar />
            <BookList />
            <SongList />
            <ThemeToggle />
          </BookContextProvider>
### Use the useContext hook inside component that you want to consume the data

    import React, { useContext } from 'react';
    
    const BookList = () => {
      const { isLightTheme, light, dark } = useContext(ThemeContext);
      const { books, addBooks } = useContext(BookContext);
      const theme = isLightTheme ? light : dark;
      return (
        <div className="book-list" style={{ color: theme.synthax, background: theme.bg }}>
          <ul>
          {books.map(book => {
            return <li style={{ background: theme.ui }} key={book.id}>{book.title}</li>
          })}
          </ul>
          <button onClick={addBooks}>Add book</button>
        </div>
      );
    }
