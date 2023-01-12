const app=getApp(),get_set=require('../../utils/set_get')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
        name: '人员管理',
        url: '../manage/people/people'
      },
      {
        name: '标题管理',
        url: '../manage/title/title'
      },
      {
        name: '分类管理',
        url: '../manage/classfy/classfy'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuser()
  },
  intoPage(e){
    const url=e.currentTarget.dataset.url
  
    wx.navigateTo({
        url,
      })
   

  },
  getuser() {
   
    const userInfo=get_set.getUserInfo()
    console.log(userInfo)
    this.setData({
        userInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.Inpass = this.selectComponent("#Inpass");
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