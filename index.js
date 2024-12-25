const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const { resolveSoa } = require("dns");


app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
    id: uuidv4(),
    username: "apnacollege",
    content: "i love coding"
    },
    {
        id: uuidv4(),
    username: "sachin",
    content: "i love hardwork"
    },
    {
        id: uuidv4(),
        username: "rishu",
    content: "honesty is the best policy !"
    }
    
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
})

app.post("/posts", (req,res) => {
   let {username, content} = req.body;
   let id =  uuidv4();
   posts.push({ id, username, content});
   res.redirect("/posts");
})


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post }); // Post mil gayi, render karo
    } else {
        res.status(404).send("Post not found!"); // Agar post nahi mili, error message bhejo
    }
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params; // id ko req.params se extract karo
    let newcontent = req.body.content; // Form se new content extract karo
    let post = posts.find((p) => p.id === id); // Matching post ko find karo
   
        post.content = newcontent; // Post ka content update karo
        res.redirect("/posts"); // Redirect to posts page
    
});


app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})
}) 

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
       posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
    })

app.listen(port, () => {
    console.log("listening to port : 8080");
    
});
