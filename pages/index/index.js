// pages/food/food.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'; 
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImageList: [],
    FoodList:[],
    value:'',
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

  tapFoodList(data){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+data.currentTarget.dataset.item,
    })
  },
  
  AjaxCarousel(){ db.collection('Carousel').get()
  .then(res=>{
    this.setData({
      ImageList: res.data
    })
  })
  .catch(res =>{
    console.log('请求轮播图错误',res)
    this.setData({
    ImageList: [     
    '../../image/images/6207.jpg_wh1200.jpg',
    '../../image/images/6207.jpg_wh1200.jpg',
    '../../image/images/6207.jpg_wh1200.jpg',
  ]
  })
}

    
  )},

  AjaxFoodList(){
    db.collection('Food')
    .aggregate()
    .sample({
      size:6
    })
    .end()
    .then(res=>{
      this.setData({
        FoodList: res.list
      })
    })
    .catch(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.AjaxCarousel();
   this.AjaxFoodList();
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