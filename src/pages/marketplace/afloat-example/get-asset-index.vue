<template lang='pug'>
#container
  .text-h5.q-pa-lg {{'Get Asset example'}}
      q-card(
        bordered
      )
        table.text-caption
          th Label
          th value
          tr(v-for="{label, value} of getAssetExample")
            td {{label}}
            td(v-if="isFile(value?.payload) && value.extension !== 'json'" @click="openFile(value)").animated-item.text-bold {{'File'}}
            td(v-if="isFile(value?.payload) && value.extension === 'json'" @click="openFile(value)").animated-item.text-bold {{'Json'}}
            td(v-else) {{value}}
  .text-h5.q-pa-lg {{'Get All Assets'}}
    .row.q-col-gutter-md.q-pt-lg
      .col-12(v-for="(asset, index) of assets")
        q-card(
          bordered
        )
          q-item
            q-item-label {{'NFT: ' + asset.assetId[0]}}
          table.text-caption
            th Label
            th value
            tr(v-for="(value, label) of getRows(asset)")
              td {{label}}
              td(v-if="isFile(value?.payload) && value.extension !== 'json'" @click="openFile(value)").animated-item.text-bold {{'File'}}
              td(v-if="isFile(value?.payload) && value.extension === 'json'" @click="openFile(value)").animated-item.text-bold {{'Json'}}
              td(v-else) {{value}}

</template>
<script>
export default {
  name: 'GetAssetIndex',
  components: {

  },
  data () {
    return {
      collectionId: 262,
      startKey: 0,
      pageSize: 50,
      assets: undefined,
      assetExample: undefined
    }
  },
  computed: {
    getAssetExample () {
      return this.assetExample || [{
        label: 'NFT Name',
        value: 'Virginia Port Volume Increase'
      }]
    }
  },
  async created () {
    await this.getAllAssets()
    await this.getAsset()
  },
  methods: {
    async getAllAssets () {
      const response = await this.$store.$afloatApi.getAllAssetsInCollection({
        collectionId: this.collectionId,
        startKey: this.startKey,
        pageSize: this.pageSize
      })
      this.assets = response
    },
    async getAsset () {
      const response = await this.$store.$afloatApi.getAsset({
        collectionId: this.collectionId,
        instanceId: 0
      })
      this.assetExample = response
    },
    getRows (asset) {
      const { publicAttributes, plaintextSaveToIPFS, encryptedData } = asset
      return { ...publicAttributes, ...plaintextSaveToIPFS, ...encryptedData }
    },
    isFile (value) {
      return value instanceof File
    },
    openFile (file) {
      const blob = new Blob([file.payload], { type: file.payload.type })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      window.open(link.href)
    }
  }
}
</script>
<style lang='stylus' scoped>
table
  width: 100%
  text-align: left
</style>
