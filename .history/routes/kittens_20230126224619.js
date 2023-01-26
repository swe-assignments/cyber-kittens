const controller = require("../controllers/kittens");
const { checkOwner } = require("../middleware");
const router = require("express").Router();

//CRUD
router
  .use("/:id", checkOwner)
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .post("/", controller.createOne)
  .delete("/:id", controller.deleteOne);

module.exports = router;
