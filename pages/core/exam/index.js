const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  classNameInput: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  getToday: function (todayClassName) {
    api.getToday({
      query: {
        name: todayClassName
      },
      success: (res) => {
        let today = res.data
        let todayWeek = api.todayInfo(res.data.startTime)
        this.setData({ todayWeek })
      }
    })
  },
  search: function () {
    if (!this.data.className) {
      wx.showModal({
        content: '请输入班级，例如：会1601-5',
        showCancel: false
      })
    } else {
      if (this.data.todayWeek.week < 18) {
        wx.showModal({
          content: '18周之前不提供考试安排查询功能',
          showCancel: false
        })
      } else {
        wx.setStorageSync('className', this.data.className)
        wx.navigateTo({
          url: '../../search/exam/index?class=' + this.data.className
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = wx.getStorageSync('className')
    this.getToday('exam')
    this.setData({ className })
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
      title: '考试安排',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/exam/index'
    }
  }
})