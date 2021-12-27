// pages/center/center.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo: {
      nickName: '',
      avatarUrl: '',
    },
    actions: [
      {
        name: 'GGFLY666666',
        subname: '微信号'
      },
      {
        name: '2535754956',
        subname: 'QQ'
      },
      {
        name: '15186917753',
        subname: '手机',
      },
    ],
    actionss: [
      {
        name: 'Made By LKKK999',
        subname: '作者'
      },
      {
        name: '2021/11/11',
        subname: '创建时间'
      },
    ],
    condition: false,
    isShow: false,
    show: false,
    Show: false,
  },

  login() {
    wx.getUserProfile({
        desc: '完善用户信息',
      })
      .then(res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          condition: true
        })
        wx.setStorageSync('userInfo', this.data.userInfo)
        wx.setStorageSync('flag', this.data.condition)
      })
      .catch(res => {
        console.log(res);
      })
  },

  loginOut() {
    this.setData({
      condition: false,
      userInfo: null
    });
    wx.clearStorageSync()
  },

  goOrder() {
    let judge = wx.getStorageSync('userInfo')
    if (judge.length !== 0 ) {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    } else {
      Notify({
        type: 'danger',
        message: '请先登录'
      });
    }
  },

  goBackEnd(){
    wx.navigateTo({
      url: '/pages/bussiness/bussiness',
    })
  },

  allOrders(){
    wx.navigateTo({
      url: '/pages/orderforadmin/orderforadmin',
    })
  },

  contact(){
    this.setData({
      show: true
    })
  },

  about(){
   this.setData({
     Show: true
   })
  },

  onClose() {
    this.setData({ show: false , Show: false});
  },

  getPhoneNum(e){console.log(e);},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let flag = wx.getStorageSync('flag')
    this.setData({
      userInfo,
      condition: flag,
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
   console.log(app);
   this.setData({
     isShow: app.globData.isShow
   })
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
    console.log('1');
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