const AppError = require("../../error/AppError");

class PaymentService {
  #paymentGateway;
  constructor(paymentGateway) {
    this.#paymentGateway = paymentGateway;
  }
  createPayment = async (request) => {
    return new Promise((resolve, reject) => {
      this.#paymentGateway.payment.create(request, function (err, result) {
        if (err) return reject(err);
        if (result?.status !== "success") return reject(result?.errorMessage);
        resolve(result);
      });
    }).catch((e) => {
      console.log(e);
      throw new AppError(e);
    });
  };
}

module.exports = PaymentService;
