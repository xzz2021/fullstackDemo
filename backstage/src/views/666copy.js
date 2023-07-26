/*
 * @Date: 2023-02-02 16:47:10
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 14:57:51
 */


// const getAttrs = (array,attr) =>  array.map((item)=> item[attr])

// let  aaa = [{dd: 54646, ckjh: 897}, {dd: 7000, ckjh: 897}, {dd: 3333, ckjh: 897}]

// let bbbb= getAttrs(aaa, 'dd')
// console.log('bbbb: ', bbbb);



// let   bbbb =  {"_id":34564645,"name":"436546","num":"546546"}

// let  ba = JSON.parse(bbbb)
// console.log('ba: ', ba);

//  let  files = []
//  for (let i = 0; i < files.length; i++) {
//     console.log('files[i]: ', files[i]);
// }
// console.log('111111111')


// setInterval(() => {
//     let time = (Date.now() + '').slice(0, 10);
    
//     console.log('time: ', time);
// }, 3000);


// 1675418270    

// import sha3 from 'crypto-js/sha1.js';
// let num = (Date.now() + '').slice(0, 9)
// let secret = sha3(num + '3445645')
// // let secret1 = sha3(bb)
// console.log('secret: ', secret.words[3]);

let url = 'http://785tyuguyt'
url.includes('https') ? '' : url = url.replace('http', 'https')
console.log('url: ', url);