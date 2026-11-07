const express = require('express');
const { createProductController } = require('../controllers/productController');

module.exports = function productRoutes(prisma) {
  const router = express.Router();
  const controller = createProductController(prisma);

  router.get('/', controller.getAllProducts);
  router.get('/:id', controller.getProductById);
  router.post('/', controller.createProduct);

  return router;
};
