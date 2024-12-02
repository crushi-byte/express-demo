const express = require("express");
const router = express.Router();
const { Category } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");
/**
 * 查询分类列表
 * GET /admin/categories
 */
router.get("/", async function (req, res, next) {
  try {
    // 排序
    const condition = {
      order: [["id", "DESC"]],
    };
    // 模糊查询
    const query = req.query;
    if (query.name) {
      // 用标题查询
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`,
        },
      };
    }
    const categories = await Category.findAll(condition);
    success(res, "查询分类列表成功", { categories });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 查询分类详情
 * GET /admin/categories/:id
 */
router.get("/:id", async function (req, res, next) {
  try {
    const article = await getcategories(req);
    success(res, "查询分类详情成功", { article });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 创建分类
 * POST /admin/categories
 */
router.post("/", async function (req, res, next) {
  try {
    const body = filterBody(req);
    const article = await Category.create(body);
    success(res, "分类创建成功", { article }, 201);
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 删除分类
 * DELETE /admin/categories/:id
 */
router.delete("/:id", async function (req, res, next) {
  try {
    const article = await getcategories(req);
    await article.destroy();
    success(res, "分类删除成功");
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 更新分类
 * PUT /admin/categories/:id
 */
router.put("/:id", async function (req, res, next) {
  try {
    const article = await getcategories(req);
    const body = filterBody(req);
    await article.update(body);
    success(res, "分类更新成功", { article });
  } catch (error) {
    failure(res, error);
  }
});
// 白名单过滤
function filterBody(req) {
  return {
    name: req.body.name,
    rank: req.body.rank,
  };
}
/**
 * 公共方法：查询当前分类
 */
async function getcategories(req) {
  const { id } = req.params;
  const article = await Category.findByPk(id);

  if (!article) {
    throw new NotFoundError(`ID${id}'分类不存在'`);
  }

  return article;
}

module.exports = router;
