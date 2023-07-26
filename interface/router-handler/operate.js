/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-03 16:07:47
 */


// ②导入数据库操作模块
const db = require('../db/index')
const ObjectId = require('mongodb').ObjectId
const adList = db.collection('adList')
const mmList = db.collection('mmList')


const fs = require('fs')

exports.addAd = async (req, res) => {
    
    const singleList = req.body
    // console.log('singleList: ', singleList);
    // return res.cc('test')
            try {
                let insertSuccess = await adList.insertOne(singleList)
                // console.log('insertSuccess: ', insertSuccess)
                if(insertSuccess.acknowledged == true) res.cc('首页图片添加成功！', 666)
            }catch(err){
                // res.cc({'数据库写入错误': err})
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }
}

exports.deleteAd = async (req, res) => {
    
    const reqId = req.body._id
    const path = req.body.url
    // console.log('req.body: ', req.body);
    // console.log('reqId: ', reqId);
    // console.log('ObjectId(reqId): ',  ObjectId(reqId));
    // let rawid = ObjectId(reqId).toString()   // 因为monogo的_id是一个构造对象,所以需要转换普通字符串进行判断
    if(!ObjectId.isValid(reqId)) return res.cc('id参数错误')  //判断是否为合法的mongo_id
    const filter = {_id: ObjectId(reqId)}
            try {
                let deleteSuccess = await adList.deleteOne(filter)
                console.log('deleteSuccess: ', deleteSuccess);
                if(deleteSuccess.deletedCount == 1) {
                    res.cc('删除成功！', 666)
                }else{
                    res.cc('删除失败！', 999)
                }
            }catch(err){
                // res.cc({'数据库写入错误': err})
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }


            // 同时删除图片
            fs.unlink(`upload/${path}`,function(error){
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('删除文件成功');
            })

            
}


exports.modifyAd = async (req, res) => {
    
    const item = req.body
    // console.log('item: ', item);
    // console.log('reqData: ', reqData);
    // res.cc('lianjiel')
    // return
    if(!ObjectId.isValid(item._id)) return res.end('修改失败: 参数错误或id不存在')  //判断是否为合法的mongo_id
    const filter = {_id: ObjectId(item._id)}
    const set = {$set: {index: item.index, url: item.url}}

            try {
                let modifySuccess = await adList.updateOne(filter, set)
                console.log('modifySuccess: ', modifySuccess);
                if(modifySuccess.modifiedCount == 1  &&  modifySuccess.matchedCount == 1 ) {  //如果有匹配但是值相同的话,mongo会不作修改处理
                    res.cc('首页信息修改成功！', 666)
                }else{
                    res.cc('参数相同,未作修改!', 666)
                    }
            }catch(err2){
                res.cc('数据库写入错误',err2)
            } finally {
                // db.close()
            }
            
}



exports.addMm = async (req, res) => {
    // 此处有谬误 后续更改 前端声明了content-type为application/x-www-form-urlencoded,express会自动parse解析
    //前端需声明application/json,  express会自动解析
    // console.log('req: ', req);
    const singleList = req.body
    console.log('===================2222====================')
    // console.log('singleList: ',singleList);
    // return res.cc('test')
            try {
                let insertSuccess = await mmList.insertOne(singleList)
                // console.log('insertSuccess: ', insertSuccess.insertedId);
                // return res.cc('test=======')
                if(insertSuccess.acknowledged == true) res.cc({msg:'mm图片添加成功！', _id:insertSuccess.insertedId}, 666)
            }catch(err){
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }
            
}



exports.deleteMm = async (req, res) => {
    
    const reqId = req.body._id
    // let rawid = ObjectId(reqId).toString()   // 因为monogo的_id是一个构造对象,所以需要转换普通字符串进行判断
    if(!ObjectId.isValid(reqId)) return res.cc('id参数错误')  //判断是否为合法的mongo_id
    const filter = {_id: ObjectId(reqId)}
            try {
                let deleteSuccess = await mmList.deleteOne(filter)
                console.log('deleteSuccess: ', deleteSuccess);
                if(deleteSuccess.deletedCount == 1) {
                    res.cc('删除成功！', 666)
                }else{
                    res.cc('删除失败！', 999)
                }
            }catch(err){
                // res.cc({'数据库写入错误': err})
                res.cc('数据库写入错误:' + err)
            } finally {
                // db.close()
            }

            let urls = req.body.urls
            if(urls || urls?.length == 0) return // 数组为空,不需要删除操作
            // 同时删除图片
            for(let i=0; i<urls.length; i++) {
                fs.unlink(`upload/${urls[i]}`,function(error){
                    if(error){
                        console.log(error);
                        console.log(`第${i}张删除失败: ${urls[i]}`)
                        return false;
                    }
                    console.log('删除文件成功');
                })

            }

            
}


exports.modifyMm = async (req, res) => {
    
    
            
}

exports.deleteImg = async (req, res) => {   //  单张图片删除
    

    const path = req.body.path
    // console.log('path: ', path);
    // return res.cc('ceshi')
    // 同时删除图片
            fs.unlink(`upload/${path}`,function(error){
                if(error){
                    console.log(error);
                    return false;
                }
                res.cc('图片删除成功!', 666)
            })

            
}




// exports.batchAddmm = async (req, res) => {
    
//     const batchArr = req.body
//     let ll = batchArr.length
//     console.log('===================333333===================')
//     // console.log('batchArr: ', batchArr)
//     // return res.cc('test')
//             try {
//                 let insertSuccess = await mmList.insertMany(batchArr)
//                 console.log('insertSuccess: ', insertSuccess);
//                 // return res.cc('test=======')
//                 let insertll = insertSuccess.insertedCount
//                 if( insertll == ll){
//                     res.cc({msg:'mm图片批量添加成功！', _id:insertSuccess.insertedId}, 666)
//                 } else {
//                     res.cc({msg:`图片批量写入不完整, 只有${insertll}个写入成功`}, 666)
//                 }
//             }catch(err){
//                 res.cc('数据库写入错误:' + err)
//             } finally {
//                 // db.close()
//             }
            
// }