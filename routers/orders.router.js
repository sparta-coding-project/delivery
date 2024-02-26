const express = require('express')

const router = express.Router()

const OrdersController = require('../src/controller/orders.controller');
const OrdersService = require('../src/service/orders.service');
const OrdersRepository = require('../src/repository/orders.repository');
const { dataSource } = require('../src/typeorm/index');

const ordersRepository = new OrdersRepository(dataSource);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

router
    .route('/orders')
    .get(ordersController.getOrders) // 개인 주문 확인
    .post(ordersController.createOrder) // 주문 추가 (개인 id로 확인)
    .delete(ordersController.cancelOrder) // 점포 또는 개인 주문 취소 + status가 주문 확인인 경우만 취소 가능

module.exports = router;