const BaseController = require("../base/base.controller");
const AppError = require("../../error/AppError");

class AuthController extends BaseController {
  #clinicService;
  constructor(service, clinicService) {
    super(service);
    this.#clinicService = clinicService;
  }
  loginUser = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await this.service.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = this.service.jwtsign({ id: user._id, role: user?.role });

    return res.status(200).json({ token });
  };

  registerUser = async (req, res) => {
    const body = req.body;
    const clinic = await this.service.create(body);
    return res.status(201).json({ success: true });
  };

  loginClinic = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const clinic = await this.#clinicService.findByEmail(email);
    if (!clinic) throw new AppError("Invalid credentials", 401);

    const isMatch = await clinic.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const token = this.service.jwtsign({ id: clinic._id, role: clinic?.role });

    return res.status(200).json({ token });
  };

  registerClinic = async (req, res) => {
    const body = req.body;
    const clinic = await this.#clinicService.create(body);
    return res.status(201).json({ success: true });
  };
}

module.exports = AuthController;
