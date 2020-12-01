const Express = require("express");
const router = Express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");



router.post("/ajouter", (req, res) => {
    db.coach.findOne({});
    db.coach
        .create({
            Nom: req.body.Nom,
            Prenom: req.body.Prenom,
            Adresse: req.body.Adresse,
            Cp: req.body.Cp,
            Tel: req.body.Tel,
            Age: req.body.Age,
            Anciennete: req.body.Anciennete,
            Qualification: req.body.Qualification,
            Poste: req.body.Poste,
            Ville: req.body.Ville,
            Email: req.body.Email,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.coach
        .findAll({})
        .then((coach) => {
            if (coach) {
                res.json({
                    coach: coach,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

//delete coach
router.delete("/delete/:id", (req, res) => {
    //find the coach and delete
    db.coach
        .findOne({
            where: { id: req.params.id },
        })
        .then((coach) => {
            if (coach) {
                coach
                    .destroy()
                    .then(() => {
                        res.json("coach deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this coach" +
                        "it don't exist in your list of coach",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});




module.exports = router;