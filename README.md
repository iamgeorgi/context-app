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
