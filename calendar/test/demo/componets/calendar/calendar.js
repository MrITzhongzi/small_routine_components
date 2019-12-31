// componets/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    receiveDate: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    m_days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    columns: 7,
    rows: 0,
    firstDayOfMonth: 0,
    year: 1900,
    month: 0,
    daysOfCurrentMonth: 30,
    startDate: "",
    endDate: "",
    currentDayOfMonth: "",
    titleChooseFlag: 1, // 1 选择开始时间 2 选择 结束时间

    preChooseYear: "", // 按上个月或者下个月时保存上次选中的 年
    preChooseMonth: "", // 按上个月或者下个月时保存上次选中的 月
    preChooseDay: "", // 按上个月或者下个月时保存上次选中的 日
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let date = this.properties.receiveDate;
      this.initData(date, true);
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {},
    hide: function() {},
    resize: function() {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化数据 需要 格式 2019-10-10
     */
    initData: function(dateStr, isFirst) {
      this.initUI(dateStr);
      this.initCalendarTitleTime(dateStr, isFirst);
      this.setCurrentDayOfMonth(dateStr);
      this.setInitChoosedDay(dateStr);
    },

    initUI: function(dateStr) {
      let date;
      if (dateStr == "") {
        date = new Date();
      } else {
        date = new Date(dateStr)
      }
      let year = date.getFullYear();
      let month_days = this.data.m_days;
      let month = date.getMonth();
      let firstDayOfMonth = new Date(year, month, 1).getDay();
      //本月多少天
      let m_days = this.data.m_days;
      // 闰年 特殊处理 2月份
      month_days[1] = month_days[1] + this.isLeapYear(year);

      this.setData({
        firstDayOfMonth: firstDayOfMonth,
        month: month,
        year: year,
        daysOfCurrentMonth: m_days[month]
      });
      this.setRows();
    },

    /**
     * 初始化标题时间
     */
    initCalendarTitleTime: function(dateStr, isFirst) {
      //2019 - 10 - 1
      if (isFirst) {
        //首次进来
        let startDate;
        if (dateStr == "") {
          startDate = (new Date()).toLocaleString().split(" ")[0].replace(/\//g, "-");
        } else {
          startDate = dateStr;
        }
        let endDate = (new Date()).toLocaleString().split(" ")[0].replace(/\//g, "-");
        this.setCurrentDayOfMonth(startDate);
        this.setData({
          startDate: startDate,
          endDate: endDate
        });
      } else {
        //
        let titleChooseFlag = this.data.titleChooseFlag;
        if (titleChooseFlag == 1) {
          this.setData({
            startDate: dateStr
          })
        } else {
          this.setData({
            endDate: dateStr
          })
        }
      }
    },
    /**
     * 判断是否是闰年， 是 返回 1 不是 返回 0
     */
    isLeapYear: function(year) {
      return ((year % 100 == 0) ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
    },
    /**
     * 设置当前日期为 该月的 几号  2019-10-10
     */
    setCurrentDayOfMonth: function(date) {
      let currentDayOfMonth = date.split("-")[2];
      this.setData({
        currentDayOfMonth: currentDayOfMonth
      });
    },

    /**
     * 设置行数 
     */
    setRows: function() {
      let m_days = this.data.m_days;
      let month = this.data.month;
      let year = this.data.year;
      let firstDayOfMonth = this.data.firstDayOfMonth;
      let monthDays = m_days[month];
      let rows = Math.ceil((monthDays + firstDayOfMonth) / 7);
      this.setData({
        rows: rows
      });
    },
    /**
     * 点击标题时间，切换选择时间的类型： 开始时间还是结束时间
     */
    setTitleDate: function(e) {
      let tag = e.currentTarget.dataset.tag;
      let startDate = this.data.startDate;
      let endDate = this.data.endDate;
      let datetmp;
      if (tag == 1) {
        datetmp = startDate.replace(/\./g, "-");
      } else {
        // tag == 2
        datetmp = endDate.replace(/\./g, "-");
      }
      //重新渲染页面 
      this.initUI(datetmp);
      this.setCurrentDayOfMonth(datetmp);
      this.setData({
        titleChooseFlag: tag
      })
    },
    /**
     * 点击某一天事件
     */
    clickdate: function(e) {
      //当前日期
      let currentDayOfChoose = e.currentTarget.dataset.currentDay;
      let titleChooseFlag = this.data.titleChooseFlag;
      let currentDate;
      if (titleChooseFlag == 1) {
        currentDate = this.data.startDate;
      } else if (titleChooseFlag == 2) {
        currentDate = this.data.endDate;
      }
      let tmpArr = currentDate.split("-");
      tmpArr[2] = currentDayOfChoose.toString();
      currentDate = tmpArr.join("-");
      this.initData(currentDate);
      this.setData({
        preChooseYear: tmpArr[0],
        preChooseMonth: tmpArr[1],
        preChooseDay: tmpArr[2],
      });
      
    },

    setInitChoosedDay: function(date) {

      if (date == "") {
        date = new Date().toLocaleDateString().replace(/\//g, "-");
      }
      let tempArr = date.split("-");
      this.setData({
        preChooseYear: tempArr[0],
        preChooseMonth: tempArr[1],
        preChooseDay: tempArr[2],
      });

    },

    /**
     * 上个月 1 - 12
     */
    preMonth: function(e) {
      
      let tag = e.currentTarget.dataset.tag;
      this.setData({
        titleChooseFlag: tag
      })
      this.monthChangeDeal(-1);
    },
    /**
     * 下个月 1-12
     */
    nextMonth: function(e) {
      let tag = e.currentTarget.dataset.tag;
      this.setData({
        titleChooseFlag: tag
      })
      this.monthChangeDeal(1);
    },
    /**
     * 月份变化处理逻辑
     * monthChangeFlag 1 下一个月  -1 上一个月
     */
    monthChangeDeal: function(monthChangeFlag) {
      let currentDate;
      let flag = this.data.titleChooseFlag;
      let startDate = this.data.startDate;
      let endDate = this.data.endDate;
      currentDate = flag == 1 ? startDate : endDate;
      let currentDateArr = currentDate.split("-");
      let currentMonth = currentDateArr[1]; // 1 - 12月
      let currentYear = currentDateArr[0];
      let preChooseYear = this.data.preChooseYear;
      let preChooseMonth = this.data.preChooseMonth;
      let preChooseDay = this.data.preChooseDay;
      let month_days = this.data.m_days;
      //判断是 上一个月 还是下一个月
      if (monthChangeFlag > 0) {
        if (currentMonth >= 12) {
          currentMonth = 1;
          currentYear++;
        } else {
          currentMonth++;
        }
      } else {
        if (currentMonth <= 1) {
          currentMonth = 12;
          currentYear--;
        } else {
          currentMonth--;
        }
      }

      let newMonthDays = month_days[currentMonth - 1];
      let oldMonthDays = month_days[currentMonth];

      if (currentMonth.toString().length < 2) {
        currentMonth = "0" + currentMonth;
      }
      currentDateArr[0] = currentYear;
      currentDateArr[1] = currentMonth;
      
      if (parseInt(newMonthDays) < parseInt(oldMonthDays)) {
        currentDateArr[2] = "01";
      }
      currentDate = currentDateArr.join("-");

      if (currentDateArr[0] == preChooseYear && currentDateArr[1] == preChooseMonth) {
        //如果选择上一个月后没有选择具体哪一天，则不渲染选中天数，  如果当前月份是上一次选择过天数的月份，则渲染选中状态
        let tempDateStr = preChooseYear + "-" + preChooseMonth + "-" + preChooseDay;
        console.log(tempDateStr);
        this.setCurrentDayOfMonth(tempDateStr);
        this.initCalendarTitleTime(tempDateStr, false);
      } else {
        this.initCalendarTitleTime(currentDate, false);
        this.setData({
          currentDayOfMonth: "32"
        });
      }
      this.initUI(currentDate);
    },

    makesureDate: function() {
      let startDate = this.data.startDate;
      let endDate = this.data.endDate;
// var myEventDetail = {
      //   date: "2019-10-01"
      // } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('getcalendar', myEventDetail, myEventOption)
      console.log("start:" + startDate + "---end:" + endDate);
    }
  }
})