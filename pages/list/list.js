// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: "",
    movieList: [],
    start: 0,
    count: 9,
    total: 0,
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tag: options.tag
    })
    switch (this.data.tag) {
      case "in_theaters":
        this.setData({
          title: "影院热映"
        })
        break;
      case "coming_soon":
        this.setData({
          title: "即将上映"
        })
        break;
      case "top250":
        this.setData({
          title: "吐血推荐"
        })
        break;
    }
    wx.request({
      url: `https://douban.uieee.com/v2/movie/${this.data.tag}?start=${this.data.start}&count=${this.data.count}`,
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
          movieList: result.data.subjects,
          total: result.data.total
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      start: 0
    })
    wx.request({
      url: `https://douban.uieee.com/v2/movie/${this.data.tag}?start=${this.data.start}&count=${this.data.count}`,
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
          movieList: result.data.subjects
        })
        wx.stopPullDownRefresh()
      },
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.start >= this.data.total) {
      wx.showToast({
        title: '没有内容',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {},
        fail: () => {},
        complete: () => {}
      });
      return
    } else {
      wx.showLoading({
        title:'正在玩命加载中' ,
      });
      let newStart = this.data.start + this.data.count
      this.setData({
        start: newStart
      })
      wx.request({
        url: `https://douban.uieee.com/v2/movie/${this.data.tag}?start=${this.data.start}&count=${this.data.count}`,
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
          const newMoveList = this.data.movieList.concat(result.data.subjects);
          this.setData({
            movieList: newMoveList
          })
          wx.hideLoading();
        },
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})