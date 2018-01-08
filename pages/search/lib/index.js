const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData: [],
    page: ''
  },
  getLibSearch: function (options) {
    api.getLibSearch({
      query: {
        name: options.name,
        page: options.page
      },
      success: (res) => {
        let bookData = res.data
        if (bookData.status == '1') {
          wx.showModal({
            content: '抱歉，未查询到当前书籍信息',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ bookData, bookName: options.name, page: options.page })
          wx.setNavigationBarTitle({
            title: options.name + ' 查询结果'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLibSearch(options)
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
    let arr = { name: this.options.name, page: this.data.page }
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.getLibSearch(arr)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.options.name + ' 查询结果',
      path: '/pages/search/lib/index?name=' + this.options.name
    }
  }
})