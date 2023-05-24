"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//database
require("./src/_database/db");
//Routes
// import userRoutes from "./src/routes/user.routes";
// import taskRouter from "./src/routes/task.routes";
// import boardRouter from "./src/routes/board.routes";
//Middlewares
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
//routes
// app.use("/user", userRoutes);
// app.use("/task", taskRouter);
// app.use("/board", boardRouter);
const port = 5010;
app.listen(port, () => {
    console.log("Server listen on port " + port);
});
//# sourceMappingURL=index.js.map