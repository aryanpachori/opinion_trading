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
const router = (0, express_1.Router)();
router.post("/recharge", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, amount } = req.body;
    if (!userId) {
        res.status(401).json({ message: "invalid input" });
        return;
    }
    const user = yield db_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (user) {
        yield db_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                balance: {
                    increment: amount,
                },
            },
        });
        res.json({ message: "balance updated successfully" });
        return;
    }
}));
router.post("/portfolio", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        res.status(401).json({ message: "invalid user input" });
    }
    const portfolio = yield db_1.default.portfolio.findUnique({
        where: {
            id: userId,
        },
        include: {
            trades: true,
        },
    });
    if (portfolio === null || portfolio === void 0 ? void 0 : portfolio.trades) {
        res.json({ message: "Trades found successfully" });
        return;
    }
    res.json({ message: "no trades found" });
    return;
}));
exports.default = router;
