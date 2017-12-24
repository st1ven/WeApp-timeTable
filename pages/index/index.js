const app = getApp()
var todayInfo = require('../../utils/todayInfo.js')
Page({
  data: {
    kb: "/images/icons/kb.png",
    teacher: "/images/icons/teacher.png",
    js: "/images/icons/js.png",
    exam: "/images/icons/exam.png",
    help: "/images/icons/help.png",
    about: "/images/icons/about.png"
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start);
  },
  onShareAppMessage: function () {
    return {
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    this.today = new Date().toLocaleDateString();
    this.day = "星期" + "日一二三四五六".charAt(new Date().getDay());
    var that = this;
    wx.request({
      url: 'https://wechat.sangsir.com/timetable/api.php?action=start',
      success: function (res) {
        app.globalData.startTime = res.data.startTime
        that.td = that.todayInfo(app.globalData.startTime)
        that.info = res.data.info
        that.setData({ td: that.td, today: that.today, day: that.day, info: that.info });
      },
      fail: function () {
        that.td = that.todayInfo(app.globalData.startTime)
        that.setData({ td: that.td, today: that.today, day: that.day });
      }
    });
  },
  onReady: function () {
    var help = wx.getStorageSync('help');
    if (help !== 1) {
      wx.showModal({
        title: '提示',
        content: '我好像发现你是第一次使用文经课表呢，来跟我看看使用帮助吧！',
        showCancel: false,
        success: function (res) {
          wx.navigateTo({
            url: '../info/help'
          });
        }
      })
    }
  }
})
