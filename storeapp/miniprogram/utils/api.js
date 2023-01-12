var get_set=require('./set_get')
var t = {
    requestDomain: 'https://cangku.nxcsoft.top/',
    _send: function (t) {
       
        var e = this,
            n = t.data,
            o = t.method || 'POST',
            a = {
                'app-type': 'ios'
            };
        if (!t.login) {
            var token = get_set.getToken()
            console.log(6666,token)
            a = {
                'access-user-token': token,
                'app-type': 'ios',
                'token': token
            }
        }
        return new Promise((r, i) => {
            wx.request({
                method: o,
                url: e.requestDomain + t.url,
                data: n,
                header: a,
                success: res => {
                    wx.hideLoading()
                    if(res.data.status!=200){
                        if(res.data.status==203){
                            wx.clearStorage()
                            wx.showToast({
                                title: '登陆过期',
                                mask: true,
                                icon: 'none'
                            })
                            setTimeout(res=>{
                                wx.reLaunch({
                                    url: "../index/index"
                                });
                            },500)
                           }else{
                            wx.showToast({
                                title: res.data.message || '系统错误',
                                mask: true,
                                icon: 'none'
                            })
                           }
                           i(res)
                    }else{
                        r(res)
                    }
                },
                fail: err => {
                    wx.hideLoading()
                    i(err)
                }
            })
        })
    },
    loginWX(t) {
        return this._send({
            url: 'api/v1/wx_mini_login',
            method: 'POST',
            login: 1,
            data: t
        })
    },
    //获取仓库列表
    getStorage(t) {
        return this._send({
            url: 'api/v1/getStorage',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //获取顶级仓库
    getTopStorage(t) {
        return this._send({
            url: 'api/v1/getTopStorage',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //获取顶级仓库
    getNextStorage(t) {
        return this._send({
            url: 'api/v1/getNextStorage',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //获取单位列表
    getUnit(t) {
        return this._send({
            url: 'api/v1/getUnit',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    addStorage(t) {
        return this._send({
            url: 'api/v1/addStorage',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    checkPass(t) {
        return this._send({
            url: 'api/v1/checkStoragePass',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    getClass(t) {
        return this._send({
            url: 'api/v1/getClass',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    addClass(t) {
        return this._send({
            url: 'api/v1/addClass',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    editClass(t) {
        return this._send({
            url: 'api/v1/editClass',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    getStorageCount(t) {
        return this._send({
            url: 'api/v1/getStorageCount',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    getProduct(t) {
        return this._send({
            url: 'api/v1/getProduct',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    getProductDetail(t) {
        return this._send({
            url: 'api/v1/getProductDetial',
            method: 'GET',
            login: 0,
            data: t
        })
    },

    //编辑仓库
    editStorage(t) {
        return this._send({
            url: 'api/v1/editStorage',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    editProduct(t) {
        return this._send({
            url: 'api/v1/editProduct',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //获取人员列表
    getPersonnel(t) {
        return this._send({
            url: 'api/v1/getPersonnel',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //添加人员
    addPersonnel(t) {
        return this._send({
            url: 'api/v1/addPersonnel',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //修改人员
    editPersonnel(t) {
        return this._send({
            url: 'api/v1/editPersonnel',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //获取仓库标题
    getTitle(t) {
        return this._send({
            url: 'api/v1/getTitle',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //编辑标题
    editTitle(t) {
        return this._send({
            url: 'api/v1/editTitle',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //编辑标题
    addTitle(t) {
        return this._send({
            url: 'api/v1/addTitle',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //获取预警订单
    getEarlyOrderList(t) {
        return this._send({
            url: 'api/v1/getEarlyOrderList',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //获取预警商品
    getPreProduct(t) {
        return this._send({
            url: 'api/v1/getPreProduct',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    //获取订单列表
    getOrderList(t) {
        return this._send({
            url: 'api/v1/getOrderList',
            method: 'POST',
            login: 0,
            data: t
        })
    },

    //获取订单详情
    getOrderDetail(t) {
        return this._send({
            url: 'api/v1/getOrderDetail',
            method: 'GET',
            login: 0,
            data: t
        })
    },
    editOrder(t) {
        return this._send({
            url: 'api/v1/editOrder',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //出入库记录
    getStockLog(t) {
        return this._send({
            url: 'api/v1/getStockLog',
            method: 'POST',
            login: 0,
            data: t
        })
    },
    //
    stockLog(t) {
        return this._send({
            url: 'api/v1/stockLog',
            method: 'POST',
            login: 0,
            data: t
        })
    },
}
module.exports = t