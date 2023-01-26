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
    const all = await Kitten.findAll();
    return res.status(200).send(all);
  } catch (error) {
    console.error("Kittens: getAll", error);
    next(error);
  }
};
