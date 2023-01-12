// pages/orders/orders.js
const api = require('../../utils/api'),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnList: ['出库记录', '入库记录'],
        logList: [],
       type:1,
        page: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
  
    
    },
    open(e){
        console.log(e)
        const index=e.currentTarget.dataset.index
    var logList=this.data.logList
    console.log(logList)
    logList[index].open=!logList[index].open
    this.setData({
        logList
    })
    },
    change(e) {
        console.log(e.currentTarget.dataset)
        const index = e.currentTarget.dataset.index+1
        this.setData({
            type: index,
            page: 1,
            logList:[]
        })
       this.getStockLog()
    },
    
    
    getStockLog() {
        const page = this.data.page
        const type=this.data.type
        const logList = this.data.logList
        const storage_id=app.globalData.store.id

        wx.showLoading()
        api.getStockLog({
            page,
            type,storage_id
        }).then(res => {
            console.log(res)
            wx.hideLoading()
            if (res.data.status == 200) {
                var resultList=res.data.data
                resultList.forEach(item=>{
                    item.open=false
                })
                var newlist = logList.concat(resultList)
                this.setData({
                    logList: newlist
                })
            }
        })
    },
    requestMoreData() {
        const page = this.data.page
        const npage = page + 1
        this.setData({
            page: npage
        })
        this.getStockLog()
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
        this.getStockLog()
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