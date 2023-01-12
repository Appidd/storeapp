// pages/manage/people/people.js
const app = getApp();
const api = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: ['全部', '员工', '客户', '供应商'],
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
    this.getPersonnel()
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
  this.getPersonnel()
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
      phone:'',
      email:'',
      address:'',
      type:1
    })
  },
  chose(e){
    console.log(e.currentTarget.dataset)
    const index=e.currentTarget.dataset.index
    this.setData({
      type:index+1
    })
   
},
editPersonnel(){
  wx.showLoading()
  const {name,phone,email,type,address,id}=this.data
  api.editPersonnel({name,phone,email,type,address,id}).then(res=>{
    wx.hideLoading()
    console.log(res)
if(res.data.status==200){
  wx.showToast({
    title: res.data.message,
  })
  this.onClose()
  this.getPersonnel()
}else{
  wx.showToast({
    title: res.data.message,
    icon:'error'
  })
  this.onClose()
}
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
  change(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    this.setData({
      curindex: index
    })
    this.getPersonnel()
  },
  getPersonnel() {
    wx.showLoading()
    const type =4 - this.data.curindex 
    api.getPersonnel({
      type
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      this.setData({
        personList:res.data.data,
        top:0
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