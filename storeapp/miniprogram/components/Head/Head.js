// components/Heard/Head.js
const app=getApp()
Component({
    lifetimes: {
        attached: function() {
          console.log(111)
          console.log(app.globalData)
        },
        detached: function() {
            console.log(222)
        },
      },
    /**
     * 组件的属性列表
     */
    properties: {
        showArr:{
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        capsuleInfo:app.globalData.capsuleInfo
    },

    /**
     * 组件的方法列表
     */
    methods: {
        navback(){
            console.log(222)
            wx.navigateBack({
              delta: 0,
              success:res=>{
                  console.log(res)
              },fail:err=>{
                  wx.switchTab({
                    url: '../../pages/home/home',
                  })
              }
            })
        
        }
    }
})
