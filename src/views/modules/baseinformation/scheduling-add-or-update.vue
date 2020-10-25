<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="排班日期" prop="scheddate">
      <el-input v-model="dataForm.scheddate" placeholder="排班日期"></el-input>
    </el-form-item>
    <el-form-item label="科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="科室ID"></el-input>
    </el-form-item>
    <el-form-item label="医生ID" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="医生ID"></el-input>
    </el-form-item>
    <el-form-item label="午别" prop="noon">
      <el-input v-model="dataForm.noon" placeholder="午别"></el-input>
    </el-form-item>
    <el-form-item label="排班规则ID" prop="ruleid">
      <el-input v-model="dataForm.ruleid" placeholder="排班规则ID"></el-input>
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
          scheddate: '',
          deptid: '',
          userid: '',
          noon: '',
          ruleid: '',
          delmark: ''
        },
        dataRule: {
          scheddate: [
            { required: true, message: '排班日期不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '科室ID不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '医生ID不能为空', trigger: 'blur' }
          ],
          noon: [
            { required: true, message: '午别不能为空', trigger: 'blur' }
          ],
          ruleid: [
            { required: true, message: '排班规则ID不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/scheduling/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.scheddate = data.scheduling.scheddate
                this.dataForm.deptid = data.scheduling.deptid
                this.dataForm.userid = data.scheduling.userid
                this.dataForm.noon = data.scheduling.noon
                this.dataForm.ruleid = data.scheduling.ruleid
                this.dataForm.delmark = data.scheduling.delmark
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
              url: this.$http.adornUrl(`/baseinformation/scheduling/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'scheddate': this.dataForm.scheddate,
                'deptid': this.dataForm.deptid,
                'userid': this.dataForm.userid,
                'noon': this.dataForm.noon,
                'ruleid': this.dataForm.ruleid,
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
