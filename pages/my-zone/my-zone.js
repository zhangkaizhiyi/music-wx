const app = getApp();
Page({
    data: {
        userInfo: null,
        isFav:false
    },
    onShow() {
        this.setData({
            'userInfo.avatar':app.globalData.userInfo.avatarUrl,
            'userInfo.name':app.globalData.userInfo.nickName
        });
    },
})
