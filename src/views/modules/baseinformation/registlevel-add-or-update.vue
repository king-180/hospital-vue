<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="号别编码" prop="registcode">
      <el-input v-model="dataForm.registcode" placeholder="号别编码"></el-input>
    </el-form-item>
    <el-form-item label="号别名称" prop="registname">
      <el-input v-model="dataForm.registname" placeholder="号别名称"></el-input>
    </el-form-item>
    <el-form-item label="显示顺序号" prop="sequenceno">
      <el-input v-model="dataForm.sequenceno" placeholder="显示顺序号"></el-input>
    </el-form-item>
    <el-form-item label="挂号费" prop="registfee">
      <el-input v-model="dataForm.registfee" placeholder="挂号费"></el-input>
    </el-form-item>
    <el-form-item label="挂号限额" prop="registquota">
      <el-input v-model="dataForm.registquota" placeholder="挂号限额"></el-input>
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
          registcode: '',
          registname: '',
          sequenceno: '',
          registfee: '',
          registquota: '',
          delmark: ''
        },
        dataRule: {
          registcode: [
            { required: true, message: '号别编码不能为空', trigger: 'blur' }
          ],
          registname: [
            { required: true, message: '号别名称不能为空', trigger: 'blur' }
          ],
          sequenceno: [
            { required: true, message: '显示顺序号不能为空', trigger: 'blur' }
          ],
          registfee: [
            { required: true, message: '挂号费不能为空', trigger: 'blur' }
          ],
          registquota: [
            { required: true, message: '挂号限额不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/registlevel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.registcode = data.registlevel.registcode
                this.dataForm.registname = data.registlevel.registname
                this.dataForm.sequenceno = data.registlevel.sequenceno
                this.dataForm.registfee = data.registlevel.registfee
                this.dataForm.registquota = data.registlevel.registquota
                this.dataForm.delmark = data.registlevel.delmark
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
              url: this.$http.adornUrl(`/baseinformation/registlevel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'registcode': this.dataForm.registcode,
                'registname': this.dataForm.registname,
                'sequenceno': this.dataForm.sequenceno,
                'registfee': this.dataForm.registfee,
                'registquota': this.dataForm.registquota,
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
