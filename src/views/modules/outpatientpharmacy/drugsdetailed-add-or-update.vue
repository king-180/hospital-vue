<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="成药模板ID" prop="drugstempid">
      <el-input v-model="dataForm.drugstempid" placeholder="成药模板ID"></el-input>
    </el-form-item>
    <el-form-item label="药品ID" prop="drugsid">
      <el-input v-model="dataForm.drugsid" placeholder="药品ID"></el-input>
    </el-form-item>
    <el-form-item label="用法" prop="drugsusage">
      <el-input v-model="dataForm.drugsusage" placeholder="用法"></el-input>
    </el-form-item>
    <el-form-item label="用量" prop="dosage">
      <el-input v-model="dataForm.dosage" placeholder="用量"></el-input>
    </el-form-item>
    <el-form-item label="频次" prop="frequency">
      <el-input v-model="dataForm.frequency" placeholder="频次"></el-input>
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
          drugstempid: '',
          drugsid: '',
          drugsusage: '',
          dosage: '',
          frequency: ''
        },
        dataRule: {
          drugstempid: [
            { required: true, message: '成药模板ID不能为空', trigger: 'blur' }
          ],
          drugsid: [
            { required: true, message: '药品ID不能为空', trigger: 'blur' }
          ],
          drugsusage: [
            { required: true, message: '用法不能为空', trigger: 'blur' }
          ],
          dosage: [
            { required: true, message: '用量不能为空', trigger: 'blur' }
          ],
          frequency: [
            { required: true, message: '频次不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/drugsdetailed/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.drugstempid = data.drugsdetailed.drugstempid
                this.dataForm.drugsid = data.drugsdetailed.drugsid
                this.dataForm.drugsusage = data.drugsdetailed.drugsusage
                this.dataForm.dosage = data.drugsdetailed.dosage
                this.dataForm.frequency = data.drugsdetailed.frequency
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/drugsdetailed/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'drugstempid': this.dataForm.drugstempid,
                'drugsid': this.dataForm.drugsid,
                'drugsusage': this.dataForm.drugsusage,
                'dosage': this.dataForm.dosage,
                'frequency': this.dataForm.frequency
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
