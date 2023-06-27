const BaseController = require("../base/base.controller");
const createPaymentObject = require("../../helpers/createPaymentObject");

class PaymentController extends BaseController {
  #userService;
  #treatmentService;
  constructor(service, userService, treatmentService) {
    super(service);
    this.#userService = userService;
    this.#treatmentService = treatmentService;
  }
  createPayment = async (req, res) => {
    const user =await this.#userService.findById(req.user.id);
    const treatment = await this.#treatmentService.findById(
      req.body.treatmentId
    );
    if (!treatment) {
      throw new Error("Treatment not found");
    }
    req.body.basketItems = [treatment];
    const paymentObject = createPaymentObject(req, user);
    const response = await this.service.createPayment(paymentObject);
    res.status(200).json(response);
  };
}

module.exports = PaymentController;
