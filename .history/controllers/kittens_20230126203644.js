const { Kitten } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const all = await Kitten.findAll();
    return res.status(200).send(all);
  } catch (error) {
    console.error("Kittens: getAll", error);
    next(error);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await Kitten.findByPk(id);
    return res.status(200).send(one);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
