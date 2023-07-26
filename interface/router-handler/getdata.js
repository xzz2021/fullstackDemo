/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-31 17:36:13
 */


// ②导入数据库操作模块
const db = require('../db/index')

exports.getAd = async (req, res) => {
    
    const adList = db.collection('adList')
    // console.log('adList: ', adList);

            try {
                let getData = await adList.find().toArray()
                // console.log('getData: ', getData);
                res.cc(getData, 666)
            }catch(err){
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }
            
}


exports.getMm = async (req, res) => {
    
    const mmList = db.collection('mmList')
            try {
                let getData = await mmList.find().toArray()
                res.cc(getData, 666)
            }catch(err){
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }
            
}



// ①定义并导出用户基本信息的处理函数
exports.getUserinfo = async (req, res) => {
    
    // user: {
    //     isExisted: {
    //       _id: '63d7241b2ac956cbc0d6b65f',
    //       username: 'meidao',
    //       password: '$2b$10$wtz0nZZFhVXHHQ39/OFBHut7uk.TIuOkypHcIJHPB8YOallRA/Pmi'
    //     },
    //     password: '',
    //     iat: 1675046564,
    //     exp: 1675305764
    //   },


    // token不匹配时会直接被中间件拦截  不会走到这里
    // return res.send('=======test========')

        res.send({
            status: 666,
            message: '获取信息成功',
            username: req?.user?.isExisted?.username || ''}) 

    }