const jwt = require('jsonwebtoken');
const users = [
  { id: 1, username: 'user', password: 'user', role: 'user' },
  { id: 2, username: 'admin', password: 'admin', role: 'admin' }
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/user');
  } else {
    res.status(401).send('Invalid credentials');
  }
};