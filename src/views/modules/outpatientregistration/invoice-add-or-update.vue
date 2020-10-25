<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发票号码" prop="invoicenum">
      <el-input v-model="dataForm.invoicenum" placeholder="发票号码"></el-input>
    </el-form-item>
    <el-form-item label="发票金额" prop="money">
      <el-input v-model="dataForm.money" placeholder="发票金额"></el-input>
    </el-form-item>
    <el-form-item label="发票状态  1-正常  2-作废 " prop="state">
      <el-input v-model="dataForm.state" placeholder="发票状态  1-正常  2-作废 "></el-input>
    </el-form-item>
    <el-form-item label="收/退费时间 " prop="creationtime">
      <el-input v-model="dataForm.creationtime" placeholder="收/退费时间 "></el-input>
    </el-form-item>
    <el-form-item label="收/退费人员ID " prop="userid">
      <el-input v-model="dataForm.userid" placeholder="收/退费人员ID "></el-input>
    </el-form-item>
    <el-form-item label="挂号ID " prop="registid">
      <el-input v-model="dataForm.registid" placeholder="挂号ID "></el-input>
    </el-form-item>
    <el-form-item label="收费方式 " prop="feetype">
      <el-input v-model="dataForm.feetype" placeholder="收费方式 "></el-input>
    </el-form-item>
    <el-form-item label="冲红发票号码" prop="back">
      <el-input v-model="dataForm.back" placeholder="冲红发票号码"></el-input>
    </el-form-item>
    <el-form-item label="发票状态  0-未日结  1-已提交  2-已审核 " prop="dailystate">
      <el-input v-model="dataForm.dailystate" placeholder="发票状态  0-未日结  1-已提交  2-已审核 "></el-input>
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
          invoicenum: '',
          money: '',
          state: '',
          creationtime: '',
          userid: '',
          registid: '',
          feetype: '',
          back: '',
          dailystate: ''
        },
        dataRule: {
          invoicenum: [
            { required: true, message: '发票号码不能为空', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '发票金额不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '发票状态  1-正常  2-作废 不能为空', trigger: 'blur' }
          ],
          creationtime: [
            { required: true, message: '收/退费时间 不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '收/退费人员ID 不能为空', trigger: 'blur' }
          ],
          registid: [
            { required: true, message: '挂号ID 不能为空', trigger: 'blur' }
          ],
          feetype: [
            { required: true, message: '收费方式 不能为空', trigger: 'blur' }
          ],
          back: [
            { required: true, message: '冲红发票号码不能为空', trigger: 'blur' }
          ],
          dailystate: [
            { required: true, message: '发票状态  0-未日结  1-已提交  2-已审核 不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/invoice/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.invoicenum = data.invoice.invoicenum
                this.dataForm.money = data.invoice.money
                this.dataForm.state = data.invoice.state
                this.dataForm.creationtime = data.invoice.creationtime
                this.dataForm.userid = data.invoice.userid
                this.dataForm.registid = data.invoice.registid
                this.dataForm.feetype = data.invoice.feetype
                this.dataForm.back = data.invoice.back
                this.dataForm.dailystate = data.invoice.dailystate
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/invoice/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'invoicenum': this.dataForm.invoicenum,
                'money': this.dataForm.money,
                'state': this.dataForm.state,
                'creationtime': this.dataForm.creationtime,
                'userid': this.dataForm.userid,
                'registid': this.dataForm.registid,
                'feetype': this.dataForm.feetype,
                'back': this.dataForm.back,
                'dailystate': this.dataForm.dailystate
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
