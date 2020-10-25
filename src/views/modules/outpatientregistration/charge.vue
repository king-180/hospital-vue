<template>
  <div>
    <div><h4>患者信息查询</h4></div>
    <div>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="病历号：">
          <el-input v-model="dataForm.key" placeholder="请输入病历号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mod-config">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
          prop="realname"
          header-align="center"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="constantname"
          header-align="center"
          align="center"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="idnumber"
          header-align="center"
          align="center"
          label="身份证号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="birthdate"
          header-align="center"
          align="center"
          label="出生日期"
          width="130">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatSimpleDate(scope.row.birthdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          header-align="center"
          align="center"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="agetype"
          header-align="center"
          align="center"
          label="年龄类型">
        </el-table-column>
        <el-table-column
          prop="homeaddress"
          header-align="center"
          align="center"
          label="家庭住址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="visitdate"
          header-align="center"
          align="center"
          label="本次看诊日期"
          width="130">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatSimpleDate(scope.row.visitdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="noon"
          header-align="center"
          align="center"
          label="午别">
        </el-table-column>
        <el-table-column
          prop="deptname"
          header-align="center"
          align="center"
          label="本次挂号科室"
          width="110">
        </el-table-column>
        <el-table-column
          prop="docName"
          header-align="center"
          align="center"
          label="本次挂号医生"
          width="110">
        </el-table-column>
        <el-table-column
          prop="registName"
          header-align="center"
          align="center"
          label="本次挂号级别"
          width="110">
        </el-table-column>
        <el-table-column
          prop="settleName"
          header-align="center"
          align="center"
          label="结算类别">
        </el-table-column>
        <el-table-column
          prop="isbook"
          header-align="center"
          align="center"
          label="病历本要否"
          width="100">
        </el-table-column>
        <el-table-column
          prop="registtime"
          header-align="center"
          align="center"
          label="挂号时间"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.visitdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="registerid"
          header-align="center"
          align="center"
          label="挂号员">
        </el-table-column>
        <el-table-column
          prop="visitstate"
          header-align="center"
          align="center"
          label="本次看诊状态"
          width="110">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatVisitState(scope.row.visitstate) }}</span>
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
  </div>
</template>

<script>
  import AddOrUpdate from './register-add-or-update'
  import {makeSimpleDate} from "../../../utils/TypeFormat"
  import {makeDate} from "../../../utils/TypeFormat";
  import {makeVisitState} from "../../../utils/TypeFormat";

  export default {
    data() {
      return {
        loading: false,
        currPage: 1,
        pageInfo: {},
        form: {
          id: '',
          constantname: ''
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
    created() {
      this.getData()
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
      formatSimpleDate(date) {
        return makeSimpleDate(date)
      },
      formatDate(date) {
        return makeDate(date)
      },
      formatVisitState(visit) {
        return makeVisitState(visit)
      }
      ,
      // 获取数据列表
      getData() {
        this.dataListLoading = true
        let url = `http://localhost:88/api/outpatientregistration/register/list/${this.currPage}`
        this.$ajax.post(url, this.form).then((res) => {
          this.pageInfo = res.data
          console.log(this.pageInfo)
        }).finally(() => {
          this.loading = false
        })
      },
      //页面跳转
      handlePage(val) {
        //console.log(val)
        this.currPage = val
        //加载数据
        this.getData()
      },
      //查询
      onSubmit() {
        this.currPage = 1
        this.getData();
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/xxxxxxxxxxxxx/register/delete'),
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
