
var t={
    setToken:function(data){
        wx.setStorageSync('token', data)
    },
    getToken:function(){
        return wx.getStorageSync('token')
    },
    setUserInfo:function(data){
        wx.setStorageSync('userInfo', data)
    },
    getUserInfo:function(){
        return wx.getStorageSync('userInfo')
    },
    setPid:function(data){
        wx.setStorageSync('pid', data)
    },
    getPid:function(){
        return wx.getStorageSync('pid')
    },
    setStore:function(data){
        wx.setStorageSync('store', data)
    },
    getStore:function(){
        return wx.getStorageSync('store')
    },
}
module.exports=t