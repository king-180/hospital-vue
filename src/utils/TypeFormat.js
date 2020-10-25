//转换mysql的datetime日期时间格式
function makeDate(date) {
  try {
    let newDate = new Date(date);
    //在小于10的月份前补0
    let month = eval(newDate.getMonth()+1) < 10 ? '0'+eval(newDate.getMonth()+1) : eval(newDate.getMonth() + 1);
    //在小于10的日期前补0
    let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    //在小于10的小时前补0
    let hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
    //在小于10的分钟前补0
    let minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
    //在小于10的秒数前补0
    let seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
    //拼接时间
    let stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
    return stringDate;
  }catch(e){
    let stringDate1 = "0000-00-00 00:00:00";
    return stringDate1;
  }

}

function makeSimpleDate(date) {
  try {
    var newDate = new Date(date);
    //在小于10的月份前补0
    var month = eval(newDate.getMonth()+1) < 10 ? '0'+eval(newDate.getMonth()+1) : eval(newDate.getMonth() + 1);
    //在小于10的日期前补0
    var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    //拼接时间
    var stringDate = newDate.getFullYear() + '-' + month + '-' + day;
    return stringDate;
  }catch(e){
    return "0000-00-00";
  }
}

//部门类型转换
function makeDeptType(dept) {

  var type = ""

  switch (dept) {
    case 1 : {
      type = "临床";
      break;
    }
    case 2 : {
      type = "医技";
      break;
    }
    case 3 : {
      type = "财务";
      break;
    }
    case 4 : {
      type = "行政";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//用户类型转换
function makeUserType(user) {

  var type = ""

  switch (user) {
    case 1 : {
      type = "医院管理员";
      break;
    }
    case 2 : {
      type = "挂号收费员";
      break;
    }
    case 3 : {
      type = "门诊医生";
      break;
    }
    case 4 : {
      type = "医技医生";
      break;
    }
    case 5 : {
      type = "药房操作员";
      break;
    }
    case 6 : {
      type = "财务管理员";
      break;
    }
    default :
      type = "其它";

  }
  return type
}
//项目类型转换
function makeRecordType(record) {

  var type = ""

  switch (record) {
    case 1 : {
      type = "检查";
      break;
    }
    case 2 : {
      type = "检验";
      break;
    }
    case 3 : {
      type = "处置";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//发票类型转换
function makeStateType(state) {

  var type = ""

  switch (state) {
    case 1 : {
      type = "正常";
      break;
    }
    case 2 : {
      type = "作废";
      break;
    }
    case 3 : {
      type = "未打印";
      break;
    }
    case 4 : {
      type = "已打印";
      break;
    }
    case 5 : {
      type = "已重打";
      break;
    }
    case 6 : {
      type = "已补打";
      break;
    }
    case 7 : {
      type = "冲红";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//日结审核状态
function makeDailyStateType(dailystate) {

  var type = ""

  switch (dailystate) {
    case 0 : {
      type = "未日结";
      break;
    }
    case 1 : {
      type = "已提交";
      break;
    }
    case 2 : {
      type = "已审核";
      break;
    }
    default :
      type = "其它";

  }
  return type
}
//本次看诊状态
function makeVisitState(visitState) {

  var type = ""

  switch (visitState) {
    case 1 : {
      type = "已挂号";
      break;
    }
    case 2 : {
      type = "医生接诊";
      break;
    }
    case 3 : {
      type = "看诊结束";
      break;
    }
    case 4 : {
      type = "已退号";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//病历状态
function makeCaseState(caseState) {

  var type = ""

  switch (caseState) {
    case 1 : {
      type = "暂存";
      break;
    }
    case 2 : {
      type = "已提交";
      break;
    }
    case 3 : {
      type = "诊毕";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//是否加急
function makeIsUrgent(isUrgent) {

  var type = ""

  switch (isUrgent) {
    case 1 : {
      type = "加急";
      break;
    }
    case 0 : {
      type = "不加急";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//申请状态
function makeState(state) {

  var type = ""

  switch (state) {
    case 1 : {
      type = "暂存";
      break;
    }
    case 2 : {
      type = "已开立";
      break;
    }
    case 3 : {
      type = "已交费";
      break;
    }
    case 4 : {
      type = "已登记";
      break;
    }
    case 5 : {
      type = "执行完";
      break;
    }
    case 6 : {
      type = "已退费";
      break;
    }
    case 0 : {
      type = "已作废";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//诊断类型转换
function makeDiagnoseType(diagnose) {

  var type = ""

  switch (diagnose) {
    case 1 : {
      type = "西医";
      break;
    }
    case 2 : {
      type = "中医";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//诊断种类转换
function makeDiagnoseCate(diagnose) {

  var type = ""

  switch (diagnose) {
    case 1 : {
      type = "初诊";
      break;
    }
    case 2 : {
      type = "终诊";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//处方状态转换
function makePrescriptionState(record) {

  var type = ""

  switch (record) {
    case 1 : {
      type = "暂存";
      break;
    }
    case 2 : {
      type = "已开立";
      break;
    }
    case 0 : {
      type = "已作废";
      break;
    }
    default :
      type = "其它";

  }
  return type
}

//项目种类转换
function makeItemType(diagnose) {

  var type = ""

  switch (diagnose) {
    case 1 : {
      type = "非药品";
      break;
    }
    case 2 : {
      type = "药品";
      break;
    }
    default :
      type = "其它";

  }
  return type
}



export {

  makeDeptType,
  makeUserType,
  makeSimpleDate,
  makeDate,
  makeRecordType,
  makeStateType,
  makeDailyStateType,
  makeVisitState,
  makeCaseState,
  makeIsUrgent,
  makeState,
  makeDiagnoseCate,
  makeDiagnoseType,
  makePrescriptionState,
  makeItemType

}
