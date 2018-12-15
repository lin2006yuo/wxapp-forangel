// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    name:'您还未登陆，请登陆',
    logged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid')
    if(!openid) {
      return
    }
    wx.showLoading({
      title: '正在登陆',
    })
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          //获取用户信息
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                name: res.userInfo.nickName,
                logged: true              
              })
              wx.redirectTo({
                url: '../../pages/homeSelect/homeSelect'
              })
            }
          })
        }
      },
    })
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
  onGetUserInfo(e) {
    wx.showLoading({
      title: '正在登陆',
    })
    if(this.data.logged){
      return
    }
     this.getOpenId().then(res => {
       const db = wx.cloud.database()
       db.collection('users').where({
         _openid: res.result.openid
       }).get({
         success: res => {
           if(!res.data.length){
             db.collection('users').add({
               data: {
                 userInfo: e.detail.userInfo
               }
             })
           }
         },
         fail: err => {
           console.log(err)
         }
       })
       wx.setStorageSync('openid', res.result.openid)
     })
     wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      avatarUrl: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName,
      logged: true
    })
    wx.redirectTo({
      url: '../../pages/homeSelect/homeSelect',
    })
    //  wx.hideLoading()
  },

  getOpenId() {
    return wx.cloud.callFunction({
      name: 'login',
    })
  }
})