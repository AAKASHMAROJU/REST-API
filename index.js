const express = require("express");

const app = express();
const path = require("path");
const port = 3000;

const { v4: uuid4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

let posts = [
  {
    id: uuid4(),
    name: "Aakash",
    content: "Success needs Hardwork ",
  },
  {
    id: uuid4(),
    name: "Sai",
    content: "Tea Ivvandi ",
  },
  {
    id: uuid4(),
    name: "Ravi",
    content: "Sun rises in the east ",
  },
];

app.get("/", (req, res) => {
  res.send("Hello this is Home Page ");
});

app.get("/posts", (req, res) => {
  res.render("index", { posts: posts });
});

app.get("/posts/new", (req, res) => {
  res.render("form");
});

app.post("/posts", (req, res) => {
  const { name, content } = req.body;
  posts.push({ id: uuid4(), name: name, content: content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id == id);
  if (post) {
    // console.log(post);
    res.render("post", { name: post.name, content: post.content });
  } else {
    res.render("error");
  }
});

app.patch("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.content = content;
    res.redirect("/posts");
  } else {
    console.log("Incorrect Update");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.render("editform", { post: post });
  }
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("Listening to Port " + port);
});
