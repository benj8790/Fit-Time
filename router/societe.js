const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");


router.post("/new", (req, res) => {
    console.log(req.body);
    var video = req.body.video;
    var pdf = req.body.pdf;
    var image = req.body.image;

    db.formation.findOne({
            where: { nom: req.body.nom }
        })
        .then(formation => {
            if (!formation) {
                db.formation.create(req.body)
                    .then(itemformation => {
                        db.image.create({
                                image: image,
                                formationId: itemformation.id
                            })
                            .then(() => {
                                db.pdf.create({
                                        pdf: pdf,
                                        formationId: itemformation.id
                                    })
                                    .then(() => {
                                        db.video.create({
                                                video: video,
                                                formationId: itemformation.id
                                            })
                                            .then(() => {
                                                db.formation.findOne({
                                                        where: { id: itemformation.id },
                                                        include: [{
                                                                model: db.image
                                                            },
                                                            {
                                                                model: db.pdf
                                                            },
                                                            {
                                                                model: db.video
                                                            }
                                                        ]
                                                    })
                                                    .then(formation => {
                                                        res.status(200).json({ formation: formation })
                                                    })
                                                    .catch(err => {
                                                        res.status(502).json(err);
                                                    })

                                            })
                                            .catch(err => {
                                                res.status(502).json(err);
                                            })
                                    })
                                    .catch(err => {
                                        res.status(502).json(err);
                                    })
                            })
                            .catch(err => {
                                res.status(502).json(err);
                            })

                    })
                    .catch(err => {
                        res.status(502).json(err);
                    })
            } else {
                res.json("formation déja bas la base");
            }
        })
        .catch(err => {
            res.status(502).json(err);
        })

});
module.exports = router;