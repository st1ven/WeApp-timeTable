function todayInfo(start) {
  var weekLen = 7, // 一周7天为常量
    weekInfo = { "week": null, "day": null }, // 初始化返回信息，默认第null周，星期null
    oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
    weekLeave, // 开学当天所在周剩余天数
    weekStart, // 开学当天start是星期几
    today, // 今天
    dateDiff, // 今天与开学当天日期差
    sDate; //开学之日，日期对象
  var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2017/8/28
  var weekday = new Array(7);
  weekday[1] = 0,weekday[2] = 1,weekday[3] = 2,weekday[4] = 3,weekday[5] = 4,weekday[6] = 5,weekday[0] = 6
  sDate = new Date(start.replace("-", "/"));
  weekStart = sDate.getDay();
  weekStart = weekStart === 0 ? 7 : weekStart; // JS中周日的索引为0，这里转换为7，方便计算
  weekLeave = weekLen - weekStart;
  today = new Date();
  weekInfo.day = weekday[today.getDay()];
  today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
  dateDiff = today - sDate;
  dateDiff = parseInt(dateDiff / oneDay);
  weekInfo.week = Math.ceil((dateDiff - weekLeave) / weekLen) + 1;
  return weekInfo;
}
module.exports.todayInfo = todayInfo
//todayInfo("2017/2/27");
//todayInfo("2017/8/29");