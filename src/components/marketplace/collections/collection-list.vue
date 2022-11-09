<template lang='pug'>
#container
  #EmptyList(v-if="collectionList.length === 0")
    .row
      q-card.col-12(flat)
        q-card-section
          .flex.flex-center.text-h6.q-py-xl(data-testid='empty-list') {{$t('pages.marketplace.taxCredits.emptyCollectionList')}}
  #content(v-else)
    .row.justify-start.q-col-gutter-md
      .col-3(v-for="(collection, key) in collectionList")
        CollectionItem.tax-class.animated-item(
          :key="key"
          :collection="collection"
          @onClickItem="onClickTax"
        )
</template>
<script>
import CollectionItem from '~/components/marketplace/collections/collection-item.vue'
/**
   * Component to get all the NFT associated with the logged account
   */
export default {
  name: 'CollectionList',
  components: {
    CollectionItem
  },
  props: {
    collectionList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  emits: ['onClickCollection'],
  data () {
    return {

    }
  },
  methods: {
    onClickTax (classId) {
      this.$emit('onClickCollection', classId)
    }
  }
}
</script>
<style lang='stylus' scoped>
.tax-class
  height: auto
</style>
