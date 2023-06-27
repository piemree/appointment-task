const iyzipay = require("iyzipay");

function createPaymentObject(req, user) {
  const body = req.body;
  const billingAddress = body?.billingAddress;
  const shippingAddress = body?.shippingAddress;
  const basketItems = body?.basketItems?.map((item) => ({
    id: item?._id?.toString(),
    name: item?.name,
    price: item?.price,
    category1: "standart",
    itemType: iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
  }));
  const totalPrice = basketItems?.reduce(
    (total, item) => total + Number(item?.price),
    0
  );

  console.log(user);
  return {
    ...body,
    locale: iyzipay.LOCALE.TR,
    price: totalPrice,
    paidPrice: totalPrice,
    currency: iyzipay.CURRENCY.TRY,
    installment: "1",
    buyer: {
      id: user?._id?.toString(),
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      identityNumber: user?.tc, // TCKN
      ip: req.ip,
      registrationAddress: billingAddress?.address,
      city: billingAddress?.city,
      country: billingAddress?.country,
    },
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };
}

module.exports = createPaymentObject;
