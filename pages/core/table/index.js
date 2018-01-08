Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["班级课表", "教师课表"],
    dept: ["管理系", "会计系", "机电工程系", "建筑工程系", "会计系", "经济系", "食品与生物工程系", "体教部", "外国语言文学系", "信息工程系", "中文与法律系"],
    deptIndex: 0,
    activeIndex: 0
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  classNameInput: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  teacherDeptPicker: function (e) {
    this.setData({
      deptIndex: e.detail.value
    })
  },
  teacherNameInput: function (e) {
    this.setData({
      teacherName: e.detail.value
    })
  },
  searchToday: function () {
    if (this.data.activeIndex == 0) {
      if (!this.data.className) {
        wx.showModal({
          content: '请输入班级，例如：建1604-1',
          showCancel: false
        })
      } else {
        wx.setStorageSync('className', this.data.className)
        wx.navigateTo({
          url: '../../search/table/today?action=student&name=' + this.data.className
        })
      }
    } else {
      if (!this.data.teacherName) {
        wx.showModal({
          content: '请输入姓名，例如：张三',
          showCancel: false
        })
      } else {
        wx.setStorageSync('deptIndex', this.data.deptIndex)
        wx.setStorageSync('teacherName', this.data.teacherName)
        wx.navigateTo({
          url: '../../search/table/today?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
        })
      }
    }
  },
  searchAll: function () {
    if (this.data.activeIndex == 0) {
      if (!this.data.className) {
        wx.showModal({
          content: '请输入班级，例如：建1604-1',
          showCancel: false
        })
      } else {
        wx.setStorageSync('className', this.data.className)
        wx.navigateTo({
          url: '../../search/table/all?action=student&name=' + this.data.className
        })
      }
    } else {
      if (!this.data.teacherName) {
        wx.showModal({
          content: '请输入姓名，例如：张三',
          showCancel: false
        })
      } else {
        wx.setStorageSync('deptIndex', this.data.deptIndex)
        wx.setStorageSync('teacherName', this.data.teacherName)
        wx.navigateTo({
          url: '../../search/table/all?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = wx.getStorageSync('className')
    let deptIndex = wx.getStorageSync('deptIndex') ? wx.getStorageSync('deptIndex') : 0
    let teacherName = wx.getStorageSync('teacherName')
    this.setData({ className, deptIndex, teacherName })
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
      title: '课表查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/table/index'
    }
  }
})