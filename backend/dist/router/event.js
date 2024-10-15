"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../utils/db"));
const initializeOB_1 = require("../services/initializeOB");
const router = (0, express_1.Router)();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, description } = req.body;
    if (!userId) {
        res.status(401).json({ message: "userId invalid/not found" });
        return;
    }
    const user = yield db_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (user) {
        if (user.role === "ADMIN") {
            const event = yield db_1.default.event.create({
                data: {
                    title: title,
                    description: description,
                    adminId: userId,
                },
            });
            const orderbook = (0, initializeOB_1.initializeOrderBook)();
            yield db_1.default.orderBook.create({
                data: {
                    eventId: event.id,
                    yes: {
                        create: orderbook.yes.map((order) => ({
                            price: order.price,
                            quantity: order.quantity,
                            type: "SELL",
                        })),
                    },
                    no: {
                        create: orderbook.no.map((order) => ({
                            price: order.price,
                            quantity: order.quantity,
                            type: "SELL",
                        })),
                    },
                },
            });
        }
        res.json(401).json({ message: "Event created successfully" });
        return;
    }
    res.json(401).json({ message: "user is not an admin" });
    return;
}));
exports.default = router;
