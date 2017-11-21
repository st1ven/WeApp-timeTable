const app = getApp()
var todayInfo = require('../../untils/todayInfo.js')
Page({
  data: {
    logo: "/style/icon/kb.png",
    dept: ["管理系", "会计系", "机电工程系", "建筑工程系", "会计系", "经济系", "食品与生物工程系", "体教部", "外国语言文学系", "信息工程系", "中文与法律系"],
    deptIndex: 0,
    teacherName: ''
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start)
  },
  teacherDeptPicker: function (e) {
    this.setData({
      deptIndex: e.detail.value
    })
  },
  teacherNameInput: function (e) {
    this.setData({
      teacherName: e.detail.value
    })
  },
  searchToday: function () {
    if (!this.data.teacherName) {
      wx.showModal({
        content: '请输入姓名，例如：张三',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../search/today?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
      });
      this.setTeacherStorage()
    }
  },
  searchAll: function () {
    if (!this.data.teacherName) {
      wx.showModal({
        content: '请输入姓名，例如：张三',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../search/all?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
      });
      this.setTeacherStorage()
    }
  },
  setTeacherStorage: function () {
    wx.setStorageSync("deptIndex", this.data.deptIndex)
    wx.setStorageSync("teacherName", this.data.teacherName)
  },
  onShareAppMessage: function () {
    return {
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级课表及教师课表',
      path: '/pages/index/teacher'
    }
  },
  onLoad: function () {
    var deptIndex = wx.getStorageSync('deptIndex');
    var teacherName = wx.getStorageSync('teacherName');
    if (teacherName) {
      this.setData({ deptIndex: deptIndex });
      this.setData({ teacherName: teacherName });
    }
    var td = this.todayInfo('2017/8/29');
    if (td.week > 18) {
      this.setData({ td: { "week": "18", "day": "0" }, activeIndex: td.day });
    } else {
      this.setData({ td: td, activeIndex: td.day });
    }
  }
})
