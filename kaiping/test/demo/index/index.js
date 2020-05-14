const app = getApp()

Page({
  data: {
    kaipingFlag: true
  },
  onLoad: function () {
    wx.hideTabBar();
  },
  onMyEvent: function () {
    console.log("close");
    this.setData({
      kaipingFlag: false
    });
    wx.showTabBar();
  }
})
