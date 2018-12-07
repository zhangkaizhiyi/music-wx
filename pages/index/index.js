const url = 'https://api.apiopen.top/musicRankings';
const sliderUrl = 'https://api.apiopen.top/musicRankingsDetails?type=1';
const app =getApp();
Page({
    data: {
        result: [],
        slider:[],
        autoplay: true,
        index:-1,
        playlist:[],
        playing:false
    },
    // 去歌单详情页列表
    gotoSongList(event) {
      // console.log(event.currentTarget.dataset.type);
      wx.navigateTo({
          url: `../song-list/song-list?type=${event.currentTarget.dataset.type}&title=${event.currentTarget.dataset.title}`
      });
    },
    onLoad() {
      // 弹框显示正在载入中，持续时间10s
      wx.showToast({
        title: '正在载入中....',
        icon: 'loading',
        duration: 10000
      });
      // 获取轮播图数据
      wx.request({
          url: sliderUrl,
          success: res => {
              if (res.data.code === 200){
                  let slider = [];
                  res.data.result.slice(0,3).forEach((item) => {
                      let {pic_huge} = item;
                      slider.push(pic_huge)
                  })
                  console.log(slider);
                  this.setData({
                      slider:slider
                  })
                  //console.log(this.data.slider);
              }
          }
      });
      wx.request({
          url: url,
          data: {
          },
          success: res => {
            const aa = res.data
            if (aa.code === 200) {
              this.setData({
                'result': aa.result
              });
              wx.hideToast();
              console.log(this.data.result);
            }
          }
      });
    },
    onShow() {
        console.log(app.globalData.userInfo);
        let currentSong = app.globalData.playlist.length? app.globalData.playlist[app.globalData.index] : {};
        this.setData({
            index:app.globalData.index,
            playing: app.globalData.playing,
            playlist: app.globalData.playlist,
            currentSong: currentSong
        });
    }
})
