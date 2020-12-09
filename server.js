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
const fileUpload = require('express-fileupload');




//Nous définissons ici les paramètres du serveur.
const hostname = "localhost";

/*c'est le port que vous pouvez appeler pour utiliser votre serveur en local */
const port = 3000;

//ça veut dire que app = express
const app = express();




app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());

app.use(cors());


//bodyparser vas passer en json
app.use(bodyparser.json());

//il vas encoder t'es données dans ton url
app.use(bodyparser.urlencoded({ extended: false }));


app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function(err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
})


// Nous allons alors prefix pour nos itinéraires
// Nous appellerons ici tous les itinéraires dont nous avons besoin dans cette application
//ça apparait dans ton url sur ton site internet
//un prefix est mot (quelque chose) qui viens avant le nom de notre route*/

//c'est pour que ton server sache ou trouver t'es route 
app.use("/abonnement", require("./router/abonnement"));
app.use("/tarif", require("./router/tarif"));
app.use("/salle_de_sport", require("./router/salle_de_sport"));
app.use("/equipement", require("./router/equipement"));
app.use("/annonce", require("./router/annonce"));
app.use("/adherent", require("./router/adherent"));
app.use("/coach", require("./router/coach"));
app.use("/suivi", require("./router/suivi"));
app.use("/programme", require("./router/programme"));



// Démarrer le serveur 
// Nous disons à notre application de commencer à écouter le port et de nous renvoyer 
//le message contenant les informations sur le port 
app.listen(port, () => {
    console.log(`App écoute sur le port http://${hostname}:${port}`);
});