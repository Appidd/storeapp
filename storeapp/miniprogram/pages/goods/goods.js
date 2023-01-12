// pages/category/category.js
const app = getApp(),api=require('../../utils/api'),set_get=require('../../utils/set_get')
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
    onTabItemTap(item){
        
        
    },
    todetail(e){
        const id=e.currentTarget.dataset.id
        console.log(id)
        if(!app.globalData.checked){
          this.Inpass.show()
        }else{
          wx.navigateTo({
            url: '../goodsdetail/goodsdetail?id='+id,
          })
        }
        
    },
    conformadd() {
        this.setData({
            show: false
        })
        const storage_id=this.data.store.id
        const name=this.data.name
        wx.showLoading()
        api.addClass({storage_id,name}).then(res=>{
          wx.hideLoading()
            this.setData({
                show: false
            })
        wx.showToast({
          title: '添加成功',
        })
        this.getclassList()
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    addcart() {
        this.setData({
            show: true
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
      this.Inpass = this.selectComponent("#Inpass");
    },
  async  getclassList(){
      wx.showLoading()
    const store=app.globalData.store
   await  api.getClass({
         storage_id:store.id
     }).then(res=>{
         // 获取商品
         console.log(res.data.data)
         if(!res.data.data.length){
             console.log(1111)
             wx.showToast({
               title: '暂无分类信息',
               icon:'none'
             })
         }
        this.setData({
            categoryList:res.data.data
        })
        
     })
     if(this.data.categoryList.length){
        this.getProduct(this.data.categoryList[0])
     }
     
    },
    /**
     * 生命周期函数--监听页面显示
     */
    refresh(){
        const store=set_get.getStore()
        app.globalData.store=store
        this.setData({
            store,
            goodsList:[]
        })
        this.getclassList()
    },
    onShow() {
const that=this

that.refresh()
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