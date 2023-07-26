/*
 * @Date: 2023-02-01 17:32:34
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-03 16:34:14
 */

// ②导入数据库操作模块
const db = require('../db/index')
const adList = db.collection('adList')
const mmList = db.collection('mmList')
const ObjectId = require('mongodb').ObjectId



exports.uploadImg = async (req, res) => {     //  此处定义轮播图数据   单张上传
    // console.log('=========================');
    // console.log('req.body: ', req.body.index);  //拿到随图片上传一起发来的附属的data
    // console.log('req: filesssss', req.files);  //拿到图片数据
    // [{
    //     fieldname: 'avatar',
    //     originalname: 'ChMkJ1bKycOIdN83ABDVlUV0ogcAALISQBLqNAAENWt739 - å\x89¯æ\x9C¬.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: 'images',
    //     filename: '6ab3f41f040bc4d1d7d7f33ca3234d0a',
    //     path: 'images\\6ab3f41f040bc4d1d7d7f33ca3234d0a',
    //     size: 1103253
    //   }]
    let index = req.body.index
    // return res.cc('测试:')
     // 因为multer会自动保存文件,所以此处什么都不需要做,直接返回文件名即可
     //  =======此处应当作目录不存在的错误拦截=否则程序会无响应==========暂时未找到拦截的方法=========
     let file = req.files[0]
     let path =  'images/adlist/' + file.filename

    try {
        let insertSuccess = await adList.insertOne({index, url: path })
        // console.log('insertSuccess: ', insertSuccess)
        if(insertSuccess.acknowledged == true) res.cc('首页图片信息添加成功！', 666)
    }catch(err){
        // res.cc({'数据库写入错误': err})
        res.cc('数据库写入错误:' + err)
    } finally {
        // db.close()
    }

   
    // let path =  file.originalname.slice(0,8)+ '-' + file.destination + file.filename
    // res.send({path, status: 666, message: '文件上传成功!'})
    // let file  = req.files

            
}



exports.batchUploadImg = async (req, res) => {      //  此处定义角色图数据   多张批量上传
    // console.log('req.body: ', req.body.index);  //拿到随图片上传一起发来的附属的data
    // console.log('req: filesssss', req.files);  //拿到图片数据的数组

    // return
     // 因为multer会自动保存文件,所以此处什么都不需要做,直接返回文件名即可
     let item = req.body.data
     let urls = item.urls || []  // 如果前端的urls是空数组的话,,发送过来会不存在,所以要做下undefined判断
     let files = req.files
     console.log('files:========= ', files);
     for (let i = 0; i < files.length; i++) {
        urls.push('images/mmlist/' + files[i].filename)
      }
      const updateData = { urls, name: item.name, num: item.num}

      if(item._id == 'addNew') {  //说明是新增,没有id  所以需要走插入数据,同时生成新的id
        try {
            let insertSuccess = await mmList.insertOne(updateData)
            if(insertSuccess.acknowledged == true) res.cc('mm图片及信息添加成功！', 666)
        }catch(err){
            res.cc('数据库写入错误:' + err)
        } finally {
            // db.close()
        }
      }else{

      if(!ObjectId.isValid(item._id)) return res.end('修改失败: 参数错误或id不存在')  //判断是否为合法的mongo_id
      const filter = {_id: ObjectId(item._id)}
    try {
        let insertSuccess = await mmList.replaceOne(filter, updateData, { upsert: true})//此处会直接替换修改数据   //没找到会自动插入,但是会使用前端传来的已有id
        // console.log('insertSuccess: ', insertSuccess)
        if(insertSuccess.acknowledged == true) res.cc('mm图片及信息修改成功！', 666)
    }catch(err){
        // res.cc({'数据库写入错误': err})
        res.cc('数据库写入错误:' + err)
    } finally {
        // db.close()
    } 
}

   
    // let path =  file.originalname.slice(0,8)+ '-' + file.destination + file.filename
    // res.send({path, status: 666, message: '文件上传成功!'})
    // let file  = req.files

            
}


