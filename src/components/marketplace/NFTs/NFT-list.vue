<template lang='pug'>
#container
  #loading.flex.flex-center(v-if="loading")
    q-spinner(
      color="primary"
      size="md"
      class="q-ma-md"
    )
  #EmptyList(v-if="!loading && uniquesList.length === 0")
    .row
      q-card.col-12(flat)
        q-card-section
          .flex.flex-center.text-h6.q-py-xl {{$t('pages.marketplace.taxCredits.emptyList')}}
  #content(v-else)
    .row.justify-start.q-col-gutter-md
      .col-3(v-for="(unique, key) in uniquesList")
        NFTItem.tax-class.animated-item(
          :key="key"
          :unique="unique"
          @onClickItem="onClickTax"
        )
</template>
<script>
import NFTItem from '~/components/marketplace/NFTs/NFT-item.vue'
export default {
  name: 'NFTList',
  components: {
    NFTItem
  },
  props: {
    uniquesList: {
      type: Array,
      default: () => [],
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  emits: ['onClickUnique'],
  data () {
    return {

    }
  },
  methods: {
    onClickTax (unique) {
      this.$emit('onClickUnique', unique)
    }
  }
}
</script>
<style lang='stylus' scoped>
.tax-class
  min-height: 25vh
  height: 45vh
</style>
