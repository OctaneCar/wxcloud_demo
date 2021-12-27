// pages/detail/detail.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: false,
        flagg: false,
        show: false,
        userOrder: {},
        OrderList: [],
        List: [],
        newList: [],
        FoodList: [],
        num: 1,
        rank: 0
    },

    onClickButton() {
        let jugde = wx.getStorageSync('userInfo')
        if (jugde.length !== 0) {
            if (this.data.flag === false) {
                this.setData({
                    flag: true,
                    flagg: true
                })
                Notify({
                    type: 'success',
                    message: '加入购物车成功'
                });
            }   else {
                Notify({
                    type: 'danger',
                    message: '已经加入购物车'
                });
            }
        }else {
            Notify({
                type: 'danger',
                message: '请先登录'
            });
            setTimeout(()=>{
                wx.switchTab({
                  url: '/pages/center/center',
                })
            },3000)
        }
        
           
     
    },

    onPlus() {
        this.setData({
            num: this.data.num += 1
        })
    },

    onMinus() {
        this.setData({
            num: this.data.num -= 1
        })
    },

    onClose(){
        wx.switchTab({
          url: '/pages/center/center',
        })
    },

    takingOrder() {
        if (this.data.flagg === true) {
            this.data.userOrder = {
                FoodName: this.data.FoodList.FoodName,
                FoodPrice: this.data.FoodList.FoodPrice,
                FoodNum: this.data.num,
                TakingTime: new Date().toLocaleString()
            }
            db.collection('Order').add({
                    data: {
                        'FoodName': this.data.FoodList.FoodName,
                        'FoodPrice': this.data.FoodList.FoodPrice,
                        'FoodNum': this.data.num,
                        'Date': new Date().toLocaleString(),
                        'Userid': wx.getStorageSync('userInfo').nickName,
                        'status': 0
                    }
                })
                .then(res => {
                    this.setData({
                        show:true,
                    })
                })
                .then(
                    db.collection('Order').where({
                        status: 0
                    })
                    .orderBy('Date','asc')
                    .get()
                    .then(res => {
                        console.log(res);
                        this.setData({
                            rank: res.data.length
                        })
                    })
                )
        } else {
            Notify({
                type: 'danger',
                message: '没有商品信息'
            });
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection('Food').doc(options.id)
            .get()
            .then(res => {
                console.log(res);
                this.setData({
                    FoodList: res.data,
                })
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})