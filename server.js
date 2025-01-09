const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "hitman-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

const taskRouter = require("./routes/tasks");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to dragon application" });
});
app.use("/api", taskRouter);

const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB");
    initial();
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        new Role({ name: "user" })
          .save()
          .then(() => console.log("added 'user' to roles collection"))
          .catch((err) => console.log("error", err));

        new Role({ name: "moderator" })
          .save()
          .then(() => console.log("added 'moderator' to roles collection"))
          .catch((err) => console.log("error", err));

        new Role({ name: "admin" })
          .save()
          .then(() => console.log("added 'admin' to roles collection"))
          .catch((err) => console.log("error", err));
      }
    })
    .catch((err) => console.log("Error counting documents:", err));
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
