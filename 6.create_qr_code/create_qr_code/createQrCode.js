import drawQrcode from 'weapp-qrcode';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showData: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function() {
      // 页面被展示
      console.log(typeof drawQrcode)
      const ctx = wx.createCanvasContext('myQrcode', this);
      let that = this;
      // 在组件实例进入页面节点树时执行
      drawQrcode({
        width: 200,
        height: 200,
        ctx: ctx,
        text: that.data.showData,
        callback(){
         
        }
      })
    },

    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes:{
    show: function() {
       
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
