//exports table
//dbinfo fait reference à la const dbinfo dans db.js du coup ta table vas aller dans php my admin
module.exports = (dbinfo, Sequelize) => {
    //dbinfo.define ça veut dire que tu vas créer une table 
    return dbinfo.define(
        //nom de la table que je vais citer
        "Planning", {
            //field name
            Id: {
                //set data type, INNTEGER c'est int le truc dans le MPD
                //datatype fait reference à l'objet sequelize 
                type: Sequelize.DataTypes.INTEGER,
                //set primerkey
                primaryKey: true,
                //autoIncrement can be used to create auto_incrementing integer columns
                //true c'est comme cocher la case false est mis par défauds
                autoIncrement: true,
            },
            Disponibilite: {

                type: Sequelize.DataTypes.BOOLEAN,
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Date: {

                type: Sequelize.DataTypes.DATE,
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