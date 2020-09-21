/* 
 * Express.js
 * est un framework pour créer des applications Web basées sur Node.js.
 * Il s'agit du cadre standard pour le développement de serveurs dans Node.js.
 */

//LE TOUT C'EST UNE API c'est une interface de programmation 

// L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les 
// fonctionnalités du module Express.
//require c'est pour aller chercher le module qu'on à installé

const express = require("express");

//bodyparser est un interlogiciel qui permet de traiter les donnée json qui sont envoyé dans notre server
const bodyparser = require("body-parser");


/* 
Le partage de ressources inter-origines 
Cross-Origin Resource Sharing
(CORS) est une spécification du W3C qui autorise les requêtes inter-domaines provenant de navigateurs compatibles.
 Si l'API que vous interrogez est compatible avec CORS, vous pourrez accéder à l'API même si elle n'est pas sur le même domaine que votre application.

 CORS sont compatibles avec: 
  -------------------
 Chrome 3+
 Firefox 3.5+
 Opera 12+
 Safari 4+
 Internet Explorer 8+

 ---------------------
 */

/* Pour utiliser CORS il faut envoyer au serveur des en-têtes de contrôle d'accès qu'il inspectera pour approuver ou non la requête.
 Ces en-têtes de contrôle d'accès décriront le contexte de la requête, sa méthode HTTP, son origine, ses en-têtes personnalisés, ... */
const cors = require("cors");



//Nous définissons ici les paramètres du serveur.
const hostname = "localhost";

/*c'est le port que vous pouvez appeler pour utiliser votre serveur en local */
const port = 3000;

//ça veut dire que app = express
const app = express();

app.use(cors());


//bodyparser vas passer en json
app.use(bodyparser.json());

//il vas encoder t'es données dans ton url
app.use(bodyparser.urlencoded({ extended: false }));


// Nous allons alors prefix pour nos itinéraires
// Nous appellerons ici tous les itinéraires dont nous avons besoin dans cette application
//ça apparait dans ton url sur ton site internet
//un prefix est mot (quelque chose) qui viens avant le nom de notre route*/

//c'est pour que ton server sache ou trouver t'es route 
app.use("/societe", require("./router/societe"));
app.use("/abonnement", require("./router/abonnement"));
app.use("/tarif", require("./router/tarif"));



// Démarrer le serveur 
// Nous disons à notre application de commencer à écouter le port et de nous renvoyer 
//le message contenant les informations sur le port 
app.listen(port, () => {
    console.log(`App écoute sur le port http://${hostname}:${port}`);
});