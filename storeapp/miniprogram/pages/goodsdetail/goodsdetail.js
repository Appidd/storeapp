// pages/goodsdetail/goodsdetail.js
const app = getApp(),
    api = require('../../utils/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        areasize:{ maxHeight: 30, minHeight: 30 },
        //分类列表
        categoryList:[],
        //仓库列表
        storeList:[],
        //单位列表
        unitList:[]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.setData({
            store: app.globalData.store,
            goodsid:options.id
        })
       

    },
    getUnit(e){
        const index=e.detail.value
        const unitList=this.data.unitList
        this.setData({
            unit:unitList[index].name
        })
    },
    getSupplier(e){
        const index=e.detail.value
        const supplierList=this.data.supplierList
        this.setData({
            supplier:supplierList[index].name
        })
    },
    getStore(e){
        const index=e.detail.value
        const storeList=this.data.storeList
        this.setData({
            storage_name:storeList[index].name,
            storage_id:storeList[index].id
        })
    },
    getCat(e){
        const index=e.detail.value
        const categoryList=this.data.categoryList
        this.setData({
            category_name:categoryList[index].name,
            category_id:categoryList[index].id
        })
    },
    getstoreList(){
        wx.showLoading()
        const that=this
        api.getStorage().then(res=>{
            that.setData({
                storeList:res.data.data,
            }) 
        })
    },
    getunitList(){
        const that=this
        api.getUnit().then(res=>{
            console.log(res)
            that.setData({
                unitList:res.data.data,
            }) 
        })
    },
    getclassList(store){
         api.getClass({
             storage_id:store.id
         }).then(res=>{
            this.setData({
                categoryList:res.data.data
            })
         })
        },
    getgoodsdetail(id) {
        api.getProductDetail({
            product_id: id
        }).then(res => {
            console.log(res)
            this.setData({
                ...res.data.data[0]
            })
        })
    },
    getPersonnel(){
        const that=this
        api.getPersonnel({
            type:1
        }).then(res=>{
            console.log(res)
            if(res.data.status==200){
                that.setData({
                    supplierList:res.data.data
                })
            }
        })
    },
    submit() {

        console.log(this.data)
        const {
            category_id,
            category_name,
            chu_price,
            customer,
            desc,
            id,
            location,
            max_stock,
            min_stock,
            name,
            num,
            qc_num,
            qc_price,
            ru_price,
            sn,
            spec,
            storage_id,
            storage_name,
            supplier,
            unit
        } = this.data


        api.editProduct({
            category_id,
            category_name,
            chu_price,
            customer,
            desc,
            id,
            location,
            max_stock,
            min_stock,
            name,
            num,
            qc_num,
            qc_price,
            ru_price,
            sn,
            spec,
            storage_id,
            storage_name,
            supplier,
            unit,
        }).then(res => {
            console.log(res)
            if (res.data.status == 200) {

                wx.showToast({
                    title: '修改成功',
                })
                setTimeout(res => {
                    wx.navigateBack({
                        delta: 0,
                    })
                }, 500)
            } else {
                wx.showToast({
                    title: '修改失败',
                    icon: 'error'
                })
            }
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
        const {goodsid,store}=this.data
       console.log(goodsid,store)
       this.getgoodsdetail(goodsid)
       this.getclassList(store)
       this.getstoreList()
       this.getunitList()
       this.getPersonnel()
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