<template lang="html">
  <span v-if="showAd">
    <iframe frameborder="0" scrolling="no" :width="adWidth" :height="adHeight" :src="src"></iframe>
    <router-link class="no-ads" :to="{ name: 'Doação' }">
      <i class="fa fa-angle-double-right"></i>
      Remover anúncio
    </router-link>
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
    },
    showAd: function () {
      const user = this.$ls.get('user', false)
      if (user && user.role === 'colaborador') return false
      return true
    }
  }
}
</script>

<style scoped lang="scss">
span {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border: 1px solid rgba(255,255,255,.4);
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
}

.no-ads {
  position: absolute;
  bottom: -5px;
  right: 10px;
  padding: 10px;
  font-size: 9px;
  color: white;
  text-transform: uppercase;
}

.no-ads:hover {
  color: blue;
}

</style>
