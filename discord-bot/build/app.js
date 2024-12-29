"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();
const app = (0, express_1.default)();
app.get("/", (req) => {
    console.log(req);
});
app.listen(4000, () => {
    console.log("console action");
});