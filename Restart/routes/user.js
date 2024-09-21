const express = require("express");
const data = require("../data.json");
const { handleGetUser } = require("../controllers/user");
const { User } = require("../models/user");

const router = express.Router();

router.get('/', handleGetUser);

router.get('/api', (req, res) => {
    return res.json(data);
});

router.route('/api/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) res.status(404).json({status: "User not found"})
        return res.json(user);
    })
    .patch((req, res) => {
        return res.json({ "status": 'pending' })
    })
    .delete((req, res) => {
        return res.json({ "status": 'pending' })
    })

router.post("/api", async (req, res) => {
    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email
    ) {
        return res.status(404).json({ status: "All fields required..." });
    }
    const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })
    console.log("User", newUser)
    return res.status(201).json({ status: "User Created" });
});

module.exports = router;