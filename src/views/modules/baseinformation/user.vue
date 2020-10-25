<template>
  <div class="mod-config">
    <el-form :inline="true" :model="form" @keyup.enter.native="getData()">
      <el-form-item>
        <el-input v-model="form.realname" placeholder="用户真实姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.deptname" placeholder="所在科室" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="getData()">查询</el-button>
        <el-button  type="primary" icon="el-icon-circle-plus" @click="addOrUpdateHandle()">新增</el-button>
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
        prop="username"
        header-align="center"
        align="center"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="password"
        header-align="center"
        align="center"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="realname"
        header-align="center"
        align="center"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="usetype"
        header-align="center"
        align="center"
        label="用户类别">
        <template slot-scope="scope">
          <span style="">{{ formatUserType(scope.row.usetype) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="constantname"
        header-align="center"
        align="center"
        label="医生职称">
      </el-table-column>
      <el-table-column
        prop="isscheduling"
        header-align="center"
        align="center"
        label="是否参与排班">
      </el-table-column>
      <el-table-column
        prop="deptname"
        header-align="center"
        align="center"
        label="所在科室">
      </el-table-column>
      <el-table-column
        prop="registname"
        header-align="center"
        align="center"
        label="挂号级别">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="delmark"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="删除标记">-->
      <!--</el-table-column>-->
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getData"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './user-add-or-update'
  import {makeUserType} from "../../../utils/TypeFormat";

  export default {
    data () {
      return {
        loading: false,
        currPage: 1,
        pageInfo: {},
        form: {
          realname: '',
          deptname:''
        },
        dataForm: {
          realname: '',
          deptname:''
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
      formatUserType(user){
        return makeUserType(user);
      },
      indexMethod(index) {
        return index + 1;
      },
      // 获取数据列表
      getData () {
        this.dataListLoading = true
        let url = `http://localhost:88/api/baseinformation/user/list/${this.currPage}`
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
        this.getData()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getData()
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
            url: this.$http.adornUrl('/baseinformation/user/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getData()
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
