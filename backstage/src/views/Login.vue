<!--
 * @Date: 2023-01-29 17:09:36
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 10:12:17
-->
<template>
<div class="topBox">


      <div class="mainSection">
          <div class="title">登录</div>
          <div class="formBox">
            <el-form  :model="loginForm"  :rules="rules" ref="ruleFormRef">
              <el-form-item  prop="username">
                  <el-input v-model="loginForm.username" placeholder="账号" maxlength="11" clearable/>
              </el-form-item>
              <el-form-item  prop="password">
                  <el-input v-model="loginForm.password" placeholder="密码" maxlength="11"  type="password" show-password/>
              </el-form-item>
                <el-button style="width:100%;margin:30px 0 20px 0;color:#fff; background: #ff9712;" @click="submitForm(ruleFormRef)">登录</el-button>
              <el-form-item>
              </el-form-item>
            </el-form>
          </div>
      </div>


      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      <div class="yyyy"><span class="dot"></span></div>
      </div>
</template>

<script setup>

//----☆☆☆☆----数组最好以对象包裹,避免调用出错及丢失响应性----☆☆☆☆-------
let loginForm = reactive({username: '', password: ''})


//校验规则
const rules = reactive({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  })


import { useRouter } from 'vue-router'
    const router = useRouter()

  const ruleFormRef = ref()
    //提交登录表单
    const submitForm = async (ruleFormRef) => {
      let check = await ruleFormRef.validate((valid, fields) =>  valid)
      if(!check) return
      let aa = new xzzfetch(pppwd())
      let res = await aa.login(loginForm)
      console.log('res: ', res);
      if(res.status == 999 || res.status == 404 ) return ElMessage.error(res.message)
      ElMessage.success('登录成功!')
      window.localStorage.setItem('accessToken', res.token)
      location.reload()
    }

    import sha3 from 'crypto-js/sha1.js';
      const pppwd = () => {
        let num = (Date.now() + '').slice(0, 9)
        let pwd = sha3(num + 'xzz')
        return pwd.words
    }

    onMounted(async() => {

      
    })


</script>

<style lang="scss" scoped>
.topBox{
  height: 100vh;
  display: flex;
  align-items: center;
    height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #04fafd, 5%, #119dff, 50%, #030423);
  position: absolute;

   .yyyy {
    height: 60px;
    width: 60px;
    border: 2px solid rgba(255, 255, 255, 0.7);
    border-radius: 50px;
    position: absolute;
    top: 10%;
    left: 10%;
    animation: 4s linear infinite;
  }
  .yyyy .dot {
    height: 10px;
    width: 10px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 20%;
    right: 20%;
  }
   .yyyy:nth-child(1) {
    top: 20%;
    left: 20%;
    animation: animate 8s linear infinite;
  }
   .yyyy:nth-child(2) {
    top: 60%;
    left: 80%;
    animation: animate 10s linear infinite;
  }
   .yyyy:nth-child(3) {
    top: 40%;
    left: 40%;
    animation: animate 3s linear infinite;
  }
   .yyyy:nth-child(4) {
    top: 66%;
    left: 30%;
    animation: animate 7s linear infinite;
  }
   .yyyy:nth-child(5) {
    top: 90%;
    left: 10%;
    animation: animate 9s linear infinite;
  }
   .yyyy:nth-child(6) {
    top: 30%;
    left: 60%;
    animation: animate 5s linear infinite;
  }
   .yyyy:nth-child(7) {
    top: 70%;
    left: 20%;
    animation: animate 8s linear infinite;
  }
   .yyyy:nth-child(8) {
    top: 75%;
    left: 60%;
    animation: animate 10s linear infinite;
  }
   .yyyy:nth-child(9) {
    top: 50%;
    left: 50%;
    animation: animate 6s linear infinite;
  }
   .yyyy:nth-child(10) {
    top: 45%;
    left: 20%;
    animation: animate 10s linear infinite;
  }
   .yyyy:nth-child(11) {
    top: 10%;
    left: 90%;
    animation: animate 9s linear infinite;
  }
   .yyyy:nth-child(12) {
    top: 20%;
    left: 70%;
    animation: animate 7s linear infinite;
  }
   .yyyy:nth-child(13) {
    top: 20%;
    left: 20%;
    animation: animate 8s linear infinite;
  }
   .yyyy:nth-child(14) {
    top: 60%;
    left: 5%;
    animation: animate 6s linear infinite;
  }
   .yyyy:nth-child(15) {
    top: 90%;
    left: 80%;
    animation: animate 9s linear infinite;
  }
  @keyframes animate {
    0% {
      transform: scale(0) translateY(0) rotate(70deg);
    }
    100% {
      transform: scale(1.3) translateY(-100px) rotate(360deg);
    }
  }
}
.mainSection{
  width: 80%;
  min-width: 260px;
  max-width: 350px; 
  margin: 0 auto;
  background-image: url('https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/loginLogo.png');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    // filter:blur(2px);
    .title{
      margin: 20px 0;
    }
    .formBox{
      width: 90%;
    }
}
</style>
