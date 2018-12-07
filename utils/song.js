import {getSongUrl} from "../api/singer";

export class Song {
    constructor({id,name,cover,singer,album,songmid}) {
        this.id = id
        this.name = name
        this.cover = cover
        this.singer = singer
        this.album = album
        this.songmid = songmid
    }
    getUrl () {
        if(this.url) {
            return Promise.resolve(this.url)
        }
        return new Promise((resolve,reject) => {
            getSongUrl(this.songmid).then((res) => {
                if (res.code === 0) {
                    res = `http://117.34.59.18/amobile.music.tc.qq.com/${res.req_0.data.midurlinfo[0].purl}`;
                    this.url = res;
                    resolve(this.url);
                }else {
                    reject(new Error('没有获取到歌曲的url地址'));
                }
            })
        })
    }
}
export function createSong(musicData) {
    return new Song({
        album: musicData.albumname,
        id: musicData.songid,
        songmid: musicData.songmid,
        name: musicData.songname,
        singer: singerName(musicData.singer),
        cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    })
}
// singername字段返回的是歌手数组
export function singerName (singer) {
    let ret = []
    singer.forEach((item) => {
        ret.push(item.name)
    })
    return ret.join('||')
}
