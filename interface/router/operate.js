/*
 * @Date: 2023-01-30 10:27:57
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-03 14:18:04
 */
/*
  此处定义get userinfo 接口
  ①①①定义获取用户基本信息的接口及处理函数
  ②②②②封装处理函数
*/

// ①①①导入express
const express = require('express')

// ①①①创建路由对象
const router = express.Router()
// ②②②导入封装的处理函数
const operateHandler = require('../router-handler/operate')


router.post('/addAd', operateHandler.addAd)
router.post('/modifyAd', operateHandler.modifyAd)
router.post('/deleteAd', operateHandler.deleteAd)


router.post('/addMm', operateHandler.addMm)
// router.post('/batchAddmm', operateHandler.batchAddmm)
router.post('/modifyMm', operateHandler.modifyMm)  // 修改和添加合为一体
router.post('/deleteMm', operateHandler.deleteMm)



//  单张图片删除
router.post('/deleteImg', operateHandler.deleteImg)




// router.post('/uploadImg', upload.single('file'), operateHandler.uploadImg)

// ①①①向外共享路由对象
module.exports = router
