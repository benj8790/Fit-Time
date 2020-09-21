const Express = require("express");
const router = Express.Router();
const db = require("../database/db");



router.post("/ajouter", (req, res) => {
    db.abonnement.findOne({
        where: { Nom: req.body.Nom },
    });
    db.abonnement
        .create({
            Engagement: req.body.Engagement,
            Nom: req.body.Nom,
            Condition: req.body.Condition,
            Seance_Offerte: req.body.Seance_Offerte,
            TarifId: req.body.TarifId,
            RemiseId: req.body.RemiseId,
            UtilisateurId: req.body.UtilisateurId,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.abonnement
        .findAll({ include: [{ model: db.tarif }] })
        .then((abonnement) => {
            if (abonnement) {
                res.json({
                    abonnement: abonnement,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});



//delete abonnement
router.delete("/delete/:id", (req, res) => {
    //find the abonnement and delete
    db.abonnement
        .findOne({
            where: { id: req.params.id },
        })
        .then((abonnement) => {
            if (abonnement) {
                abonnement
                    .destroy()
                    .then(() => {
                        res.json("abonnement deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this abonnement" +
                        "it don't exist in your list of abonnement",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});
module.exports = router;