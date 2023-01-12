// pages/orders/orders.js
const api = require('../../utils/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: ['全部','加急', '高', '中', '低'],
    choseList: ['全部', '今年', '本月', '本周', '今天'],
    statusList: ['全部', '已下单','生产中','已完成','已发货'],
    //日期索引
    choseindex: 0,
    date: '', //y  m day week
    //优先级索引
    curindex: 0,
    priority: '', //1,2,3,4
    //订单状态索引
    statusindex: 0,
    status: '', //'',1,2,3

    page: 1,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },

  todetail(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    if(!app.globalData.checked){
      this.Inpass.show()
    }else{
      wx.navigateTo({
        url: '../orderdetail/orderdetail?id=' + id,
      })
    }
    
  },
  requestMoreData() {
    const {
      page
    } = this.data
    const pagenum = page + 1
    this.setData({
      page: pagenum
    })
    this.getOrderList()

  },
  getOrderList() {
    let that = this
    let {
      page,
      orderList,
      date,
      priority,
      status
    } = this.data
    console.log(date,
      priority,
      status)
    wx.showLoading()
    api.getOrderList({
      page,
      date,
      priority,
      status
    }).then(res => {
      wx.hideLoading()
      if (res.data.status) {
        var newList = orderList.concat(res.data.data)
        that.setData({
          orderList: newList
        })
        if(res.data.data.length==0){
            wx.showToast({
              title: '暂无更多订单',
              icon:'none'
            })
        }
      }else{
        wx.showToast({
            title: '系统错误',
            icon:'error'
          })
      }
      console.log(res)
    })
  },
  change(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    var priority=index==0?'':index==1?1:index==2?2:index==3?3:4
    this.setData({
      curindex: index,
      page: 1,
      priority,
      orderList:[],
      
    })
    this.getOrderList()
  },
  //日期切换
  chose(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    var date=index==0?'':index==1?'y':index==2?'m':index==3?'today':'week'
    this.setData({
      choseindex: index,
      page: 1,
      date,
      orderList:[]
    })
    this.getOrderList()
  },
  chosestatus(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    
    var status=index==0?'':index==1?1:index==2?2:index==3?3:4
    this.setData({
      statusindex: index,
      page: 1,
      status,
      orderList:[]
    })
    this.getOrderList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.Inpass = this.selectComponent("#Inpass");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  refresh(){
    this.setData({
        choseindex: 0,
        date: '', //y  m day week
        //优先级索引
        curindex: 0,
        priority: '', //1,2,3,4
        //订单状态索引
        statusindex: 0,
        status: '', //'',1,2,3
        orderList: []
      })
      this.getOrderList()
  },
  onShow() {
      this.refresh()
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})