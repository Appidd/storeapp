// app.js
App({
  onLaunch: function () {
   wx.login({
    success:res=>{
        console.log(res)
        this.globalData.code=res.code
    }

   })
    this.globalData = {
        code:''
    };
  }
});
