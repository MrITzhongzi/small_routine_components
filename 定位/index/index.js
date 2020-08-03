const app = getApp()
// 引入SDK核心类
var QQMapWX = require("../utils/qqmap-wx-jssdk.min");
var qqmapsdk;
Page({
  data: {
    province: "",
    city: "",
    county: "",
    addressDetail: "",
    longitude: "", //经度
    latitude: ""  // 纬度
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'KVFBZ-GR2KD-PU344-H7WLB-MFV7Q-YOFFX'
    });

  },
  onShow: function () {

    
  },
  getAddress(){
    this.getJingWeiDu();
  },
  /**
   * 获取经纬度
   */
  getJingWeiDu() {
    let that = this;
    wx.getLocation({
      success(res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        }, () => {
          that.jingWeiduToDiZhi();
        });

      }
    })
  },
  /**
   * 经纬度转换成地址
   */
  jingWeiduToDiZhi() {
    
    let that = this;
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function(res){
        console.log("result")
        console.log(res);
        let tempData = res.result.address_component;
        that.setData({
          
          province: tempData.province,
          city: tempData.city,
          county: tempData.district,
          addressDetail: res.result.address
        });
      },
      fail: function(error) {
        console.log("err")
        console.error(error);
      },
      complete: function(res) {
        console.log("complete")
        console.log(res);
      }
    })
  }
})
