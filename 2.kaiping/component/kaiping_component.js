// component/kaiping_component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagepath: {
      type: String
    },
    second: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timer: null
  },

  lifetimes: {
    created: function () {
     
    },
    attached: function () {
      let secondTime = this.data.second;
      let that = this;

      const timer = setInterval(function () {
        let nowSecond = --that.data.second;
        if (nowSecond <= 0) {
          clearInterval(timer);
          that.hideKaiping();
        }
        console.log(nowSecond);
        that.setData({
          second: nowSecond
        });
      }, 1000);
      this.setData({
        timer: timer
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideKaiping: function () {
      this.triggerEvent("hide");
      
    },
    skipAnimation: function () {
      this.hideKaiping();
      let timer = this.data.timer;
      if (timer) {
        clearInterval(timer);
      }
    }
  }
})
