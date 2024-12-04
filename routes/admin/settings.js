const express = require("express");
const router = express.Router();
const { Setting } = require("../../models");
const { NotFoundError, success, failure } = require("../../utils/response");
/**
 * 查询系统设置详情
 * GET /admin/settings
 */
router.get("/", async function (req, res, next) {
  try {
    const setting = await getSetting();
    success(res, "查询系统设置详情成功", { setting });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 更新系统设置
 * PUT /admin/settings
 */
router.put("/", async function (req, res, next) {
  try {
    const setting = await getSetting(req);
    const body = filterBody(req);
    await setting.update(body);
    success(res, "系统设置更新成功", { setting });
  } catch (error) {
    failure(res, error);
  }
});

// 白名单过滤
function filterBody(req) {
  return {
    name: req.body.name,
    icp: req.body.icp,
    copyright: req.body.copyright,
  };
}
/**
 * 公共方法：查询当前系统设置
 */
async function getSetting() {
  const setting = await Setting.findOne();

  if (!setting) {
    throw new NotFoundError("初始系统设置未找到，请运行种子文件");
  }

  return setting;
}

module.exports = router;
