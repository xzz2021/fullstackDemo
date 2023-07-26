/*
 * @Date: 2023-01-30 10:08:17
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-30 10:24:02
 */
/*
用户路由模块，类似于封装router
存储处理客户端请求与函数处理的映射关系   ①        ②  
*/

// ① 创建路由对象
const express = require('express')

const router = express.Router()


//  ① 导入引用的处理函数模块,并定义处理名称统一调用
const getDataHandler = require('../router-handler/getdata')

   
router.get('/getAd', getDataHandler.getAd)

router.get('/getMm', getDataHandler.getMm)

router.get('/getUserinfo', getDataHandler.getUserinfo)


module.exports = router