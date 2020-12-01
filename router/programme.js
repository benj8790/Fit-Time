const Express = require("express");
const router = Express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");



router.post("/ajouter", (req, res) => {
    console.log(req.body)


    db.programme
        .create({
            Jour: req.body.Jour,
            Exercice: req.body.Exercice,
            Serie: req.body.Serie,
            Repetition: req.body.Repetition,
            Charge: req.body.Charge,
            Temps_Recup: req.body.Temps_Recup,
            AdherentId: req.body.AdherentId,

        })

    .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.programme
        .findAll({})
        .then((programme) => {
            if (programme) {
                res.json({
                    programme: programme,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

//delete programme
router.delete("/delete/:id", (req, res) => {
    //find the programme and delete
    db.programme
        .findOne({
            where: { id: req.params.id },
        })
        .then((programme) => {
            if (programme) {
                programme
                    .destroy()
                    .then(() => {
                        res.json("programme deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this programme" +
                        "it don't exist in your list of programme",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});




module.exports = router;