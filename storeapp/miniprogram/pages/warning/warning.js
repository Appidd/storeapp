// pages/orders/orders.js
const api = require('../../utils/api'),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnList: ['商品预警', '订单预警'],
        warnList: [],
        curindex: 0,
        page: 1,
        top:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      
    },
 
    
    getPreProduct() {
        const page = this.data.page
        const warnList = this.data.warnList
        const storage_id=app.globalData.store.id
        wx.showLoading()
        api.getPreProduct({
            page,
            storage_id
        }).then(res => {
            console.log(res)
            wx.hideLoading()
            if (res.data.status == 200) {
                var newlist = warnList.concat(res.data.data)
                this.setData({
                    warnList: newlist
                })
            }
        })
    },
    getEarlyOrderList() {
        const page = this.data.page
        const warnList = this.data.warnList
        wx.showLoading()
        api.getEarlyOrderList({
            page
        }).then(res => {
            console.log(res)
            wx.hideLoading()
            if (res.data.status == 200) {
                var newlist = warnList.concat(res.data.data)
                this.setData({
                    warnList: newlist
                })
            }
        })
    },
    change(e) {
        console.log(e.currentTarget.dataset)
        const index = e.currentTarget.dataset.index
        this.setData({
            curindex: index,
            page: 1,
            warnList:[],
            top:0
        })
        this.getData()
    },
    getData() {
        const curindex = this.data.curindex
        if (curindex==1) {
            this.getEarlyOrderList()
        } else {
            this.getPreProduct()
        }
    },
    requestMoregoods() {
       
        const page = this.data.page
        const npage = page + 1
        this.setData({
            page: npage
        })
       this.getPreProduct()
        
    },
    requestMoreorder(){
        const page = this.data.page
        const npage = page + 1
        this.setData({
            page: npage
        })
        this.getEarlyOrderList()
    },
    todetail(e){
        const id=e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url: '../goodsdetail/goodsdetail?id='+id,
          })
    },
      todetailorder(e){
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../orderdetail/orderdetail?id=' + id,
          })
      },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            warnList: [],
        curindex: 0,
        page: 1,
        top:0
        })
        this.getData()
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