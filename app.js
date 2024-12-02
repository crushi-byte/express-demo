const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// 后台文章路由
const adminArticlesRouter = require("./routes/admin/articles");
// 后台分类路由
const adminCategoriesRouter = require("./routes/admin/categories");
// 后台系统设置
const adminSettingRouter = require("./routes/admin/settings");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS 跨域配置
// const corsOptions = {
//   origin: "https://localhost:3000",
// };
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// 后台文章路由
app.use("/admin/articles", adminArticlesRouter);
// 后台分类路由
app.use("/admin/categories", adminCategoriesRouter);
// 后台系统设置
app.use("/admin/settings", adminSettingRouter);

module.exports = app;
