
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/login', auth.login);


// inside routes/auth.routes.js
// const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.sendStatus(401);
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Secure data', user: req.user });
});

module.exports = router;
