/*
 * @Date: 2023-02-01 08:26:54
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-02 09:10:01
 */
// let bb = { ...aa}
// bb.yy.vv = '000'
// console.log('bb: ', aa);

// let aa = { nn: 43534, yy: { vv: 253}}
// let dd = structuredClone(aa)
// dd.yy.vv = '000'
// console.log('bb: ', aa);


let aa = 'ygho'
let bb = aa.slice(0, 6)
console.log('bb: ', bb);

const date = new Date()
const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        const doc = year + month + day
        console.log('doc: ', doc);