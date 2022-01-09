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
## useReducer
useReducer hook reduces all the functions that manage the state into a single function. It can be used instead of useState to handle more complex state cases.
### 1. First you need to initialize the reducer function and add all the functions, you want to use

    export const bookReducer = (state, action) => {
      switch (action.type) {
        case 'ADD_BOOK':
          return [...state, {
            title: action.book.title,
            author: action.book.author,
            id: uuidv4()
          }]
        case 'REMOVE_BOOK':
          return state.filter(book => book.id !== action.book.id)
        default:
          return state;
      }
    }
***state - contains the whole data***

    [
        {
            "title": "daasddsa",
            "author": "daassad",
            "id": "598c5f45-6e5a-4071-8239-4cb1b18553e1"
        },
        {
            "title": "asdasdas",
            "author": "dsaasdads",
            "id": "1613b7ac-59a2-4838-a4b9-fbebd6bfd564"
        },
        {
            "title": "asadsdas",
            "author": "dasadsads",
            "id": "74aeb4ad-a614-4ef8-8342-a65a8f1e5ce7"
        }
    ]
***action - contains info for the current action of the user, for example user adds a new book***

    {
        "type": "ADD_BOOK",
        "book": {
            "title": "daaddas",
            "author": "dasda"
        }
    }
### 2. Then you can call useReducer hook whanever you want to manage the state, for example in Context provider

    const BookContextProvider = (props) => {
      const [books, dispatch] = useReducer(bookReducer, localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []);
      useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
      }, [books]);
    
      return (
        <BookContext.Provider value={{books, dispatch}}>
          { props.children }
        </BookContext.Provider>
      )
    }

*Let's have a closer look at calling the useReducer hook*

    const [books, dispatch] = useReducer(bookReducer, localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []);

`books` - is the initial state that we can use wanever we want
`dispatch` - is the following function that can manage and change this state

### 3. Now you can use dispatch function to change the data inside books

    const BookDetails = ({ book }) => {
      const { dispatch } = useContext(BookContext);
      return ( 
        <li onClick={() => dispatch({ type: 'REMOVE_BOOK', book: { id: book.id }})}>
          <div className="title">{ book.title }</div>
          <div className="author">{ book.author }</div>
        </li>
       );
    }
*This component removes a single book on event click.*

    dispatch({ type: 'REMOVE_BOOK', book: { id: book.id }})
`type` - refers to action we specified inside switch/case statement in bookReducer component 
`book` - refers to the action parameter parameter