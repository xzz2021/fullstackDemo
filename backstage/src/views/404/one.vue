<!--
 * @Date: 2023-01-31 13:59:02
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 10:59:19
-->
<template>
<div class="topBox">
  <!-- <div class="temp"> -->
    <svg viewBox="0 0 600 300">
    <!-- Symbol -->
    <symbol id="s-text">
    <text text-anchor="middle" x="50%" y="50%" dy=".35em"> 404 </text>
    </symbol>

    <!-- Duplicate symbols -->
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>
    <use xlink:href="#s-text" class="text"></use>

</svg>

<router-link to="/home"><a class="info" >返回首页</a></router-link>

  <!-- </div> -->
</div>

</template>
<script setup>


</script>
<style  lang='scss' scoped>

/*css reset */

a { 
    text-decoration: none;
}
ol,ul {
    list-style: none;
}
img { 
    border: 0;
}

.topBox{
    width: 100%;
    height: 100%;
    background: #111;
    background-size: .2em 100%;
    font: 14.5em/1 Open Sans, Impact;
    text-transform: uppercase;
    margin: 0;
}

.text {
    fill: none;
    stroke-width: 4;
    stroke-linejoin: round;
    stroke-dasharray: 70 330;
    stroke-dashoffset: 0;
    -webkit-animation: stroke 6s infinite linear;
    animation: stroke 6s infinite linear;
}
.text:nth-child(5n + 1) {
    stroke: #F2385A;
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
}
.text:nth-child(5n + 2) {
    stroke: #F5A503;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
}
.text:nth-child(5n + 3) {
    stroke: #E9F1DF;
    -webkit-animation-delay: -3.6s;
    animation-delay: -3.6s;
}
.text:nth-child(5n + 4) {
    stroke: #56D9CD;
    -webkit-animation-delay: -4.8s;
    animation-delay: -4.8s;
}
.text:nth-child(5n + 5) {
    stroke: #3AA1BF;
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
}
@-webkit-keyframes stroke {
    100% {
        stroke-dashoffset: -400;
    }
}
@keyframes stroke {
    100% {
        stroke-dashoffset: -400;
    }
}


svg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
}

.info{
  position:fixed;
  margin-top:120%;
  color:#999;
  font-size:18px;
  text-align:center;
  bottom:40px; 
  width:100%;
  cursor: pointer;
}


</style>