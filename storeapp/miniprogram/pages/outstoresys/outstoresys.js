const api = require('../../utils/api'),
    app = getApp(),
    get_set = require('../../utils/set_get');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        catList: [],
        show: false,
        editshow: false,
        password: '0'
    },
    chooseStore(e) {
        const catList = this.data.catList
        const index = e.currentTarget.dataset.index
        const store = catList[index]
        console.log(store)
        wx.navigateTo({
            url: '../storesys/storesys?id=' + store.id + "&name=" + store.name,
        })
    },
    refresh() {
        wx.switchTab({
            url: '../home/home',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //   console.log(app.globalData)

    },
    edit(e) {
        console.log(e)

        const item = e.currentTarget.dataset.item
        this.setData({
            editshow: true,
            id: item.id,
            storage_name: item.name,
            password: '0'
        })
    },
    getuerInfo() {
        const userInfo = get_set.getUserInfo()
        console.log(userInfo)
        this.setData({
            username: userInfo.nickName
        })


    },
    conformadd() {
        this.setData({
            show: false
        })
    },
    onClose() {
        this.setData({
            show: false,
            editshow: false

        })
    },

    editstore() {

        const {
            id,
            storage_name,
            username,
            password
        } = this.data
        console.log(id, storage_name, username, password)
        api.editStorage({
            id,
            storage_name,
            username,
            password
        }).then(res => {
            if (res.data.status == 200) {
                wx.showToast({
                    title: '修改成功',
                })
                this.getstore()
            } else {
                wx.showToast({
                    title: '修改失败',
                    icon: 'error'
                })
            }
            this.setData({
                editshow: false
            })
            console.log(res)

        })
    },
    getstore() {
        wx.showLoading()
        api.getTopStorage().then(res => {
            console.log(res.data.data)
            wx.hideLoading()
            res.data.data.splice(0, 1)
            this.setData({
                catList: res.data.data,
            })
        })
    },
    addshow() {
        this.setData({
            show: true,
            storage_name: ''
        })
    },
    addstore() {
        this.setData({
            show: false
        })
        wx.showLoading()
        const that = this
        const {
            storage_name,
            username,
            password
        } = this.data
        api.addStorage({
            storage_name,
            username,
            password,
            pid: 0
        }).then(res => {
            console.log(res.data.data)
            wx.hideLoading()
            that.getstore()
        })
    },
    tohome() {
        wx.switchTab({
            url: '../home/home',
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
        this.getuerInfo()
        this.getstore()
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