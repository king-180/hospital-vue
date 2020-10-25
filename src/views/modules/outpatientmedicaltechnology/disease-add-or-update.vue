<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="疾病助记编码" prop="diseasecode">
      <el-input v-model="dataForm.diseasecode" placeholder="疾病助记编码"></el-input>
    </el-form-item>
    <el-form-item label="疾病名称" prop="diseasename">
      <el-input v-model="dataForm.diseasename" placeholder="疾病名称"></el-input>
    </el-form-item>
    <el-form-item label="国际ICD编码" prop="diseaseicd">
      <el-input v-model="dataForm.diseaseicd" placeholder="国际ICD编码"></el-input>
    </el-form-item>
    <el-form-item label="疾病所属分类" prop="disecategoryid">
      <el-input v-model="dataForm.disecategoryid" placeholder="疾病所属分类"></el-input>
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
          diseasecode: '',
          diseasename: '',
          diseaseicd: '',
          disecategoryid: '',
          delmark: ''
        },
        dataRule: {
          diseasecode: [
            { required: true, message: '疾病助记编码不能为空', trigger: 'blur' }
          ],
          diseasename: [
            { required: true, message: '疾病名称不能为空', trigger: 'blur' }
          ],
          diseaseicd: [
            { required: true, message: '国际ICD编码不能为空', trigger: 'blur' }
          ],
          disecategoryid: [
            { required: true, message: '疾病所属分类不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/disease/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.diseasecode = data.disease.diseasecode
                this.dataForm.diseasename = data.disease.diseasename
                this.dataForm.diseaseicd = data.disease.diseaseicd
                this.dataForm.disecategoryid = data.disease.disecategoryid
                this.dataForm.delmark = data.disease.delmark
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/disease/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'diseasecode': this.dataForm.diseasecode,
                'diseasename': this.dataForm.diseasename,
                'diseaseicd': this.dataForm.diseaseicd,
                'disecategoryid': this.dataForm.disecategoryid,
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
