<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="项目编码" prop="itemcode">
      <el-input v-model="dataForm.itemcode" placeholder="项目编码"></el-input>
    </el-form-item>
    <el-form-item label="项目名称" prop="itemname">
      <el-input v-model="dataForm.itemname" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item label="规格" prop="format">
      <el-input v-model="dataForm.format" placeholder="规格"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="单价"></el-input>
    </el-form-item>
    <el-form-item label="所属费用科目ID" prop="expclassid">
      <el-input v-model="dataForm.expclassid" placeholder="所属费用科目ID"></el-input>
    </el-form-item>
    <el-form-item label="执行科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="执行科室ID"></el-input>
    </el-form-item>
    <el-form-item label="拼音助记码" prop="mnemoniccode">
      <el-input v-model="dataForm.mnemoniccode" placeholder="拼音助记码"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="creationdate">
      <el-input v-model="dataForm.creationdate" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="最后修改时间" prop="lastupdatedate">
      <el-input v-model="dataForm.lastupdatedate" placeholder="最后修改时间"></el-input>
    </el-form-item>
    <el-form-item label="项目类型" prop="recordtype">
      <el-input v-model="dataForm.recordtype" placeholder="项目类型"></el-input>
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
          itemcode: '',
          itemname: '',
          format: '',
          price: '',
          expclassid: '',
          deptid: '',
          mnemoniccode: '',
          creationdate: '',
          lastupdatedate: '',
          recordtype: '',
          delmark: ''
        },
        dataRule: {
          itemcode: [
            { required: true, message: '项目编码不能为空', trigger: 'blur' }
          ],
          itemname: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          format: [
            { required: true, message: '规格不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '单价不能为空', trigger: 'blur' }
          ],
          expclassid: [
            { required: true, message: '所属费用科目ID不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '执行科室ID不能为空', trigger: 'blur' }
          ],
          mnemoniccode: [
            { required: true, message: '拼音助记码不能为空', trigger: 'blur' }
          ],
          creationdate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          lastupdatedate: [
            { required: true, message: '最后修改时间不能为空', trigger: 'blur' }
          ],
          recordtype: [
            { required: true, message: '项目类型不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/baseinformation/fmeditem/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.itemcode = data.fmeditem.itemcode
                this.dataForm.itemname = data.fmeditem.itemname
                this.dataForm.format = data.fmeditem.format
                this.dataForm.price = data.fmeditem.price
                this.dataForm.expclassid = data.fmeditem.expclassid
                this.dataForm.deptid = data.fmeditem.deptid
                this.dataForm.mnemoniccode = data.fmeditem.mnemoniccode
                this.dataForm.creationdate = data.fmeditem.creationdate
                this.dataForm.lastupdatedate = data.fmeditem.lastupdatedate
                this.dataForm.recordtype = data.fmeditem.recordtype
                this.dataForm.delmark = data.fmeditem.delmark
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
              url: this.$http.adornUrl(`/baseinformation/fmeditem/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'itemcode': this.dataForm.itemcode,
                'itemname': this.dataForm.itemname,
                'format': this.dataForm.format,
                'price': this.dataForm.price,
                'expclassid': this.dataForm.expclassid,
                'deptid': this.dataForm.deptid,
                'mnemoniccode': this.dataForm.mnemoniccode,
                'creationdate': this.dataForm.creationdate,
                'lastupdatedate': this.dataForm.lastupdatedate,
                'recordtype': this.dataForm.recordtype,
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
