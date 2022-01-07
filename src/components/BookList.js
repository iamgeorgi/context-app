import React from 'react';

class BookList extends React.Component {
  render() { 
    return (
      <div className="book-list">
        <ul>
          <li>the way of kings</li>
          <li>the name of the wind</li>
          <li>the final empire</li>
        </ul>
      </div>
    )
  }
}
 
export default BookList;