// pages/category/category.js
const app = getApp(),api=require('../../utils/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top:0,
        categoryList: [],
        currentIndex: 0,
        show: false,
        name: '',
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    choosegoods(e){
console.log(e)
let goods=e.currentTarget.dataset.item
goods.choosenum=1
console.log(goods)
let haschoosed=false

app.globalData.goodsList.forEach(item=>{
    console.log(item)
    if(item.id==goods.id){
        haschoosed=true
    }
})
console.log(haschoosed)
if(!haschoosed){
    console.log('添加商品')
    app.globalData.goodsList.push(goods)
}
console.log(app.globalData.goodsList)


wx.navigateBack({
  delta: 0,
})

    },
    choose(e) {
        const index = e.currentTarget.dataset.index
        const categoryList=this.data.categoryList

        console.log(categoryList[index])
        this.getProduct(categoryList[index])
        this.setData({
            currentIndex: index,
            top:0
        })
    },
    getProduct(category){
        console.log(category)
        const that=this
        wx.showLoading()
api.getProduct({
    category_id:category.id
}).then(res=>{
    console.log(res.data.data)
    wx.hideLoading()
    this.setData({
        goodsList:res.data.data
    })
})
    },
    onChange(event) {
        console.log(event)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
  async  getclassList(){
        const store=this.data.store
        await  api.getClass({
              storage_id:store.id
          }).then(res=>{
              // 获取商品
              console.log(res.data.data)
             this.setData({
                 categoryList:res.data.data
             })
             
          })
        this.getProduct(this.data.categoryList[0])
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

        this.setData({
            store: app.globalData.store,
            goodsList:[]
        })
        this.getclassList()
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