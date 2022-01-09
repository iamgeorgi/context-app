// it reduces all the functions that manage the state into a single function
import { v4 as uuidv4 } from 'uuid';

export const bookReducer = (state, action) => {
  console.log('state', state);
  console.log('action', action);

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