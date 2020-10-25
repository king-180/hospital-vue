<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="药品编码" prop="drugscode">
      <el-input v-model="dataForm.drugscode" placeholder="药品编码"></el-input>
    </el-form-item>
    <el-form-item label="药品名称" prop="drugsname">
      <el-input v-model="dataForm.drugsname" placeholder="药品名称"></el-input>
    </el-form-item>
    <el-form-item label="药品规格" prop="drugsformat">
      <el-input v-model="dataForm.drugsformat" placeholder="药品规格"></el-input>
    </el-form-item>
    <el-form-item label="包装单位" prop="drugsunit">
      <el-input v-model="dataForm.drugsunit" placeholder="包装单位"></el-input>
    </el-form-item>
    <el-form-item label="生产厂家" prop="manufacturer">
      <el-input v-model="dataForm.manufacturer" placeholder="生产厂家"></el-input>
    </el-form-item>
    <el-form-item label="药品剂型" prop="drugsdosageid">
      <el-input v-model="dataForm.drugsdosageid" placeholder="药品剂型"></el-input>
    </el-form-item>
    <el-form-item label="药品类型" prop="drugstypeid">
      <el-input v-model="dataForm.drugstypeid" placeholder="药品类型"></el-input>
    </el-form-item>
    <el-form-item label="药品单价" prop="drugsprice">
      <el-input v-model="dataForm.drugsprice" placeholder="药品单价"></el-input>
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
          drugscode: '',
          drugsname: '',
          drugsformat: '',
          drugsunit: '',
          manufacturer: '',
          drugsdosageid: '',
          drugstypeid: '',
          drugsprice: '',
          mnemoniccode: '',
          creationdate: '',
          lastupdatedate: '',
          delmark: ''
        },
        dataRule: {
          drugscode: [
            { required: true, message: '药品编码不能为空', trigger: 'blur' }
          ],
          drugsname: [
            { required: true, message: '药品名称不能为空', trigger: 'blur' }
          ],
          drugsformat: [
            { required: true, message: '药品规格不能为空', trigger: 'blur' }
          ],
          drugsunit: [
            { required: true, message: '包装单位不能为空', trigger: 'blur' }
          ],
          manufacturer: [
            { required: true, message: '生产厂家不能为空', trigger: 'blur' }
          ],
          drugsdosageid: [
            { required: true, message: '药品剂型不能为空', trigger: 'blur' }
          ],
          drugstypeid: [
            { required: true, message: '药品类型不能为空', trigger: 'blur' }
          ],
          drugsprice: [
            { required: true, message: '药品单价不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/drugs/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.drugscode = data.drugs.drugscode
                this.dataForm.drugsname = data.drugs.drugsname
                this.dataForm.drugsformat = data.drugs.drugsformat
                this.dataForm.drugsunit = data.drugs.drugsunit
                this.dataForm.manufacturer = data.drugs.manufacturer
                this.dataForm.drugsdosageid = data.drugs.drugsdosageid
                this.dataForm.drugstypeid = data.drugs.drugstypeid
                this.dataForm.drugsprice = data.drugs.drugsprice
                this.dataForm.mnemoniccode = data.drugs.mnemoniccode
                this.dataForm.creationdate = data.drugs.creationdate
                this.dataForm.lastupdatedate = data.drugs.lastupdatedate
                this.dataForm.delmark = data.drugs.delmark
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/drugs/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'drugscode': this.dataForm.drugscode,
                'drugsname': this.dataForm.drugsname,
                'drugsformat': this.dataForm.drugsformat,
                'drugsunit': this.dataForm.drugsunit,
                'manufacturer': this.dataForm.manufacturer,
                'drugsdosageid': this.dataForm.drugsdosageid,
                'drugstypeid': this.dataForm.drugstypeid,
                'drugsprice': this.dataForm.drugsprice,
                'mnemoniccode': this.dataForm.mnemoniccode,
                'creationdate': this.dataForm.creationdate,
                'lastupdatedate': this.dataForm.lastupdatedate,
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
