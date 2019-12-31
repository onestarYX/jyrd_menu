// miniprogram/pages/register/register.js
const app = getApp();
const db = wx.cloud.database();
const restaurantsCloud = db.collection('restaurants');

Page({

  /**
   * Page initial data
   */
  data: {
    userAvatar: "",
    userName: "",
    restaurantName: "",
    ownerName: "",
    numOfTable: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userAvatar: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName,
    });
  },

  formSubmit: function (e) {
    console.log(e.detail.value);
    this.setData({
      restaurantName: e.detail.value['restaurantName'],
      ownerName: e.detail.value['ownerName'],
      numOfTable: e.detail.value['numOfTable'],
    });

    const rstData = {
      restaurantName: this.data.restaurantName,
      ownerName: this.data.ownerName,
      numOfTable: this.data.numOfTable,
      registrationTime: (new Date()).toLocaleString(),
      orders: [],
      menu: []
    }

    restaurantsCloud.add({
      data: rstData,
      success: function (res) {
        console.log(res);
      }
    });
  },

  formReset: function () {

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