const app = getApp()
var todayInfo = require('../../utils/todayInfo.js')
Page({
  data: {
    logo: "/icons/kb.png"
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start)
  },
  classNameInput: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  searchToday: function () {
    if (!this.data.className){
      wx.showModal({
        content: '请输入班级，例如：建1604-1',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: '../search/today?action=student&name=' + this.data.className
      });
      this.setClassStorage()
    }
  },
  searchAll: function () {
    if (!this.data.className) {
      wx.showModal({
        content: '请输入班级，例如：建1604-1',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../search/all?action=student&name=' + this.data.className
      });
      this.setClassStorage()
    }
  },
  setClassStorage: function () {
    wx.setStorageSync("className",this.data.className)
  },
  onShareAppMessage: function () {
    return {
      title: '班级课表查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '班级课表查询'
    });
    var className = wx.getStorageSync('className');
    if (className) {
      this.setData({ className: className });
    }
    var td = this.todayInfo(app.globalData.startTime);
    if (td.week > 18) {
      this.setData({ td: { "week": "18", "day": "0" }, activeIndex: td.day });
    } else {
      this.setData({ td: td, activeIndex: td.day });
    }
  }
})
