import User from "../models/user.js";

const AuthController = {
  login: async function (request, reply) {
    const { user } = request.body;

    try {
      const currentUser = await User.findOne({ email: user.email }).lean();

      if (!currentUser)
        throw new Error("Пользователя с таким email не существует");

      if (user.password !== currentUser.password)
        throw new Error("Вы указали неверный пароль");

      request.session.isAuth = true;
      request.session.user = {
        email: currentUser.email,
        id: currentUser._id,
      };

      return reply.code(200).send({ message: "Вы успешно авторизованы" });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: function (request, reply) {
    if (request.session.isAuth) {
      try {
        request.session.destroy();
        return reply.code(200).send({ message: "Вы успешно вышли из системы" });
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      return reply.code(403).send({ message: "Вы не залогинены в системе" });
    }
  },

  checkMe: async function (request, reply) {
    if (request.session.isAuth) {
      return reply
        .code(200)
        .send({ isAuth: request.session.isAuth, user: request.session.user });
    } else {
      return reply
        .code(403)
        .send({ isAuth: false, message: "Вы не залогинены в системе" });
    }
  },
};

export default AuthController;
