const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {sequelize, Jelo} = require("./models");

const app = express();

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8081', 'http://127.0.0.1:8081']
};
app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

app.put("/promeni-cenu/:id", async (req, res) => {
    try {
        const jelo = await Jelo.findByPk(req.params.id);
        if (!jelo) {
            return res.status(404).json({error: "Jelo not found"});
        }

        jelo.cena = req.body.cena;  //iz body
        await jelo.save();

        return res.json(jelo);  //vrati json nove vrednosti jela i završi funkc.
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

const jeloRoutes = require("./routes/jelo.js");
app.use("/jelo", jeloRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

const sastojakRoutes = require("./routes/sastojak.js");
app.use("/sastojak", sastojakRoutes);

const dnevniMeniRoutes = require("./routes/dnevnimeni.js");
app.use("/dnevnimeni", dnevniMeniRoutes);

const rezervacijaRoutes = require("./routes/rezervacija.js");
app.use("/rezervacija", rezervacijaRoutes);

const zaposleniRoutes = require("./routes/zaposleni.js");
app.use("/zaposleni", zaposleniRoutes);

const inventarRoutes = require("./routes/inventar.js");
app.use("/inventar", inventarRoutes);

app.listen({port: 9000}, async () => {
    console.log("Started server on localhost:9000");
    // await sequelize.sync({force:true});
    await sequelize.sync(); // Sync without forcing to avoid data loss
    console.log("DB synced");
});
