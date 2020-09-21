//exports table
//dbinfo fait reference à la const dbinfo dans db.js du coup ta table vas aller dans php my admin
module.exports = (dbinfo, Sequelize) => {
    //dbinfo.define ça veut dire que tu vas créer une table 
    return dbinfo.define(
        //nom de la table que je vais citer
        "Affecter", {

            Nombre: {

                type: Sequelize.DataTypes.INTEGER(2),
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },

        }, { //ça veut dire que des que tu crée un élément ça te dit la date sa
            // te fait un historique de t'es modif
            timestamp: true,
            //sa te permet de récuperer la clef étrangére des autre avec le om et l'id sans _ - ect..
            underscored: true
        }

    )
}