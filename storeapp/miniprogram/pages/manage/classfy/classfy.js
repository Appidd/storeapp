// pages/manage/people/people.js
const app = getApp();
const api = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: ['供应商', '客户', '员工', '全部'],
    choseList:['供应商', '客户', '员工'],
    curindex: 0,
    showadd:false,
    showedit:false,
    type:1,
    top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getClass()
  },
  addPersonnel(){
    wx.showLoading()
const {name,phone,email,type,address}=this.data
api.addPersonnel({name,phone,email,type,address}).then(res=>{
wx.hideLoading()
if(res.data.status==200){
  wx.showToast({
    title: res.data.message,
  })
  this.onClose()
  this.getClass()
}else{
  wx.showToast({
    title: res.data.message,
    icon:'error'
  })
  this.onClose()
}
})
  },
  onClose(){
    this.setData({
      showadd:false,
      showedit:false,
      name:'',
    })
  },
  chose(e){
    console.log(e.currentTarget.dataset)
    const index=e.currentTarget.dataset.index
    this.setData({
      type:index+1
    })
   
},

showedit(e){
  const item=e.currentTarget.dataset.item
console.log(item)
this.setData({
  showedit:true,
  ...item
})
},
  showadd(){
this.setData({
  showadd:true
})
  },
 editClass(){
  const storage_id=app.globalData.store.id
  const name=this.data.name
  const id=this.data.id
  wx.showLoading()
  api.editClass({storage_id,name,id}).then(res=>{
    wx.hideLoading()
    if(res.data.status==200){
      wx.showToast({
        title: res.data.message,
      })
      this.onClose()
      this.getClass()
    }else{
      wx.showToast({
        title: res.data.message,
        icon:'error'
      })
      this.onClose()
    }
  })
   this.setData({
    showedit:false
   })
 },
  addClass() {
    const storage_id=app.globalData.store.id
    const name=this.data.name
    wx.showLoading()
    console.log(storage_id,name)
    api.addClass({storage_id,name}).then(res=>{
      wx.hideLoading()
      console.log(res)
        this.setData({
          showadd: false
        })
    wx.showToast({
      title: '添加成功',
    })
    this.getClass()
    })
},
  getClass(){
    wx.showLoading()
    const store=app.globalData.store
     api.getClass({
         storage_id:store.id
     }).then(res=>{
         wx.hideLoading()
         console.log(res.data.data)
        this.setData({
            classList:res.data.data
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