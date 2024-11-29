const express = require("express");
const router = express.Router();
const { Article } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");
/**
 * 查询所有文章列表
 * GET /admin/articles
 */
router.get("/", async function (req, res, next) {
  try {
    // 排序
    const condition = {
      order: [["id", "DESC"]],
    };
    // 模糊查询
    const query = req.query;
    if (query.title) {
      // 用标题查询
      condition.where = {
        title: {
          [Op.like]: `%${query.title}%`,
        },
      };
    }
    const articles = await Article.findAll(condition);
    success(res, "查询文章列表成功", { articles });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 查询文章详情
 * GET /admin/articles/:id
 */
router.get("/:id", async function (req, res, next) {
  try {
    const article = await getArticle(req);
    success(res, "查询文章详情成功", { article });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 创建文章
 * POST /admin/articles
 */
router.post("/", async function (req, res, next) {
  try {
    const body = filterBody(req);
    const article = await Article.create(body);
    success(res, "文章创建成功", { article }, 201);
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 删除文章
 * DELETE /admin/articles/:id
 */
router.delete("/:id", async function (req, res, next) {
  try {
    const article = await Article.getArticle(req);
    await article.destroy();
    success(res, "文章删除成功");
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 更新文章
 * PUT /admin/articles/:id
 */
router.put("/:id", async function (req, res, next) {
  try {
    const article = await Article.getArticle(req);
    const body = filterBody(req);
    await article.update(body);
    success(res, "文章更新成功", { article });
  } catch (error) {
    failure(res, error);
  }
});
// 白名单过滤
function filterBody(req) {
  return {
    title: req.body.title,
    content: req.body.content,
  };
}
/**
 * 公共方法：查询当前文章
 */
async function getArticle(req) {
  const { id } = req.params;
  const article = await Article.findByPk(id);

  if (!article) {
    throw new NotFoundError(`ID${id}'文章不存在'`);
  }

  return article;
}

module.exports = router;
