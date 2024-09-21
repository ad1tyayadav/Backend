const express = require("express");
const app = express();
const userRouter = require("./routes/user")
const mongoose = require("mongoose");
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/demo")
    .then(console.log("MongoDB Conneceted!"))
    .catch((err) => console.log("Error in DB", err))


app.use('/users', userRouter);

// REST API
app.get('/api/users', (req, res) => {
    return res.json(User);
});


app.listen(PORT, () => { console.log("Server listing at Port", PORT) })