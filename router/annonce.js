const Express = require("express");
const router = Express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");



router.post("/ajouter", (req, res) => {
    db.annonce.findOne({});
    db.annonce
        .create({
            Ville: req.body.Ville,
            Horaire: req.body.Horaire,
            disponibilite: req.body.disponibilite,
            Vos_Attente: req.body.Vos_Attente,
            Email: req.body.Email,
            adherent_id: req.body.adherent_id,
        })
        .then((rep) => {
            res.json({ message: "ok", rep });
        })
        .catch((err) => {
            res.json({ error: "error" + err });
        });
});

router.get("/FindAll", (req, res) => {
    db.annonce
        .findAll({
            include: [{
                model: db.adherent,
            }, ],

        })
        .then((annonce) => {
            if (annonce) {
                res.json({
                    annonce: annonce,
                });
            } else {
                res.json({ error: "404 not found" });
            }
        })
        .catch((err) => {
            res.json("error" + err);
        });
});

router.get("/FindLimit", (req, res) => {
    db.annonce
        .findAll({
            order: [
                [
                    ['createdAt', 'desc'],
                ]
            ],


            include: [{
                model: db.adherent,
            }, ],

        })
        .then((annonce) => {
            if (annonce) {
                res.json({
                    annonce: annonce,
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

    db.annonce.findAll({
            where: { id: req.params.id },
            include: [{ model: db.adherent }],
        })
        .then(annonce => {
            res.status(200).json({ annonce: annonce })
        })
        .catch(err => {
            res.json(err);
        })
})

router.get("/findBylike/:ville", (req, res) => {
    db.annonce.findAll({
            where: {
                ville: {
                    [Op.like]: '%' + req.params.ville + '%'
                }
            },
        })
        .then(annonce => {
            res.status(200).json({ annonce: annonce })
        })
        .catch(err => {
            res.json(err);
        })
});

//delete annonce
router.delete("/delete/:id", (req, res) => {
    //find the annonce and delete
    db.annonce
        .findOne({
            where: { id: req.params.id },
        })
        .then((annonce) => {
            if (annonce) {
                annonce
                    .destroy()
                    .then(() => {
                        res.json("annonce deleted");
                    })
                    .catch((err) => {
                        res.json("error" + err);
                    });
            } else {
                res.json({
                    error: "you can't delete this annonce" +
                        "it don't exist in your list of annonce",
                });
            }
        })
        //send back the message error
        .catch((err) => {
            res.json("error" + err);
        });
});




module.exports = router;