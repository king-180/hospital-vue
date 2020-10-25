<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="病历ID" prop="medicalid">
      <el-input v-model="dataForm.medicalid" placeholder="病历ID"></el-input>
    </el-form-item>
    <el-form-item label="挂号ID" prop="registid">
      <el-input v-model="dataForm.registid" placeholder="挂号ID"></el-input>
    </el-form-item>
    <el-form-item label="开立医生ID" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="开立医生ID"></el-input>
    </el-form-item>
    <el-form-item label="处方名称" prop="prescriptionname">
      <el-input v-model="dataForm.prescriptionname" placeholder="处方名称"></el-input>
    </el-form-item>
    <el-form-item label="开立时间" prop="prescriptiontime">
      <el-input v-model="dataForm.prescriptiontime" placeholder="开立时间"></el-input>
    </el-form-item>
    <el-form-item label="处方状态" prop="prescriptionstate">
      <el-input v-model="dataForm.prescriptionstate" placeholder="处方状态"></el-input>
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
          medicalid: '',
          registid: '',
          userid: '',
          prescriptionname: '',
          prescriptiontime: '',
          prescriptionstate: ''
        },
        dataRule: {
          medicalid: [
            { required: true, message: '病历ID不能为空', trigger: 'blur' }
          ],
          registid: [
            { required: true, message: '挂号ID不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '开立医生ID不能为空', trigger: 'blur' }
          ],
          prescriptionname: [
            { required: true, message: '处方名称不能为空', trigger: 'blur' }
          ],
          prescriptiontime: [
            { required: true, message: '开立时间不能为空', trigger: 'blur' }
          ],
          prescriptionstate: [
            { required: true, message: '处方状态不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/prescription/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.medicalid = data.prescription.medicalid
                this.dataForm.registid = data.prescription.registid
                this.dataForm.userid = data.prescription.userid
                this.dataForm.prescriptionname = data.prescription.prescriptionname
                this.dataForm.prescriptiontime = data.prescription.prescriptiontime
                this.dataForm.prescriptionstate = data.prescription.prescriptionstate
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
              url: this.$http.adornUrl(`/outpatientdoctor/prescription/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'medicalid': this.dataForm.medicalid,
                'registid': this.dataForm.registid,
                'userid': this.dataForm.userid,
                'prescriptionname': this.dataForm.prescriptionname,
                'prescriptiontime': this.dataForm.prescriptiontime,
                'prescriptionstate': this.dataForm.prescriptionstate
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
