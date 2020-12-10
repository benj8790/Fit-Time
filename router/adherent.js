var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../database/db");

const nodemailer = require("nodemailer");

process.env.SECRET_KEY = "secret";
console.log(process.env.SECRET_KEY);

router.post("/register", (req, res) => {
    var randtoken = require("rand-token").generator({ chars: "0-9" });
    var Identifiant = randtoken.generate(8);

    var randtoken = require("rand-token");
    var password = randtoken.generate(16);

    const infobase = {
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Password: password,
        Identifiant: identifiant,
        Ville: req.body.Ville,
        Cp: req.body.Cp,
        Adresse: req.body.Adresse,
        Image: req.body.Image,
        Civilite: req.body.Civilite,
        Date_Naissance: req.body.Date_Naissance,
        Tel: req.body.Tel,
        coachId: req.body.coachId,
    };
    db.adherent
        .findOne({
            where: { Email: req.body.Email },
        })
        .then((adherent) => {
            if (!adherent) {
                const hash = bcrypt.hashSync(infobase.Password, 10);
                infobase.Password = hash;
                db.adherent
                    .create(infobase)
                    .then((adherent) => {
                        const nodemailer = require("nodemailer");

                        var transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: "587",
                            auth: {
                                user: "lorillonbenjamin8@gmail.com",
                                pass: "digitalfrance7",
                            },
                            secureConnection: "false",
                            tls: {
                                ciphers: "SSLv3",
                                rejectUnauthorized: false,
                            },
                        });

                        var mailOptions = {
                            from: "lorillonbenjamin8@gmail.com",
                            to: infobase.Email,
                            subject: "Fit-Time",
                            html: "identifiant: " + identifiant + " password: " + password,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);

                                return res.json(error);
                            } else {
                                console.log("email sent" + info.response);
                                let token = jwt.sign(
                                    adherent.dataValues,
                                    process.env.SECRET_KEY, {
                                        expiresIn: 1440,
                                    }
                                );
                                return res.json({ token: token, emailsent: info.response });
                            }
                        });
                    })
                    .catch((err) => {
                        res.send("error " + err);
                    });
            } else {
                res.json({
                    error: " client already exists",
                });
            }
        })
        .catch((err) => {
            res.json({
                error: "error" + err,
            });
        });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    db.adherent
        .findOne({
            where: { Identifiant: req.body.identifiant },
        })
        .then((adherent) => {
            if (adherent) {
                if (bcrypt.compareSync(req.body.Password, adherent.Password)) {
                    let token = jwt.sign(adherent.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440,
                    });
                    res.status(200).json({ token: token });
                } else {
                    res.status(520).json("erreur d'identifiant ou de password");
                }
            } else {
                return res.status(520).json("adherent not found");
            }
        })
        .catch((err) => {
            res.json("test error" + err);
        });
});

router.put("/update/:Id", (req, res) => {
    console.log(req.body);
    var id = req.params.Id;
    var adhe = {
        Password: req.body.Password,
        Email: req.body.Email,
        Adresse: req.body.Adresse,
        Cp: req.body.Cp,
        Ville: req.body.Ville,
        Tel: req.body.Tel,
        Image: req.body.Image,
    };

    db.adherent
        .findOne({
            where: { Id: id },
        })
        .then((adherent) => {
            if (adherent) {
                Password = bcrypt.hashSync(adhe.Password, 10);
                adhe.Password = Password;
                adherent
                    .update(adhe)
                    .then((adherentitem) => {
                        db.adherent
                            .findOne({
                                where: { Id: id },
                            })
                            .then((adherent) => {
                                let token = jwt.sign(
                                    adherent.dataValues,
                                    process.env.SECRET_KEY, {
                                        expiresIn: 1440,
                                    }
                                );
                                res.status(200).json({ token: token });
                            })
                            .catch((err) => {
                                res.status(402).send(err + "bad request");
                            });
                    })
                    .catch((err) => {
                        res
                            .status(402)
                            .send("impossible de mettre à jour l'adherent" + err);
                    });
            } else {
                res.json("l'adherent n'est pas dans la base");
            }
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/getById/:id", (req, res) => {
    db.adherent
        .findAll({
            where: { id: req.params.id },
            include: [{
                    model: db.coach,
                },
                {
                    model: db.suivi,
                },
                {
                    model: db.programme,
                },
            ],
        })
        .then((adherent) => {
            res.status(200).json({ adherent: adherent });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;