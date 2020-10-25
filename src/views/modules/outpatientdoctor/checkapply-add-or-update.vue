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
    <el-form-item label="项目ID" prop="itemid">
      <el-input v-model="dataForm.itemid" placeholder="项目ID"></el-input>
    </el-form-item>
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item label="目的要求" prop="objective">
      <el-input v-model="dataForm.objective" placeholder="目的要求"></el-input>
    </el-form-item>
    <el-form-item label="检查部位" prop="position">
      <el-input v-model="dataForm.position" placeholder="检查部位"></el-input>
    </el-form-item>
    <el-form-item label="是否加急 1为加急 0为不加急" prop="isurgent">
      <el-input v-model="dataForm.isurgent" placeholder="是否加急 1为加急 0为不加急"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="num">
      <el-input v-model="dataForm.num" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="开立时间" prop="creationtime">
      <el-input v-model="dataForm.creationtime" placeholder="开立时间"></el-input>
    </el-form-item>
    <el-form-item label="开立医生ID" prop="doctorid">
      <el-input v-model="dataForm.doctorid" placeholder="开立医生ID"></el-input>
    </el-form-item>
    <el-form-item label="检查人员ID" prop="checkoperid">
      <el-input v-model="dataForm.checkoperid" placeholder="检查人员ID"></el-input>
    </el-form-item>
    <el-form-item label="结果录入人员ID" prop="resultoperid">
      <el-input v-model="dataForm.resultoperid" placeholder="结果录入人员ID"></el-input>
    </el-form-item>
    <el-form-item label="检查时间" prop="checktime">
      <el-input v-model="dataForm.checktime" placeholder="检查时间"></el-input>
    </el-form-item>
    <el-form-item label="检查结果" prop="result">
      <el-input v-model="dataForm.result" placeholder="检查结果"></el-input>
    </el-form-item>
    <el-form-item label="结果时间" prop="resulttime">
      <el-input v-model="dataForm.resulttime" placeholder="结果时间"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-input v-model="dataForm.state" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="记录类型 1-检查 2-检验 3-处置" prop="recordtype">
      <el-input v-model="dataForm.recordtype" placeholder="记录类型 1-检查 2-检验 3-处置"></el-input>
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
          itemid: '',
          name: '',
          objective: '',
          position: '',
          isurgent: '',
          num: '',
          creationtime: '',
          doctorid: '',
          checkoperid: '',
          resultoperid: '',
          checktime: '',
          result: '',
          resulttime: '',
          state: '',
          recordtype: ''
        },
        dataRule: {
          medicalid: [
            { required: true, message: '病历ID不能为空', trigger: 'blur' }
          ],
          registid: [
            { required: true, message: '挂号ID不能为空', trigger: 'blur' }
          ],
          itemid: [
            { required: true, message: '项目ID不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          objective: [
            { required: true, message: '目的要求不能为空', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '检查部位不能为空', trigger: 'blur' }
          ],
          isurgent: [
            { required: true, message: '是否加急 1为加急 0为不加急不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          creationtime: [
            { required: true, message: '开立时间不能为空', trigger: 'blur' }
          ],
          doctorid: [
            { required: true, message: '开立医生ID不能为空', trigger: 'blur' }
          ],
          checkoperid: [
            { required: true, message: '检查人员ID不能为空', trigger: 'blur' }
          ],
          resultoperid: [
            { required: true, message: '结果录入人员ID不能为空', trigger: 'blur' }
          ],
          checktime: [
            { required: true, message: '检查时间不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '检查结果不能为空', trigger: 'blur' }
          ],
          resulttime: [
            { required: true, message: '结果时间不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          recordtype: [
            { required: true, message: '记录类型 1-检查 2-检验 3-处置不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/checkapply/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.medicalid = data.checkapply.medicalid
                this.dataForm.registid = data.checkapply.registid
                this.dataForm.itemid = data.checkapply.itemid
                this.dataForm.name = data.checkapply.name
                this.dataForm.objective = data.checkapply.objective
                this.dataForm.position = data.checkapply.position
                this.dataForm.isurgent = data.checkapply.isurgent
                this.dataForm.num = data.checkapply.num
                this.dataForm.creationtime = data.checkapply.creationtime
                this.dataForm.doctorid = data.checkapply.doctorid
                this.dataForm.checkoperid = data.checkapply.checkoperid
                this.dataForm.resultoperid = data.checkapply.resultoperid
                this.dataForm.checktime = data.checkapply.checktime
                this.dataForm.result = data.checkapply.result
                this.dataForm.resulttime = data.checkapply.resulttime
                this.dataForm.state = data.checkapply.state
                this.dataForm.recordtype = data.checkapply.recordtype
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
              url: this.$http.adornUrl(`/outpatientdoctor/checkapply/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'medicalid': this.dataForm.medicalid,
                'registid': this.dataForm.registid,
                'itemid': this.dataForm.itemid,
                'name': this.dataForm.name,
                'objective': this.dataForm.objective,
                'position': this.dataForm.position,
                'isurgent': this.dataForm.isurgent,
                'num': this.dataForm.num,
                'creationtime': this.dataForm.creationtime,
                'doctorid': this.dataForm.doctorid,
                'checkoperid': this.dataForm.checkoperid,
                'resultoperid': this.dataForm.resultoperid,
                'checktime': this.dataForm.checktime,
                'result': this.dataForm.result,
                'resulttime': this.dataForm.resulttime,
                'state': this.dataForm.state,
                'recordtype': this.dataForm.recordtype
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
