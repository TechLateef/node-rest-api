const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const QueryHandler = require("../utils/queryHandler");

class UsersServices {
  async getAll(req) {
    const queryHandler = new QueryHandler(User, req.query);

    return await queryHandler.process();
  }

  async createUser(req) {

    let { fullname, email, password } = req.body;

    const user = {
      fullname: fullname,
      email: email,
      password: password,
    };

    let result = await User.create(user);

    if (result)
      return {
        id: result.id,
        fullname: result.fullname,
        email: result.email,
        updatedAt: result.updatedAt,
        createdAt: result.createdAt,
      };
  }

  async updateUser(id, req) {
    const { fullname, email } = req.body;
    let data = { fullname, email };
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UsersServices