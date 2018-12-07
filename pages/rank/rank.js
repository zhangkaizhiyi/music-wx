// pages/rank/rank.js
Page({
  data: {
    query:'测试是否双向绑定'
  },
  onShow: function () {
    console.log(this.data.query);
  },
  input(e) {
    this.setData({
      query:e.detail.value
    })
  }
})
