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
        prop="casenumber"
        header-align="center"
        align="center"
        label="病历号">
      </el-table-column>
      <el-table-column
        prop="realName"
        header-align="center"
        align="center"
        label="挂号">
      </el-table-column>
      <el-table-column
        prop="readme"
        header-align="center"
        align="center"
        label="主诉"
        width="600">
      </el-table-column>
      <el-table-column
        prop="present"
        header-align="center"
        align="center"
        label="现病史"
        width="700">
      </el-table-column>
      <el-table-column
        prop="presenttreat"
        header-align="center"
        align="center"
        label="现病治疗情况"
        width="600">
      </el-table-column>
      <el-table-column
        prop="history"
        header-align="center"
        align="center"
        label="既往史"
        width="400">
      </el-table-column>
      <el-table-column
        prop="allergy"
        header-align="center"
        align="center"
        label="过敏史"
        width="100">
      </el-table-column>
      <el-table-column
        prop="physique"
        header-align="center"
        align="center"
        label="体格检查"
        width="600">
      </el-table-column>
      <el-table-column
        prop="proposal"
        header-align="center"
        align="center"
        label="检查建议">
      </el-table-column>
      <el-table-column
        prop="careful"
        header-align="center"
        align="center"
        label="注意事项">
      </el-table-column>
      <el-table-column
        prop="checkresult"
        header-align="center"
        align="center"
        label="检查结果">
      </el-table-column>
      <el-table-column
        prop="diagnosis"
        header-align="center"
        align="center"
        label="诊断结果">
      </el-table-column>
      <el-table-column
        prop="handling"
        header-align="center"
        align="center"
        label="处理意见">
      </el-table-column>
      <el-table-column
        prop="casestate"
        header-align="center"
        align="center"
        label="病历状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatCaseState(scope.row.casestate) }}</span>
        </template>
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
  import AddOrUpdate from './medicalrecord-add-or-update'
  import {makeCaseState} from "../../../utils/TypeFormat";

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
      formatCaseState(caseState){
        return makeCaseState(caseState)
      }
      ,
      // 获取数据列表
      getData () {
        this.dataListLoading = true
        let url = `http://localhost:88/api/outpatientdoctor/medicalrecord/list/${this.currPage}`
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
            url: this.$http.adornUrl('/outpatientdoctor/medicalrecord/delete'),
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
    }
  }
</script>
