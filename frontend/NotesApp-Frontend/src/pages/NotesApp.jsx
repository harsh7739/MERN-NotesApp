import { useEffect, useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/notes/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (newNote) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newNote)
    });
    if (res.ok) fetchNotes();
  };

  const handleUpdate = async (updatedNote) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/api/notes/${updatedNote._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedNote)
    });
    if (res.ok) {
      fetchNotes();
      setEditingNote(null);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchNotes();
  };

  const filteredNotes = notes.filter((n) => {
    const matchesQuery = n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? n.tags.includes(selectedTag) : true;
    return matchesQuery && matchesTag;
  });

  const uniqueTags = [...new Set(notes.flatMap((n) => n.tags))];

  return (
    <div className="notes-app">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="tag-filter">
        <button onClick={() => setSelectedTag('')}>All</button>
        {uniqueTags.map((tag) => (
          <button key={tag} onClick={() => setSelectedTag(tag)}>{tag}</button>
        ))}
      </div>
      <NoteForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={() => setEditingNote(note)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
