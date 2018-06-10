const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  agree: function () {
  },
  disagree: function () {
    wx.setStorageSync('check', '0')
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  getUserInfo: function (e) {
    const that = this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({ userInfo: e.detail.userInfo })
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
                const userInfo = that.data.userInfo
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
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
      title: '文经早起打卡团',
      desc: '时光会见证，你的努力与成长',
      path: '/pages/core/check/about'
    }
  }
})