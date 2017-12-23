const app = getApp()

Page({
  data: {
    logo: "/images/icons/kb.png"
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
      title: '关于课表'
    });
  }
})
