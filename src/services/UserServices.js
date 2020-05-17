const bcrypt = require('bcryptjs');

const conn = require('../database/conn');
const User = require('../models/User');

const jwt = require('../helpers/api/jwt');

const {
  USER_INVALID,
  EMAIL_ALREADY_EXISTS,
  USER_NOT_EXISTS,
} = require('../config/constants/errors');

const {
  errorsParse,
} = require('../helpers/api/response');

const {
  handlerService
} = require('../helpers/services/handler');

const UserServices = {
  /**
   * @name AuthUser
   *
   * @param {string} email user email
   * @param {string} password user password
   *
   * @public
   */

  authUser: (req, res) => {
    return handlerService(req, res, async () => {
      const {
        email,
        password,
      } = req.body;

      const user = await UserServices.findUserByEmail(email);
      const validUser = await bcrypt.compare(password, user && user.password || '');

      if (!user || !validUser) {
        return res.status(404).json(errorsParse([{
          msg: USER_INVALID,
          param: 'email',
          location: 'body'
        }, {
          msg: USER_INVALID,
          param: 'password',
          location: 'body'
        }]));
      }

      const UserModel = await User.create(user);
      delete UserModel.password;

      return res.json({
        user: { ...UserModel },
        token: jwt.generator({
          uuid: user.uuid,
        }),
      });
    });
  },

  /**
   * @name updateUser
   *
   * @param {string} first_name user first name
   * @param {string} last_name user last namel
   * @param {string} email user email
   * @param {string} password user password
   *
   * @returns User
   *
   * @public
   */

  updateUser: (req, res) => {
    return handlerService(req, res, async () => {
      const { uuid } = req.authenticated;

      await UserServices.findUserByUUID(uuid)
        .then(async (user) => {
          if (!user) {
            return res.status(401).json({
              msg: USER_NOT_EXISTS,
              param: 'authorization',
              location: 'headers',
            });
          }

          await UserServices
            .findUserByEmail(req.body.email)
            .then((foundUser) => {
              if (foundUser && (foundUser.uuid !== user.uuid)) {
                return res.status(422).json(errorsParse([{
                  msg: EMAIL_ALREADY_EXISTS,
                  param: 'email',
                  location: 'body',
                }]));
              }
            });

          const UserModel = await User.create({
            ...req.body,
            uuid,
          });

          await conn('users')
            .where({ uuid })
            .update({ ...UserModel })
            .then(() => {
              delete UserModel.password;

              return res.json({ ...UserModel });
            });
        });
    });
  },

  /**
   * @name createUser
   *
   * @param {string} first_name user first name
   * @param {string} last_name user last namel
   * @param {string} email user email
   * @param {string} password user password
   *
   * @public
   */

  createUser: (req, res) => {
    return handlerService(req, res, async () => {
      await UserServices
        .findUserByEmail(req.body.email)
        .then(async (user) => {
          if (user) {
            return res.status(422).json(errorsParse([{
              msg: EMAIL_ALREADY_EXISTS,
              param: 'email',
              location: 'body',
            }]));
          }

          const UserModel = await User.create(req.body);

          await conn('users')
            .insert(UserModel)
            .then(() => {
              delete UserModel.password;
              return res.status(201).json({
                user: { ...UserModel },
                token: jwt.generator({
                  uuid: UserModel.uuid,
                }),
              });
            });
        });
    });
  },

  /**
   * @name findUserByUUID
   * @param {string} uuid user uuid
   *
   * @public
   */

  findUserByUUID: async (uuid) => await conn('users').where({ uuid }).first(),

  /**
   * @name findUserByEmail
   * @param {string} email user email
   *
   * @public
   */

  findUserByEmail: async email => await conn('users').where({ email }).first(),

};

module.exports = UserServices;
