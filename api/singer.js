import {wxrequest} from "../utils/util";
// 获取歌手列表
export const getSingerList = function () {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const data = {
        g_tk: 202038773,
        loginUin: 1018476287,
        hostUin: 0,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        format: 'json',
        data: {
            'comm': {'ct': 24, 'cv': 10000},
            'singerList': {
                'module': 'Music.SingerListServer',
                'method': 'get_singer_list',
                'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}
            }
        }
    };
    return wxrequest(url,data).then((res) => {
        return Promise.resolve(res);
    })
}
// 获取歌手详情页的歌曲
export const getSingerDetail = function (singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
    const data = {
        g_tk:181136179,
        jsonpCallback:'MusicJsonCallbacksinger_track',
        loginUin:1627580083,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0,
        singermid:singerId,
        order:'listen',
        begin:0,
        num:30,
        songstatus:1
    };
    return wxrequest(url,data).then((res) => {
        let ret =res.replace(`MusicJsonCallbacksinger_track(`,'').slice(0,-1)
        return Promise.resolve(JSON.parse(ret));
    })
}
// 获取歌曲播放url
export const getSongUrl = function (songmid) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const data = {
        inCharset:'utf8',
        outCharset:'utf-8',
        g_tk: 123153052,
        loginUin: 1018476287,
        hostUin: 0,
        format: 'jsonp',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        // eslint-disable-next-line
        data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7364816765","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7364816765","songmid":[songmid],"songtype":[0],"uin":"1018476287","loginflag":1,"platform":"20"}},"comm":{"uin":1018476287,"format":"json","ct":20,"cv":0}}
    };
    return wxrequest(url,data).then((res) => {
        return Promise.resolve(res);
    })
}
