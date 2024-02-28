const express = require("express");
const { dataSource } = require("../typeorm/index");
const jwtValidate = require("../middleware/jwt-validate.middleware");

const router = express.Router();

const BIZValidator = async (req, res, next) => {
    const { userId, grade } = res.locals.user;

    if (grade !== "BIZ") {
        throw new Error("권한이 없습니다.");
    }

    next();
};

router
    .route("/menu")
    // 조회
    .get(async (req, res, next) => {
        try {
            const { storeId } = req.body;
            const store = await dataSource.getRepository("store").findOne({
                where: { storeId },
            });
            if (!store) {
                throw {
                    message: "없는 상점입니다.",
                };
            }
            const menu = await dataSource.getRepository("menu").find({
                where: { storeId },
            });
            console.log(menu)
            return res
                .status(200)
                .json({
                    message: "메뉴 목록 조회",
                    data: menu.length === 0 ? "메뉴 없음" : menu,
                });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "메뉴 목록 조회 불가" });
        }
    })
    // 생성
    .post(jwtValidate, BIZValidator, async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { storeId, name, price, description, menuImage } = req.body;

            const ownedStore = await dataSource.getRepository("store").findOne({
                where: { userId, storeId },
            });

            if (ownedStore) {
                const createdMenu = await dataSource
                    .getRepository("menu")
                    .save({
                        storeId,
                        name,
                        price,
                        description,
                        menuImage,
                    });
                return res.status(201).json({
                    message: "메뉴를 생성했습니다.",
                    data: createdMenu,
                });
            } else {
                throw {
                    message: "잘못된 접근입니다.",
                };
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: message });
        }
    });

module.exports = router;
