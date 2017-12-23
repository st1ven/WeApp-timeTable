const app = getApp()
Page({
  data: {
    logo: "/images/icons/exam.png"
  },
  todayInfo: function (start) {
    return todayInfo.todayInfo(start)
  },
  classNameInput: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  search: function () {
    if (!this.data.className){
      wx.showModal({
        content: '请输入班级，例如：会1601-5',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: '../search/exam?action=exam&class=' + this.data.className
      });
      this.setClassStorage()
    }
  },
  setClassStorage: function () {
    wx.setStorageSync("className",this.data.className)
  },
  onShareAppMessage: function () {
    return {
      title: '考试安排查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/exam'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '考试安排查询'
    });
    var className = wx.getStorageSync('className');
    if (className) {
      this.setData({ className: className });
    }
  }
})
