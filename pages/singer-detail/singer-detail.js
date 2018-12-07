// pages/singer-detail/singer-detail.js
import {getSingerDetail} from "../../api/singer";
import {createSong} from "../../utils/song";

const app = getApp();
Page({
    data: {
        list:[],
        cover:'',
        title:'',
        id:'',
        playlist:[],
        playing:false,
        index:-1,
        currentSong:{}
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        this.setData({
            cover:options.cover,
            title:options.title,
            id:options.id
        });
    },
    onShow: function () {
        this._getSingerDatail();
    },
    onHide: function () {

    },
    _getSingerDatail () {
        getSingerDetail(this.data.id).then(res => {
            if(res.code ===0) {
                let ret =[];
                res.data.list.forEach((item) => {
                    let {musicData} = item;
                    ret.push(createSong(musicData));
                });
                this.setData({
                    list:ret
                });
            }
        })
    },
    //  去播放列表
    toPlayer(e) {
        let currentSong = this.data.list[e.currentTarget.dataset.index];
        wx.navigateTo({
            url: `../player/player?songid=${currentSong.id}`
        });
        app.globalData.playlist = this.data.list;
        app.globalData.index = e.currentTarget.dataset.index;
        app.globalData.playing = true;
    }
})
