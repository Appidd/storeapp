// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
   async login(){
       const that=this
   await     wx.login({
          success:res=>{
              const code=res.code
             that.setData({
                 code
             })
            
          }
        })
        wx.getUserProfile({
            desc: '获取用户信息',
            success:user=>{
                that.setData({
                    encryptedData:user.encryptedData,
                    iv:user.iv,
                    rawData:user.rawData,
                    signature:user.signature
                })
                const {code,encryptedData,iv,rawData,signature}=that.data
                wx.request({
                    method: "POST",
                    url: 'https://cangku.nxcsoft.top//api/v1/wx_mini_login',
                    data: {code,encryptedData,iv,rawData,signature},
                    header: {
                        "app-type":'ios'
                    },
                    success: res => {
                        wx.showToast({
                          title: '登陆成功',
                        })
                       console.log(res)
                    },
                    fail: err => {
                        wx.showToast({
                          title: '登陆失败',
                          icon:'error'
                        })
                      console.log(err)
                    }
                })
            }
   })
 
    },
   loginbtn(){
       
    
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