<template>
  <div>
    <div style="text-align: center"><h3>新增排班规则</h3></div>
    <div style="text-align: center;  margin-top: 30px">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="科室选择：">
          <el-select v-model="form.deptName" placeholder="请选择科室类型">
            <el-option label="--请选择--" value=""></el-option>
            <el-option
              v-for="item in deptNames"
              :key="item.id"
              :label="item.deptName"
              :value="item.deptName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂号级别：">
          <el-select v-model="form.level" placeholder="请选择挂号级别">
            <el-option label="--请选择--" value=""></el-option>
            <el-option label="普通号" value="putonghao"></el-option>
            <el-option label="专家号" value="zhuanjiahao"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain icon="el-icon-delete" @click="onSubmit">清空</el-button>
        </el-form-item>
      </el-form>
      <el-form>

        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            label="医生姓名"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="星期一 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked1"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期一 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked2"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期二 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked3"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期二 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked4"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期三 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked5"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期三 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked6"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期四 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked7"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期四 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked8"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期五 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked9"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期五 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked10"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期六 上午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked11"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="星期六 下午"
            width="100">
            <template slot-scope="scope">
              <div style="margin-left: 30px">
                <el-checkbox v-model="checked12"></el-checkbox>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 20px 480px;">
          <el-form-item label="排班规则名称:" label-width="120px">
            <!--<el-col :span="8">-->
            <el-input v-model="form.name" size="medium"></el-input>
            <!--</el-col>-->
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button type="warning" @click="onSubmit">保存</el-button>
            <el-button type="primary" plain>取消</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import ElForm from "element-ui/packages/form/src/form";

  export default {
    components: {ElForm},
    data() {
      return {
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checked6: false,
        checked7: false,
        checked8: false,
        checked9: false,
        checked10: false,
        checked11: false,
        checked12: false,
        form: {
          deptName: '',
          level:''
        },
        deptNames:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
      }]
      }
    },
    //dom未生成之前触发
    created() {
      this.getData()
      this.selDepartName()
    },
    methods: {
      // 获取数据列表
      getData() {
        // this.dataListLoading = true
        // let url = `http://localhost:88/api/baseinformation/rule/list/${this.currPage}`
        // this.$ajax.post(url, this.form).then((res) => {
        //   this.pageInfo = res.data
        //   console.log(this.pageInfo)
        // }).finally(() => {
        //   this.loading = false
        // })
      },
      //取所有的大类
      selDepartName(){
        let url = `http://localhost:88/api/baseinformation/departname/list`
        this.$ajax.get(url).then((res)=>{
          this.deptNames = res.data
          // console.log("deptNames"+this.deptNames)
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },

  }
</script>
