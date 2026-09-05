const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  if (userId !== req.user._id) {
    return next(new ForbiddenError('Acesso negado'));
  }

  return userModel
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Dados inválidos'));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      return res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Dados inválidos'));
      }

      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Dados inválidos'));
      }

      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Dados inválidos'));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('E-mail ou senha incorretos');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('E-mail ou senha incorretos');
        }

        const token = jwt.sign({ _id: user._id }, 'super-secret-key', {
          expiresIn: '7d',
        });

        return res.send({ token });
      });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Usuário não encontrado');
      }

      res.send(user);
    })
    .catch(next);
};
