<!--
 * @Date: 2023-02-02 14:12:38
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-07 16:49:16
-->
<template>

<!-- <el-button text @click="dialogVisible = true">
    打开面板
  </el-button> -->

    <el-dialog  v-model="dialogVisible" title="提交信息"  width="40%" min-width="270px"  draggable
     align-center  @close="closeDialog">
   <div class="itemBox">

    <!-- 零散信息 -->

    <el-input v-model="formData.self.name" maxlength="10" style="width: 200px;" size="small">
      <template #prepend>名称</template>
    </el-input>
    <el-input v-model="formData.self.num" maxlength="10" style="width: 200px;" size="small">
      <template #prepend>编号</template>
    </el-input>
    <div class="wholeItem" >
        <div class="eachItem" v-for="(item,index) in formData.self.urls" :key="index">
          <el-image  style="width: 70px; max-height: 100px;"  :src="`${baseUrl}${item}`" fit="contain" />
           <div class="deleteBtn" @click="deleteImg(item)">X</div>
        </div>
    </div>



       <!-- 图片上传区域 -->
     <el-upload action="#" size="small" list-type="picture-card" list-size="100px" :auto-upload="false" v-model:file-list="fileList.self" 
     :limit="10" :on-exceed="handleExceed" accept="image/jpeg,image/gif,image/png" multiple :on-change="onUploadChange" :on-remove="handleRemove"
       :on-preview="handlePictureCardPreview">
       <div>添加图片</div>
    </el-upload>
   </div>
   

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitItem"> 确定提交 </el-button>
      </span>
    </template>
  </el-dialog>


    <el-dialog v-model="imgVisible" center title="图片预览" >
      <div style="height: 60vh; text-align: center;">
        <el-image style="height: 100%;" :src="previewImageUrl" alt="Preview Image" fit="fill"/>
      </div>
    </el-dialog>


</template>
<script setup>

import { baseUrl } from './baseurl.js'

const formData = reactive({self: { _id: '', name: '', num: '', urls: [] }})

const dialogVisible = ref(false)

// const updateItem = reactive({self: {}})
const openPanel = (item) => {
  // console.log('item: ', item);
  if(item == 'add') {   // 说明是新增项目
    formData.self._id = 'addNew'  //必须声明默认值addNew,配合后端判断
  }else{
    formData.self = item
  }
  dialogVisible.value = true
}

// 图片上传前端相关函数
const fileList= reactive({self: []})
const   onUploadChange = async (file) =>{
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
        const isLt3M = file.size / 1024 / 1024 < 5;
        if (!isIMAGE) return ElMessage.error('只能上传jpg/png图片!')
        if (!isLt3M)  return ElMessage.error('上传文件大小不能超过 5MB!')
          fileList.self.push(file)  //  
          // console.log('fileList.self: ', fileList.self);
      }

const  handleRemove = (file) => {
    // console.log('file: ', file);
    // 删除时 on-remove 会自动移除file文件
      }

const  handleExceed = (fileList) => {  //fileList 为超出限制的文件数组
        // console.log(fileList);
        ElMessage({message: '图片最大上传数量为10张',type: 'error',offset: 70,duration: 1500,})
      }
const imgVisible = ref(false)
const previewImageUrl = ref('')
const handlePictureCardPreview = (uploadFile) => {
  // console.log('uploadFile: ', uploadFile);
  previewImageUrl.value = uploadFile.url
  imgVisible.value = true
}

const getAttrs = (array,attr) =>array.map((item)=> item[attr])

const emit = defineEmits(['triggerFromSon']) // 触发父组件绑定的方法
const submitItem = async () => {
        // if(indexValue.value == null || indexValue.value == '') return ElMessage.error('请输入序号')
        // if(fileList.self.length == 0) return ElMessage({message: '请添加图片后再提交!',type: 'error',offset: 70,duration: 2000,})
        let fileArr = []
        fileList.self.length == 0 || (fileArr = getAttrs(fileList.self, 'raw'))
        let res = await api.batchUploadImg(fileArr , toRaw(formData.self))
        if(res.status == 999) return ElMessage.error(res.message)
        if(res.status == 666) ElMessage.success(res.message)
        fileList.self = []
        formData.self = { _id: '', name: '', num: '', urls: [] }
        // await updateList()  // 更新父组件列表
        emit('triggerFromSon');  //调用父组件方法
        dialogVisible.value = false
}

// 删除后端获取的图片列表里的单张图片
const deleteImg = async (url) => {
  formData.self.urls = formData.self.urls.filter(item => item != url) // 前端展示移除
  let res = await api.deleteSingleImg(url)
  console.log('res: ', res);
  //  后端文件移除
  // console.log('formData.self: ', formData.self);
}
      // 关闭面板的回调函数
      const closeDialog = () => {
        formData.self = { _id: '', name: '', num: '', urls: [] }  //重置表单
        fileList.self.length = 0  // 重置上传图片列表
        
      }



  defineExpose({ openPanel })
</script>
<style  lang='scss' scoped>

.itemBox{
  display: flex;
  flex-direction: column;
  >div{
    margin-bottom: 10px;
  }
  
}
.wholeItem{
  display: flex;
  flex-wrap: wrap;
.eachItem{
  position: relative;
  display: flex;
  margin-right: 6px;
  height: 60px;
  border: 1px solid red;
  border-radius: 4px;
.deleteBtn{
  position: absolute;
  top: 2px;
  right: 2px;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: rgb(255, 65, 65);
    color: #fff;
    border-radius: 50%;
    height: 16px;
    width:  16px;
    cursor: pointer;
}
}}

:deep(.el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card) {
    width: 100px;
    height: 100px;
}

:deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
  margin: 0 8px 8px 0;
}
</style>