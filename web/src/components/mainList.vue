<!--
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-11 11:35:35
-->
<script setup>

  const rawList = reactive({self: []})
// 根据页面尺寸及页码截取当前页面表格数据
  const curList = reactive({self:[]})
  
  const currentPage = ref(1)
  const getCurList = () => {
    curList.self = rawList.self.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
  }


  import { useRouter } from 'vue-router'
    const router = useRouter()
    const toDetailPage = (item) => {
      window.localStorage.setItem('currentItem', JSON.stringify(item) )
      router.push({name: 'detail'})
      console.log('item: ', item);

    }



  // 根据屏幕确定pageSize 初始为9
  const pageSize = ref(9)
  const getSize = () => {
    let vw = window.innerWidth
    if(vw >= 601) {
      pageSize.value = 15
      }else if(vw >= 400){
        pageSize.value = 12
      }else{
        pageSize.value = 9
      }
  }


  // 获取后端数据
  const getList = async () => {
    getSize()
  let  res = await API.getData('getMm')
  // console.log('res: ', res);
    if(res.status == 666) {
      if(res.length == 0 ) return ElMessage.error('数据为空,请刷新页面或检查数据库')
      rawList.self = res.message
      getCurList()
    }else{
      ElMessage.error('数据获取失败,请刷新页面或检查数据库')
    }
}   
  watch(currentPage, async (newV, oldV) => {
      // 监听页码变化更新列表
      getCurList()
  })

  onBeforeMount(async () =>{
    await getList()
  })
</script>

<template>
<div class="listBox">
  <div class="filterBox"> 
    <!-- <el-button @click="batchAddList" style="margin: 6px">testtest</el-button> -->
  </div>
  <div v-if="curList.self.length == 0" class="emptyBox">
    <!-- <div class="tip">数据为空,请刷新页面或检查数据库</div> -->
  </div>
  <div else class="proBox">
    <div class="proList">
      <div class="previewItem" v-for="(item,index) in curList.self" :key="index" @click="toDetailPage(item)">
        <div class="itemBox">
        <el-image  style="width:100%;"  :src="`http://127.0.0.1:3006/${item.urls[0]}`" fit="cover" >
              <template #error>
                <div class="">数据异常,加载失败,检查url</div>
              </template>
        </el-image>
        <div class="describe">
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pageBox">
    <!-- 分页模块居中  style="justify-content: center;" -->
    <el-pagination style="justify-content: center;" small layout="prev, pager, next, jumper, total" :total="rawList.self.length" v-model:current-page="currentPage"
      v-model:page-size="pageSize" :hide-on-single-page="true" />
  </div>
</div>
</template>


<style scoped lang="scss">
.listBox{
  margin: 10px 0;
  width: 100%;
  .emptyBox{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    .tip{
      
    }
  }
  .proList{
    display: flex;
    flex-wrap: wrap;
    // align-items: center;

    .previewItem{
          // border: 1px solid grey;
          // border-radius: 6px;
          
      @media (min-width: 601px) {
      // @media (min-width: 601px) and (max-width: 2000px) {
      width: 19%;
        &:not(:nth-child(5n)) {
          margin-right: calc(5% / 4);
          }
      }
      @media (min-width: 401px) and (max-width: 601px) {
        width: 24.1%;
        &:not(:nth-child(4n)) {
          margin-right: calc(3.6% / 3 );
          // margin-right: 1.2% !important;
          }
      };
      @media (max-width: 401px) {
        width: 32%;
        &:not(:nth-child(3n)) {
          margin-right: calc(4% / 2);
          }
      }

      .itemBox{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        width: 100%;
        // height: 80%;
        .describe{
          vertical-align: bottom;
          margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
      }
    }


  }
  .pageBox{
    width: 100%;
    margin: 6px auto;
  }
}
</style>
