const app = getApp()

Page({
  data: {
    logo: "/icons/search.png",
    listData: []
  },
  onShareAppMessage: function () {
    return {
      title: '空闲教室查询结果',
      path: '/pages/search/freeroom?action=freeroom&build=' + this.options.build + '&section=' + this.options.section + '&day=' + this.options.day + '&week=' + this.options.week
    }
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '空闲教室查询结果'
    })
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'https://wechat.sangsir.com/timetable/api.php',
      data: {
        action: options.action,
        build: options.build,
        section: options.section,
        day: options.day,
        week: options.week
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.status == 1) {
          wx.showModal({
            content: '暂未查询到当前空闲教室信息',
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
