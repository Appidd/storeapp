// pages/orders/orders.js
const api = require('../../utils/api');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '商品出库',
        choseList: ['出库', '入库', '转仓'],
        choseindex: 0,
        num: 1,
        remark: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    submit() {
        wx.showLoading()
        const {
            date,
            title,
            type,
            customer,
            people,
            remark,
            goodsList
        } = this.data
        const storage_id = app.globalData.store.id
        var product_data = []

        if (type == 1) {
            goodsList.forEach(item => {
                var t = {
                    price: item.rup,
                    id: item.id,
                    num: item.choosenum
                }
                product_data.push(t)
            })
        } else {
            goodsList.forEach(item => {
                var t = {
                    price: item.chup,
                    id: item.id,
                    num: item.choosenum
                }
                product_data.push(t)
            })
        }
        console.log(product_data)

        // console.log(type)
        // console.log(goodsList)

        api.stockLog({
            cur_date: date,
            title,
            type,
            people,
            customer,
            remark,
            product_data: product_data,
            storage_id
        }).then(res => {
            wx.hideLoading()
            if (res.data.status == 200) {
                wx.showToast({
                    title: '提交成功',
                })

          app.globalData.ptitle=''
          app.globalData.type=1
            app.globalData.title=''
            app.globalData.date=''
           app.globalData.customer=''
           app.globalData.people=''
           app.globalData.goodsList=[]
                setTimeout(re => {
                    wx.navigateBack({
                        delta: 0,
                    })
                }, 1000)
            }else{
                wx.showToast({
                    title: '提交失败',
                    icon:'error'
                })
            }


           
        })
    },
    delete(e) {
        const chooseindex = e.currentTarget.dataset.index
        var goodsList = this.data.goodsList
        goodsList.splice(chooseindex, 1)
        this.setData({
            goodsList
        })
        app.globalData.goodsList = goodsList
    },
    onChange(e) {
        console.log(e)
        const chooseindex = e.currentTarget.dataset.index
        const choosenum = e.detail
        var goodsList = this.data.goodsList
        goodsList.forEach((item, index) => {
            if (index == chooseindex) {
                item.choosenum = choosenum
                item.chup = (parseFloat(item.chu_price) * item.choosenum).toFixed(2)
                item.rup = (parseFloat(item.ru_price) * item.choosenum).toFixed(2)
            }
        })
        this.setData({
            goodsList
        })
        app.globalData.goodsList = goodsList
    },
    choosedate(e) {
        console.log(e)
        const date = e.detail.value
        app.globalData.date = date
        this.setData({
            date
        })
    },
    choosetitle(e) {
        console.log(e)
        const index = e.detail.value
        const titleList = this.data.titleList
        app.globalData.title = titleList[index].title
        this.setData({
            title: titleList[index].title
        })
    },
    choosecustom(e) {
        console.log(e)
        const index = e.detail.value
        const customList = this.data.customList
        app.globalData.customer = customList[index].name
        this.setData({
            customer: customList[index].name
        })
    },
    chooseworker(e) {
        console.log(e)
        const index = e.detail.value
        const workerList = this.data.workerList
        app.globalData.people = workerList[index].name
        this.setData({
            people: workerList[index].name
        })
    },
    checkchuru() {
        const type = app.globalData.type
        if (type == 1) {
            app.globalData.ptitle = '商品出库'
        } else if (type == 2) {
            app.globalData.ptitle = '商品入库'
        } else {
            app.globalData.ptitle = '商品转仓'
        }
        app.globalData.goodsList.forEach(item => {
            if (!item.chup) {
                item.chup = (parseFloat(item.chu_price) * item.choosenum).toFixed(2)
            }
            if (!item.rup) {
                item.rup = (parseFloat(item.ru_price) * item.choosenum).toFixed(2)
            }


        })
        this.setData({
            ptitle: app.globalData.ptitle,
            type: app.globalData.type,
            title: app.globalData.title || '请选择标题',
            date: app.globalData.date || '请选择日期',
            customer: app.globalData.customer || '请选择来往客户',
            people: app.globalData.people || '请选择经办人',
            goodsList: app.globalData.goodsList,
           

        })
        this.getTitle()

    },
    chose(e) {
        console.log(e.currentTarget.dataset)
        const index = e.currentTarget.dataset.index
        var type = 1
        var ptitle = '商品出库'
        if (index == 0) {
            type = 1
            ptitle = '商品出库'
        } else if (index == 1) {
            type = 2
            ptitle = '商品入库'
        } else {
            type = 3
            ptitle = '商品转仓'
        }
        app.globalData.ptitle = ptitle
        app.globalData.type = type
        this.setData({
            type,
            ptitle
        })
        this.getTitle()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getCustomr() {
        wx.showLoading()
        api.getPersonnel({
            type: 2
        }).then(res => {
            wx.hideLoading()
            console.log(res)
            this.setData({
                customList: res.data.data,
                top: 0
            })
        })
    },

    getworker() {
        wx.showLoading()
        api.getPersonnel({
            type: 3
        }).then(res => {
            wx.hideLoading()
            console.log(res)
            this.setData({
                workerList: res.data.data,
                top: 0
            })
        })
    },
    getTitle() {
        console.log(app.globalData.type)
        wx.showLoading()
        const type = app.globalData.type
        console.log(type)
        api.getTitle({
            type
        }).then(res => {
            wx.hideLoading()
            console.log(res)
            this.setData({
                titleList: res.data.data,
                top: 0
            })
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.checkchuru()
        this.getCustomr()
        this.getworker()
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