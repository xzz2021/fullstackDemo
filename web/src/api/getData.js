/*
 * @Date: 2023-01-30 14:20:10
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 10:35:51
 */

let baseURL = 'http://xzz2022.top:3006/'

export  const getData = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}api2/${url}`, {method: 'get'}).then(
            res => res.json()).then(
            res =>  resolve(res)
        ).catch(err => resolve(err))
    })
}

