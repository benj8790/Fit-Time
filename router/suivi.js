const Express = require("express");
const router = Express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");



router.post("/ajouter", (req, res) => {
    db.suivi.findOne({});
    db.suivi
        .create({
            Objectif: req.body.Objectif,
            Progression: req.body.Progression,
            AdherentId: req.body.AdherentId,

        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/getById/:id", (req, res) => {
    db.suivi
        .findOne({
            where: { id: req.params.id },
            include: [{
                    model: db.adherent,
                },

            ],
        })
        .then((suivi) => {
            res.status(200).json({ suivi: suivi });
        })
        .catch((err) => {
            res.json(err);
        });
});


router.get("/FindAll", (req, res) => {
    db.suivi
        .findAll({})
        .then((suivi) => {
            if (suivi) {
                res.json({
                    suivi: suivi,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

//delete suivi
router.delete("/delete/:id", (req, res) => {
    //find the suivi and delete
    db.suivi
        .findOne({
            where: { id: req.params.id },
        })
        .then((suivi) => {
            if (suivi) {
                suivi
                    .destroy()
                    .then(() => {
                        res.json("suivi deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this suivi" +
                        "it don't exist in your list of suivi",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});




module.exports = router;