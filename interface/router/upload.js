/*
 * @Date: 2023-01-30 10:27:57
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-02 16:56:02
 */


// ①①①导入express
const express = require('express')

// ①①①创建路由对象
const router = express.Router()
// ②②②导入封装的处理函数
const operateHandler = require('../router-handler/upload')


router.post('/uploadImg', operateHandler.uploadImg)
router.post('/batchUploadImg', operateHandler.batchUploadImg)




// ①①①向外共享路由对象
module.exports = router
