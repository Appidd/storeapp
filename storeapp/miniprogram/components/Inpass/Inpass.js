// components/Inpass/Inpass.js
const app=getApp();
const api=require('../../utils/api');
const get_set=require('../../utils/set_get')

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        showcheck: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
     show(){
         this.setData({
            showcheck:true,
            password:'0'
         })
     },
     checkpassword() {
         const that=this
         wx.showLoading({
           title: '核验中',
         })
        const password = this.data.password
        const store = app.globalData.store
        const pid=app.globalData.pid
        const storage_id = store.id
        api.checkPass({
            password,
            storage_id
        }).then(res => {
            console.log(res)
            if (res.data.status == 200) {
                wx.showToast({
                    title: '密码正确',
                })
                that.setData({
                  showcheck: false,
              })
              get_set.setPid(pid)
              get_set.setStore(store)
                // app.globalData.checked = true
                setTimeout(r=>{
                    that.triggerEvent('refresh')
                },500)
            } else {
                app.globalData.checked = false
                wx.showToast({
                    title: '密码错误',
                    icon: 'error'
                })
            }
        }).catch(er=>{
            app.globalData.checked = false
           
            wx.showToast({
                title: '密码错误',
                icon: 'error'
            })
        })
    },
    onClose() {
        console.log(111111111)
        this.setData({
            showcheck: false,
        });
        wx.navigateBack({
          delta: 0,
          success:res=>{
              console.log(res)
          },
          fail:err=>{
              console.log(err)
          }
        })
    },
    }
})
