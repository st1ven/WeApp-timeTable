const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    check_info: '',
    btn_click: 0,
    page: '1'
  },
  getCheckList: function (options) {
    api.getCheckList({
      query: {
        page: options.page
      },
      success: (res) => {
        let info = res.data
        if (info.status == '1') {
          wx.showModal({
            content: '今天还没有小伙伴进行打卡，快去打卡抢占本日第一名！',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ info, page: options.page })
        }
      }
    })
  },
  getNextCheckList: function (options) {
    api.getCheckList({
      query: {
        page: options.page
      },
      success: (res) => {
        let info = this.data.info
        let nextinfo = res.data
        this.setData({ info: info.concat(nextinfo), page: options.page })
      }
    })
  },
  getCheckInfo: function (options) {
    api.getCheckInfo({
      success: (res) => {
        let check_info = res.data
        if (check_info.status == '1') {
          wx.showModal({
            content: '获取排名信息失败',
            showCancel: false
          })
        } else {
          this.setData({ check_info })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheckInfo()
    this.getCheckList(this.data)
  },
  praiseThis: function (e) {
    const openid = e.currentTarget.dataset.openid;
    const index = e.currentTarget.dataset.curindex;
    const info = this.data.info;
    if (info[index]) {
      const hasChange = info[index].hasChange;
      const onum = info[index].up;
      if (hasChange) {
        api.userCheckUp({
          query: {
            openid: openid,
            status: 'del'
          },
          success: (res) => {
            let data = res.data
            if (data.status == '1') {
              wx.showModal({
                content: '取消点赞失败，请联系客服反馈',
                showCancel: false
              })
            } else {
              info[index].up = (onum - 0 - 1);
              info[index].hasChange = false;
              this.setData({ info })
            }
          }
        })
      } else {
        api.userCheckUp({
          query: {
            openid: openid,
            status: 'add'
          },
          success: (res) => {
            let data = res.data
            if (data.status == '1') {
              wx.showModal({
                content: '点赞失败，请联系客服反馈',
                showCancel: false
              })
            } else {
              info[index].up = (onum - 0 + 1);
              info[index].hasChange = true;
              this.setData({ info })
            }
          }
        })
      }
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
    this.getCheckList({page: '1'})
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ page: parseInt(this.data.page) + 1 })
    let arr = { page: this.data.page }
    this.getNextCheckList(arr)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '文经早起打卡团',
      desc: '时光会见证，你的努力与成长',
      path: '/pages/core/check/about'
    }
  }
})