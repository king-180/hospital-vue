<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="病历号" prop="casenumber">
      <el-input v-model="dataForm.casenumber" placeholder="病历号"></el-input>
    </el-form-item>
    <el-form-item label="挂号ID" prop="registid">
      <el-input v-model="dataForm.registid" placeholder="挂号ID"></el-input>
    </el-form-item>
    <el-form-item label="主诉" prop="readme">
      <el-input v-model="dataForm.readme" placeholder="主诉"></el-input>
    </el-form-item>
    <el-form-item label="现病史" prop="present">
      <el-input v-model="dataForm.present" placeholder="现病史"></el-input>
    </el-form-item>
    <el-form-item label="现病治疗情况" prop="presenttreat">
      <el-input v-model="dataForm.presenttreat" placeholder="现病治疗情况"></el-input>
    </el-form-item>
    <el-form-item label="既往史" prop="history">
      <el-input v-model="dataForm.history" placeholder="既往史"></el-input>
    </el-form-item>
    <el-form-item label="过敏史" prop="allergy">
      <el-input v-model="dataForm.allergy" placeholder="过敏史"></el-input>
    </el-form-item>
    <el-form-item label="体格检查" prop="physique">
      <el-input v-model="dataForm.physique" placeholder="体格检查"></el-input>
    </el-form-item>
    <el-form-item label="检查建议" prop="proposal">
      <el-input v-model="dataForm.proposal" placeholder="检查建议"></el-input>
    </el-form-item>
    <el-form-item label="注意事项" prop="careful">
      <el-input v-model="dataForm.careful" placeholder="注意事项"></el-input>
    </el-form-item>
    <el-form-item label="检查结果" prop="checkresult">
      <el-input v-model="dataForm.checkresult" placeholder="检查结果"></el-input>
    </el-form-item>
    <el-form-item label="诊断结果" prop="diagnosis">
      <el-input v-model="dataForm.diagnosis" placeholder="诊断结果"></el-input>
    </el-form-item>
    <el-form-item label="处理意见" prop="handling">
      <el-input v-model="dataForm.handling" placeholder="处理意见"></el-input>
    </el-form-item>
    <el-form-item label="病历状态 1-暂存 2-已提交 3-诊毕" prop="casestate">
      <el-input v-model="dataForm.casestate" placeholder="病历状态 1-暂存 2-已提交 3-诊毕"></el-input>
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
          casenumber: '',
          registid: '',
          readme: '',
          present: '',
          presenttreat: '',
          history: '',
          allergy: '',
          physique: '',
          proposal: '',
          careful: '',
          checkresult: '',
          diagnosis: '',
          handling: '',
          casestate: ''
        },
        dataRule: {
          casenumber: [
            { required: true, message: '病历号不能为空', trigger: 'blur' }
          ],
          registid: [
            { required: true, message: '挂号ID不能为空', trigger: 'blur' }
          ],
          readme: [
            { required: true, message: '主诉不能为空', trigger: 'blur' }
          ],
          present: [
            { required: true, message: '现病史不能为空', trigger: 'blur' }
          ],
          presenttreat: [
            { required: true, message: '现病治疗情况不能为空', trigger: 'blur' }
          ],
          history: [
            { required: true, message: '既往史不能为空', trigger: 'blur' }
          ],
          allergy: [
            { required: true, message: '过敏史不能为空', trigger: 'blur' }
          ],
          physique: [
            { required: true, message: '体格检查不能为空', trigger: 'blur' }
          ],
          proposal: [
            { required: true, message: '检查建议不能为空', trigger: 'blur' }
          ],
          careful: [
            { required: true, message: '注意事项不能为空', trigger: 'blur' }
          ],
          checkresult: [
            { required: true, message: '检查结果不能为空', trigger: 'blur' }
          ],
          diagnosis: [
            { required: true, message: '诊断结果不能为空', trigger: 'blur' }
          ],
          handling: [
            { required: true, message: '处理意见不能为空', trigger: 'blur' }
          ],
          casestate: [
            { required: true, message: '病历状态 1-暂存 2-已提交 3-诊毕不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/medicalrecord/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.casenumber = data.medicalrecord.casenumber
                this.dataForm.registid = data.medicalrecord.registid
                this.dataForm.readme = data.medicalrecord.readme
                this.dataForm.present = data.medicalrecord.present
                this.dataForm.presenttreat = data.medicalrecord.presenttreat
                this.dataForm.history = data.medicalrecord.history
                this.dataForm.allergy = data.medicalrecord.allergy
                this.dataForm.physique = data.medicalrecord.physique
                this.dataForm.proposal = data.medicalrecord.proposal
                this.dataForm.careful = data.medicalrecord.careful
                this.dataForm.checkresult = data.medicalrecord.checkresult
                this.dataForm.diagnosis = data.medicalrecord.diagnosis
                this.dataForm.handling = data.medicalrecord.handling
                this.dataForm.casestate = data.medicalrecord.casestate
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
              url: this.$http.adornUrl(`/outpatientdoctor/medicalrecord/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'casenumber': this.dataForm.casenumber,
                'registid': this.dataForm.registid,
                'readme': this.dataForm.readme,
                'present': this.dataForm.present,
                'presenttreat': this.dataForm.presenttreat,
                'history': this.dataForm.history,
                'allergy': this.dataForm.allergy,
                'physique': this.dataForm.physique,
                'proposal': this.dataForm.proposal,
                'careful': this.dataForm.careful,
                'checkresult': this.dataForm.checkresult,
                'diagnosis': this.dataForm.diagnosis,
                'handling': this.dataForm.handling,
                'casestate': this.dataForm.casestate
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
