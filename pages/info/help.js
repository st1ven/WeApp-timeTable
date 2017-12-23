const app = getApp()

Page({
  data: {
    img1: "../../images/contents/1.png",
    img2: "../../images/contents/2.png",
  },
  onShareAppMessage: function () {
    return {
      title: '使用帮助',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/info/help'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '使用帮助'
    });
    wx.setStorageSync("help", 1)
  }
})
