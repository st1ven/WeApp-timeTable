const app = getApp()

Page({
  data: {
    logo: "/style/icon/info.png"
  },
  onShareAppMessage: function () {
    return {
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级课表及教师课表',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关于课表'
    });
  }
})
