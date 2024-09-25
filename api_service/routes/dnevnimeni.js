const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {sequelize, DnevniMeni} = require("../models")

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
    naziv: Joi.string().min(5).required().label("Naziv"),
    opis: Joi.string().optional().label("Opis")
})

route.get("/", async (req, res) => {
    try {
        const dnevnimeniji = await DnevniMeni.findAll()

        return res.json(dnevnimeniji)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.get("/:id", async (req, res) => {
    try {
        const dnevnimeni = await DnevniMeni.findByPk(req.params.id)

        return res.json(dnevnimeni)
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

        const novi = await DnevniMeni.create(req.body)
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

        const dnevnimeni = await DnevniMeni.findByPk(req.params.id)

        if (!dnevnimeni) {
            return res.status(404).json({error: "Dnevni meni not found"})
        }

        dnevnimeni.datum = new Date()
        dnevnimeni.naziv = req.body.naziv
        dnevnimeni.opis = req.body.opis
        await dnevnimeni.save()

        return res.json(dnevnimeni)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const dnevnimeni = await DnevniMeni.findByPk(req.params.id)

        if (!dnevnimeni) {
            return res.status(404).json({error: "Dnevni meni not found"})
        }

        await dnevnimeni.destroy()

        return res.json({message: `Dnevni meni with ID ${dnevnimeni.id} has been deleted`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Greska", data: err})
    }
})