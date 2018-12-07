// pages/singer/singer.js
import {getSingerList} from "../../api/singer";
const app = getApp();
Page({
    data: {
    singerList: [],
      index:-1,
      playlist:[],
      playing:false,
      currentSong:{}
    },
    onLoad: function (options) {
        getSingerList().then((res) => {
            if(res.code === 0) {
                this.setData({
                    singerList:res.singerList.data.singerlist
                });
            }
        })
    },
    onShow: function () {
        // 显示的时候从全局变量取值
        let currentSong = app.globalData.playlist.length? app.globalData.playlist[app.globalData.index] : {};
        this.setData({
            index:app.globalData.index,
            playing: app.globalData.playing,
            playlist: app.globalData.playlist,
            currentSong: currentSong
        });
    },
    toSingerDetail(e) {
        wx.navigateTo({
            url:`../singer-detail/singer-detail?id=${e.currentTarget.dataset.id}&cover=${e.currentTarget.dataset.cover}&title=${e.currentTarget.dataset.title}`
        })
    }
})
