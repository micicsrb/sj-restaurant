const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, Jelo, Kategorija} = require("../models")

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
    naziv: Joi.string().min(3).required().label("Naziv")
})

route.get("/", async (req, res) => {
    try {
        const kategorije = await Kategorija.findAll()

        return res.json(kategorije)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const kategorija = await Kategorija.findByPk(req.params.id)

        return res.json(kategorija)
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

        const novi = await Kategorija.create(req.body)
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

        const kategorija = await Kategorija.findByPk(req.params.id)

        if (!kategorija) {
            return res.status(404).json({error: "Kategorija not found"})
        }

        kategorija.naziv = req.body.naziv

        await kategorija.save()

        return res.json(kategorija)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const kategorija = await Kategorija.findByPk(req.params.id)

        if (!kategorija) {
            return res.status(404).json({error: "Kategorija not found"})
        }

        const jelo = await Jelo.findOne({where: {kategorija_id: kategorija.id}})

        if (jelo) {
            return res.status(400).json({error: "Cannot delete kategorija with associated jelo"})
        }

        await kategorija.destroy()

        return res.json({message: `Kategorija with ID ${kategorija.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})