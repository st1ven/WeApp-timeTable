const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData: [],
    page: '1'
  },
  getNewsList: function (options) {
    api.getNewsList({
      query: {
        page: options.page
      },
      success: (res) => {
        let newsData = res.data
        if (newsData.status == '1') {
          wx.showModal({
            content: '获取文经新闻失败',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ newsData, page: options.page })
        }
      }
    })
  },
  getNextNewsList: function (options) {
    api.getNewsList({
      query: {
        page: options.page
      },
      success: (res) => {
        let newsData = this.data.newsData
        let nextNewsData = res.data
        this.setData({ newsData: newsData.concat(nextNewsData), page: options.page })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getNewsList(this.data)
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
    this.setData({ page: parseInt(this.data.page) + 1 })
    let arr = { page: this.data.page }
    this.getNextNewsList(arr)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '文经新闻',
      path: '/pages/core/news/index'
    }
  }
})