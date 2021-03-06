// pages/bussiness/bussiness.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: ''
    },

    login(){
       wx.cloud.database().collection('admin').where({
           username: this.data.username,
           password: this.data.password
       })
       .get()
       .then(res => {
           console.log(res);
           if (res.data.length > 0) {
                app.globData.isShow = true
                wx.switchTab({
                  url: '/pages/center/center',
                })
           }else {
               Notify({
                   type: 'danger',
                   message: '账户密码不正确'
               })
           }
       })
       .catch(res => {
           console.log(res);
       })
    
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
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