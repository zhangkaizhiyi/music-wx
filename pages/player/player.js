// pages/player/player.js
import {format} from "../../utils/util";
const app = getApp();
const $audio = app.globalData.$audio;
// 音乐播放组件
Page({
    data: {
        playing: false,
        currentSong: {},
        playlist: [],
        index: -1,
        canplay: false,
        percent:0,
        duration:0,
        time:0,
        $audio:{},
        playMode:'list'
    },
    onShow: function () {
        this.setData({
            currentSong: app.globalData.playlist[app.globalData.index],
            playing: app.globalData.playing,
            index: app.globalData.index,
            playlist: app.globalData.playlist,
            canplay:app.globalData.playing
        });
        this.getPlayUrl();
        $audio.onPlay(() => {
            console.log("正在播放");
            this.setData({
                canplay: true
            });
        });
        $audio.onCanplay(() => {
            console.log('可以播放');
            this.setData({
                canplay: true
            });
        });
        this.progress();
        // 播放进度更新
        $audio.onTimeUpdate(this.progress);
        $audio.onEnded(this.end);
        // 自然播放结束
    },
    onHide: function () {
        console.log('播放页面onhide');
    },
    /*
    * 自定义方法
    *
    * */
    // 获取播放地址
    getPlayUrl() {
        this.data.currentSong.getUrl().then((res) => {
            $audio.src = res;
            let history = wx.getStorage('history') || [];
            history.push(this.data.currentSong);
            wx.setStorage('history',history);
        })
    },
    end() {
        if (this.data.playMode === 'loop') {
            this.loop();
        }else {
            this.next();
        }
    },
    loop() {
        $audio.startTime = 0;
    },
    // 音乐播放进度
    progress() {
        let percent = ($audio.currentTime *100) / $audio.duration;
        this.setData({
            duration:format($audio.duration),
            percent: percent,
            time:format($audio.currentTime)
        })
    },
    togglePlay() {
        // 如果没法播放，无法生效
        if (!this.data.canplay) {
            return
        }
        if (this.data.playing) {
            $audio.pause();
        } else {
            $audio.play();
        }
        this.setData({
            playing: !this.data.playing
        });
        // 全局变量的问题
        app.globalData.playing = this.data.playing;
    },
    next() {
        if (!this.data.canplay) {
            return
        }
        let index = this.data.index;
        index++;
        if (index === this.data.playlist.length) {
            index = 0
        }
        this.setData({
            currentSong:this.data.playlist[index],
            index: index,
            canplay: false,
            playing: true
        });
        app.globalData.index = index;
        app.globalData.playing = true;
        this.getPlayUrl();
    },
    prev() {
        if (!this.data.canplay) {
            return
        }
        let index = this.data.index
        index--
        if (index === -1) {
            index = this.data.playlist.length - 1
        }
        this.setData({
            currentSong:this.data.playlist[index],
            index: index,
            canplay: false,
            playing: true
        });
        // 全局变量的问题
        app.globalData.index = index;
        app.globalData.playing = true;
        this.getPlayUrl(this.progress);
    }
})
