import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { ThemeContext } from '../contexts/ThemeContext';

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

export default BookList;