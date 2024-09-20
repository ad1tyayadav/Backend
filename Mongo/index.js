// File: index.js
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User"); // Update the path accordingly

const app = express();
const port = 8080;

main()
    .then(() => {
        console.log("Connection successful");

        app.get('/', (req, res) => {
            const user = new User({ name: "Aditya", email: "adi@gmail.com", age: 19 });
            user.save();
            res.send("Hello world!");
        });

        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

async function main() {
    await mongoose.connect("mongodb://localhost:27017/User");
}
