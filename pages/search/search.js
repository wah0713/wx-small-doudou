// pages/search/search.js
import tool from "../../utils/tool";
const titleList = require("../../utils/search");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: [],
    searchList: []
  },
  search(e) {
    tool.myPro({
      url: `${tool.urlBase}/movie/search?q=${e.detail.value}`
    }).then(requset => {
      console.log(requset);
      requset.data.subjects.forEach(v => {
        const starNum = v.rating.average / 2
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
        v.arr = arr
      })

      this.setData({
        searchList: requset.data.subjects
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      titleList: titleList
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