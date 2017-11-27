var app=getApp();
Page({
  data: {
    showImgUrl: "",
    reject: false,//false上传失败，true 驳回
    imgType: "",
    rejectData:false,
    rejectReason:"",
    rejectImg:"",
    userId:"",
    sid:""
  },
  onLoad: function (options) {
    var _this = this,
    data = wx.getStorageSync("cookies");
    wx.hideShareMenu();
    this.setData({
      reject: options.reject,
      imgType: options.imgType == undefined ? 0 : options.imgType,
      userId: data.userId,
      sid: data.sid
    })
    if (options.reject) {
      //驳回信息
      wx.request({
        url: app.data.zwUrl + '/api/zw/userHandApi/checkRejectInfo',
        method: 'POST',
        data: {
          userId: "27881104368145886455240446502",
          sid: _this.data.sid,
          rejectStatus: "0"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var vals = res.data;
          if (vals.code == 0) {
            if(vals.data.length>0){
              for (var i = 0; i < vals.data.length; i++) {
                var dataLists = vals.data[i];
                if (dataLists.imgType == "0") {
                  _this.setData({
                    rejectData:true,
                    rejectReason: dataLists.rejectReason,
                    rejectImg: dataLists.imgUrl
                  })
                }
              }
            }
            
          }
        },
        fail: function (e) {
          wx.showToast({
            title: "请求失败",
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
        }
      });
    }
  },
  repeatUpload: function () {
    var _this = this;
    wx.redirectTo({
      url: "../rightHand/rightHand?imgType=" + _this.data.imgType
    })
  },
  todoReject() {
    //查询用户性别
    var _this=this;
    wx.request({
      url: app.data.zwUrl + '/api/zw/userHandApi/querySex',
      method: 'POST',
      data: {
        userId: _this.data.userId,
        sid: _this.data.sid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var vals = res.data;
        if (vals.code == "0") {
          if (vals.existSex != true) {
            wx.redirectTo({
              url: "../sex/sex"
            })
            //性别选择
          } else {
            wx.redirectTo({
              url: "../rightHand/rightHand?imgType=0"
            })
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "请求失败",
          image: "../../images/cross.png",
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
})