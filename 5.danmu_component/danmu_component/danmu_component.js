// component/danmu_component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    array_data:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
      currentData: {},
      index: 0
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        currentData: this.data.array_data[0]
      })
    },
    ready() {

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    animationiteration() {
      let index = this.data.index;
      let array_data = this.data.array_data;
      index++;
      index = index % array_data.length;
      this.setData({
        index: index,
        currentData: this.data.array_data[index]
      });
      console.log("animationiteration");
    },

    animationend() {
      console.log("animationend");
    }
  }
})
