const app = getApp()
var todayInfo = require('../../utils/todayInfo.js')
Page({
  data: {
    kb: "/icons/kb.png",
    teacher: "/icons/teacher.png",
    js: "/icons/js.png",
    exam: "/icons/exam.png",
    help: "/icons/help.png"
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start)
  },
  jumpPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.url
    })
  },
  onShareAppMessage: function () {
    return {
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://wechat.sangsir.com/timetable/api.php?action=start',
      success: function (res) {
        app.globalData.startTime = res.data.startTime
        that.td = that.todayInfo(app.globalData.startTime)
        that.today = new Date().toLocaleDateString();
        that.day = "星期" + "日一二三四五六".charAt(new Date().getDay());
        if (that.td.week > 18) {
          that.setData({ td: { "week": "结课" }, today: that.today, day: that.day });
        } else {
          that.setData({ td: that.td, today: that.today, day: that.day });
        }
      }
    })
  },
  onReady: function () {
    var help = wx.getStorageSync('help');
    if (help !== 1) {
      wx.showModal({
        title: '提示',
        content: '我好像发现你是第一次使用文经课表呢~来跟我看看使用帮助吧！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../info/help'
            });
          } else {
            wx.navigateTo({
              url: '../info/help'
            });
          }
        }
      })
    }
  }
})
