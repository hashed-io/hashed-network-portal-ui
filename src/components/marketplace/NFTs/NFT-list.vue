<template lang='pug'>
#container
  #EmptyList(v-if="uniquesList.length === 0")
    .row
      q-card.col-12(flat)
        q-card-section
          .flex.flex-center.text-h6.q-py-xl(data-testid='empty-list') {{$t('pages.marketplace.taxCredits.emptyList')}}
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
/**
   * Component to get all the NFT associated with the logged account
   */
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
    }
  },
  emits: ['onClickUnique'],
  data () {
    return {

    }
  },
  methods: {
    onClickTax (classId) {
      this.$emit('onClickUnique', classId)
    }
  }
}
</script>
<style lang='stylus' scoped>
.tax-class
  min-height: 25vh
  height: 45vh
</style>
