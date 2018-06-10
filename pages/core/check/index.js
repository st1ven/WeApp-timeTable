const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    info: '',
    checkCount: '',
    checkContent: '',
    checkStatus: false,
    checkValue: '立即打卡'
  },
  getUserInfo: function (options) {
    api.getUserInfo({
      query: {
        openid: options
      },
      success: (res) => {
        let info = res.data
        if (info.status == '1') {
          wx.login({
            success: function (res) {
              if (res.code) {
                api.wxLogin({
                  query: {
                    code: res.code
                  },
                  success: (res) => {
                    let info = res.data
                    if (info.status == '1') {
                      wx.showModal({
                        content: '抱歉，加入失败，请联系客服！',
                        showCancel: false
                      })
                    } else {
                      wx.getUserInfo({
                        success: function (res) {
                          const userInfo = res.userInfo
                          const nickName = userInfo.nickName
                          const avatarUrl = userInfo.avatarUrl
                          const gender = userInfo.gender //性别 0：未知、1：男、2：女
                          const province = userInfo.province
                          const city = userInfo.city
                          const country = userInfo.country
                          api.joinCheck({
                            method: 'POST',
                            headerType: 'application/x-www-form-urlencoded',
                            data: {
                              openid: info.openid,
                              avatarUrl: avatarUrl,
                              nickName: nickName,
                              gender: gender,
                              country: country,
                              province: province,
                              city: city
                            },
                            success: (res) => {
                              wx.setStorageSync('check', '1')
                              wx.redirectTo({
                                url: '/pages/core/check/index'
                              })
                            }
                          })
                        },
                        fail: function (res) {
                          wx.showModal({
                            content: '抱歉，您没有点击允许授权按钮，请删除本小程序后重新添加！',
                            showCancel: false
                          })
                        }
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  content: '加入失败！' + res.errMsg,
                  showCancel: false,
                  complete: function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              }
            }
          });
        } else {
          this.setData({ info, checkCount: info.count, checkContent: info.sentence + "，我已打卡" + (info.count - 0 + 1) + "天" })
        }
      }
    })
  },
  checkIn: function (options) {
    this.getUserInfo(this.data.openid)
    api.userCheckIn({
      method: 'POST',
      headerType: 'application/x-www-form-urlencoded',
      data: {
        openid: this.data.openid,
        content: this.data.checkContent
      },
      success: (res) => {
        if (res.data.status == '1') {
          wx.showModal({
            content: '您已打卡，无需重复打卡！',
            showCancel: false
          })
        } else {
          wx.showModal({
            content: '早起打卡成功！加油小兄dei！',
            showCancel: false
          })
        }
      }
    })
  },
  goCheckList: function () {
    wx.navigateTo({
      url: '/pages/core/check/list'
    })
  },
  goCheckAbout: function () {
    wx.navigateTo({
      url: '/pages/core/check/about'
    })
  },
  bindCheckContent: function (e) {
    this.setData({
      checkContent: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let hours = new Date().getHours()
    let check = wx.getStorageSync('check') ? wx.getStorageSync('check') : '0'
    if (check == '0') {
      wx.redirectTo({
        url: '/pages/core/check/about'
      })
    } else {
      if (!(5 <= hours && hours < 8)) {
        that.setData({ checkStatus: true, checkValue: '已过打卡时间' })
      }
      wx.login({
        success: function (res) {
          if (res.code) {
            api.wxLogin({
              query: {
                code: res.code
              },
              success: (res) => {
                let info = res.data
                if (info.status == '1') {
                  wx.showModal({
                    content: '抱歉，获取个人信息失败，请联系客服！',
                    showCancel: false
                  })
                } else {
                  that.setData({ openid: info.openid })
                  that.getUserInfo(info.openid)
                }
              }
            })
          }
        }
      });
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
      title: this.data.info.nickname + '邀请你加入文经早起打卡团',
      desc: '时光会见证，你的努力与成长',
      path: '/pages/core/check/about'
    }
  }
})