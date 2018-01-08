const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },
  bookNameInput: function (e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  getLibList: function () {
    api.getLibList({
      success: (res) => {
        let info = res.data
        if (info.status == '1') {
          wx.showModal({
            content: '获取借阅排行榜失败',
            showCancel: false
          })
        } else {
          this.setData({ info })
        }
      }
    })
  },
  search: function () {
    if (!this.data.bookName) {
      wx.showModal({
        content: '请输入书名，例如：挪威的森林',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../../search/lib/index?&name=' + this.data.bookName + '&page=1'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLibList()
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
      title: '图书馆藏',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/lib/index'
    }
  }
})