const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./middleware/authController');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      return res.redirect('/user');
    });
  } else {
    next();
  }
};

app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Login</h2>
        <form action="/login" method="POST">
          <label for="username">Username:</label><br>
          <input type="text" id="username" name="username"><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password"><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/login', authController.login);

app.get('/user', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome, user!' });
});

app.get('/admin', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Welcome, admin!' });
  } else {
    res.status(403).send('Access denied');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*
Sources pour compléter les TODO:
- Outil d'encodage décodage de JWT : https://jwt.io/
  - Vérification de la validité du JWT : https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  - Stockage du JWT dans un cookie : https://www.npmjs.com/package/cookie-parser
*/
