<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
            :data="pageInfo.list"
            border
            v-loading="loading"
            @selection-change="selectionChangeHandle"
            style="width: 100%;">
      <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50">
      </el-table-column>
      <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="50"
              header-align="center"
              align="center">
      </el-table-column>
      <el-table-column
        prop="realName"
        header-align="center"
        align="center"
        label="挂号">
      </el-table-column>
      <el-table-column
        prop="invoiceid"
        header-align="center"
        align="center"
        label="发票ID">
      </el-table-column>
      <el-table-column
        prop="itemid"
        header-align="center"
        align="center"
        label="项目ID">
      </el-table-column>
      <el-table-column
        prop="itemtype"
        header-align="center"
        align="center"
        label="项目类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatItemType(scope.row.itemtype) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="项目单价">
        <template slot-scope="scope">
          <span class="price">￥{{ scope.row.price | formatPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="deptName"
        header-align="center"
        align="center"
        label="执行科室"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createtime"
        header-align="center"
        align="center"
        label="开立时间"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="kaili"
        header-align="center"
        align="center"
        label="开立人员">
      </el-table-column>
      <el-table-column
        prop="paytime"
        header-align="center"
        align="center"
        label="收/退费时间"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.paytime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tuifei"
        header-align="center"
        align="center"
        label="收/退费人员"
        width="100">
      </el-table-column>
      <el-table-column
        prop="constantName"
        header-align="center"
        align="center"
        label="收费方式">
      </el-table-column>
      <el-table-column
        prop="backid"
        header-align="center"
        align="center"
        label="退费对应记录"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            @current-change="handlePage"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './patientcosts-add-or-update'
  import {makeItemType} from "../../../utils/TypeFormat";
  import {makeDate} from "../../../utils/TypeFormat";

  export default {
    data () {
      return {
        loading: false,
        currPage: 1,
        pageInfo: {},
        form: {
          id: '',
          constantname:''
        },
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    //dom未生成之前触发
    created(){
      this.getData()
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
      formatDate(date){
        return makeDate(date)
      },
      formatItemType(isUrgent){
        return makeItemType(isUrgent)
      },
      // 获取数据列表
      getData () {
        this.dataListLoading = true
        let url = `http://localhost:88/api/outpatientdoctor/patientcosts/list/${this.currPage}`
        this.$ajax.post(url,this.form).then((res)=>{
          this.pageInfo = res.data
          console.log(this.pageInfo)
        }).finally(()=>{
          this.loading = false
        })
      },
      //页面跳转
      handlePage(val){
        //console.log(val)
        this.currPage = val
        //加载数据
        this.getData()
      },
      //查询
      onSubmit(){
        this.currPage = 1
        this.getData();
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/outpatientdoctor/patientcosts/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    },
    filters: {
      formatPrice(val){
        const realVal = parseFloat(val).toFixed(2);
        return realVal;
      }
    }
  }
</script>
<style scoped>
  .price  {
    font-size: 14px;
    color: #F02B2B;
  }
</style>
