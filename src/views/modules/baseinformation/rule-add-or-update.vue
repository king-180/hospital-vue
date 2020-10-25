<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="规则名称" prop="rulename">
      <el-input v-model="dataForm.rulename" placeholder="规则名称"></el-input>
    </el-form-item>
    <el-form-item label="科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="科室ID"></el-input>
    </el-form-item>
    <el-form-item label="医生ID" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="医生ID"></el-input>
    </el-form-item>
    <el-form-item label="星期" prop="week">
      <el-input v-model="dataForm.week" placeholder="星期"></el-input>
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
          rulename: '',
          deptid: '',
          userid: '',
          week: '',
          delmark: ''
        },
        dataRule: {
          rulename: [
            { required: true, message: '规则名称不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '科室ID不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '医生ID不能为空', trigger: 'blur' }
          ],
          week: [
            { required: true, message: '星期不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/rule/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.rulename = data.rule.rulename
                this.dataForm.deptid = data.rule.deptid
                this.dataForm.userid = data.rule.userid
                this.dataForm.week = data.rule.week
                this.dataForm.delmark = data.rule.delmark
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
              url: this.$http.adornUrl(`/baseinformation/rule/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'rulename': this.dataForm.rulename,
                'deptid': this.dataForm.deptid,
                'userid': this.dataForm.userid,
                'week': this.dataForm.week,
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
