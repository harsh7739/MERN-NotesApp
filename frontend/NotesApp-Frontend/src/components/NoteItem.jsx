const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-item">
      <p>{note.content}</p>
      <div className="tags">
        {note.tags.map((tag, idx) => <span key={idx}>#{tag}</span>)}
      </div>
      {note.image && <img src={note.image} alt="attachment" />}
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
