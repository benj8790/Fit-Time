// Sequelize est un ORM
// ORM : Un mapping objet-relationnel 
// est un type de programme informatique qui se place en interface 
//entre un programme applicatif et une base de données relationnelle 
//pour simuler une base de données orientée objet.
const Sequelize = require("sequelize");

//fin de require



//début: connexion à la database

const db = {};


/* new Sequelize({database},{username},{password},options{
 *     host:{hostname},
 *     dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' , The dialect of the database you are connecting to. One of mysql, postgres, sqlite and mssql.
 *     port: if you don't have change you mysql default port it will 3306, or if you change make sure to use you port ,
 *     operatorsAliases: {false},
 *     pool: { sequelize connection pool configuration
 *         max: { 5 numbre of max conn in you database}, Maximum number of connection in pool default: 5
 *         min: {0 } Minimum number of connection in pool,default: 0,
 *         acquire: {30000 } The maximum time, in milliseconds, that pool will try to get connection before throwing error, default 60000,
 *         idle: { 10000 } The maximum time, in milliseconds, that a connection can be idle before being released.
 *     } */

/* on reli le server et la base de donées  
le "Fit-Time" c'est le nom de la base de données 
"root" c'est le nom d'utilisateur
et "" c'est le password y'en à pas sur window 
c'est pour ce connecter à la base de données mysql
de new à pool c'est une instance*/
const dbinfo = new Sequelize("fittime", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
    pool: {
        max: 5,
        min: 0,
    }
});



/* le code veut dire si ta réussi à t'identifier tu me mets "Connection à la base de données avec succès." sinon
 t'attrape l'erreur (le type d'erreur)et tu me met un message */

dbinfo.authenticate()
    .then(() => {
        console.log("Connection à la base de données avec succès.")
    })
    .catch((err) => {
        console.error("vous n'êtes pas connecté à la base de données:", err);
    });

//models/tables

/*
 * Nécessite chaque table dans la base de données
 * On en a besoin dans ce fichier pour faire des associations
 */
db.societe = require('../models/Societe')(dbinfo, Sequelize);
db.abonnement = require('../models/Abonnement')(dbinfo, Sequelize);
db.adherent = require('../models/Adherent')(dbinfo, Sequelize);
db.affecter = require('../models/Affecter')(dbinfo, Sequelize);
db.annonce = require('../models/Annonce')(dbinfo, Sequelize);
db.avis = require('../models/Avis')(dbinfo, Sequelize);
db.borne = require('../models/Borne')(dbinfo, Sequelize);
db.coach_categorie = require('../models/Coach_categorie')(dbinfo, Sequelize);
db.coach_sous_categorie = require('../models/Coach_sous_categorie')(dbinfo, Sequelize);
db.coach = require('../models/Coach')(dbinfo, Sequelize);
db.commande_coach = require('../models/Commande_coach')(dbinfo, Sequelize);
db.cours_collectif = require('../models/Cours_collectif')(dbinfo, Sequelize);
db.cours_en_ligne = require('../models/Cours_en_ligne')(dbinfo, Sequelize);
db.dependre = require('../models/Dependre')(dbinfo, Sequelize);
db.enregistrer = require('../models/Enregistrer')(dbinfo, Sequelize);
db.equipement = require('../models/Equipement')(dbinfo, Sequelize);
db.facture = require('../models/Facture')(dbinfo, Sequelize);
db.formule_essaie = require('../models/Formule_essaie')(dbinfo, Sequelize);
db.inscription = require('../models/Inscription')(dbinfo, Sequelize);
db.paiement = require('../models/Paiement')(dbinfo, Sequelize);
db.planning = require('../models/Planning')(dbinfo, Sequelize);
db.programme = require('../models/Programme')(dbinfo, Sequelize);
db.programer = require('../models/Programmer')(dbinfo, Sequelize);
db.remise = require('../models/Remise')(dbinfo, Sequelize);
db.reponse = require('../models/Reponse')(dbinfo, Sequelize);
db.salle_de_sport = require('../models/Salle_de_Sport')(dbinfo, Sequelize);
db.statistique = require('../models/Statistique')(dbinfo, Sequelize);
db.suivi = require('../models/Suivi')(dbinfo, Sequelize);
db.tarif = require('../models/Tarif')(dbinfo, Sequelize);
db.type_de_paiement = require('../models/Type_de_paiement')(dbinfo, Sequelize);
db.utilisateur = require('../models/Utilisateur')(dbinfo, Sequelize);




/*
 * Les quatre types d’associations disponibles en Sequelize
 * BelongsTo     : les associations sont des associations où la clé étrangère pour la relation 1-à-1 existe sur le modèle source.(il envoie la clés étrangere)
 * HasOne        : Les associations sont des associations où la clé étrangère pour la relation 1-à-1 existe sur le modèle cible.(lui la reçois)
 * HasMany       : les associations connectent une source avec plusieurs cibles. Cependant, les cibles sont à nouveau connectées à une source spécifique.
 * BelongsToMany : les associations sont utilisées pour connecter des sources avec plusieurs cibles. En outre, les cibles peuvent également avoir des connexions vers plusieurs sources.
 */


//relation d'Avis 1 N
db.cours_collectif.hasMany(db.avis, { foreignKey: 'Cours_CollectifId' });
db.cours_en_ligne.hasMany(db.avis, { foreignKey: 'Cours_en_LigneId' });
db.salle_de_sport.hasMany(db.avis, { foreignKey: 'Salle_de_SportId' });
db.adherent.hasMany(db.avis, { foreignKey: 'AdherentId' });

//relation Coach 1 N
db.salle_de_sport.hasMany(db.coach, { foreignKey: 'Salle_de_SportId' });

//relation commande_coach 1 N
db.adherent.hasMany(db.commande_coach, { foreignKey: 'AdherentId' });
db.coach.hasMany(db.commande_coach, { foreignKey: 'CoachId' });

//relation Borne 1 N
db.salle_de_sport.hasMany(db.borne, { foreignKey: 'Salle_de_SportId' });

//relation Statistique 1 N
db.borne.hasMany(db.statistique, { foreignKey: 'BorneId' });

//relation Salle de sport 1 N
db.societe.hasMany(db.salle_de_sport, { foreignKey: 'SocieteId' });

//relation Formule Essaie 1 N
db.utilisateur.hasMany(db.formule_essaie, { foreignKey: 'UtilisateurId' });

//relation Equipement 1 N
db.salle_de_sport.hasMany(db.equipement, { foreignKey: 'Salle_de_SportId' });

//relation Type de Paiment 1 N
db.paiement.hasMany(db.type_de_paiement, { foreignKey: 'PaiementId' });

//relation Paiment 1 N
db.abonnement.hasMany(db.paiement, { foreignKey: 'AbonnementId' });

//relation Abonnement 1 N
db.remise.hasMany(db.abonnement, { foreignKey: 'RemiseId' });

//relation cours collectif 1 N
db.coach.hasMany(db.cours_collectif, { foreignKey: 'coachId' });

//relation cours ligne 1 N
db.coach.hasMany(db.cours_en_ligne, { foreignKey: 'coachId' });

//relation Adherent 1 N
db.coach.hasMany(db.adherent, { foreignKey: 'CoachId' });
db.abonnement.hasMany(db.adherent, { foreignKey: 'AbonnementId' });

//relation Reponse 1 N
db.adherent.hasMany(db.reponse, { foreignKey: 'AdherentId' });
db.annonce.hasMany(db.reponse, { foreignKey: 'AnnonceId' });


//////////////////////////////////////////////////////////////////////////////

//relation Suivi 1 1
db.suivi.hasOne(db.programme, { foreignkey: "SuiviId" })
db.adherent.hasOne(db.suivi, { foreignkey: "AdherentId" })

//relation programme 1 1
db.planning.hasOne(db.programme, { foreignkey: "PlanningId" })
db.adherent.hasOne(db.programme, { foreignkey: "AdherentId" })

//relation Salle de sport 1 1
db.planning.hasOne(db.salle_de_sport, { foreignkey: "PlanningId" })

//relation Facture 1 1
db.paiement.hasOne(db.facture, { foreignkey: "PaiementId" })

//relation Abonnement 1 1
db.utilisateur.hasOne(db.abonnement, { foreignkey: "UtilisateurId" })
db.abonnement.hasOne(db.tarif, { foreignkey: "AbonnementId" })

//relation Adherent 1 1
db.inscription.hasOne(db.adherent, { foreignkey: "InscriptionId" })


/////////////////////////////////////////////////////////////////////////////////////

//toutes les relations avec table intermediaire
db.coach_categorie.belongsToMany(db.coach_sous_categorie, { through: 'Disposer', foreignKey: "Coach_CategorieId" });
db.coach_sous_categorie.belongsToMany(db.coach_categorie, { through: 'Disposer', foreignKey: "coach_sous_categorieId" });

db.coach.belongsToMany(db.coach_sous_categorie, { through: 'Appartenir', foreignKey: "CoachId" });
db.coach_sous_categorie.belongsToMany(db.coach, { through: 'Appartenir', foreignKey: "coach_sous_categorieId" });

db.cours_collectif.belongsToMany(db.inscription, { through: 'Enregistrer', foreignKey: "Cours_CollectifId" });
db.inscription.belongsToMany(db.cours_collectif, { through: 'Enregistrer', foreignKey: "InscriptionId" });

db.borne.belongsToMany(db.adherent, { through: 'Dependre', foreignKey: "BorneId" });
db.adherent.belongsToMany(db.borne, { through: 'Dependre', foreignKey: "AdherentId" });

db.abonnement.belongsToMany(db.statistique, { through: 'Concerner', foreignKey: "AbonnementId" });
db.statistique.belongsToMany(db.abonnement, { through: 'Concerner', foreignKey: "StatistiqueId" });

db.salle_de_sport.belongsToMany(db.formule_essaie, { through: 'Etre', foreignKey: "Salle_de_SportId" });
db.formule_essaie.belongsToMany(db.salle_de_sport, { through: 'Etre', foreignKey: "Formule_EssaieId" });

db.salle_de_sport.belongsToMany(db.abonnement, { through: 'Attribuer', foreignKey: "Salle_de_SportId" });
db.abonnement.belongsToMany(db.salle_de_sport, { through: 'Attribuer', foreignKey: "AbonnementId" });

db.formule_essaie.belongsToMany(db.planning, { through: 'Programmer', foreignKey: "Formule_EssaieId" });
db.planning.belongsToMany(db.formule_essaie, { through: 'Programmer', foreignKey: "PlanningId" });

db.adherent.belongsToMany(db.annonce, { through: 'Publier', foreignKey: "AdherentId" });
db.annonce.belongsToMany(db.adherent, { through: 'Publier', foreignKey: "AnnonceId" });

db.cours_en_ligne.belongsToMany(db.inscription, { through: 'Affecter', foreignKey: "Cours_en_LigneId" });
db.inscription.belongsToMany(db.cours_en_ligne, { through: 'Affecter', foreignKey: "InscriptionId" });


// Fait reference à l'instance de la base de données
db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

/* * Synchronisez tous les modèles définis dans la base de données.
 * similaire pour la synchronisation: vous pouvez définir ceci pour tjrs forcer  la synchronisation pour les modèles
 */
/* Cette ligne de code faut la supprimer ou la mettre en commentaire une fois que toute les 
  tables (MCD) sont crées sinon il peut synchroniser tes tables et ça efface toute les données à l'interieur */



//dbinfo.sync({ force: true });




/*  //
 * Le module.exports ou exports est un objet spécial qui est inclus dans chaque fichier JS de l'application Node.js par défaut.
 * module est une variable qui représente le module actuel et les exports est un objet qui sera exposé en tant que module.
 * Ainsi, tout ce que vous attribuez à module.exports ou exports sera exposé en tant que module.
 */
//c'est pour l'utiliser dans les autre fichier 

module.exports = db;