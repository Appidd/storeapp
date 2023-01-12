// pages/home/home.js
const app = getApp(),
    api = require('../../utils/api'),
    set_get=require('../../utils/set_get')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        password: '',
        btnList: [{
                name: '商品入库',
                imgurl: '../../images/home/rk.png',
                nav: '../outstore/outstore'
            },
            {
                name: '商品出库',
                imgurl: '../../images/home/ck.png',
                nav: '../outstore/outstore'
            },
            {
                name: '预警提醒',
                imgurl: '../../images/home/yj.png',
                nav: '../warning/warning'
            },
            {
                name: '数据报表',
                imgurl: '../../images/home/xd.png',
                nav: '../datagra/datagra'

            },
            {
                name: '商品管理',
                imgurl: '../../images/home/fl.png',
                nav: '../goods/goods'
            },
            {
                name: '仓库管理',
                imgurl: '../../images/home/store.png',
                nav: '../outstoresys/outstoresys'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.setData({
            capsuleInfo: app.globalData.capsuleInfo
        })


    },
    
    getstore() {
        const that = this
        const pid=set_get.getPid()
        console.log(pid)
        wx.showLoading()
        api.getNextStorage({id:pid}).then(res => {
            console.log(res.data.data)
            that.setData({
                catList: res.data.data,
            })
            that.setglobalStorage()
        }).catch(err => {
            that.tologin()
        })
    },
    chooseStore(e) {
        const catList = this.data.catList
        const index = e.currentTarget.dataset.index
        const store = catList[index]
        set_get.setStore(store)
        
        this.setglobalStorage()
    },
    setglobalStorage() {
        const store=set_get.getStore()
        console.log(store)
        this.getStorageCount(store.id)
        this.setData({
                store,
                show: false,
                showcheck: false,
            }),
        app.globalData.store = store
    },
    getStorageCount(id) {
        const that = this
        api.getStorageCount({
            storage_id: id
        }).then(res => {
            console.log(res)
            that.setData({
                storeData: res.data.data
            })
        }).catch(err=>{
            console.log(err)
        })
    },

    close() {
        this.setData({
            show: false
        });
    },
    onClose() {
        this.setData({
            show: false,
            showcheck: false,
        });
    },
    show() {
        this.setData({
            show: true
        })
    },
    navito(e) {
        const url = e.currentTarget.dataset.nav
        const index = e.currentTarget.dataset.index
        console.log(index)
        if (index == 0) {
            app.globalData.type = 2
        }
        if (index == 1) {
            app.globalData.type = 1
        }
       
        if (url == '../goods/goods') {
            wx.switchTab({
                url,
            })
        } else {
            wx.navigateTo({
                url,  
            })
        }




    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      this.Inpass = this.selectComponent("#Inpass");
    },
    tologin() {
        wx.showToast({
            title: '登陆过期',
            icon: 'none'
        })
        setTimeout(r => {
            wx.navigateTo({
                url: '../index/index',
            })
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const that = this
        console.log(111)
        wx.getStorage({
            key: 'token',
            success: res => {
                app.globalData.token = res.data
                that.getstore()
            },
            fail: err => {
                that.tologin()
            }

        })
    },
    refresh(){
      this.getstore()
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