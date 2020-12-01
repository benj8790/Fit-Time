const Express = require("express");
const router = Express.Router();
const db = require("../database/db");



router.post("/ajouter", (req, res) => {
    db.equipement.findOne({
        where: { Salle_de_SportId: req.body.Salle_de_SportId },
    });
    db.equipement
        .create({
            Type_Equipement: req.body.Type_Equipement,
            Salle_de_SportId: req.body.Salle_de_SportId,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.equipement
        .findAll({})
        .then((equipement) => {
            if (equipement) {
                res.json({
                    equipement: equipement,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

router.get("/getById/:Salle_de_SportId", (req, res) => {

    db.equipement.findAll({
            where: { Salle_de_SportId: req.params.Salle_de_SportId },
        })
        .then(equipement => {
            res.status(200).json({ equipement: equipement })
        })
        .catch(err => {
            res.json(err);
        })
})






module.exports = router;