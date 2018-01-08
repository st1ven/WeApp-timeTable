const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },
  studentIDInput: function (e) {
    this.setData({
      studentID: e.detail.value
    })
  },
  searchStudentID: function () {
    if (!this.data.studentID) {
      wx.showModal({
        content: '请输入学号，例如：201608504112',
        showCancel: false
      })
    } else {
      api.getId({
        query: {
          number: this.data.studentID
        },
        success: (res) => {
          let info = res.data
          if (info.status == '1') {
            wx.showModal({
              content: '抱歉，未查询到相关信息',
              showCancel: false
            })
          } else {
            this.setData({ info })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: '学号查询',
      path: '/pages/search/id/index'
    }
  }
})