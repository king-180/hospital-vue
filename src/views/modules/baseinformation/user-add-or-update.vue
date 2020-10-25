<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="登录名" prop="username">
      <el-input v-model="dataForm.username" placeholder="登录名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realname">
      <el-input v-model="dataForm.realname" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="用户类别" prop="usetype">
      <el-input v-model="dataForm.usetype" placeholder="用户类别"></el-input>
    </el-form-item>
    <el-form-item label="医生职称ID" prop="doctitleid">
      <el-input v-model="dataForm.doctitleid" placeholder="医生职称ID"></el-input>
    </el-form-item>
    <el-form-item label="是否参与排班" prop="isscheduling">
      <el-input v-model="dataForm.isscheduling" placeholder="是否参与排班"></el-input>
    </el-form-item>
    <el-form-item label="所在科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="所在科室ID"></el-input>
    </el-form-item>
    <el-form-item label="挂号级别ID" prop="registleid">
      <el-input v-model="dataForm.registleid" placeholder="挂号级别ID"></el-input>
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
          username: '',
          password: '',
          realname: '',
          usetype: '',
          doctitleid: '',
          isscheduling: '',
          deptid: '',
          registleid: '',
          delmark: ''
        },
        dataRule: {
          username: [
            { required: true, message: '登录名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur' }
          ],
          usetype: [
            { required: true, message: '用户类别不能为空', trigger: 'blur' }
          ],
          doctitleid: [
            { required: true, message: '医生职称ID不能为空', trigger: 'blur' }
          ],
          isscheduling: [
            { required: true, message: '是否参与排班不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '所在科室ID不能为空', trigger: 'blur' }
          ],
          registleid: [
            { required: true, message: '挂号级别ID不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.user.username
                this.dataForm.password = data.user.password
                this.dataForm.realname = data.user.realname
                this.dataForm.usetype = data.user.usetype
                this.dataForm.doctitleid = data.user.doctitleid
                this.dataForm.isscheduling = data.user.isscheduling
                this.dataForm.deptid = data.user.deptid
                this.dataForm.registleid = data.user.registleid
                this.dataForm.delmark = data.user.delmark
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
              url: this.$http.adornUrl(`/baseinformation/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'username': this.dataForm.username,
                'password': this.dataForm.password,
                'realname': this.dataForm.realname,
                'usetype': this.dataForm.usetype,
                'doctitleid': this.dataForm.doctitleid,
                'isscheduling': this.dataForm.isscheduling,
                'deptid': this.dataForm.deptid,
                'registleid': this.dataForm.registleid,
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
