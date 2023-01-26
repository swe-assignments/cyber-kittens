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
    const one = await Kitten.findByPk(id);
    return res.status(200).send(one);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await Kitten.findByPk(id);
    return res.status(200).send(one);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
exports.updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await Kitten.findByPk(id);
    return res.status(200).send(one);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
exports.deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await Kitten.findByPk(id);
    return res.status(200).send(one);
  } catch (error) {
    console.error("Kittens: getOne", error);
    next(error);
  }
};
