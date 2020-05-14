const staticDate = new Date(2019, 11, 7); // 2019.12.7

Page({
    data: {},

    onLoad: function () {
        console.log(1);
    },

    getCalendarDate: function (e, option) {
        console.log("index");
        console.log(e);
        console.log(e.detail);
    }
});