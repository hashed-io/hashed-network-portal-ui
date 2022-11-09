<template lang='pug'>
q-card.q-pa-sm(v-ripple flat bordered @click="onClickTax" data-testid="nft-item")
  q-card-section
    .row.justify-center.q-py-md
      q-chip.text-white.text-bold(color="primary") {{$t('pages.nfts.element.title')}} {{unique.classId}}
    #labels
      .row.justify-between.q-gutter-xs
        div
          .text-subtitle2.q-px-md {{$t('pages.nfts.element.owner')}}
          account-item(:address="unique.owner" size="1em" inherit flat shortDisplay)
        div
          .text-subtitle2.q-px-md {{$t('pages.nfts.element.issuer')}}
          account-item(:address="unique.issuer" size="1em" inherit flat shortDisplay)
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
export default {
  name: 'NFTItem',
  components: {
    AccountItem
  },
  props: {
    unique: {
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
      this.$emit('onClickItem', this.unique.classId)
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
