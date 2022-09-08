var t = {
    requestDomain: 'https://cangku.nxcsoft.top/',
    _send: function (t) {
        var app = getApp()
        var e = this,
            n = t.data,
            o = t.method || 'POST',
            a = {
                'app-type':'ios'
            };
        if(!t.login){
            a={
                'token':app.globalData.token,
                'app-type':'ios'
               
            }
        }
        return new Promise((r,i)=>{
            wx.request({
                method:o,
              url: e.requestDomain+t.url,
              data:n,
              header:a,
              success:res=>{
                  r(res)
              },
              fail:err=>{
                  i(err)
              }

            })
        })
    },
    loginWX(t){
        return this._send({
            url:'api/v1/getToken',
            method:'GET',
            login:1,
            data:t
        })
    }
}
module.exports=t