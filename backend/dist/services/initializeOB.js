"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeOrderBook = void 0;
const initializeOrderBook = () => {
    const orderBook = {
        yes: [],
        no: [],
    };
    for (let price = 0.5; price <= 9.5; price += 0.5) {
        orderBook.yes.push({
            price,
            quantity: Math.floor(Math.random() * 100) + 1,
        });
        orderBook.no.push({
            price,
            quantity: Math.floor(Math.random() * 100) + 1,
        });
    }
    return orderBook;
};
exports.initializeOrderBook = initializeOrderBook;