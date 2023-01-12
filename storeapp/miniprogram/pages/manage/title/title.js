// pages/manage/people/people.js
const app = getApp();
const api = require('../../../utils/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnList: ['出库标题', '入库标题'],
        choseList: ['出库', '入库'],
        curindex: 0,
        showadd: false,
        showedit: false,
        type: 1,
        top: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(app.globalData.store)
        this.getTitle()
    },
    addTitle() {
        wx.showLoading()
        const {
            type,
            title
        } = this.data
        api.addTitle({
            type,
            title
        }).then(res => {
            wx.hideLoading()
            if (res.data.status == 200) {
                wx.showToast({
                    title: res.data.message,
                })
                this.onClose()
                this.getTitle()
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'error'
                })
                this.onClose()
            }
        })
    },
    onClose() {
        this.setData({
            showadd: false,
            showedit: false,
            title: '',
            type: 1
        })
    },
    chose(e) {
        console.log(e.currentTarget.dataset)
        const index = e.currentTarget.dataset.index
        this.setData({
            type: index + 1
        })

    },
    editTitle() {
        wx.showLoading()
        const {
            type,
            title,
            id
        } = this.data
        api.editTitle({
            type,
            title,
            id
        }).then(res => {
            wx.hideLoading()
            console.log(res)
            if (res.data.status == 200) {
                wx.showToast({
                    title: res.data.message,
                })
                this.onClose()
                this.getTitle()
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'error'
                })
                this.onClose()
            }
        })
    },
    showedit(e) {
        const item = e.currentTarget.dataset.item
        console.log(item)
        this.setData({
            showedit: true,
            ...item
        })
    },
    showadd() {
        this.setData({
            showadd: true
        })
    },
    change(e) {
        console.log(e.currentTarget.dataset)
        const index = e.currentTarget.dataset.index
        this.setData({
            curindex: index
        })
        this.getTitle()
    },
    getTitle() {
        wx.showLoading()
       
        const type = this.data.curindex + 1

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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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