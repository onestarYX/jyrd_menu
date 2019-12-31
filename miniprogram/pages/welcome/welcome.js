// miniprogram/pages/register/register.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /* To test: does this function automatically show a toaster to the new user? */
  onGetUserInfo: function(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.userInfo);
    console.log(e.detail.rawData);

    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.logged = true;

    wx.navigateTo({
      url: '../register/register',
    });    
  },

  getAuthSettings: function(e) {
    wx.getSetting({
      success (res) {
        console.log(res.authSetting);
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})