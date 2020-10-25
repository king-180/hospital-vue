<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="收费人员ID" prop="registerid">
      <el-input v-model="dataForm.registerid" placeholder="收费人员ID"></el-input>
    </el-form-item>
    <el-form-item label="日结起始时间" prop="starttime">
      <el-input v-model="dataForm.starttime" placeholder="日结起始时间"></el-input>
    </el-form-item>
    <el-form-item label="日结结束时间" prop="endtime">
      <el-input v-model="dataForm.endtime" placeholder="日结结束时间"></el-input>
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
          registerid: '',
          starttime: '',
          endtime: ''
        },
        dataRule: {
          registerid: [
            { required: true, message: '收费人员ID不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '日结起始时间不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '日结结束时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/registwork/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.registerid = data.registwork.registerid
                this.dataForm.starttime = data.registwork.starttime
                this.dataForm.endtime = data.registwork.endtime
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/registwork/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'registerid': this.dataForm.registerid,
                'starttime': this.dataForm.starttime,
                'endtime': this.dataForm.endtime
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
