const api = require('../../utils/api'),
    get_set = require('../../utils/set_get'),
    app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnList: [{
                name: '仓库系统',
                icon: '../../images/index/store.png',
                url: '../outstoresys/outstoresys'
            },
            {
                name: '订单管理',
                icon: '../../images/index/order.png',
                url: '../orders/orders'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    checkhaslogin() {
        const that = this
        const token = get_set.getToken()
        app.globalData.checked = false
        if (token) {
            console.log('has')
            that.setData({
                haslogin: true
            })
        } else {
            console.log('nothas')
            that.setData({
                haslogin: false
            })
        }
    },
    async login(e) {
        const that = this
        const url = e.currentTarget.dataset.url

        await wx.login({
            success: res => {
                const code = res.code
                that.setData({
                    code
                })

            }
        });

        wx.getUserProfile({
            desc: '获取用户信息',
            success: user => {
                that.setData({
                    encryptedData: user.encryptedData,
                    iv: user.iv,
                    rawData: user.rawData,
                    signature: user.signature
                })
                wx.showLoading({
                    title: '登陆中'
                })
                get_set.setUserInfo(user.userInfo)
                const {
                    code,
                    encryptedData,
                    iv,
                    rawData,
                    signature
                } = that.data
                api.loginWX({
                    code,
                    encryptedData,
                    iv,
                    rawData,
                    signature
                }).then(res => {
                    wx.hideLoading()
                    console.log(res)
                    if (res.data.status == 200) {
                        get_set.setToken(res.data.data.token)
                        wx.showToast({
                            title: '登陆成功',
                        })
                        const store=get_set.getStore()
                        setTimeout(r=>{
                            if(store==''){
                                wx.showToast({
                                    title: '请先选择仓库',
                                    icon:'none'
                                  })
                                  setTimeout(res=>{
                         wx.navigateTo({
                           url: '../outstoresys/outstoresys',
                         })
                                  },1000)
                            }else{
                                setTimeout(r => {
                                    if (url == '../outstoresys/outstoresys') {
                                        wx.navigateTo({
                                            url
                                        })
                                    } else {
                                        wx.switchTab({
                                            url,
                                        })
                                    }
        
                                }, 1000)
                            }
                        },1000)
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'error'
                        })
                    }
                }).catch(err => {
                    wx.showToast({
                        title: '登陆失败',
                        icon: 'error'
                    })
                })
            }
        })


    },


    getcode() {
        const that = this
        wx.login({
            success: res => {
                console.log(res)
                that.setData({
                    code: res.code
                })
            }
        })
    },

    tohome(e) {
        const store=get_set.getStore()
        
        const url = e.currentTarget.dataset.url
       if(store==''){
         wx.showToast({
           title: '请先选择仓库',
           icon:'none'
         })
         setTimeout(res=>{
wx.navigateTo({
  url: '../outstoresys/outstoresys',
})
         },1000)
       }else{
        if (url == '../outstoresys/outstoresys') {
            wx.navigateTo({
                url
            })
        } else {
             
            wx.switchTab({
                url,
            })
        }
       }

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

        this.checkhaslogin()
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