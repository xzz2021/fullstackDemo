<!--
 * @Date: 2023-01-31 11:17:00
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:49:21
-->
<template>

  <div class="adlistcontainer">


  <div  class="adlistbox" >
    <h2>这是顶部轮播图的列表编辑页</h2> 
    <div>
      <span>
        <router-link to="/"><el-button type="success" color="#ff9712" size="small" style="color:#fff;">回首页</el-button></router-link>
    </span>
    <span>
        <router-link to="/mm"><el-button type="success"  size="small" >去所有展示图片列表的编辑页</el-button></router-link>
    </span>
  </div>
  </div>
    
<div class="addBox">
    <el-button type="success" size="small" class="modify" @click="openAddbox()">{{ openAdd ? '收起面板':'添加新的项目'}}</el-button>
    <!-- <form action="http://51.79.254.187:3006/upload/uploadImg" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar">
        <input type="submit" value="提交" >
    </form>
    <el-button type="success" size="small" class="modify" @click="uploadFn()">test</el-button> -->

    <div class="addSection" v-if="openAdd">
        <!-- 图片上传 -->
     <el-upload action="#" list-type="picture-card" :auto-upload="false" v-model:file-list="fileList.self" :limit="1"
       :on-exceed="handleExceed" accept="image/jpeg,image/gif,image/png" :on-change="onUploadChange" >
           <template  #default >
            <div class="addtitle">添加图片</div>
           </template>
           <template  #file="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-delete" @click="handleRemove()">
          <div class="deleteTitle" style="font-size: 12px;">删除</div>
        </span>
      </span>
    </template>
    </el-upload>

    <!-- 添加序号 -->
        <el-input v-model.number="indexValue" size="small" style="width: 100px;margin: 6px;" maxlength="5" placeholder="输入序号" />
        
        <el-button type="primary" size="small" class="submit"  @click="submitItem()">提交</el-button>

    </div>
</div>


<div class="wholebox ">
      <div class="eachBox" v-for="item in pictureList.self" :key="item">

        <el-image  style="width: 160px; max-height: 90px;" :src="`${baseUrl}${item.url}`" fit="contain">
          <div>{{ src }}</div>
        <template #error>
        </template>
        </el-image>
        <div class="operate">
            <el-button type="primary" size="small" class="modify" @click="modifyItem(item)">修改</el-button>
            <el-input v-model.number="item.index" maxlength="5" style="width: 50px;" size="small" />
            <el-button type="danger" size="small" class="delete" @click="deleteItem(item)">删除</el-button>
        </div>
      </div>
  </div>
</div>
</template>
<script setup>

import { baseUrl } from './baseurl.js'


const pictureList = reactive({self: []})

const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0)) //数组按指定键值排序
      // 更新获取后端数据 
    const updateList = async () => {
        let aa = new xzzfetch()
      let res = await aa.getData('getAd')
      // console.log('res: =========', res);
    if(res.status == 666) {
      if(res.length == 0 ) return ElMessage({message: '数据库数据是空的!',type: 'error',offset: 70,duration: 3000,})
      pictureList.self = sortBy(res.message, 'index')  //自动按index排序
    }else{
      ElMessage.error('数据获取失败,请刷新页面或检查数据库')
    }
    }
    const  handleRemove = (file) => {
      fileList.self.length = 0
    // console.log('file: ', file);
    // 删除时 on-remove 会自动移除file文件
      }
    // 删除项目
    const deleteItem = async (item) =>{
  // item: {_id: 345345435, url: 'images/7867897huhoh.jpg'}
        // console.log('item: ', item)
        let res = await api.deleteAd(item)
        // console.log('res: ', res)
        await autoUpdateList(res)
    }
    //修改项目
    const modifyItem = async (item) =>{
        // console.log('item: ', item)
        let res = await api.modifyAd(item)
        await autoUpdateList(res)
        
    }
    //从新后端获取数据, 类似自动刷新
    const autoUpdateList = async (res) => {  // res.status, res.message
        if(!res)  return  ElMessage.error('操作失败,参数不合法!')
        if(res.status != 666) {
          ElMessage.error(res.message || '操作失败,数据异常!')
        }else{
          ElMessage({message: res.message, type: 'success',offset: 70,duration: 2000,})
          await updateList()
        }
    }



    // 添加项目函数
    const openAdd = ref(false)
    
    const openAddbox = () =>{
    openAdd.value = !openAdd.value
    openAdd.value || (fileList.self.length = 0) //面板收起时置空图片上传列表

    }
    const indexValue = ref(null)
    const submitItem = async () => {
        if(indexValue.value == null || indexValue.value == '') return ElMessage.error('请输入序号')
        if(fileList.self.length == 0) return ElMessage({message: '请添加图片后再提交!',type: 'error',offset: 70,duration: 2000,})
        let file = fileList.self[0].raw
        let index = indexValue.value
        let res = await api.uploadImg(file, index)
        await autoUpdateList(res)
        fileList.self = []
        indexValue.value = ''
    }


    // 图片上传前端相关函数
    const fileList= reactive({self: []})
    const   onUploadChange = async (file) =>{
            const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
            const isLt3M = file.size / 1024 / 1024 < 3;
            if (!isIMAGE) return ElMessage.error('只能上传jpg/png图片!')
            if (!isLt3M)  return ElMessage.error('上传文件大小不能超过 5MB!')
              fileList.self.push(file)  //  
          }
    const  handleExceed = (fileList) => {  //fileList 为超出限制的文件数组
            // console.log(fileList);
            ElMessage({message: '图片最大上传数量为1张',type: 'error',offset: 70,duration: 1500,})
          }







  onMounted(async () =>{
    await updateList()
  })

</script>


<style  lang='scss' scoped>
 
 .adlistcontainer{
  max-width: 800px;
    margin: 0 auto;
 }
 .adlistbox{

  display: flex;
  justify-content: space-between;
  min-width: 600px;
  div{
    width: 280px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
 }
 .addBox{
    margin: 10px;
    .addSection{
        margin: 10px 0;
        height: 180px;
    }
 }
.wholebox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .eachBox{
        margin: 0 10px 10px 0;
        .operate{
            display: flex;
            justify-content: space-between;
        }

    }
    
}

.errTemp{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

:deep(.el-upload--picture-card){
  margin: 0 8px 8px 0;
}
</style>