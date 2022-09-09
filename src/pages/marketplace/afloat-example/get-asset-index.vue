<template lang='pug'>
#container
  .text-h5.q-pb-lg {{$t('pages.hcd.afloat.getAsset')}}
    q-card(flat)
      q-card-section
        pre(
          class="text-caption"
        ) {{assets}}
</template>
<script>
export default {
  name: 'GetAssetIndex',
  components: {

  },
  data () {
    return {
      collectionId: 4,
      startKey: 0,
      pageSize: 4,
      assets: undefined
    }
  },
  async created () {
    const response = await this.$store.$afloatApi.getAllAssetsInCollection({
      collectionId: this.collectionId,
      startKey: this.startKey,
      pageSize: this.pageSize
    })
    console.log('Assets', response)
    this.assets = response
  },
  methods: {

  }
}
</script>
<style lang='styl'>

</style>
