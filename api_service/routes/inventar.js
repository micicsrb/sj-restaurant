const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, Inventar} = require("../models")

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
    naziv: Joi.string().min(5).required().label("Naziv"),
    kolicina: Joi.number().integer().min(0).required().label("Količina")
})

route.get("/", async (req, res) => {
    try {
        const inventari = await Inventar.findAll()

        return res.json(inventari)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const inventar = await Inventar.findByPk(req.params.id)

        return res.json(inventar)
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

        const novi = await Inventar.create(req.body)
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

        const inventar = await Inventar.findByPk(req.params.id)
        if (!inventar) {
            return res.status(404).json({error: "Inventar not found"})
        }

        inventar.naziv = req.body.naziv
        inventar.kolicina = req.body.kolicina

        await inventar.save()
        return res.json(inventar)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const inventar = await Inventar.findByPk(req.params.id)

        if (!inventar) {
            return res.status(404).json({error: "Inventar not found"})
        }

        await inventar.destroy()

        return res.json({message: `Inventar with ID ${inventar.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})