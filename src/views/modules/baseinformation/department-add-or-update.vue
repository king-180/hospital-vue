<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="科室编码" prop="deptcode">
      <el-input v-model="dataForm.deptcode" placeholder="科室编码"></el-input>
    </el-form-item>
    <el-form-item label="科室名称" prop="deptname">
      <el-input v-model="dataForm.deptname" placeholder="科室名称"></el-input>
    </el-form-item>
    <el-form-item label="科室分类" prop="deptcategoryid">
      <el-input v-model="dataForm.deptcategoryid" placeholder="科室分类"></el-input>
    </el-form-item>
    <el-form-item label="科室类型" prop="depttype">
      <el-input v-model="dataForm.depttype" placeholder="科室类型"></el-input>
    </el-form-item>
    <el-form-item label="删除标记" prop="delmark">
      <el-input v-model="dataForm.delmark" placeholder="删除标记"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          deptcode: '',
          deptname: '',
          deptcategoryid: '',
          depttype: '',
          delmark: ''
        },
        dataRule: {
          deptcode: [
            { required: true, message: '科室编码不能为空', trigger: 'blur' }
          ],
          deptname: [
            { required: true, message: '科室名称不能为空', trigger: 'blur' }
          ],
          deptcategoryid: [
            { required: true, message: '科室分类不能为空', trigger: 'blur' }
          ],
          depttype: [
            { required: true, message: '科室类型不能为空', trigger: 'blur' }
          ],
          delmark: [
            { required: true, message: '删除标记不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/baseinformation/department/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deptcode = data.department.deptcode
                this.dataForm.deptname = data.department.deptname
                this.dataForm.deptcategoryid = data.department.deptcategoryid
                this.dataForm.depttype = data.department.depttype
                this.dataForm.delmark = data.department.delmark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/baseinformation/department/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'deptcode': this.dataForm.deptcode,
                'deptname': this.dataForm.deptname,
                'deptcategoryid': this.dataForm.deptcategoryid,
                'depttype': this.dataForm.depttype,
                'delmark': this.dataForm.delmark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
