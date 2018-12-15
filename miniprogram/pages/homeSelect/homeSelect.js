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
        text_en: 'Wedding',
        checked: false
      },
      {
        name: 'yuer',
        text: '育儿',
        text_en: 'Parenting',
        checked: true
      },
      {
        name: 'youjiao',
        text: '幼教',
        text_en: 'Education',
        checked: false
      },
      {
        name: 'yunyu',
        text: '孕育',
        text_en: 'Inoculation',
        checked: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
  },

  /**
   * methods
   */
  handletap(e) {
    const index = e.currentTarget.dataset.index
    let checkStatus = `module_list[${index}].checked`
    this.setData({
      [checkStatus]: !this.data.module_list[index].checked
    })
  },
  nextHandle() {
    const checkedList = this.data.module_list.filter(item => {
      return item.checked === true
    })
    app.checkedList = checkedList
    wx.navigateTo({
      url: '../../pages/fillname/fillname',
    })
  }
})