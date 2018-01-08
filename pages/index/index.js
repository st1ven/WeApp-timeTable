const app = getApp()
import api from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '', //今日课程
    todayWeek: '', //开学周期 week周 day星期
    theDay: '', //今日时间
    todayClassName: '' //今日课程班级
  },
  getToday: function (todayClassName) {
    api.getToday({
      query: {
        name: todayClassName
      },
      success: (res) => {
        let today = res.data
        let todayWeek = api.todayInfo(res.data.startTime)
        this.setData({ today, todayWeek })
      },
      fail: (res) => {
        let today = 'error'
        this.setData({ today })
      },
      complete: (res) => {
        let theDay = api.getDate() + api.getDay()
        this.setData({ theDay })
      }
    })
  },
  toHelp: function () {
    wx.setStorageSync('help', '1')
    wx.navigateTo({
      url: '../more/help'
    })
  },
  setTodayClassName: function () {
    wx.navigateTo({
      url: '../core/set/today'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let help = wx.getStorageSync('help') ? wx.getStorageSync('help') : 'none';
    let todayClassName = wx.getStorageSync('todayClassName') ? wx.getStorageSync('todayClassName') : 'none';
    this.getToday(todayClassName)
    this.setData({ help, todayClassName })
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
    wx.reLaunch({
      url: 'index'
    })
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
      title: '文经课表',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/index/index'
    }
  }
})