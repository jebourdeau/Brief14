const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Récupérer le token dans les cookies
  const token= req.cookies.token;
  // vérifier s'il est valide avec la méthode `jwt.verify`
  if (!token) {
    return res.status(401).send('Access denied. No Token provided!');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if (err) {
      // Si le token est invalide, retourner une erreur 401
      return res.status(401).send('Invalid token!');
    }
    // Si le token est valide, ajouter le contenu décodé du token dans `req.user`
    req.user = decoded;
    next();
  })
};