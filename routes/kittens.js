const controller = require("../controllers/kittens");
const { notOwner } = require("../middleware");
const router = require("express").Router();

//CRUD
router
  .use("/:id", notOwner)
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .post("/", controller.createOne)
  .put("/:id", controller.updateOne)
  .delete("/:id", controller.deleteOne);

module.exports = router;
