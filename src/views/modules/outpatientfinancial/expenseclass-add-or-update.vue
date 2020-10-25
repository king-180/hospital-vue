<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="费用科目编码" prop="expcode">
      <el-input v-model="dataForm.expcode" placeholder="费用科目编码"></el-input>
    </el-form-item>
    <el-form-item label="费用科目名称" prop="expname">
      <el-input v-model="dataForm.expname" placeholder="费用科目名称"></el-input>
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
          expcode: '',
          expname: '',
          delmark: ''
        },
        dataRule: {
          expcode: [
            { required: true, message: '费用科目编码不能为空', trigger: 'blur' }
          ],
          expname: [
            { required: true, message: '费用科目名称不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/expenseclass/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.expcode = data.expenseclass.expcode
                this.dataForm.expname = data.expenseclass.expname
                this.dataForm.delmark = data.expenseclass.delmark
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/expenseclass/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'expcode': this.dataForm.expcode,
                'expname': this.dataForm.expname,
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
