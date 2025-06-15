const UserRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

UserRouter.post('/signup', async (req, res) => {
  const { username,email, password } = req.body;
  const user = new UserModel({ username,email, password });
  await user.save();
  res.status(201).send({ message: 'User created' });
});

UserRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = UserRouter;
