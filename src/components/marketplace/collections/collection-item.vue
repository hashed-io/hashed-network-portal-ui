<template lang='pug'>
q-card.q-pa-sm(v-ripple flat bordered @click="onClickTax" data-testid="collection-item")
  q-card-section
    .row.justify-center.q-py-md
      q-icon(name="library_books" size="4.1em" color="black")
    .row.justify-center.q-py-md
      q-chip.text-white.text-bold(color="primary") {{collection.data}}
      q-chip.text-white.text-bold(color="secondary") {{$t('pages.collections.element.title')}} {{collection.classId}}
    #Info
      AccountItem(
        :address="collection.owner"
        flat
        inherit
      )
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'CollectionItem',
  components: {
    AccountItem
  },
  props: {
    collection: {
      type: Object,
      default: undefined,
      required: true
    }
  },
  emits: ['onClickItem'],
  data () {
    return {
    }
  },
  methods: {
    onClickTax () {
      this.$emit('onClickItem', this.collection.classId)
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
