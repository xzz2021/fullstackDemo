/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 09:16:57
 */
/*
此处定义路由处理函数，，①定义操作函数②引入数据库查询③加密用户密码④插入数据库，即写入注册的userinfo
⑤封装res.cc函数后直接调用⑥验证登录用户的密码是否正确⑦引入JWTtoken
把相应请求的接口返回函数抽离出来
在此处封装
*/

// ②导入数据库操作模块
const db = require('../db/index')

// const db = require('../mongodb/db')
const userList = db.collection('userList')

// ③导入bcrypt加密用户密码
const bcrypt = require('bcrypt')

// ⑦导入生成Token的包
    const jwt = require('jsonwebtoken')
// ⑦导入JWT的密匙
const config = require('../config')

exports.register = async (req, res) => {

    const userinfo = req.body
    console.log('userinfo: ', userinfo);
    // let isNull =  userList.find({'': {'$not': {'$size': 0}}})
    // if (isExisted != null) return res.cc('用户名已存在')

    
    let isExisted = await userList.findOne({username: userinfo.username})
    // console.log('isExisted: ', isExisted);
    if (isExisted != null) return res.cc('用户名已存在')

    // ②如果用户名可以使用
    // 加密部分③③③③③③③③
    const saltRounds = 10  ////③生成salt的迭代次数
    const myPlaintextPassword = userinfo.password
    //③生成salt并获取hash值
    bcrypt.hash(myPlaintextPassword,saltRounds,async  function(err, hash){
            if(err) return res.cc(err)
            //③把hash值赋值给password变量
            userinfo.password = hash
            // console.log("🚀 ~ file: user.js:45 ~ bcrypt.hash ~ hash:", hash)
            try {
                let insertSuccess = await userList.insertOne(userinfo)
                console.log('insertSuccess: ', insertSuccess)
                if(insertSuccess.acknowledged == true) res.cc('注册成功！', 0)
            }catch(err2){
                res.cc('数据库写入错误',err2)
            } finally {
                // db.close()
            }
            
            
})
}

const sha3 = require('crypto-js/sha1.js');
    const pppwd = (randomNum) => {
          let num = (Date.now() + '').slice(0, 9)
          let pwd = sha3(num + 'xzz')
          return pwd.words[randomNum]
        }
        
// ①相当于定义函数名称的同时向外暴露并导出名称给封装的路由由其引用
exports.login = async (req, res) => {
    // console.log('req.body: ', req.body);
    // return res.cc('不可逆加密参数错误,大佬别打我!', 999)
    // let randomNum =  Math.floor(Math.random() * 5 - 1)
    // const encryptParam = req?.body?.encryptParam[randomNum] 

    // if(encryptParam != pppwd(randomNum)) return res.cc('不可逆加密参数错误,大佬别打我!', 999)

    const userinfo = req.body
    // console.log('userinfo: ', userinfo);
    let isExisted = await userList.findOne({username: userinfo.username})
    // console.log('isExisted: ', isExisted);
    if (isExisted == null) return res.cc('用户名不存在')

        // ⑥对比用户提交的密码和数据库的密码是否一致
        // const compareResult = bcrypt.compare(userinfo.password, results[0].password)
        const compareResult = bcrypt.compareSync(userinfo.password, isExisted.password)
        if(!compareResult) return res.cc('密码错误，请稍后再试！')
        // ⑦引入JWTtoken ⑦剔除数据中用户的密码
        const user = {isExisted, password: ''}
        // ⑦⑦⑦⑦对用户信息进行加密  //加密信息     //加密密匙       //token有效期
        const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // console.log(token)
         res.send({
            code: 200,
            status: 666,
            msg: '登录成功!',
            token: 'Bearer ' + token
        })
        

}