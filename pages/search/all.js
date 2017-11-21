const app = getApp()

Page({
  data: {
    logo: "/style/icon/user.png",
    listData: ''
  },
  onShareAppMessage: function () {
    return {
      title: this.options.name + ' 全部课表',
      path: '/pages/search/all?action=' + this.options.action + '&dept=' + this.options.dept + '&name=' + this.options.name
    }
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.name + ' 全部课表'
    })
    wx.request({
      url: 'https://wechat.sangsir.com/timetable/api.php',
      data: {
        action: options.action,
        dept: options.dept,
        name: options.name
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showModal({
            content: '暂未查询到当前课表信息',
            showCancel: false,
            success: function (res) {
              wx.navigateBack()
            }
          })
        } else {
          that.setData({
            listData: res.data.data
          })
        }
      }
    })
  }
})
