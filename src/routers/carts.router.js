const express = require("express");

const router = express.Router();

const CartsRepository = require("../repository/carts.repository");
const CartsService = require("../service/carts.service");
const CartsController = require("../controller/carts.controller");
const { dataSource } = require("../typeorm/index");
const jwtValidate = require("../middleware/jwt-validate.middleware")

const cartsRepository = new CartsRepository(dataSource);
const cartService = new CartsService(cartsRepository);
const cartsController = new CartsController(cartService);

router
    .route("/carts")
    .get(jwtValidate, cartsController.getAllCarts)
    .post(jwtValidate, cartsController.createCart);

router
    .route("/carts/:cartId")
    .get(jwtValidate, cartsController.getOneCart)
    .patch(jwtValidate, cartsController.updateCart)
    .delete(jwtValidate, cartsController.deleteCart);

module.exports = router