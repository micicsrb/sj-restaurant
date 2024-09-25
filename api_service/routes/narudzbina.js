const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const {sequelize, Jelo, Narudzbina, StavkaNarudzbine, User} = require("../models")

const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({extended: true}))

module.exports = route

const schema = Joi.object({
    vreme_narucivanja: Joi.date().optional().label("Vreme Narucivanja"),
    zakazano_vreme: Joi.date().required().label("Zakazano Vreme"),
    status: Joi.string().optional().label("Status"),
    adresa: Joi.string().required().label("Adresa"),
    telefon: Joi.string().required().label("Telefon"),
    ime_prezime: Joi.string().required().label("Ime Prezime"),
    stavke: Joi.array().items(Joi.object({
        jelo_id: Joi.number().integer().required().label("Jelo ID"),
        komada: Joi.number().integer().min(1).required().label("Komada"),
        jedinicna_cena: Joi.number().integer().min(0).required().label("Jedinicna Cena")
    })).required().label("Stavke")
})

route.get("/", async (req, res) => {
    try {
        const narudzbine = await Narudzbina.findAll({
            include: [{
                model: StavkaNarudzbine, as: "stavke", include: [{
                    model: Jelo, as: "jelo"
                }]
            }]
        })

        const result = narudzbine.map(narudzbina => {
            const cena = narudzbina.stavke.reduce((total, stavka) => {
                return total + (stavka.jedinicna_cena * stavka.komada)
            }, 0)

            const sadrzaj = narudzbina.stavke.map(stavka => {
                return `${stavka.jelo.naziv} x${stavka.komada}`
            }).join(", ")

            return {
                id: narudzbina.id,
                zakazano_vreme: narudzbina.zakazano_vreme,
                status: narudzbina.status,
                cena: cena,
                adresa: narudzbina.adresa,
                sadrzaj: sadrzaj
            }
        })

        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id, {
            include: [{
                model: StavkaNarudzbine, as: "stavke", include: [{
                    model: Jelo, as: "jelo"
                }]
            }]
        })

        if (!narudzbina) {
            return res.status(404).json({error: "Narudzbina not found"})
        }

        const cena = narudzbina.stavke.reduce((total, stavka) => {
            return total + (stavka.jedinicna_cena * stavka.komada)
        }, 0)

        const sadrzaj = narudzbina.stavke.map(stavka => {
            return `${stavka.jelo.naziv} x${stavka.komada}`
        }).join(", ")

        const result = {
            zakazano_vreme: narudzbina.zakazano_vreme,
            vreme_narucivanja: narudzbina.vreme_narucivanja,
            ime_prezime: narudzbina.ime_prezime,
            sadrzaj: sadrzaj,
            adresa: narudzbina.adresa,
            cena: cena,
            telefon: narudzbina.telefon,
            status: narudzbina.status
        }

        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/user/:username", async (req, res) => {
    try {
        const user = await User.findOne({where: {username: req.params.username}})

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const narudzbine = await Narudzbina.findAll({
            where: {user_id: user.id}, include: [{
                model: StavkaNarudzbine, as: "stavke", include: {
                    model: Jelo, as: "jelo"
                }
            }]
        })

        const result = narudzbine.map(narudzbina => {
            const sadrzaj = narudzbina.stavke.map(stavka => {
                return `${stavka.jelo.naziv} x${stavka.komada}`
            }).join(", ")

            return {
                id: narudzbina.id,
                vreme_narucivanja: narudzbina.vreme_narucivanja,
                zakazano_vreme: narudzbina.zakazano_vreme,
                status: narudzbina.status,
                adresa: narudzbina.adresa,
                telefon: narudzbina.telefon,
                ime_prezime: narudzbina.ime_prezime,
                sadrzaj: sadrzaj,
                cena: narudzbina.stavke.reduce((total, stavka) => total + (stavka.komada * stavka.jedinicna_cena), 0)
            }
        })

        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

route.post("/", async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const {error} = schema.validate(req.body, {abortEarly: false})
        if (error) {
            console.log(error)
            console.log(req.body)
            return res.status(400).json({error: error.details.map(err => err.message).join("\n")})
        }

        const {stavke, ...narudzbinaData} = req.body
        narudzbinaData.status = "New"
        narudzbinaData.vreme_narucivanja = new Date()

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];

        const decoded = decodeJWT(token);

        if (!decoded || !decoded.user) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const username = decoded.user;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        narudzbinaData.user_id = user.id;
        console.log("ID JE" + user.id)

        // Create the Narudzbina object
        const narudzbina = await Narudzbina.create(narudzbinaData, {transaction})

        // Create the associated StavkaNarudzbine records
        for (const stavka of stavke) {
            await StavkaNarudzbine.create({
                narudzbina_id: narudzbina.id,
                jelo_id: stavka.jelo_id,
                komada: stavka.komada,
                jedinicna_cena: stavka.jedinicna_cena
            }, {transaction})
        }

        await transaction.commit()
        return res.json(narudzbina)
    } catch (err) {
        await transaction.rollback()
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

const statusSchema = Joi.object({
    status: Joi.string().required().label("Status")
})

route.put("/:id", async (req, res) => {
    try {
        const {error} = statusSchema.validate(req.body, {abortEarly: false})
        if (error) {
            console.log(error)
            return res.status(400).json({error: error.details.map(err => err.message).join("\n")})
        }

        const narudzbina = await Narudzbina.findByPk(req.params.id)

        if (!narudzbina) {
            return res.status(404).json({error: "Narudzbina not found"})
        }

        narudzbina.status = req.body.status

        await narudzbina.save()

        return res.json(narudzbina)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const narudzbina = await Narudzbina.findByPk(req.params.id, {
            include: [{
                model: StavkaNarudzbine, as: "stavke"
            }]
        })

        if (!narudzbina) {
            return res.status(404).json({error: "Narudzbina not found"})
        }

        // Delete all associated StavkaNarudzbine records
        await StavkaNarudzbine.destroy({
            where: {narudzbina_id: narudzbina.id}
        })

        // Delete the Narudzbina object
        await narudzbina.destroy()

        return res.json({message: `Narudzbina with ID ${narudzbina.id} and its associations have been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})