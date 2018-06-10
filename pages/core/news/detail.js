const app = getApp()
import api from '../../../utils/util.js'
import WxParse from '../../../utils/wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: []
  },
  getNewsDetail: function (options) {
    api.getNewsDetail({
      query: {
        id: options.id
      },
      success: (res) => {
        let detailData = res.data
        if (detailData.status == '1') {
          wx.showModal({
            content: '获取文经新闻内容失败',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          const that = this;
          this.setData({ detailData })
          WxParse.wxParse('article', 'html', detailData.content, that, 5);
          wx.setNavigationBarTitle({
            title: detailData.title
          })
        }
      }
    })
  },
  backIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsDetail(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.detailData.title,
      path: '/pages/core/news/detail?id=' + this.options.id
    }
  }
})