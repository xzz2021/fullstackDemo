/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-02 11:02:10
 */
/*
用户路由模块，类似于封装router
存储处理客户端请求与函数处理的映射关系   ①        ②  
*/

// ① 创建路由对象
const express = require('express')

const router = express.Router()


//  ① 导入引用的处理函数模块,并定义处理名称统一调用
const userHandler = require('../router-handler/user')

//  ② 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//   ②  导入验证表单规则的中间件
const { regSchema } = require('../schema/user')



// ①  注册新用户             //此处调用表单验证规则中间件     //这样随时可以修改函数而不影响封装的路由模块
router.post('/register', expressJoi(regSchema), userHandler.register)  

//  ① 登录               //此处类似重新封装
router.post('/login', expressJoi(regSchema), userHandler.login)


//  ① 将路由模块导出去
module.exports = router