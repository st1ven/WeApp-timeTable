const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    build: ["文一教", "文二教"],
    buildIndex: 0,
    checkboxItems: [
      { name: '(上午) 第一大节', value: '1,2' },
      { name: '(上午) 第二大节', value: '3,4' },
      { name: '(下午) 第三大节', value: '5,6' },
      { name: '(下午) 第四大节', value: '7,8' },
      { name: '(晚上) 第五大节', value: '9,10' },
      { name: '(晚上) 第六大节', value: '11,12' }
    ]
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
  buildPicker: function (e) {
    this.setData({
      buildIndex: e.detail.value
    })
  },
  checkboxChange: function (e) {
    let checkboxItems = this.data.checkboxItems, values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    let checkboxValues = values.join(',')
    this.setData({ checkboxItems, checkboxValues })
  },
  searchRoom: function () {
    if (!this.data.checkboxValues) {
      wx.showModal({
        content: '请选择要查询的节数',
        showCancel: false
      })
    } else {
      if (this.data.todayWeek.week > 18) {
        wx.showModal({
          content: '18周之后不提供空闲教室查询功能',
          showCancel: false
        })
      } else {
        wx.navigateTo({
          url: '../../search/room/index?build=' + this.data.build[this.data.buildIndex] + '&section=' + this.data.checkboxValues + '&day=' + this.data.todayWeek.day + '&week=' + this.data.todayWeek.week
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToday('freeroom')
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
      title: '空闲教室',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/room/index'
    }
  }
})