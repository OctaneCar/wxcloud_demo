// pages/order/order.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        FoodList: [],
        payDoneFoodList: [],
    },

    onClickButton(data){
        let orderId = data.currentTarget.dataset.item
        db.collection('Order').doc(orderId).update({
            data: {
                status: 1
            }
        })
        .then(res => {
            console.log(res);
        })
        .then(() => {
            this.onLoad()
        })
    },

    chooseTab(){
        this.payBefore()
        this.payDone()
    },

    payBefore(){
        db.collection('Order').where({
            Userid: wx.getStorageSync('userInfo').nickName,
            status: 0
        })
        .get()
        .then(res => {
            this.setData({
                FoodList: res.data
            })
        })
    },

    payDone(){

        db.collection('Order').where({
            Userid: wx.getStorageSync('userInfo').nickName,
            status: 1
        })
        .get()
        .then(res => {
            this.setData({
                payDoneFoodList: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.payBefore()
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