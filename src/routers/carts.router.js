const express = require("express");

const router = express.Router();

const CartsRepository = require("../repository/carts.repository");
const CartsService = require("../service/carts.service");
const CartsController = require("../controller/carts.controller");
const { dataSource } = require("../typeorm/index");

const cartsRepository = new CartsRepository(dataSource);
const cartService = new CartsService(cartsRepository);
const cartsController = new CartsController(cartService);

router
    .route("/carts")
    .get(cartsController.getAllCarts)
    .post(cartsController.createCart);

router
    .route("/carts/:cartId")
    .get(cartsController.getOneCart)
    .patch(cartsController.updateCart)
    .delete(cartsController.deleteCart);

module.exports = router