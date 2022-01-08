import React, { useState, useEffect } from 'react';
import NewSongForm from './NewSongForm';

const SongList = () => {
  const [songs, setSongs] = useState([
     { title: 'almost home', id: 1 },
     { title: 'memory gospel', id: 2 },
     { title: 'this wild darkness', id: 3 },
  ]);
  const [age, setAge] = useState(20); 
  // takes initial value as first prop in the right
  // the function returns an array and a function that updates that array, so we can use destructuring
  const addSong = (title) => {
    setSongs([...songs, { title, id: 4 }]);
  };
  useEffect(() => {
    console.log('useEffect hook ran again > songs');
  }, [songs]); 
  // every time the component renders, useEffect is called or can be customized to run only when some data changes
  // you can use multiple useEffect functions
  useEffect(() => {
    console.log('useEffect hook ran again > age');
  }, [age]);
  return (
    <div className="song-list">
      <ul>
        {songs.map(song => {
          return (
            <li key={song.id}>{song.title}</li>
          )
        })}
      </ul>
      <NewSongForm addSong={addSong} />
      <button onClick={() => setAge(age + 1)}>Add 1 to age: {age}</button>
    </div>
  )
}

export default SongList;