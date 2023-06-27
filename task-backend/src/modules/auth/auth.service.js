const BaseService = require("../base/base.service");
const jwt = require("jsonwebtoken");

class AuthService extends BaseService {
  constructor(model) {
    super(model);
  }
  jwtsign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  findByEmail = async (email) => {
    return await this.model.findOne({ email });
  }
}

module.exports = AuthService;
