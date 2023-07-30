/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 10:29:20
 */
const { MongoClient } = require("mongodb");
// const uri = "mongodb://xzz:zzzxxxccc@101.43.17.236:77";  // 容器内通信需要以容器ip连接,而不是网关
const uri = "mongodb://xzz:zzzxxxccc@xzz2022.top:77";  // 容器内通信需要以容器ip连接,而不是网关ip
// const uri = "mongodb://xzz:zzzxxxccc@127.0.0.1:27017";  // 容器内通信需要以容器ip连接,而不是网关ip
// const uri = "mongodb://xzz:zzzxxxccc@51.79.254.187:27017";  // 容器内通信需要以容器ip连接,而不是网关ip

//  ☆  踩坑记录   新版本uri需要 加上 +srv (直接域名不允许端口号)
// const uri = "mongodb+srv://xzz:zzzxxxccc@cluster0.bhjpywr.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri);

const db = client.db('xzz222');
// async function run() {
//     try {
//       const database = client.db('xzz222');
//       const doc = database.collection('document')

//       console.log('-------trytry---------')
//       await doc.insertOne({mood: 'i am peaceful'})

//     } finally {
//       // Ensures that the client will close when you finish/error
//       // await client.close();
//     }
//   }
//   run().catch(console.dir);
  module.exports = db