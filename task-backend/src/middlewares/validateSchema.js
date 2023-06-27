const AppError = require('../error/AppError');

/**
 * 
 * @param {import('yup').ObjectSchema} schema
 * @returns  {import('express').RequestHandler}
 */
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    throw new AppError(err.errors, 400);
  }
};

module.exports = validateSchema;