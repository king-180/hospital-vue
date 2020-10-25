<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="成药处方ID" prop="prescriptionid">
      <el-input v-model="dataForm.prescriptionid" placeholder="成药处方ID"></el-input>
    </el-form-item>
    <el-form-item label="药品ID" prop="drugsid">
      <el-input v-model="dataForm.drugsid" placeholder="药品ID"></el-input>
    </el-form-item>
    <el-form-item label="用法" prop="drugsusage">
      <el-input v-model="dataForm.drugsusage" placeholder="用法"></el-input>
    </el-form-item>
    <el-form-item label="用量" prop="dosage">
      <el-input v-model="dataForm.dosage" placeholder="用量"></el-input>
    </el-form-item>
    <el-form-item label="频次" prop="frequency">
      <el-input v-model="dataForm.frequency" placeholder="频次"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-input v-model="dataForm.state" placeholder="状态"></el-input>
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
          prescriptionid: '',
          drugsid: '',
          drugsusage: '',
          dosage: '',
          frequency: '',
          amount: '',
          state: ''
        },
        dataRule: {
          prescriptionid: [
            { required: true, message: '成药处方ID不能为空', trigger: 'blur' }
          ],
          drugsid: [
            { required: true, message: '药品ID不能为空', trigger: 'blur' }
          ],
          drugsusage: [
            { required: true, message: '用法不能为空', trigger: 'blur' }
          ],
          dosage: [
            { required: true, message: '用量不能为空', trigger: 'blur' }
          ],
          frequency: [
            { required: true, message: '频次不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/prescriptiondetailed/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.prescriptionid = data.prescriptiondetailed.prescriptionid
                this.dataForm.drugsid = data.prescriptiondetailed.drugsid
                this.dataForm.drugsusage = data.prescriptiondetailed.drugsusage
                this.dataForm.dosage = data.prescriptiondetailed.dosage
                this.dataForm.frequency = data.prescriptiondetailed.frequency
                this.dataForm.amount = data.prescriptiondetailed.amount
                this.dataForm.state = data.prescriptiondetailed.state
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
              url: this.$http.adornUrl(`/outpatientdoctor/prescriptiondetailed/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'prescriptionid': this.dataForm.prescriptionid,
                'drugsid': this.dataForm.drugsid,
                'drugsusage': this.dataForm.drugsusage,
                'dosage': this.dataForm.dosage,
                'frequency': this.dataForm.frequency,
                'amount': this.dataForm.amount,
                'state': this.dataForm.state
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
