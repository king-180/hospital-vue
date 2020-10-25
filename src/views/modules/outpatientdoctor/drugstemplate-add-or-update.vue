<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="医生ID" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="医生ID"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="creationtime">
      <el-input v-model="dataForm.creationtime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="使用范围   全院/科室/个人" prop="scope">
      <el-input v-model="dataForm.scope" placeholder="使用范围   全院/科室/个人"></el-input>
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
          userid: '',
          creationtime: '',
          scope: '',
          delmark: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '医生ID不能为空', trigger: 'blur' }
          ],
          creationtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          scope: [
            { required: true, message: '使用范围   全院/科室/个人不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/drugstemplate/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.drugstemplate.name
                this.dataForm.userid = data.drugstemplate.userid
                this.dataForm.creationtime = data.drugstemplate.creationtime
                this.dataForm.scope = data.drugstemplate.scope
                this.dataForm.delmark = data.drugstemplate.delmark
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
              url: this.$http.adornUrl(`/outpatientdoctor/drugstemplate/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'userid': this.dataForm.userid,
                'creationtime': this.dataForm.creationtime,
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
