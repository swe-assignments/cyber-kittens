const { Kitten } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const { id } = req.user;
    const all = await Kitten.findAll({ where: { ownerId: id } });
    return res.status(200).send(all);
  } catch (error) {
    console.error("Kittens: getAll", error);
    next(error);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, color } = await Kitten.findByPk(id);
    return res.status(200).send({ name, age, color });
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const { name, age, color } = req.body;
    const created = await Kitten.create({
      name,
      age,
      color,
      ownerId: req.user.id,
    });
    return res
      .status(201)
      .send({ name: created.name, age: created.age, color: created.color });
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
exports.deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await Kitten.findByPk(id);
    await one.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
