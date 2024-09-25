require('dotenv').config();

const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")
const BP = require("body-parser")
const Joi = require("joi")
const fs = require("fs")

const app = express()

app.use(express.json())

function getCookies(req) {
    if (req.headers.cookie == null) return {}

    const rawCookies = req.headers.cookie.split("; ")
    const parsedCookies = {}

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split("=")
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
    })

    return parsedCookies
}

function authToken(req, res, next) {
    const cookies = getCookies(req)
    const token = cookies["token"]
    console.log(token)
    if (token == null) return res.redirect(301, "/login")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.redirect(301, "/login")
        }

        req.user = user
        next()
    })
}
app.get('/register', (req, res) => { // TODO mozes da stavis posle /admin/register itd.
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' }); // TODO posle mozes da stavis root: './static/admin'
});

app.use(express.static(path.join(__dirname, "static")))

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "static", "index.html"))
// })

app.listen(8000)