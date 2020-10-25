<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="病历号" prop="casenumber">
      <el-input v-model="dataForm.casenumber" placeholder="病历号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="realname">
      <el-input v-model="dataForm.realname" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idnumber">
      <el-input v-model="dataForm.idnumber" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthdate">
      <el-input v-model="dataForm.birthdate" placeholder="出生日期"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
    </el-form-item>
    <el-form-item label="年龄类型 岁 月 天" prop="agetype">
      <el-input v-model="dataForm.agetype" placeholder="年龄类型 岁 月 天"></el-input>
    </el-form-item>
    <el-form-item label="家庭住址" prop="homeaddress">
      <el-input v-model="dataForm.homeaddress" placeholder="家庭住址"></el-input>
    </el-form-item>
    <el-form-item label="本次看诊日期" prop="visitdate">
      <el-input v-model="dataForm.visitdate" placeholder="本次看诊日期"></el-input>
    </el-form-item>
    <el-form-item label="午别  上午/下午" prop="noon">
      <el-input v-model="dataForm.noon" placeholder="午别  上午/下午"></el-input>
    </el-form-item>
    <el-form-item label="本次挂号科室ID" prop="deptid">
      <el-input v-model="dataForm.deptid" placeholder="本次挂号科室ID"></el-input>
    </el-form-item>
    <el-form-item label="本次挂号医生ID" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="本次挂号医生ID"></el-input>
    </el-form-item>
    <el-form-item label="本次挂号级别ID" prop="registleid">
      <el-input v-model="dataForm.registleid" placeholder="本次挂号级别ID"></el-input>
    </el-form-item>
    <el-form-item label="结算类别ID" prop="settleid">
      <el-input v-model="dataForm.settleid" placeholder="结算类别ID"></el-input>
    </el-form-item>
    <el-form-item label="病历本要否  是/否" prop="isbook">
      <el-input v-model="dataForm.isbook" placeholder="病历本要否  是/否"></el-input>
    </el-form-item>
    <el-form-item label="挂号时间" prop="registtime">
      <el-input v-model="dataForm.registtime" placeholder="挂号时间"></el-input>
    </el-form-item>
    <el-form-item label="挂号员ID" prop="registerid">
      <el-input v-model="dataForm.registerid" placeholder="挂号员ID"></el-input>
    </el-form-item>
    <el-form-item label="本次看诊状态" prop="visitstate">
      <el-input v-model="dataForm.visitstate" placeholder="本次看诊状态"></el-input>
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
          casenumber: '',
          realname: '',
          gender: '',
          idnumber: '',
          birthdate: '',
          age: '',
          agetype: '',
          homeaddress: '',
          visitdate: '',
          noon: '',
          deptid: '',
          userid: '',
          registleid: '',
          settleid: '',
          isbook: '',
          registtime: '',
          registerid: '',
          visitstate: ''
        },
        dataRule: {
          casenumber: [
            { required: true, message: '病历号不能为空', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          idnumber: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          birthdate: [
            { required: true, message: '出生日期不能为空', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ],
          agetype: [
            { required: true, message: '年龄类型 岁 月 天不能为空', trigger: 'blur' }
          ],
          homeaddress: [
            { required: true, message: '家庭住址不能为空', trigger: 'blur' }
          ],
          visitdate: [
            { required: true, message: '本次看诊日期不能为空', trigger: 'blur' }
          ],
          noon: [
            { required: true, message: '午别  上午/下午不能为空', trigger: 'blur' }
          ],
          deptid: [
            { required: true, message: '本次挂号科室ID不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '本次挂号医生ID不能为空', trigger: 'blur' }
          ],
          registleid: [
            { required: true, message: '本次挂号级别ID不能为空', trigger: 'blur' }
          ],
          settleid: [
            { required: true, message: '结算类别ID不能为空', trigger: 'blur' }
          ],
          isbook: [
            { required: true, message: '病历本要否  是/否不能为空', trigger: 'blur' }
          ],
          registtime: [
            { required: true, message: '挂号时间不能为空', trigger: 'blur' }
          ],
          registerid: [
            { required: true, message: '挂号员ID不能为空', trigger: 'blur' }
          ],
          visitstate: [
            { required: true, message: '本次看诊状态不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/register/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.casenumber = data.register.casenumber
                this.dataForm.realname = data.register.realname
                this.dataForm.gender = data.register.gender
                this.dataForm.idnumber = data.register.idnumber
                this.dataForm.birthdate = data.register.birthdate
                this.dataForm.age = data.register.age
                this.dataForm.agetype = data.register.agetype
                this.dataForm.homeaddress = data.register.homeaddress
                this.dataForm.visitdate = data.register.visitdate
                this.dataForm.noon = data.register.noon
                this.dataForm.deptid = data.register.deptid
                this.dataForm.userid = data.register.userid
                this.dataForm.registleid = data.register.registleid
                this.dataForm.settleid = data.register.settleid
                this.dataForm.isbook = data.register.isbook
                this.dataForm.registtime = data.register.registtime
                this.dataForm.registerid = data.register.registerid
                this.dataForm.visitstate = data.register.visitstate
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
              url: this.$http.adornUrl(`/xxxxxxxxxxxxx/register/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'casenumber': this.dataForm.casenumber,
                'realname': this.dataForm.realname,
                'gender': this.dataForm.gender,
                'idnumber': this.dataForm.idnumber,
                'birthdate': this.dataForm.birthdate,
                'age': this.dataForm.age,
                'agetype': this.dataForm.agetype,
                'homeaddress': this.dataForm.homeaddress,
                'visitdate': this.dataForm.visitdate,
                'noon': this.dataForm.noon,
                'deptid': this.dataForm.deptid,
                'userid': this.dataForm.userid,
                'registleid': this.dataForm.registleid,
                'settleid': this.dataForm.settleid,
                'isbook': this.dataForm.isbook,
                'registtime': this.dataForm.registtime,
                'registerid': this.dataForm.registerid,
                'visitstate': this.dataForm.visitstate
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
