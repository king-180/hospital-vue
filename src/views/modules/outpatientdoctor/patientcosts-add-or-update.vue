<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="挂号ID" prop="registid">
      <el-input v-model="dataForm.registid" placeholder="挂号ID"></el-input>
    </el-form-item>
    <el-form-item label="发票ID" prop="invoiceid">
      <el-input v-model="dataForm.invoiceid" placeholder="发票ID"></el-input>
    </el-form-item>
    <el-form-item label="项目ID" prop="itemid">
      <el-input v-model="dataForm.itemid" placeholder="项目ID"></el-input>
    </el-form-item>
    <el-form-item label="项目类型 1-非药品 2-药品" prop="itemtype">
      <el-input v-model="dataForm.itemtype" placeholder="项目类型 1-非药品 2-药品"></el-input>
    </el-form-item>
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item label="项目单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="项目单价"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="执行科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="执行科室ID"></el-input>
    </el-form-item>
    <el-form-item label="开立时间" prop="createtime">
      <el-input v-model="dataForm.createtime" placeholder="开立时间"></el-input>
    </el-form-item>
    <el-form-item label="开立人员ID" prop="createoperid">
      <el-input v-model="dataForm.createoperid" placeholder="开立人员ID"></el-input>
    </el-form-item>
    <el-form-item label="收/退费时间" prop="paytime">
      <el-input v-model="dataForm.paytime" placeholder="收/退费时间"></el-input>
    </el-form-item>
    <el-form-item label="收/退费人员ID" prop="registerid">
      <el-input v-model="dataForm.registerid" placeholder="收/退费人员ID"></el-input>
    </el-form-item>
    <el-form-item label="收费方式" prop="feetype">
      <el-input v-model="dataForm.feetype" placeholder="收费方式"></el-input>
    </el-form-item>
    <el-form-item label="退费对应记录ID" prop="backid">
      <el-input v-model="dataForm.backid" placeholder="退费对应记录ID"></el-input>
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
          registid: '',
          invoiceid: '',
          itemid: '',
          itemtype: '',
          name: '',
          price: '',
          amount: '',
          deptid: '',
          createtime: '',
          createoperid: '',
          paytime: '',
          registerid: '',
          feetype: '',
          backid: ''
        },
        dataRule: {
          registid: [
            { required: true, message: '挂号ID不能为空', trigger: 'blur' }
          ],
          invoiceid: [
            { required: true, message: '发票ID不能为空', trigger: 'blur' }
          ],
          itemid: [
            { required: true, message: '项目ID不能为空', trigger: 'blur' }
          ],
          itemtype: [
            { required: true, message: '项目类型 1-非药品 2-药品不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '项目单价不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '执行科室ID不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '开立时间不能为空', trigger: 'blur' }
          ],
          createoperid: [
            { required: true, message: '开立人员ID不能为空', trigger: 'blur' }
          ],
          paytime: [
            { required: true, message: '收/退费时间不能为空', trigger: 'blur' }
          ],
          registerid: [
            { required: true, message: '收/退费人员ID不能为空', trigger: 'blur' }
          ],
          feetype: [
            { required: true, message: '收费方式不能为空', trigger: 'blur' }
          ],
          backid: [
            { required: true, message: '退费对应记录ID不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/outpatientdoctor/patientcosts/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.registid = data.patientcosts.registid
                this.dataForm.invoiceid = data.patientcosts.invoiceid
                this.dataForm.itemid = data.patientcosts.itemid
                this.dataForm.itemtype = data.patientcosts.itemtype
                this.dataForm.name = data.patientcosts.name
                this.dataForm.price = data.patientcosts.price
                this.dataForm.amount = data.patientcosts.amount
                this.dataForm.deptid = data.patientcosts.deptid
                this.dataForm.createtime = data.patientcosts.createtime
                this.dataForm.createoperid = data.patientcosts.createoperid
                this.dataForm.paytime = data.patientcosts.paytime
                this.dataForm.registerid = data.patientcosts.registerid
                this.dataForm.feetype = data.patientcosts.feetype
                this.dataForm.backid = data.patientcosts.backid
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
              url: this.$http.adornUrl(`/outpatientdoctor/patientcosts/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'registid': this.dataForm.registid,
                'invoiceid': this.dataForm.invoiceid,
                'itemid': this.dataForm.itemid,
                'itemtype': this.dataForm.itemtype,
                'name': this.dataForm.name,
                'price': this.dataForm.price,
                'amount': this.dataForm.amount,
                'deptid': this.dataForm.deptid,
                'createtime': this.dataForm.createtime,
                'createoperid': this.dataForm.createoperid,
                'paytime': this.dataForm.paytime,
                'registerid': this.dataForm.registerid,
                'feetype': this.dataForm.feetype,
                'backid': this.dataForm.backid
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
