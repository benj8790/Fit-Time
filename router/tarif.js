const Express = require("express");
const router = Express.Router();
const db = require("../database/db");



router.post("/ajouter", (req, res) => {
    db.tarif.findOne({
        where: { Nom: req.body.Nom },
    });
    db.tarif
        .create({
            Tarif_de_Base: req.body.Tarif_de_Base,
            Tarif_Libre_Acces: req.body.Tarif_Libre_Acces,
            Date: req.body.Date,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.tarif
        .findAll({})
        .then((tarif) => {
            if (tarif) {
                res.json({
                    tarif: tarif,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

module.exports = router;