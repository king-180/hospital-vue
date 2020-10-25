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
    <el-form-item label="疾病ID" prop="diseaseid">
      <el-input v-model="dataForm.diseaseid" placeholder="疾病ID"></el-input>
    </el-form-item>
    <el-form-item label="诊断类型 1-西医 2-中医" prop="diagnosetype">
      <el-input v-model="dataForm.diagnosetype" placeholder="诊断类型 1-西医 2-中医"></el-input>
    </el-form-item>
    <el-form-item label="发病日期" prop="getsiskdate">
      <el-input v-model="dataForm.getsiskdate" placeholder="发病日期"></el-input>
    </el-form-item>
    <el-form-item label="诊断种类 1-初诊 2-终诊" prop="diagnosecate">
      <el-input v-model="dataForm.diagnosecate" placeholder="诊断种类 1-初诊 2-终诊"></el-input>
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
          diseaseid: '',
          diagnosetype: '',
          getsiskdate: '',
          diagnosecate: ''
        },
        dataRule: {
          medicalid: [
            { required: true, message: '病历ID不能为空', trigger: 'blur' }
          ],
          registid: [
            { required: true, message: '挂号ID不能为空', trigger: 'blur' }
          ],
          diseaseid: [
            { required: true, message: '疾病ID不能为空', trigger: 'blur' }
          ],
          diagnosetype: [
            { required: true, message: '诊断类型 1-西医 2-中医不能为空', trigger: 'blur' }
          ],
          getsiskdate: [
            { required: true, message: '发病日期不能为空', trigger: 'blur' }
          ],
          diagnosecate: [
            { required: true, message: '诊断种类 1-初诊 2-终诊不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/medicaldisease/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.medicalid = data.medicaldisease.medicalid
                this.dataForm.registid = data.medicaldisease.registid
                this.dataForm.diseaseid = data.medicaldisease.diseaseid
                this.dataForm.diagnosetype = data.medicaldisease.diagnosetype
                this.dataForm.getsiskdate = data.medicaldisease.getsiskdate
                this.dataForm.diagnosecate = data.medicaldisease.diagnosecate
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
              url: this.$http.adornUrl(`/baseinformation/medicaldisease/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'medicalid': this.dataForm.medicalid,
                'registid': this.dataForm.registid,
                'diseaseid': this.dataForm.diseaseid,
                'diagnosetype': this.dataForm.diagnosetype,
                'getsiskdate': this.dataForm.getsiskdate,
                'diagnosecate': this.dataForm.diagnosecate
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
