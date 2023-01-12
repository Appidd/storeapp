// pages/goodsdetail/goodsdetail.js
const app = getApp(),
    api = require('../../utils/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        areasize:{ maxHeight: 30, minHeight: 30 },
        statusList:['已下单','生产中','已完成','已发货'],
      priorityList:[
        {
        name:'加急'
      }, {
        name:'高'
      }, {
        name:'中'
      }, {
        name:'低'
      },
    ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.setData({
           
            orderid:options.id
        })
       

    },
    getstatus(e){
        console.log(e)
        const index=parseInt(e.detail.value)
       
        this.setData({
            status:index+1
        })
    },

    getdelivery_date(e){
        const delivery_date=e.detail.value
        this.setData({
            delivery_date
        })

    },
    getmake_order_date(e){
        const make_order_date=e.detail.value
        this.setData({
            make_order_date
        })

    },
    getpriority(e){
      const index=parseInt(e.detail.value)+1
      const priorityList=this.data.priorityList
      console.log(index)
      this.setData({
        priority:index
      })
    },
    
    getOrderDetail(id) {
        wx.showLoading()
        api.getOrderDetail({
            id: id
        }).then(res => {
            wx.hideLoading()
            console.log(res)
            this.setData({
                ...res.data.data
            })
        })
    },
    submit() {

        console.log(this.data)
        const {
          status,
          id,
          product_name ,
          spec,
          caizhi,
          num,
          delivery_date,
          cubing,
          jingren,
          luowen,
          chanshao,
          bikong,
          jingbing,
          priority,
          remark,
          urgent_remark,
          wait_remark,
          finish_remark,
            
        } = this.data


        api.editOrder(
          {
            id,
            status,
            product_name ,
            spec,
            caizhi,
            num,
            delivery_date,
            cubing,
            jingren,
            luowen,
            chanshao,
            bikong,
            jingbing,
            priority,
            remark,
            urgent_remark,
            wait_remark,
            finish_remark,
              
          } 
           ).then(res => {
            console.log(res)
            if (res.data.status == 200) {

                wx.showToast({
                    title: '修改成功',
                })
                setTimeout(res => {
                    wx.navigateBack({
                        delta: 0,
                    })
                }, 500)
            } else {
                wx.showToast({
                    title: '修改失败',
                    icon: 'error'
                })
            }
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
        const {orderid}=this.data
       
       this.getOrderDetail(orderid)
       
       
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