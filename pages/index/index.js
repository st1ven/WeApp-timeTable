const app = getApp()
var todayInfo = require('../../untils/todayInfo.js')
Page({
  data: {
    logo: "/style/icon/kb.png"
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
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级课表及教师课表',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    var className = wx.getStorageSync('className');
    if (className) {
      this.setData({ className: className });
    }
    var td = this.todayInfo('2017/8/29');
    if (td.week > 18) {
      this.setData({ td: { "week": "18", "day": "0" }, activeIndex: td.day });
    } else {
      this.setData({ td: td, activeIndex: td.day });
    }
  }
})
