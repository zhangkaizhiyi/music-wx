// 格式化时间
export const format = function (time) {
    let mm = time/60 | 0;
    let ss = time%60 | 0;
    return pad(mm,2) + ':'+ pad(ss,2);
};
// 补零
function pad(num, n) {
    if ((num + "").length >= n) return num;
    return pad("0" + num, n);
}
// wx的request方法封装
export const wxrequest = function(url,data) {
  return new Promise((resolve,reject) => {
    wx.request({
        url,
        data,
        success: res => {
            if(res.statusCode === 200) {
            resolve(res.data);
          }else{
            reject(res.errMsg);
          }
        },
        error: () => {
          reject('网络出错')
        }
    })
  })
};
// 存入播放历史列表
export const addHistory = function () {
    
}
