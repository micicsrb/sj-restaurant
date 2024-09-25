const express = require("express")
const Joi = require("joi")

const {sequelize, Jelo, Kategorija, JeloSastojak, Sastojak, StavkaNarudzbine} = require("../models")

const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({extended: true}))

module.exports = route

const schema = Joi.object({
    naziv: Joi.string().min(3).required().label("Naziv"),
    opis: Joi.string().optional().label("Opis"),
    cena: Joi.number().integer().min(0).required().label("Cena"),
    kategorija_id: Joi.number().integer().required().label("Kategorija ID"),
    sastojci: Joi.string().optional().label("Sastojci")
})

route.get("/", async (req, res) => {
    try {
        // const jela = await Jelo.findAll();
        const jela = await Jelo.findAll({
            include: {model: Kategorija, as: "kategorija"}
        })
        return res.json(jela)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const jelo = await Jelo.findByPk(req.params.id, {
            include: [{
                model: Sastojak, as: "sastojci"  // Ovo ime mora odgovarati onome što si definisao u asocijaciji
            }]
        })
        return res.json(jelo)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.post("/", async (req, res) => {
    try {
        const {error} = schema.validate(req.body, {abortEarly: false})
        if (error) {
            return res.status(400).json({error: error.details.map(err => err.message).join("\n")})
        }

        const novi = await Jelo.create(req.body)
        console.log(req.body)
        return res.json(novi)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.put("/:id", async (req, res) => {
    try {
        const {error} = schema.validate(req.body, {abortEarly: false})
        if (error) {
            console.log(req.body)
            return res.status(400).json({error: error.details.map(err => err.message).join("\n")})
        }

        const jelo = await Jelo.findByPk(req.params.id, {
            include: ["sastojci"]  // Uključujemo trenutne sastojke
        })

        jelo.naziv = req.body.naziv
        jelo.opis = req.body.opis
        jelo.cena = req.body.cena
        jelo.kategorija_id = req.body.kategorija_id
        await jelo.save()

        // Sačuvaj sastojke
        if (req.body.sastojci && req.body.sastojci.length > 0) {
            const sastojci = JSON.parse(req.body.sastojci)
            await jelo.setSastojci(sastojci)  // Ažuriraj sastojke jela
        }

        return res.json(jelo)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const jelo = await Jelo.findByPk(req.params.id, {
            include: [{model: Sastojak, as: "sastojci"}] // Include sastojci to remove associations
        })

        if (!jelo) {
            return res.status(404).json({error: "Jelo not found"})
        }

        // Remove all associated sastojci first (in JeloSastojak table)
        await jelo.setSastojci([]) // Remove all associations

        // Then destroy the jelo itself
        await jelo.destroy()

        return res.json({message: `Jelo with ID ${jelo.id} and its associations have been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})