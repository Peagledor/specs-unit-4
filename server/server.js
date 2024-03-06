const http = require("http");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/middleware");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const express = require("express");
const PORT = 4005; 

const app = express();
const server = http.createServer(app);

app.use(express.json());


//auth endpoints
app.post("/register", register);
app.post("/login", login);

//get all posts endpoint
app.get("./posts", getAllPosts);

//current user enpoints
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:userId", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

// runs server
console.log("Running on 4005!");
server.listen(PORT);