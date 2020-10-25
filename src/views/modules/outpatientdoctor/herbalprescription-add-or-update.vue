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
    <el-form-item label="开立时间" prop="creationtime">
      <el-input v-model="dataForm.creationtime" placeholder="开立时间"></el-input>
    </el-form-item>
    <el-form-item label="处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等" prop="prescriptiotype">
      <el-input v-model="dataForm.prescriptiotype" placeholder="处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等"></el-input>
    </el-form-item>
    <el-form-item label="付数" prop="paynumber">
      <el-input v-model="dataForm.paynumber" placeholder="付数"></el-input>
    </el-form-item>
    <el-form-item label="频次" prop="frequency">
      <el-input v-model="dataForm.frequency" placeholder="频次"></el-input>
    </el-form-item>
    <el-form-item label="用法 内服/外用" prop="drugsusage">
      <el-input v-model="dataForm.drugsusage" placeholder="用法 内服/外用"></el-input>
    </el-form-item>
    <el-form-item label="治法" prop="therapy">
      <el-input v-model="dataForm.therapy" placeholder="治法"></el-input>
    </el-form-item>
    <el-form-item label="治法详细" prop="detailed">
      <el-input v-model="dataForm.detailed" placeholder="治法详细"></el-input>
    </el-form-item>
    <el-form-item label="医嘱" prop="advice">
      <el-input v-model="dataForm.advice" placeholder="医嘱"></el-input>
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
          medicalid: '',
          registid: '',
          userid: '',
          prescriptionname: '',
          creationtime: '',
          prescriptiotype: '',
          paynumber: '',
          frequency: '',
          drugsusage: '',
          therapy: '',
          detailed: '',
          advice: '',
          state: ''
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
          creationtime: [
            { required: true, message: '开立时间不能为空', trigger: 'blur' }
          ],
          prescriptiotype: [
            { required: true, message: '处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等不能为空', trigger: 'blur' }
          ],
          paynumber: [
            { required: true, message: '付数不能为空', trigger: 'blur' }
          ],
          frequency: [
            { required: true, message: '频次不能为空', trigger: 'blur' }
          ],
          drugsusage: [
            { required: true, message: '用法 内服/外用不能为空', trigger: 'blur' }
          ],
          therapy: [
            { required: true, message: '治法不能为空', trigger: 'blur' }
          ],
          detailed: [
            { required: true, message: '治法详细不能为空', trigger: 'blur' }
          ],
          advice: [
            { required: true, message: '医嘱不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbalprescription/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.medicalid = data.herbalprescription.medicalid
                this.dataForm.registid = data.herbalprescription.registid
                this.dataForm.userid = data.herbalprescription.userid
                this.dataForm.prescriptionname = data.herbalprescription.prescriptionname
                this.dataForm.creationtime = data.herbalprescription.creationtime
                this.dataForm.prescriptiotype = data.herbalprescription.prescriptiotype
                this.dataForm.paynumber = data.herbalprescription.paynumber
                this.dataForm.frequency = data.herbalprescription.frequency
                this.dataForm.drugsusage = data.herbalprescription.drugsusage
                this.dataForm.therapy = data.herbalprescription.therapy
                this.dataForm.detailed = data.herbalprescription.detailed
                this.dataForm.advice = data.herbalprescription.advice
                this.dataForm.state = data.herbalprescription.state
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbalprescription/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'medicalid': this.dataForm.medicalid,
                'registid': this.dataForm.registid,
                'userid': this.dataForm.userid,
                'prescriptionname': this.dataForm.prescriptionname,
                'creationtime': this.dataForm.creationtime,
                'prescriptiotype': this.dataForm.prescriptiotype,
                'paynumber': this.dataForm.paynumber,
                'frequency': this.dataForm.frequency,
                'drugsusage': this.dataForm.drugsusage,
                'therapy': this.dataForm.therapy,
                'detailed': this.dataForm.detailed,
                'advice': this.dataForm.advice,
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
