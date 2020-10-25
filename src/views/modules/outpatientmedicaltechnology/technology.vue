<template>
  <div class="mod-config">

    <el-row :gutter="20">
      <el-col :span="10">
        <el-container>
          <el-header>
            <el-button size="mini" type="primary" plain>医技模板:</el-button>
            <el-button icon="el-icon-circle-plus" type="text" @click="addOrUpdateHandle()" style="margin-left: 280px">
              新建模板
            </el-button>
          </el-header>
          <el-main>
            <el-form :inline="true" label-width="80px" label-position="left" size="small" :model="form"
                     class="demo-form-inline">
              <el-form-item label="名称:">
                <el-col :span="20">
                  <el-input v-model="form.id" placeholder="输入模板名称"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="范围:">
                <el-col :span="18">
                  <el-select v-model="form.username" placeholder="所有">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="记录类型:">
                <el-col :span="18">
                  <el-select v-model="form.username" placeholder="所有">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="pageInfo1.list"
              v-loading="loading"
              @selection-change="selectionChangeHandle"
              style="width: 100%;margin-top: 20px">
              <el-table-column
                prop="name"
                header-align="center"
                align="center"
                label="模板名称">
              </el-table-column>
              <el-table-column
                prop="creationtime"
                header-align="center"
                align="center"
                label="创建时间"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formatDate(scope.row.creationtime) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="scope"
                header-align="center"
                align="center"
                label="范围">
              </el-table-column>
              <el-table-column
                prop="recordtype"
                header-align="center"
                align="center"
                label="类型">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ formatRecordType(scope.row.recordtype) }}</span>
              </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="14">
        <el-container>
          <el-header>
            <el-button size="mini" type="primary" plain>模板明细:</el-button>
            <el-button icon="el-icon-edit" type="text" @click="addOrUpdateHandle()" style="margin-left: 180px">修改模板
            </el-button>
            <el-button icon="el-icon-delete" type="text" @click="addOrUpdateHandle()" style="margin-left: 200px">删除模板
            </el-button>
          </el-header>
          <el-main>
            <el-form ref="form" :inline="true" :model="form" label-width="100px" size="small">
              <el-form-item label="模板名称">
                <el-input v-model="form.name" placeholder="请输入模板名称"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" style="margin-left: 14px">
                <el-col :span="20">
                  <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="模板范围">
                <el-select v-model="form.region" placeholder="请选择模板范围">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="记录类型">
                <el-select v-model="form.region" placeholder="请选择记录类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button type="primary" size="small">增加检验项目</el-button>
            <el-table
              :data="pageInfo.list"
              v-loading="loading"
              @selection-change="selectionChangeHandle"
              style="width: 100%;margin-top: 20px">
              <el-table-column
                prop="itemcode"
                header-align="center"
                align="center"
                label="项目编码">
              </el-table-column>
              <el-table-column
                prop="itemname"
                header-align="center"
                align="center"
                label="项目名称">
              </el-table-column>
              <el-table-column
                prop="format"
                header-align="center"
                align="center"
                label="项目规格">
              </el-table-column>
              <el-table-column
                prop="deptname"
                header-align="center"
                align="center"
                label="执行科室">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './disease-add-or-update'
  import {makeRecordType} from "../../../utils/TypeFormat";
  import {makeDate} from "../../../utils/TypeFormat";

  export default {
    data() {
      return {
        loading: false,
        currPage: 1,
        pageInfo1: {},
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
      this.getData(),
      this.getData1()
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
      formatDate(date){
        return makeDate(date)
      },
      formatRecordType(recordtype){
        return makeRecordType(recordtype)
      },
      // 获取数据列表
      getData1 () {
        this.dataListLoading = true
        let url = `http://localhost:88/api/outpatientdoctor/checktemplate/list/${this.currPage}`
        this.$ajax.post(url,this.form).then((res)=>{
          this.pageInfo1 = res.data
          console.log(this.pageInfo1)
        }).finally(()=>{
          this.loading = false
        })
      },
      // 获取数据列表
      getData() {
        this.dataListLoading = true
        let url = `http://localhost:88/api/baseinformation/fmeditem/list/${this.currPage}`
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
            url: this.$http.adornUrl('/xxxxxxxxxxxxx/disease/delete'),
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
<style>
  .el-header {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .class1 {
    background-color: #ffffff;
    color: blue;
    text-align: center;
  }
</style>
