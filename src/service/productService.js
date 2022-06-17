import client from '../grpc/product.js';

const checkAndUpdateProductQty = (products) => {
  return new Promise((resolve, reject) => {
    client.checkAndUpdateProductQty({ products }, (error, response) => {
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

export default { checkAndUpdateProductQty, getProductByid };
