import client from '../grpc/product.js';

const checkQty = (id) => {
  return new Promise((resolve, reject) => {
    client.checkProductQty({ _id: id }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

const getProductByid = (id) => {
  return new Promise((resolve, reject) => {
    client.getProduct({ _id: id }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

export default { checkQty, getProductByid };
