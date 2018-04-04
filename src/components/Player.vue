<template lang="html">
	<div class="container-player">
    <video-player class="vjs-custom-skin"
     ref="videoPlayer"
     :options="playerOptions"
     :playsinline="true"
     @play="onPlayerPlay($event)"
     @pause="onPlayerPause($event)"
     @ended="onPlayerEnded($event)"
     @loadeddata="onPlayerLoadeddata($event)"
     @waiting="onPlayerWaiting($event)"
     @playing="onPlayerPlaying($event)"
     @timeupdate="onPlayerTimeupdate($event)"
     @canplay="onPlayerCanplay($event)"
     @canplaythrough="onPlayerCanplaythrough($event)"
     @ready="playerReadied"
     @statechanged="playerStateChanged($event)">
    </video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: 'Player',
  props: {
    src: {
      required: true,
      type: String
    },
    poster: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      movedBar: false,
      playerOptions: {
        height: '370',
        autoplay: false,
        muted: false,
        language: 'pt-BR',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: '//animesgo.info/img/animesgo-image.png'
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.playerOptions.sources[0].src = this.src
      this.playerOptions.poster = this.poster
    }, 1000)
  },
  components: {
    'videoPlayer': videoPlayer
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
      let $next = $('[next-episode]')
      if ($next.length === 1) {
        this.$router.push($next.attr('href'))
      }
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
      $('.bar .lista').css({ maxHeight: Math.ceil($('.vjs-text-track-display').height() - 53) })
    },
    // player is ready
    playerReadied (player) {
      // NOTE: USAR EVENTO PARA CONTINUAR DE ONDE PAROU
      // player.currentTime(user.lastVideo.currentTimeSaved)
      if (!this.movedBar) {
        $('.bar').appendTo('.video-js')
        this.movedBar = true
      }
    }
  }
}
</script>

<style lang="scss">

.container-player {
  z-index: 1;
  box-shadow: 0px 4px 8px $color-bg-body;
  background-color: $color-bg-body;
}

// bar
.vjs-has-started.vjs-user-inactive.vjs-playing .bar {
  opacity: 0;
}

.bar {
  z-index: 100;
  position: absolute;
  top: 0; right: 0; left: 0;
  background-color: rgba(43, 51, 63, 0.7);
  padding: 10px;
  @include transition(1s ease-out opacity);
  display: flex;

  & > .btn {
    margin-right: 10px;
  }
}

.lista {
  list-style: none;
  position: absolute;
  top: 42px;
  left: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  max-width: 50%;
  max-height: 180px;
  overflow-y: auto;
  background-color: rgba(43, 51, 63, 0.7);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);

  /* scrollbar */
  &::-webkit-scrollbar {
      width: 4px;
  }
  &::-webkit-scrollbar-track {
      background: rgba(43, 51, 63, 0.7);
  }
  &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.7);
  }
  &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 1);
  }
}

.lista-temporadas-temporada {
  padding: 10px 5px;
  color: black;
  font-size: 12px;
  cursor: pointer;
}

.lista-temporadas-temporada:hover {
  opacity: .4;
}

.lista-temporadas-temporada + .lista-temporadas-temporada {
  border-top: 1px solid rgba(100,100,255,.1);
}

.row-buttons .btn {
  text-transform: capitalize;
}

.lista--item {
  cursor: pointer;
  @include transition;
  @include display-flex(center);
  color: $color-white;
  padding: 20px 40px 20px 10px;

  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(255, 255, 255, .1);
  }
}

.lista--item:hover,
.lista--item.active {
  background-color: rgba(43, 51, 63, 0.9);
  color: white;
}

.lista--item.disabled {
  opacity: .5;
}

.lista--item--info h4 {
  margin: 0;
  font-size: 13px;
  text-transform: uppercase;
}

// vjs-custom-skin
.vjs-custom-skin > .video-js {
  width: 100% !important;
  height: auto !important;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;

  &:after {
    content: '.';
    display: block;
    position: relative;
    padding: 56.25% 0 0 0; /* (height/width)*100%, eg. 56.25% for 16:9 75% for 4:3 */
    margin: 0 0 0 -100%;
    visibility: hidden;
    height: 0;
  }
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline.vjs-slider-active,.vjs-custom-skin > .video-js .vjs-menu-button-inline:focus,.vjs-custom-skin > .video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em
}

.vjs-custom-skin > .video-js .vjs-controls-disabled .vjs-big-play-button {
  display: none!important
}

.vjs-custom-skin > .video-js .vjs-control {
  width: 3em
}

.vjs-custom-skin > .video-js .vjs-control.vjs-live-control{
  width: auto;
  padding-left: .5em;
  letter-spacing: .1em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline:before {
  width: 1.5em
}

.vjs-menu-button-inline .vjs-menu {
  left: 3em
}

.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button {
  display: block
}

.vjs-custom-skin > .video-js .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button {
  display: none!important
}

.vjs-custom-skin > .video-js .vjs-mouse-display:after,.vjs-custom-skin > .video-js .vjs-play-progress:after {
  padding: 0 .4em .3em
}

.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}

.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}

.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button,.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button {
  display: block
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0,0,0,0.45);
  font-size: 3.5em;
   /*border-radius: 50%;*/
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important
}

.video-js:hover .vjs-big-play-button,.vjs-custom-skin > .video-js .vjs-big-play-button:focus,.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: rgba(36,131,213,0.9)
}

.vjs-custom-skin > .video-js .vjs-loading-spinner {
  border-color: rgba(36,131,213,0.8)
}

.vjs-custom-skin > .video-js .vjs-control-bar2 {
  background-color: #000000
}

.vjs-custom-skin > .video-js .vjs-control-bar {
   /*background-color: rgba(0,0,0,0.3) !important;*/
  color: #ffffff;
  font-size: 14px
}

.vjs-custom-skin > .video-js .vjs-play-progress,.vjs-custom-skin > .video-js  .vjs-volume-level {
  background-color: #2483d5
}

.vjs-custom-skin > .video-js .vjs-play-progress:before {
  top: -0.3em;
}

.vjs-custom-skin > .video-js .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.3em;
}

.vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0em;
}

.vjs-custom-skin > .video-js .vjs-menu li {
  padding: 0;
  line-height: 2em;
  font-size: 1.1em;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}

.vjs-custom-skin > .video-js .vjs-time-tooltip,
.vjs-custom-skin > .video-js .vjs-mouse-display:after,
.vjs-custom-skin > .video-js .vjs-play-progress:after {
  border-radius: 0;
  font-size: 1em;
  padding: 0;
  width: 3em;
  height: 1.5em;
  line-height: 1.5em;
  top: -3em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-popup .vjs-menu {
  width: 5em;
  left: -1em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-menu {
   /*order: 4;*/
}

 /*排序顺序*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
  order: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
  min-width: 1em;
  padding: 0;
  margin: 0 .1em;
  text-align: center;
  display: block;
  order: 1;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value{
  font-size: 1.2em;
  line-height: 2.4;
}

.vjs-custom-skin > .video-js .vjs-progress-control.vjs-control {
  order: 2;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-volume-menu-button {
  order: 3;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button {
  order: 4;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-resolution-button-label {
  display: block;
  line-height: 3em;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
  order: 5;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
  order: 6;
}


</style>
