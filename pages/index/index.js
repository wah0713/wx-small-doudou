//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hotmovie: [],
    comingmovie: [],
    top250: []
  },
  //事件处理函数
  onLoad: function () {
    // wx.getStorage({
    //   key: 'movie',
    //   success(res) {
    //     console.log(1);
    //     console.log(res.data)
    //   },
    //   fail() {
    //     console.log("失败");
    //   }
    // })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        console.log(result);
        result.data.subjects.forEach((v) => {
          let newList = []
          for (var i = 0; i < 5; i++) {
            newList[i] = v.rating.starNum = Math.round(v.rating.average / 2) > i ? 1 : 0
          };
          v.rating.starList = newList;
        })

        this.setData({
          hotmovie: result.data.subjects
        })
      },
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/coming_soon',
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        console.log(result);
        result.data.subjects.forEach((v) => {
          let newList = []
          for (var i = 0; i < 5; i++) {
            newList[i] = v.rating.starNum = Math.round(v.rating.average / 2) > i ? 1 : 0
          };
          v.rating.starList = newList;
        })

        this.setData({
          comingmovie: result.data.subjects
        })
      },
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: (result) => {
        result.data.subjects.forEach((v) => {
          let newList = []
          for (var i = 0; i < 5; i++) {
            newList[i] = v.rating.starNum = Math.round(v.rating.average / 2) > i ? 1 : 0
          };
          v.rating.starList = newList;
        })

        this.setData({
          top250: result.data.subjects
        })
      },
    });
  },
  // onHide() {
  //   console.log(JSON.stringify(this.data.hotmovie));
  //   wx.setStorage({
  //     key: "movie",
  //     data: JSON.stringify(this.data.hotmovie),
  //     fail() {
  //       console.log("写入失败2");
  //     }
  //   })
  // },
  // onUnload() {
  //   console.log(JSON.stringify(this.data.hotmovie));
  //   wx.setStorage({
  //     key: "movie",
  //     data: JSON.stringify(this.data.hotmovie),
  //     fail() {
  //       console.log("写入失败");
  //     }
  //   })
  // },

  getUserInfo: function (e) {}
})