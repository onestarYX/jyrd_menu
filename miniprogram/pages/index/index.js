//index.js
const app = getApp();
const db = wx.cloud.database();
const orders = db.collection('orders');

class Dish {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.inCart = false;
    this.category = category;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

// These instances are just for test.
const d1 = new Dish("蒜爆鱼", 30, "特色菜");
const d2 = new Dish("黑腿鸡", 35, "特色菜");
const d3 = new Dish("米椒豆腐", 12, "特色菜");

const d4 = new Dish("酸辣土豆丝", 10, "时令鲜蔬");
const d5 = new Dish("手撕包菜", 12, "时令鲜蔬");
const d6 = new Dish("香辣白菜", 10, "时令鲜蔬");
const d7 = new Dish("木耳青菜", 12, "时令鲜蔬");

const d8 = new Dish("米饭", 1, "主食");
const d9 = new Dish("馒头", 2, "主食");

Page({
  data: {
    /*
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    */

    category1: [d1, d2, d3],
    category2: [d4, d5, d6, d7],
    category3: [d8, d9],
    categoryList: ["特色菜", "时令鲜蔬", "主食"],
    currCategory: "特色菜",
    cost: 0,
    showCart: false,
    cart: [],
  },

  navToKitchen: function(e) {
    wx.navigateTo({
      url: '../orderListPage/orderListPage',
    });
  },

  toggleCategory: function(e) {
    const index = e.target.dataset.index;
    this.data.currCategory = this.data.categoryList[index];
    this.setData({
      currCategory: this.data.currCategory,
    });
  },

  increAmount: function(e) {
    const index = e.target.dataset.index;
    const array = e.target.dataset.array;
    console.log(array);

    // Question: is this passing pointer? I guess yes.
    // Temp is used to update the amount of the current array the user is editing.
    switch (array) {
      case "category1":
        var temp = this.data.category1;
        break;
      case "category2":
        var temp = this.data.category2;
        break;
      case "category3":
        var temp = this.data.category3;
        break;
      case "cart":
        var temp = this.data.cart;
        break;
    }
    temp[index].amount = temp[index].amount + 1;

    var cart = this.data.cart;
    if (temp[index].inCart == false) {
      temp[index].inCart = true;
      // Same question with this: passing pointer?
      cart.push(temp[index]);
    }

    this.setData({
      category1: this.data.category1,
      category2: this.data.category2,
      category3: this.data.category3,
      cost: this.data.cost + temp[index].price,
      cart: cart,
    });

    console.log(this.data.cart);
  },

  decreAmount: function (e) {
    const index = e.target.dataset.index;
    const array = e.target.dataset.array;
    switch (array) {
      case "category1":
        var temp = this.data.category1;
        break;
      case "category2":
        var temp = this.data.category2;
        break;
      case "category3":
        var temp = this.data.category3;
        break;
      case "cart":
        var temp = this.data.cart;
        break;
    }

    var cart = this.data.cart;
    if (temp[index].amount == 0) {
      return;
    } else {
      temp[index].amount = temp[index].amount - 1;
      this.data.cost = this.data.cost - temp[index].price;
      if (temp[index].amount == 0) {
        temp[index].inCart = false;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].name == temp[index].name) {
            cart.splice(i, 1);
          }
        }
      }

      this.setData({
        category1: this.data.category1,
        category2: this.data.category2,
        category3: this.data.category3,
        cost: this.data.cost,
        cart: cart,
      });
    }
    console.log(this.data.cart);
  },


  upload: function(e) {
    if (this.data.cart.length == 0){
      console.log("cart is empty");
      return;
    }

    const dishes = [];
    for (var i = 0; i < this.data.cart.length; i++) {
      const dish = {"amount": this.data.cart[i].amount, "name": this.data.cart[i].name};
      dishes.push(dish);
    }

    const order = {
      cost: this.data.cost,
      dishes: dishes,
      numPeople: 2,
      tableID: "2",
      timestamp: (new Date()).toLocaleString(),
      status: "inProgress",
    };

    orders.add({
      data: order,
      success: function(res) {
        console.log(res);
      }
    })

  },


  toggleCartPage: function (e) {
    if (this.data.showCart == false) {
      this.showModal();
    } else {
      this.hideModal();
    }
  },

  /* This part of code is partially credit to the post on https://blog.csdn.net/a772116804/article/details/90482628 */
  showModal: function () {
    console.log("showCart: false -> true");

    var that = this;

    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    });

    that.animation = animation;

    animation.translateY(1000).step();

    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showCart: true,
    });

    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
      })
    }, 100);

  },

  /* This part of code is partially credit to the post on https://blog.csdn.net/a772116804/article/details/90482628 */
  hideModal: function (e) {
    console.log("showCart: true -> false");

    var that = this;

    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    });

    that.animation = animation;

    animation.translateY(700).step();

    that.setData({
      animationData: animation.export()
    });

    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showCart: false,
      })
    }, 500);
  },





  /*  
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  */
  
})
