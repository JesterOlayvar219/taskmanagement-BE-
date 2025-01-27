const { authJwt } = require("../middlewares");
const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  // Create a new task
  app.post("/api/task/", authJwt.verifyToken, controller.addTask);
  // Get all tasks
  app.get("/api/task/", authJwt.verifyToken, controller.allTasks);
  // Get a specific task
  app.get("/api/task/:taskId", authJwt.verifyToken, controller.getTask);
  // Update a task
  app.put("/api/task/:taskId", authJwt.verifyToken, controller.updateTask);
  // Delete a task
  app.delete("/api/task/:taskId", authJwt.verifyToken, controller.deleteTask);
};
