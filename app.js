"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const isReachable = require('is-reachable');

app.set("trust proxy", "loopback");

app.use(bodyParser.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,X-Auth-Token,X-Language"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(__dirname + "/public"));


app.post('/api/checkReachable', (async (req, res, next) => {
    let result = await isReachable(req.body.hostname);
    res.send(result);
}));

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});
