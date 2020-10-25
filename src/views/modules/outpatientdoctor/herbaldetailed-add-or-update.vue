<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="草药处方ID" prop="herbalpresid">
      <el-input v-model="dataForm.herbalpresid" placeholder="草药处方ID"></el-input>
    </el-form-item>
    <el-form-item label="药品ID" prop="herbalid">
      <el-input v-model="dataForm.herbalid" placeholder="药品ID"></el-input>
    </el-form-item>
    <el-form-item label="用量" prop="dosage">
      <el-input v-model="dataForm.dosage" placeholder="用量"></el-input>
    </el-form-item>
    <el-form-item label="药品单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="药品单价"></el-input>
    </el-form-item>
    <el-form-item label="脚注" prop="footnote">
      <el-input v-model="dataForm.footnote" placeholder="脚注"></el-input>
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
          herbalpresid: '',
          herbalid: '',
          dosage: '',
          price: '',
          footnote: ''
        },
        dataRule: {
          herbalpresid: [
            { required: true, message: '草药处方ID不能为空', trigger: 'blur' }
          ],
          herbalid: [
            { required: true, message: '药品ID不能为空', trigger: 'blur' }
          ],
          dosage: [
            { required: true, message: '用量不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '药品单价不能为空', trigger: 'blur' }
          ],
          footnote: [
            { required: true, message: '脚注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbaldetailed/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.herbalpresid = data.herbaldetailed.herbalpresid
                this.dataForm.herbalid = data.herbaldetailed.herbalid
                this.dataForm.dosage = data.herbaldetailed.dosage
                this.dataForm.price = data.herbaldetailed.price
                this.dataForm.footnote = data.herbaldetailed.footnote
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbaldetailed/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'herbalpresid': this.dataForm.herbalpresid,
                'herbalid': this.dataForm.herbalid,
                'dosage': this.dataForm.dosage,
                'price': this.dataForm.price,
                'footnote': this.dataForm.footnote
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
