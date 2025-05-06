"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const design_routes_1 = __importDefault(require("./design.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const order_route_1 = __importDefault(require("./order.route"));
const router = (0, express_1.Router)();
// Auth routes
router.use('/auth', auth_1.default);
router.use("/designs", design_routes_1.default);
router.use("/categories", category_routes_1.default);
router.use("/blogs", blog_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/orders", order_route_1.default);
exports.default = router;
