/*
 * @Date: 2023-01-31 14:41:34
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 08:58:39
 */

import { myfetch } from "./myfetch";


class xzzfetch {
    // 定义new传进来的参数  new xzzfetch('url')
    constructor(param) {
        this.encryptParam = param
        // this.baseUrl = 'http://127.0.0.1:3006/'
        this.baseUrl = 'http://xzz2022.top:3006/'
      }

    async login(userinfo) {
        try {
            return await myfetch('api/login',{headers: {'Content-Type': 'application/json'},
            body: {...userinfo, encryptParam: this.encryptParam}})   //后端有表单校验中间件,所以表单数据要铺平  //后端有表单校验中间件,所以表单数据要铺平
        } catch (error) {
            // 当接口或网络异常时,会直接走这边
            // console.log('error: ', error);
            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async getUserinfo() {
        try {
            let accessToken = window.localStorage.getItem('accessToken')  // 如果没有token,不进行网络请求,直接返回模拟数据
            if(accessToken == null) return {status: 999, message:'当前未登录,跳转登录页面!', username:''}
            return await myfetch('api2/getUserinfo',{headers: { 'Authorization': accessToken}, method: 'get'})
            // return await myfetch('api/getUserinfo',{headers: { 'Authorization': JSON.parse(window.localStorage.getItem('accessToken'))}})
        } catch (error) {
            // 当接口或网络异常时,会直接走这边
            // console.log('error: ', error);
            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async getData(val) {
        try {
            return await  myfetch(`api2/${val}`, {method: 'get'})
            
        } catch (error) {

            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }


    async addAd(body) {
        try {
            return await  myfetch(`operate/addAd`, {headers: { 'Authorization': window.localStorage.getItem('accessToken')}, body})
            
        } catch (error) {

            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }


    async deleteAd(item) {
        try {
            return await  myfetch(`operate/deleteAd`, 
            {headers: { 'Authorization': window.localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',}, body: item})
        } catch (error) {

            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async modifyAd(item) {
        try {
            return await  myfetch(`operate/modifyAd`, 
            {headers: { 'Authorization': window.localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',}, body: item})
        } catch (error) {

            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async uploadImg(file, index) {
        try {
            const body = new FormData()
            body.append('img', file)
            body.append('index', index)
            let rawres =  await fetch(`${this.baseUrl}upload/uploadImg`, 
            { method: 'post', body, headers: 
            { 'Authorization': window.localStorage.getItem('accessToken')}})
            return rawres.json()

        } catch (error) {
            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async batchUploadImg(files, item) {  // 批量上传图片 同时修改数据库信息
        function objectToFormData (obj, form, namespace) {
            const fd = form || new FormData();
            let formKey;
            
            for(var property in obj) {
                if(obj.hasOwnProperty(property)) {
                  let key = Array.isArray(obj) ? '[]' : `[${property}]`;
                  if(namespace) {
                    formKey = namespace + key;
                  } else {
                    formKey = property;
                  }
                
                  // if the property is an object, but not a File, use recursivity.
                  if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                    objectToFormData(obj[property], fd, formKey);
                  } else {
                    
                    // if it's a string or a File object
                    fd.append(formKey, obj[property]);
                  }
                  
                }
              }
            
            return fd;
              
          }
        //此处item需要是字符串或者stringfiy
        try {
            const body1 = new FormData()
            for (let i = 0; i < files.length; i++) {
                body1.append("images", files[i]);
            }
                let body = objectToFormData(item, body1, "data")
            let rawres =  await fetch(`${this.baseUrl}upload/batchUploadImg`, 
            { method: 'post', body, headers: 
            { 'Authorization': window.localStorage.getItem('accessToken')}})
            return rawres.json()
        } catch (error) {
            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }

    async deleteSingleImg(path) {
        try {
            return await  myfetch(`operate/deleteImg`, 
            {headers: { 'Authorization': window.localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',}, body: {path}})
            console.log('==================')
        } catch (error) {

            return {status: 999, message:'网络错误或者服务器未开启'}
        }

    }

    async deleteMm(item) {
        try {
            return await  myfetch(`operate/deleteMm`, 
            {headers: { 'Authorization': window.localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',}, body: item})
        } catch (error) {
            return {status: 999, message:'网络错误或者服务器未开启'}
        }
    }



    test(){
        console.log('=======test=========')
    }
}


export default xzzfetch