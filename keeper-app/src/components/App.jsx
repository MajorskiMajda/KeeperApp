import React, { useState, useEffect } from 'react';
import Header from './Header';
import CreateArea from './CreateArea';
import Note from './Note';
import Footer from './Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/notes')
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching notes:', err);
        setLoading(false);
      });
  }, []);


  const handleAddNote = (title, content) => {
    const newNote = { title, content };

    setNotes(prevNotes => [...prevNotes, newNote]);

    fetch('http://localhost:5001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => prevNotes.map(note =>
          note === newNote ? { ...note, _id: data._id } : note
        ));
      })
      .catch(err => console.error('Failed to save note:', err));
  };


  const deleteNote = (id) => {
    if (!id) {
      console.error('No valid ID passed for deletion.');
      return; 
    }

    setNotes(prevNotes => prevNotes.filter((note) => note._id !== id));


    fetch(`http://localhost:5001/notes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Note deleted from DB');
        } else {
          throw new Error('Failed to delete note');
        }
      })
      .catch(err => {
        console.error('Failed to delete note:', err);
      });
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={handleAddNote} />
      {notes.length > 0 ? (
        notes.map((noteItem) => {
          console.log("Rendering Note with _id:", noteItem._id);
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote} 
            />

          );
        })
      ) : (
        <div className="no-notes-div">
          <p className="no-notes-message">No notes available.</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;



