//exports table
//dbinfo fait reference à la const dbinfo dans db.js du coup ta table vas aller dans php my admin
module.exports = (dbinfo, Sequelize) => {
    //dbinfo.define ça veut dire que tu vas créer une table 
    return dbinfo.define(
        //nom de la table que je vais citer
        "Salle_de_Sport", {
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
            Num_Siret: {
                //INTEGER c'est comme INT
                type: Sequelize.DataTypes.INTEGER,
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Num_Siren: {
                //INTEGER c'est comme INT
                type: Sequelize.DataTypes.INTEGER,
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Nom: {
                //STRING c'est comme varchar
                type: Sequelize.DataTypes.STRING(45),
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Adresse: {

                type: Sequelize.DataTypes.TEXT,
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Cp: {
                //INTEGER c'est comme INT
                type: Sequelize.DataTypes.INTEGER(5),
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Ville: {
                //STRING c'est comme varchar
                type: Sequelize.DataTypes.STRING(45),
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Tel: {
                //STRING c'est comme varchar
                type: Sequelize.DataTypes.STRING(10),
                //ça veut dire qu'on l'autorise pas à être null
                allowNull: false
            },
            Email: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },

        }, { //ça veut dire que des que tu crée un élément ça te dit la date sa
            // te fait un historique de t'es modif
            timestamp: true,
            //sa te permet de récuperer la clef étrangére des autre avec le om et l'id sans _ - ect..
            underscored: true
        }

    )
}