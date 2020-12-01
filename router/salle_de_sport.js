const Express = require("express");
const router = Express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");



router.post("/ajouter", (req, res) => {
    db.salle_de_sport.findOne({
        where: { Nom: req.body.Nom },
    });
    db.salle_de_sport
        .create({
            Num_Siret: req.body.Num_Siret,
            Num_Siren: req.body.Num_Siren,
            Nom: req.body.Nom,
            Adresse: req.body.Adresse,
            Cp: req.body.Cp,
            Ville: req.body.Ville,
            Tel: req.body.Tel,
            Email: req.body.Email,
            Img: req.body.Img,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.salle_de_sport
        .findAll({ include: [{ model: db.equipement }] })
        .then((salle_de_sport) => {
            if (salle_de_sport) {
                res.json({
                    salle_de_sport: salle_de_sport,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

router.get("/getById/:id", (req, res) => {

    db.salle_de_sport.findAll({
            where: { id: req.params.id },
            include: [{ model: db.equipement }],
        })
        .then(salle_de_sport => {
            res.status(200).json({ salle_de_sport: salle_de_sport })
        })
        .catch(err => {
            res.json(err);
        })
})



router.get("/findBylike/:ville", (req, res) => {
    db.salle_de_sport.findAll({
            where: {
                ville: {
                    [Op.like]: '%' + req.params.ville + '%'
                }
            },
        })
        .then(salle_de_sport => {
            res.status(200).json({ salle_de_sport: salle_de_sport })
        })
        .catch(err => {
            res.json(err);
        })
});


//delete salle_de_sport
router.delete("/delete/:id", (req, res) => {
    //find the salle_de_sport and delete
    db.salle_de_sport
        .findOne({
            where: { id: req.params.id },
        })
        .then((salle_de_sport) => {
            if (salle_de_sport) {
                salle_de_sport
                    .destroy()
                    .then(() => {
                        res.json("salle_de_sport deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this salle_de_sport" +
                        "it don't exist in your list of salle_de_sport",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});




module.exports = router;