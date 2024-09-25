const express = require("express")
const {sequelize, User} = require("./models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

const app = express()

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8081', 'http://127.0.0.1:8081'],
    optionsSuccessStatus: 200
};

app.use(express.json())
app.use(cors(corsOptions))

app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    User.create(obj).then( rows => {
        const usr = {
            isAdmin: rows.admin,
            userId: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        //console.log(token);
        res.json({ token: token });
    }).catch( err => res.status(500).json(err) );
});

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({ where: { username: req.body.username } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    isAdmin: usr.admin,
                    userId: usr.id,
                    user: usr.username
                };
                const token = jwt.sign(obj,
                    process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({port: 9001}, async () => {
    await sequelize.authenticate()
})
