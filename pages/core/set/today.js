// pages/core/set/today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  todayClassNameInput: function (e) {
    this.setData({
      todayClassName: e.detail.value
    })
  },
  setTodayClassName: function () {
    if (!this.data.todayClassName) {
      wx.showModal({
        content: '请输入班级，例如：建1604-1',
        showCancel: false
      })
    } else {
      wx.setStorageSync('todayClassName', this.data.todayClassName)
      wx.showToast({
        title: '设置成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let todayClassName = wx.getStorageSync('todayClassName');
    if (todayClassName) {
      this.setData({ todayClassName });
    }
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
      title: '今日课程设置',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/set/today'
    }
  }
})