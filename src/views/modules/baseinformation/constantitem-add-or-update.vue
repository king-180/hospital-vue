<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="所属常数类别ID" prop="constanttypeid">
        <el-input v-model="dataForm.constanttypeid" placeholder="所属常数类别ID"></el-input>
      </el-form-item>
      <el-form-item label="常数项编码" prop="constantcode">
        <el-input v-model="dataForm.constantcode" placeholder="常数项编码"></el-input>
      </el-form-item>
      <el-form-item label="常数项名称" prop="constantname">
        <el-input v-model="dataForm.constantname" placeholder="常数项名称"></el-input>
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
          constanttypeid: '',
          constantcode: '',
          constantname: '',
          delmark: ''
        },
        dataRule: {
          constanttypeid: [
            { required: true, message: '所属常数类别ID不能为空', trigger: 'blur' }
          ],
          constantcode: [
            { required: true, message: '常数项编码不能为空', trigger: 'blur' }
          ],
          constantname: [
            { required: true, message: '常数项名称不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/constantitem/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.constanttypeid = data.constantitem.constanttypeid
                this.dataForm.constantcode = data.constantitem.constantcode
                this.dataForm.constantname = data.constantitem.constantname
                this.dataForm.delmark = data.constantitem.delmark
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
              url: this.$http.adornUrl(`/baseinformation/constantitem/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'constanttypeid': this.dataForm.constanttypeid,
                'constantcode': this.dataForm.constantcode,
                'constantname': this.dataForm.constantname,
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
