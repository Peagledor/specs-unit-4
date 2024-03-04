const http = require("http");
const { register, login } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const express = require("express");
const PORT = 3000; // may need to transfer to .env and import with .process

const app = express();
const server = http.createServer(app);

//homepage endpoint
app.use("/", (req, res, next) => {
  res.send("Homepage");
});

//auth endpoints
app.post("/register", register);
app.post("/login", login);

//get all posts endpoint
app.get("./posts", getAllPosts);

//current user enpoints
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", addPost);
app.put("/posts/:userId", editPost);
app.delete("/posts/:id", deletePost);

// runs server
console.log("Running on 3000!");
server.listen(PORT);