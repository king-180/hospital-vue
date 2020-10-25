<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="医生ID" prop="doctorid">
      <el-input v-model="dataForm.doctorid" placeholder="医生ID"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="creationtime">
      <el-input v-model="dataForm.creationtime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等" prop="prescriptiotype">
      <el-input v-model="dataForm.prescriptiotype" placeholder="处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等"></el-input>
    </el-form-item>
    <el-form-item label="付数" prop="paynumber">
      <el-input v-model="dataForm.paynumber" placeholder="付数"></el-input>
    </el-form-item>
    <el-form-item label="用法" prop="drugsusage">
      <el-input v-model="dataForm.drugsusage" placeholder="用法"></el-input>
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
    <el-form-item label="使用范围 全院/科室/个人" prop="scope">
      <el-input v-model="dataForm.scope" placeholder="使用范围 全院/科室/个人"></el-input>
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
          name: '',
          doctorid: '',
          creationtime: '',
          prescriptiotype: '',
          paynumber: '',
          drugsusage: '',
          therapy: '',
          detailed: '',
          advice: '',
          scope: '',
          delmark: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          doctorid: [
            { required: true, message: '医生ID不能为空', trigger: 'blur' }
          ],
          creationtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          prescriptiotype: [
            { required: true, message: '处方类型 水煎煮/酒泡/打粉/制丸/装胶囊等不能为空', trigger: 'blur' }
          ],
          paynumber: [
            { required: true, message: '付数不能为空', trigger: 'blur' }
          ],
          drugsusage: [
            { required: true, message: '用法不能为空', trigger: 'blur' }
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
          scope: [
            { required: true, message: '使用范围 全院/科室/个人不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbaltemplate/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.herbaltemplate.name
                this.dataForm.doctorid = data.herbaltemplate.doctorid
                this.dataForm.creationtime = data.herbaltemplate.creationtime
                this.dataForm.prescriptiotype = data.herbaltemplate.prescriptiotype
                this.dataForm.paynumber = data.herbaltemplate.paynumber
                this.dataForm.drugsusage = data.herbaltemplate.drugsusage
                this.dataForm.therapy = data.herbaltemplate.therapy
                this.dataForm.detailed = data.herbaltemplate.detailed
                this.dataForm.advice = data.herbaltemplate.advice
                this.dataForm.scope = data.herbaltemplate.scope
                this.dataForm.delmark = data.herbaltemplate.delmark
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
              url: this.$http.adornUrl(`/outpatientdoctor/herbaltemplate/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'doctorid': this.dataForm.doctorid,
                'creationtime': this.dataForm.creationtime,
                'prescriptiotype': this.dataForm.prescriptiotype,
                'paynumber': this.dataForm.paynumber,
                'drugsusage': this.dataForm.drugsusage,
                'therapy': this.dataForm.therapy,
                'detailed': this.dataForm.detailed,
                'advice': this.dataForm.advice,
                'scope': this.dataForm.scope,
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
