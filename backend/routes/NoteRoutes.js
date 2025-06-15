const NoteRouter = require('express').Router();
const auth = require('../middleware/auth');
const NoteModel = require('../model/NoteModel');


// NoteRouter.use(auth);

NoteRouter.get('/', async (req, res) => {
  const notes = await NoteModel.find({ user: req.user });
  res.json(notes);
});

NoteRouter.post('/', async (req, res) => {
  const note = await NoteModel({ ...req.body, user: req.user });
  await note.save()
  res.status(201).json(note);
});

NoteRouter.put('/:id', async (req, res) => {
  const note = await NoteModel.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true });
  res.json(note);
});

NoteRouter.delete('/:id', async (req, res) => {
  await NoteModel.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.status(204).end();
});

module.exports = NoteRouter;
