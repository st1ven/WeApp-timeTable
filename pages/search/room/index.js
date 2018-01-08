const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },
  getRoom: function (options) {
    api.getRoom({
      query: {
        build: options.build,
        day: options.day,
        week: options.week,
        section: options.section
      },
      success: (res) => {
        let listData = res.data
        if (listData.status == '1') {
          wx.showModal({
            content: '抱歉，未查询到当前空闲教室信息',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ listData })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRoom(options)
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
      title: '空闲教室查询结果',
      path: '/pages/search/room/index?build=' + this.options.build + '&section=' + this.options.section + '&day=' + this.options.day + '&week=' + this.options.week
    }
  }
})