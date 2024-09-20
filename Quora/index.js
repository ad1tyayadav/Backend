const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const methoOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methoOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Dhoni",
        post: "6th is Loading :)"
    },
    {
        id: uuidv4(),
        username: "Kohli",
        post: "EE Sala Cup Namde"
    },
    {
        id: uuidv4(),
        username: "Jadeja",
        post: "Sorry Sarfraz Bhai"
    },
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, post } = req.body;
    let id = uuidv4();
    posts.push({ id, username, post });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newPost = req.body.post;
    let post = posts.find((p) => id === p.id);
    post.post = newPost;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});
