const url = 'https://api.apiopen.top/musicRankingsDetails'
Page({
    data: {
        songs: [],
        title: ''
    },
    onLoad(options){
        console.log("歌曲列表页面");
        this.setData({
            title: options.title
        })
        wx.request({
            url: url,
            data: {
                type: options.type
            },
            success: res => {
                if(res.data.code === 200) {
                    this.setData({
                        songs: res.data.result
                    })
                }
                console.log(this.data.songs);
            }
        });
    }
})
