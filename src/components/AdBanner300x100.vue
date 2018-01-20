<template lang="html">
  <span>
    <iframe frameborder="0" scrolling="no" :width="adWidth" :height="adHeight" :src="src"></iframe>
  </span>
</template>

<script>
export default {
  data () {
    return {
      adIdzone: 2881036,
      adWidth: 300,
      adHeight: 100
    }
  },
  computed: {
    src: function () {
      let p = document.URL
      let dt = new Date().getTime()
      let adType = this.adWidth + 'x' + this.adHeight
      let adSub = (typeof (window.adSub) === 'undefined') ? '' : window.adSub
      let adTags = (typeof (window.adTags) === 'undefined') ? '' : window.adTags
      let adEmail = (typeof (window.adEmail) === 'undefined') ? '' : window.adEmail
      let adScreenResolution = screen.width + 'x' + screen.height
      let exoDocumentProtocol = (document.location.protocol !== 'https:' && document.location.protocol !== 'http:') ? 'https:' : document.location.protocol
      return `${exoDocumentProtocol}//syndication.exdynsrv.com/ads-iframe-display.php?idzone=${this.adIdzone}&type=${adType}&p=${escape(p)}&dt=${dt}&sub=${adSub}&tags=${adTags}&screen_resolution=${adScreenResolution}&email=${adEmail}`
    }
  }
}
</script>

<style scoped lang="scss">
span {
  display: block;
  margin-top: -10px;
  margin-bottom: 5px;
  max-width: 100%;
  overflow: hidden;
}
</style>
