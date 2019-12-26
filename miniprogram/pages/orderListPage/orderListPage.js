// miniprogram/pages/orderListPage.js
const app = getApp();
const db = wx.cloud.database();
const ordersCloud = db.collection('orders');

Page({

  /**
   * Page initial data
   */
  data: {
    orders: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    ordersCloud.where({
      status: "inProgress",
    }).get({
      success: function(res) {
        that.setData({
          orders: res.data,
        });
        console.log(that.data.orders);
      },

    });

    // ordersCloud.doc('e8f863ba5e04bb54077913ab55d3ce1c').get({
    //   success: function(res) {
    //     console.log(res.data);
    //   },
    // });
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