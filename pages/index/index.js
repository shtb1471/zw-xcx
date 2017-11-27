//index.js
//获取应用实例
var app = getApp();
var imageUtil = require('../../utils/util.js'); 
Page({
  data: {
    imagefirstsrc: '../../images/zw_index.jpg',//图片链接 
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高 
    indexBtn:'../../images/zw_indexBtn.png'
  },
  onLoad:function(opt){
    wx.hideShareMenu();
    if (opt.scene == 1044) {
      wx.getShareInfo({
        shareTicket: opt.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
  },
  primary:function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '真我”比您更懂您，源于心理专家亲自解析',
      desc:"稀里糊涂一晃20载，“真我”给您另一个真实的自我，快来测测吧",
      path: './pages/index/index?id=123',
      imageUrl:"../../images/logo.png",
      success: function (res) {
        // 转发成功
        var shareTickets = res.shareTickets;
        console.log(res.shareTickets)
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
