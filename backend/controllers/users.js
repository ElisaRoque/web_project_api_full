const userModel = require("../models/user");

module.exports.getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Erro no servidor" }));
};

module.exports.getUserById = (req, res) => {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuário não encontrado",
        });
      }
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Recurso não encontrado",
        });
      }

      return res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userModel
    .create({
      name,
      about,
      avatar,
    })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Recurso não encontrado",
        });
      }

      return res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Dados inválidos" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      return res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Dados inválidos" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      return res.status(500).send({ message: "Erro no servidor" });
    });
};
