<!--
 * @Date: 2023-01-31 13:59:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-01 11:38:34
-->
<template>
<div id="clockBox">
<div class="clock">
  <p class="date">...404 error page...</p>
  <p class="time">{{ mydata.time }}</p>
  <p class="text">{{ mydata.date }}</p>
  <el-button type="primary" style="margin: 10px;">回到首页</el-button>
</div>
</div>
</template>
<script setup>


const mydata = reactive({time: '', date: ''})


const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const timerID = setInterval(updateTime, 1000);
updateTime()

function updateTime() {
  var cd = new Date();
  mydata.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
  mydata.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
  var zero = '';
  for (var i = 0; i < digit; i++) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
}

</script>
<style  lang='scss' scoped>

// html, body { height: 95% }
#clockBox{
    // width: 100%;
    // height: 100%;
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;
    background: #0f3854;
    background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%); 
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%); 
    background-size: 100%;
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff; 
    text-align: center; 
    position: absolute; 
    left: 50%; 
    top: 50%; 
    -webkit-transform: translate(-50%, -50%); 
    transform: translate(-50%, -50%); color: #daf6ff; 
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
    .clock{
 p { margin: 0; padding: 0 }
 .time { letter-spacing: 0.05em; font-size: 60px; padding: 5px 0 }
 .date { letter-spacing: 0.1em; font-size: 15px }
 .text { letter-spacing: 0.1em; font-size: 12px; padding: 20px 0 0 }
}
}
</style>