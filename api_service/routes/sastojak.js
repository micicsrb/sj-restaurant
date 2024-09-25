const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, Sastojak, JeloSastojak} = require("../models")

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
        const sastojci = await Sastojak.findAll()

        return res.json(sastojci)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const sastojak = await Sastojak.findByPk(req.params.id)

        return res.json(sastojak)
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

        const novi = await Sastojak.create(req.body)
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

        const sastojak = await Sastojak.findByPk(req.params.id)
        if (!sastojak) {
            return res.status(404).json({error: "Sastojak not found"})
        }

        sastojak.naziv = req.body.naziv

        await sastojak.save()
        return res.json(sastojak)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const sastojak = await Sastojak.findByPk(req.params.id)

        if (!sastojak) {
            return res.status(404).json({error: "Sastojak not found"})
        }

        const jeloSastojak = await sequelize.models.JeloSastojak.findOne({where: {sastojak_id: sastojak.id}})

        if (jeloSastojak) {
            return res.status(400).json({error: "Cannot delete sastojak with associated jelo"})
        }

        await sastojak.destroy()

        return res.json({message: `Sastojak with ID ${sastojak.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})