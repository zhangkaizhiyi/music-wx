// components/mini-player/mini-player.js
const app = getApp();
const $audio = app.globalData.$audio;
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
      playing:{
          type:Boolean,
          value:false
      },
      index: {
          type:Number,
          value:-1,
      },
      playlist: {
          type:Array,
          value:[]
      },
      currentSong: {
          type: Object,
          value: {}
      }
    },
    data: {
        touch: {
            pos:{},
            init:false
        },
        moveX: 0,
        moveY: 0
    },
    methods: {
        toPlayer() {
            wx.navigateTo({
                url: `../player/player?item=${this.properties.currentSong.id}`
            });
        },
        touchStart(e) {
            let startX = e.touches[0].clientX;
            let startY = e.touches[0].clientY;
            this.setData({
                'touch.pos.x': startX,
                'touch.pos.y': startY
            })
        },
        touchMove(e) {
            let moveX = e.touches[0].clientX - this.data.touch.pos.x;
            let moveY = e.touches[0].clientY - this.data.touch.pos.y;
            this.setData({
                'moveX': moveX,
                'moveY': moveY
            })
        },
        touchEnd(e) {
            this.setData({
                'moveX': 0,
                'moveY': 0
            })
        }
    },
    /*
    生命周期的钩子函数
    *
    *
    * */
    lifetimes: {
      attached: function() {
          console.log('组件的生命周期');
      },
      detached: function() {
          // 在组件实例被从页面节点树移除时执行
      },
    }
})
