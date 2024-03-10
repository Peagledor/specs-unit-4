const express = require("express");
const app = express();
const PORT = 4005; 

const { sequelize } = require("./util/database")
const { User } = require("./models/user");
const { Post } = require("./models/post");

const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/middleware");

app.use(express.json());

User.hasMany(Post);
Post.belongsTo(User);

//auth endpoints
app.post("/register", register);
app.post("/login", login);

//get all posts endpoint
app.get("/posts", getAllPosts);

//current user enpoints
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

// syncs to data base and runs server
sequelize.sync()
.then(() => {
  app.listen(PORT)
  console.log(`database sync success... server running on port ${PORT}`)
})
.catch(err => console.log(err));