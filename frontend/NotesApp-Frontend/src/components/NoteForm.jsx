import { useState, useEffect } from 'react';

const NoteForm = ({ onCreate, onUpdate, editingNote, setEditingNote }) => {
  const [title,setTitle] = useState("")  
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)  
      setContent(editingNote.content);
      setTags(editingNote.tags.join(','));
      setImageUrl(editingNote.image || '');
    } else {
        setTitle("")
      setContent('');
      setTags('');
      setImageUrl('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
        title,
      content,
      tags: tags.split(',').map(t => t.trim()),
      image: imageUrl
    };
    if (editingNote) {
      onUpdate({ ...editingNote, ...note });
    } else {
      onCreate(note);
    }
    setTitle("")
    setContent('');
    setTags('');
    setImageUrl('');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset

    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setImageUrl(data.secure_url);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}  >
        <input type="text" value={title} placeholder="Enter title..." onChange={(e) => setTitle(e.target.value)}/>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="preview" />}
      <button type="submit">{editingNote ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
