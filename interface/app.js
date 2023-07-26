/*
 * @Date: 2023-01-30 08:31:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 10:33:30
 */
/*
此处为入口文件
   ① 导入express中间件    ②封装错误输出函数res.cc      ③ 导入表单验证规则
   ④导入解析Token的相关依赖  ⑤ 导入并使用个人中心的路由模块
*/


//  ① 导入express
const  express = require('express')

//  ① 创建服务器实例
const app = express()


//  日志中间件
var morgan = require('morgan')
app.use(morgan('combined'))

//  安全中间件
const helmet = require("helmet");
// app.use(helmet());
// ==============允许跨域访问图片资源==========================
app.use(helmet({  crossOriginResourcePolicy: false, crossOriginOpenerPolicy: false }))
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

//  ① 导入cors中间件
// const cors = require('cors')
// app.use(cors())

const cors = require('cors')
const corsOptions  = { "allowedHeaders": "Content-Type,Authorization" }
app.use(cors(corsOptions))

//   ③ 全局导入joi定义验证数据规则
const Joi = require('joi')

//  ①   4.0升级后写法改变,直接内置
// ① 配置 application/json 
app.use(express.json())
//  ① 配置解析表单数据中间件，这个只能解析application/x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }))

// ④④④④导入配置文件
const config = require('./config')
// ④④④④解析token的中间件
const expressJWT = require('express-jwt')
// ④④④④④使用.unless指定不需要进行Token验证的接口
// app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\// ]}))
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api|api[0-9]|images\// ]}))

//中间件根据token解析返回用户信息  //其他函数通过req.user可以拿到
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"], credentialsRequired: false,
      getToken: function fromHeaderOrQuerystring(req) {
        if ( req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" ) {
          return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      },
    })
  );



// ②  必须在路由之前封装res.cc函数，用以抛出错误信息
// ②  err的值，可能是一个错误对象，也可能是一个错误的描述字符串
app.use((req, res, next) => {
    // status默认值为1表示失败的情况
    res.cc = function (err, status = 999) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})



// 设置静态文件目录
const path = require('path')
app.use('/images', express.static(path.join(__dirname,'upload/images')))


// var favicon = require('serve-favicon')
// app.use(favicon(path.join(__dirname, 'upload/images/unknown', 'favicon.ico')))

//  ① 导入并注册用户路由模块   登录
const userRouter = require('./router/user')
app.use('/api', userRouter)   //此处/api为路由访问的前缀


//  ① 导入 获取信息模块
const getDataRouter = require('./router/getdata')
app.use('/api2', getDataRouter)   


//  ① 导入 修改信息模块
const operateRouter = require('./router/operate')
app.use('/operate', operateRouter)  





//  ① 导入 上传模块  以及相关配置
const multer  = require('multer') //  只处理multipart/form-data类型的表单文件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let storingPath = 'upload/images/unknow'
    // console.log('req.originalUrl: ', req.originalUrl);
    switch(req.originalUrl){
      case '/upload/uploadImg' : storingPath = 'upload/images/adlist/'
        break;
      case '/upload/batchUploadImg' :  storingPath = 'upload/images/mmlist/' 
        break;
      default :  ''
        break;
    }
    // console.log('storingPath: ', storingPath);
      cb(null, storingPath)
  },
  filename: function (req, file, cb) {
    // const date = new Date()
    //     const year = date.getFullYear()
    //     const month = ('0' + (date.getMonth() + 1)).slice(-2)
    //     const day = ('0' + date.getDate()).slice(-2)
    //     const path =  year + month + day + '/'
      const uniqueSuffix =  Date.now() + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage })  //multer会在storage此处直接存储不带后缀名的文件,所以需要中间函数进行处理
const uploadRouter = require('./router/upload')
app.use('/upload', upload.any(), uploadRouter)  


// ⑤⑤⑤⑤ 导入并使用用户信息路由模块
// const userinfoRouter = require('./router/userinfo')
// // ⑤⑤⑤⑤ 以/form 开头的接口 都必须由权限，需要进行token认证
// app.use('/form', userinfoRouter)

// // ⑥⑥⑥⑥ 导入并使用获取和提交列表信息的路由模块
// const listRouter = require('./router/form')
// // ⑥⑥⑥⑥ 以/form/list 开头定义所有获取和提交列表的接口
// app.use('/form/list', listRouter)



//  ③  定义（表单验证失败后）错误级别的中间件
 app.use((err, req, res, next) => {
    //  joi验证失败导致的错误
    if(err instanceof Joi.ValidationError) return res.cc(err)
    // ④④④④④JWTtoken验证失败的返回错误            //此处最新express-jwt写法有变动
    if(err.name === 'UnauthorizedError') return res.status(401).send('token不匹配,身份认证失败！')

 })
//  ① 启动服务器
app.listen(3006,() => {
    console.log('服务启动:api入口文件')
})