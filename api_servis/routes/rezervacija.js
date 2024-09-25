const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, Rezervacija} = require("../models")

const route = express.Router()

function authToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.status(401).json({msg: "Token not found!"})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({msg: err})
        }
        console.log(user)
        req.user = user
        next()
    })
}

route.use(express.json())
route.use(express.urlencoded({extended: true}))
route.use(authToken)

module.exports = route

const schema = Joi.object({
    datum: Joi.date().required().label("Datum"),
    vreme: Joi.string().required().label("Vreme"),
    broj_osoba: Joi.number().integer().min(1).required().label("Broj Osoba"),
    ime_rezervacije: Joi.string().required().label("Ime Rezervacije")
})

route.get("/", async (req, res) => {
    try {
        const rezervacije = await Rezervacija.findAll()

        return res.json(rezervacije)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const rezervacija = await Rezervacija.findByPk(req.params.id)

        return res.json(rezervacija)
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

        const novi = await Rezervacija.create(req.body)
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
            return res.status(400).json({error: error.details.map(err => err.message).join("\n")})
        }

        const rezervacija = await Rezervacija.findByPk(req.params.id)
        if (!rezervacija) {
            return res.status(404).json({error: "Rezervacija not found"})
        }

        rezervacija.datum = req.body.datum
        rezervacija.vreme = req.body.vreme
        rezervacija.broj_osoba = req.body.broj_osoba
        rezervacija.ime_rezervacije = req.body.ime_rezervacije

        await rezervacija.save()
        return res.json(rezervacija)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const rezervacija = await Rezervacija.findByPk(req.params.id)

        if (!rezervacija) {
            return res.status(404).json({error: "Rezervacija not found"})
        }

        await rezervacija.destroy()

        return res.json({message: `Rezervacija with ID ${rezervacija.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})