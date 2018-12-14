// pages/homeSelect/homeSelect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    module_list: [
      {
        name: 'hunli',
        text: '婚礼',
        text_en: 'Wedding'
      },
      {
        name: 'yuer',
        text: '育儿',
        text_en: 'Parenting'
      },
      {
        name: 'youjiao',
        text: '幼教',
        text_en: 'Education'
      },
      {
        name: 'yunyu',
        text: '孕育',
        text_en: 'Inoculation'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
  },
  handletap(e) {
    console.log(e)
  }
})