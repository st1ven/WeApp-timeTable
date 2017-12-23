const app = getApp()
var todayInfo = require('../../utils/todayInfo.js')
Page({
  data: {
    logo: "/images/icons/js.png",
    build: ["文一教", "文二教"],
    buildIndex: 0,
    section: ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"],
    sectionIndex: 0
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start)
  },
  buildPicker: function (e) {
    this.setData({
      buildIndex: e.detail.value
    })
  },
  sectionPicker: function (e) {
    this.setData({
      sectionIndex: e.detail.value
    })
  },
  searchRoom: function () {
    var section = parseInt(this.data.sectionIndex) + 1
    var day = this.data.td.day + 1
    wx.navigateTo({
      url: '../search/freeroom?action=freeroom&build=' + this.data.build[this.data.buildIndex] + '&section=' + section + '&day=' + day + '&week=' + this.data.td.week
    });
  },
  onShareAppMessage: function () {
    return {
      title: '空教室查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/freeroom'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '空教室查询'
    });
    var td = this.todayInfo(app.globalData.startTime);
    if (td.week > 18) {
      this.setData({ td: { "week": "18", "day": "1" } });
    } else {
      this.setData({ td: td });
    }
  }
})
