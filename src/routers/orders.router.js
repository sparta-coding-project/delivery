const express = require("express");

const router = express.Router();

const OrdersController = require("../controller/orders.controller");
const OrdersService = require("../service/orders.service");
const OrdersRepository = require("../repository/orders.repository");
const { dataSource } = require("../typeorm/index");
const jwtValidate = require("../middleware/jwt-validate.middleware");

const ordersRepository = new OrdersRepository(dataSource);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

router
    .route("/orders")
    .get(jwtValidate, ordersController.getOrders) // 개인 주문 확인
    .post(jwtValidate, ordersController.createOrder) // 주문 추가 (개인 id로 확인)
    .delete(jwtValidate, ordersController.cancelOrder); // 점포 또는 개인 주문 취소 + status가 주문 확인인 경우만 취소 가능

module.exports = router;
