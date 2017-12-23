const app = getApp()

Page({
  data: {
    img1: "../../images/contents/1.png",
    img2: "../../images/contents/2.png",
  },
  returnIndex: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  onShareAppMessage: function () {
    return {
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表及空闲教室查询服务',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '使用帮助'
    });
    wx.setStorageSync("help", 1)
  }
})
