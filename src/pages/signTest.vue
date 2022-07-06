<template lang="pug">
#container.q-pa-md
 .text-h5 Sign Canvas Test
 CanvasSign(ref="canvasSign" :height="400" :width="800" :line-width="1")
 .row
    q-btn(
      label="Save"
      no-caps
      @click="saveSign"
    )
    q-btn(
      label="Clear"
      no-caps
      @click="clearSign"
    )
    q-btn(
      :disabled="!signImg"
      label="View sign"
      no-caps
      @click="viewSign"
    )
</template>

<script>
import CanvasSign from 'vue-canvas-sign'

export default {
  name: 'SignTest',
  components: { CanvasSign },
  data () {
    return {
      signImg: undefined
    }
  },
  methods: {
    saveSign () {
      console.log('save', this.$refs.canvasSign)
      this.$refs.canvasSign.save(v => {
        this.signImg = v
      })
    },
    clearSign () {
      this.$refs.canvasSign.reset()
    },
    viewSign () {
      const b64Img = this.getBase64StringFromDataURL(this.signImg)
      console.log('signImg', this.signImg, b64Img)
      this.copyTextToClipboard(this.signImg)
    //   window.open(this.signImg, 'blank')
    },
    getBase64StringFromDataURL (dataUrl) {
      return dataUrl.replace('data:', '').replace(/^.+,/, '')
    }
  }
}
</script>
