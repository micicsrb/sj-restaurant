const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, Zaposleni} = require("../models")

const route = express.Router()

function adminAuth(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.status(401).json({msg: "Token not found!"})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({msg: err})
        }
        if (!user.isAdmin) {
            return res.status(403).json({msg: "You are not an admin!"})
        }
        req.user = user
        next()
    })
}

route.use(express.json())
route.use(express.urlencoded({extended: true}))
route.use(adminAuth)

module.exports = route

const schema = Joi.object({
    ime: Joi.string().min(3).required().label("Ime"),
    prezime: Joi.string().min(3).required().label("Prezime"),
    pozicija: Joi.string().required().label("Pozicija"),
    datum_zaposlenja: Joi.date().required().label("Datum Zaposlenja"),
    plata: Joi.number().precision(2).required().label("Plata")
})

route.get("/", async (req, res) => {
    try {
        const svizaposleni = await Zaposleni.findAll()

        return res.json(svizaposleni)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const zaposleni = await Zaposleni.findByPk(req.params.id)

        return res.json(zaposleni)
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

        const novi = await Zaposleni.create(req.body)
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

        const zaposleni = await Zaposleni.findByPk(req.params.id)

        if (!zaposleni) {
            return res.status(404).json({error: "Zaposleni not found"})
        }

        zaposleni.ime = req.body.ime
        zaposleni.prezime = req.body.prezime
        zaposleni.pozicija = req.body.pozicija
        zaposleni.plata = req.body.plata
        await zaposleni.save()

        return res.json(zaposleni)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const zaposleni = await Zaposleni.findByPk(req.params.id)

        if (!zaposleni) {
            return res.status(404).json({error: "Zaposleni not found"})
        }

        await zaposleni.destroy()

        return res.json({message: `Zaposleni with ID ${zaposleni.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})