// pages/detail/detail.js
import tool from "../../utils/tool";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    movieInfo: {},
    storyCat: ""
  },
  more: function () {
    this.setData({
      storyCat: this.data.movieInfo.summary
    })
  },
  cat: function () {

    this.setData({
      storyCat: this.data.movieInfo.summary.substr(0, 63) + "..."
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    tool.myPro({
      url: `${tool.urlBase}/movie/subject/${this.data.id}`
    }).then(requset => {
      const starNum = requset.data.rating.average / 2
      const smallStarNum = Math.floor(starNum)
      let arr = []
      for (var i = 0; i < 5; i++) {
        if (smallStarNum - i >= 1) {
          arr[i] = 1
        } else if (smallStarNum - i <= -1) {
          arr[i] = 0
        } else {
          if (Math.abs(starNum - i) < 1 && Math.abs(starNum - i) > .5) {
            arr[i] = 1
          } else if (Math.abs(starNum - i) < 1 && Math.abs(starNum - i) == 0) {
            arr[i] = 0
          } else {
            arr[i] = 2
          }
        }
      };

      requset.data.arr = arr
      this.setData({
        movieInfo: requset.data,
        storyCat: requset.data.summary.substr(0, 63) + "..."
      })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})