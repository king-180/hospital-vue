<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分类编码" prop="dicacode">
      <el-input v-model="dataForm.dicacode" placeholder="分类编码"></el-input>
    </el-form-item>
    <el-form-item label="分类名称" prop="dicaname">
      <el-input v-model="dataForm.dicaname" placeholder="分类名称"></el-input>
    </el-form-item>
    <el-form-item label="显示顺序号" prop="sequenceno">
      <el-input v-model="dataForm.sequenceno" placeholder="显示顺序号"></el-input>
    </el-form-item>
    <el-form-item label="疾病类型" prop="dicatype">
      <el-input v-model="dataForm.dicatype" placeholder="疾病类型"></el-input>
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
          dicacode: '',
          dicaname: '',
          sequenceno: '',
          dicatype: '',
          delmark: ''
        },
        dataRule: {
          dicacode: [
            { required: true, message: '分类编码不能为空', trigger: 'blur' }
          ],
          dicaname: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
          sequenceno: [
            { required: true, message: '显示顺序号不能为空', trigger: 'blur' }
          ],
          dicatype: [
            { required: true, message: '疾病类型不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientmedicaltechnology/disecategory/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dicacode = data.disecategory.dicacode
                this.dataForm.dicaname = data.disecategory.dicaname
                this.dataForm.sequenceno = data.disecategory.sequenceno
                this.dataForm.dicatype = data.disecategory.dicatype
                this.dataForm.delmark = data.disecategory.delmark
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
              url: this.$http.adornUrl(`/outpatientmedicaltechnology/disecategory/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'dicacode': this.dataForm.dicacode,
                'dicaname': this.dataForm.dicaname,
                'sequenceno': this.dataForm.sequenceno,
                'dicatype': this.dataForm.dicatype,
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
