const app = getApp()

Page({
  data: {
    logo: "/images/icons/search.png",
    listData: []
  },
  onShareAppMessage: function () {
    return {
      title: '考试安排查询结果',
      path: '/pages/search/exam?action=exam&class=' + this.options.class
    }
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '考试安排查询结果'
    })
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://wechat.sangsir.com/timetable/api.php',
      data: {
        action: options.action,
        class: options.class
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.status == 1) {
          wx.showModal({
            content: '暂未查询到当前考试安排信息',
            showCancel: false,
            success: function (res) {
              wx.navigateBack()
            }
          })
        } else {
          that.setData({
            listData: res.data
          })
        }
      }
    })
  }
})
