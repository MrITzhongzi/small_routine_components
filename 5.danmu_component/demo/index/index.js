const app = getApp()

Page({
  data: {
    animationData: {},
    flag: false,
    array: [
      {
        imageUrl: "http://img.hapem.cn/test_product.png",
        name: "li**",
        time: 10
      },
      {
        imageUrl: "http://img.hapem.cn/test_product.png",
        name: "li2**",
        time: 12
      },
      {
        imageUrl: "http://img.hapem.cn/test_product.png",
        name: "li3**",
        time: 13
      }    
    ]
  },
  onLoad: function () {
    
  },
  clickItem(){
    var animation = wx.createAnimation({
      delay: 0,
      duration: 1000,
      timingFunction:'linear'
    });
    this.animation = animation;
    animation.translateY(-100).step();
    this.setData({
      animationData: animation.export(),
      flag: true
    });
  },
  clickCancel(){
    let animation = this.animation;
    animation.translateY(90).step();
    this.setData({
      animationData: animation.export(),
      flag: false
    });
  },

  transitionend(){
    console.log("transitionend");
  },

  animationiteration(){
    console.log("animationiteration");
  },
  
  animationend(){
    console.log("animationend");
  }
})
