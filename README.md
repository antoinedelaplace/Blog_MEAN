Projet MEAN de l'ETNA
Groupe : LEJMAN Romain, Houvet Benoit-xavier, DELAPLACE Antoine


Prérequis du projet :

nodeJS v5
mongoDB
>npm install (à la racine du projet)

Pour pouvoir lancer le projet :
> mongod
> npm run webpack
> npm start
> node api/server.js


Architecture du projet :

- api # concerne l'api géré par ExpressJS
- app # concerne le front géré par AngularJS
- build # contient les fichiers compilés par le transcodeur
- webpack.config.js # fichier de configuration pour la compilation
- package.json # fichier de configuration du serveur node