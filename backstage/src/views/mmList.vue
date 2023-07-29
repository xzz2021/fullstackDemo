<!--
 * @Date: 2023-01-31 11:16:48
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-04 11:33:05
-->
<template>
  <div class="mmlistContainer">


        <div class="mmlistbox">
            <h2>这是所有图片展示列表的编辑页</h2>
            <div>
              <span style="margin-left:20px" >
                <router-link to="/"><el-button type="success" color="#ff9712" size="small" style="color:#fff;">回首页</el-button></router-link>
              </span>
              <span style="margin-left:20px" >
                <router-link to="/ad"><el-button type="success"  size="small" >去轮播图编辑页</el-button></router-link>
              </span>
            </div>
          </div>

          <el-button style="margin: 10px 0" type="success" size="small" class="modify" @click="openPanel('add')">增加新的项目</el-button>

          <!-- 列表展示区域 -->
        <div>列表展示区域</div>
          <div class="proList">
              <div class="previewItem" v-for="(item,index) in curList.self" :key="index">
                <div class="itemBox">
                  <el-image  style="width: 60px; height: 60%;"  :src="`http://127.0.0.1:3006/${item.urls[0]}`" fit="contain" />
                    <div class="describe">
                      <div>{{item.name}}</div>
                      <div>{{item.num}}</div>
                    </div>
                </div>
                <div class="operate">
                    <el-button type="primary" size="small" class="modify" @click="openPanel(item)">修改</el-button>
                    <el-button type="danger" size="small" class="delete" @click="deleteItem(item)">删除</el-button>
                </div>
              </div>
          </div>

          <!-- 分页模块居中  style="justify-content: center;" -->
        <div class="pageBox">
          <el-pagination style="justify-content: center;" small layout="prev, pager, next, jumper, total" 
          :total="rawList.self.length" v-model:current-page="currentPage" :page-size="30" :hide-on-single-page="true" />
        </div>


      </div>
<modifyPanel ref="modifyPanelRef" @triggerFromSon= "getList"/>
</template>
<script setup>



  // 获取后端数据 
  const rawList = reactive({self: []})
  const getList = async () => {
    let  res = await api.getData('getMm')
    if(res.status == 666) {
      if(res.length == 0 ) return ElMessage.error('数据为空,请刷新页面或检查数据库')
      rawList.self = res.message
      getCurList()
    }else{
      ElMessage.error('数据获取失败,请刷新页面或检查数据库')
    }

  }

  // 根据页面尺寸及页码截取当前页面表格数据
    const curList = reactive({self:[]})
    const currentPage = ref(1) //默认为第一页
    const getCurList = () => {
      curList.self = rawList.self.slice((currentPage.value - 1) * 30, currentPage.value * 30)
    }

// 调用打开子组件面板并传值
    const modifyPanelRef = ref(null)
    const openPanel = (val) => { 
      // console.log('val:111 ', val);
      modifyPanelRef.value.openPanel(val)
    }

     //  删除当前整个项目
     const deleteItem = async (item) => {

       let res = await api.deleteMm(item)
       console.log('res: ', res);
       if(res.status != 666) {
         ElMessage.error('数据删除失败,请刷新页面或检查数据库')
       }else{
         await getList()
       }

     }

  watch(currentPage, async (newV, oldV) => {
      // 监听页码变化更新列表
      await getCurList()
  })

   onMounted(async () =>{
    await getList()
  })


</script>
<style  lang='scss' scoped>
 .mmlistContainer{
  max-width: 800px;
    margin: 0 auto;
 }
.mmlistbox{
  display: flex;
  justify-content: space-between;
  min-width: 600px;
  div{
    width: 220px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.pageBox, .proList{
    width: 100%;
    margin: 6px auto;
  }
  .proList{
        display: flex;
        // justify-content: space-between;
    .previewItem{
      margin-right: 6px;
      .itemBox{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 80px;
        .describe{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      }
  }
  }


</style>