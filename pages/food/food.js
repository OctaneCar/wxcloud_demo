// pages/food/food.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'; 
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FoodList: [],
    value:'',
    loading: true
  },

  onSearch(){
    if(this.data.value.length <1) {
      Toast.fail('请输入内容')
    }
    else{
      wx.navigateTo({
        url: '/pages/food/food?searchKey='+this.data.value,
      })
    }
  },

  onChage(e){
    this.setData({
      value: e.detail
    })
  },

  GoDetail(data){
    console.log(data);
    wx.navigateTo({
      url: '/pages/detail/detail?id='+data.currentTarget.dataset.item
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    db.collection('Food').where({
      FoodName: db.RegExp({
        regexp: options.searchKey,
        options: "i"
      })
    }).get()
    .then(res=>{
      this.setData({
        FoodList: res.data
      })
    
      if (this.data.FoodList.length < 1) {
        
        Toast.fail('没有相关食品')
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index',
          })
        },2000)
      }
    })
    .catch(res=>{

      console.log(获取输入框内容失败,res)
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