"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbName = "shop_eco";
const con = `mongodb://127.0.0.1:27017/${dbName}`;
mongoose_1.default
    .connect(con, { useNewUrlParser: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.log("Error de conexión con MongoDB", err));
exports.default = mongoose_1.default;
//# sourceMappingURL=db.js.map