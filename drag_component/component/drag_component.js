// component/drag_component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: String,
    jumpUrl: String,
    name: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    position: {
      x: "",
      y: ""
    },
    screenParam: {
      width: "",
      height: ""
    },
    prePosition: {
      x: "",
      y: ""
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {

    attached: function () {
      console.log(this.data)
      let self = this;
      // 在组件实例进入页面节点树时执行
      wx.getSystemInfo({
        success: function(res) {
          console.log(res);
          console.log("platform", res.platform);
          console.log(res.model);
          //可用窗口的宽度，高度
          console.log("height=" + res.windowHeight);
          console.log("width=" + res.windowWidth);

          self.setData({
            screenParam: {
              width: res.windowWidth,
              height: res.windowHeight
            },
            position: {
              x: res.windowWidth - 60,
              y: res.windowHeight - 100
            }
          });
        },
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start: function(e){
      console.log(e);
    },
    move: function(e){
      console.log(e);
      var tmpx = parseInt(e.touches[0].clientX);
      var tmpy = parseInt(e.touches[0].clientY);
      if(tmpx <= 0 || 
          tmpy <= 0 || 
          tmpx > this.data.screenParam.width ||
          tmpy > this.data.screenParam.height) {

          } else {
            if(tmpx != this.data.prePosition.x || tmpy != this.data.prePosition.y) {
              this.setData({
                position: {
                  x: tmpx-36,
                  y: tmpy-36
                },
                prePosition: {
                  x: tmpx-36,
                  y: tmpy-36
                }
              });
            }
          }
          console.log(this.data);
    },
    end: function(e) {
      console.log(e)
    },
    cancel: function(e){
      console.log(e)
    },
    jump: function(){
      console.log(this.data.jumpUrl)
      if (this.data.jumpUrl) {
        wx.navigateTo({
          url: this.data.jumpUrl,
        })
      }
    }

  }
})
