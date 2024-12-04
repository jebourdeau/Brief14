# Sécurisation des Tokens JWT dans une Application Node.js

## Introduction

comment sécuriser les tokens JWT (JSON Web Tokens) dans une application Node.js.
Configurer et utiliser les tokens JWT de manière sécurisée.

## Étapes de la Sécurisation

### 1. Utilisation des Variables d'Environnement

Pour sécuriser les secrets utilisés pour signer les tokens JWT, il faut utiliser des variables d'environnement. Cela permet de garder les secrets hors du code source et de les protéger contre les fuites accidentelles, dans un fichier ".env".

#### Configuration

1. Créez un fichier `.env` à la racine de votre projet il contiendra le reel secret :
    ```
    JWT_SECRET = your_jwt_secret
    ```

2. Installez le package `dotenv` pour charger les variables d'environnement :
    ```
    npm install dotenv
    ```

3. Chargez les variables d'environnement dans votre application en ajoutant cette ligne au début de votre fichier `index.js` :
    ```javascript
    require('dotenv').config();
    ```

### 2. Création et Vérification des Tokens JWT

Utilisation du secret JWT stocké dans les variables d'environnement pour signer et vérifier les tokens JWT.

### 3. Protection des Routes 

On utilise un middleware d'authentification pour proteger les routes d'une application

### 4. Importance de la Sécurisation

#### Pourquoi Sécuriser les Tokens JWT ?

* Les tokens JWT contiennent des informations sensibles qui doivent être protégées contre les accès non autorisés.
* Prévention des Attaques : En sécurisant les tokens, on réduit les risques d'attaques telles que le vol de session et l'usurpation d'identité.
* Conformité : Respecter les meilleures pratiques de sécurité est souvent une exigence légale et réglementaire.

### 5. Vérification

Afin de vérifier si tout a bien fonction une fois logger en "user" dans l'inspecteur de notre page, la partie "réseaux", le token apparait dans les cookies. En vérifiant le token, on peut voir s'il est défini pour un user ou un admin, et en essayant en croisé cela ne fonctionne pas, on obtient une erreur 401 "Access Denied".

### Conclusion

La sécurisation des tokens JWT est essentielle :

 * Grâce à des variables d'environnement pour gérer les secrets.

 * Afin de protéger vos applications contre les menaces potentielles et garantir la confidentialité des données des utilisateurs.