import Joi from 'joi';

const productItems = Joi.object({
  productId: Joi.string().required(),
  qty: Joi.number().required(),
});

const validateAddOrder = (order) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    products: Joi.array().items(productItems).required(),
  });
  return schema.validate(order, { abortEarly: true });
};

export { validateAddOrder };
