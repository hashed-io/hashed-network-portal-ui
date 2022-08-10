<template lang='pug'>
q-card.q-pa-sm(v-ripple flat bordered @click="onClickTax")
  q-card-section
    .row.justify-center.q-py-md
      q-icon(name="account_balance" size="4.1em" color="black")
    .row.justify-center.q-py-md
      q-chip.text-white.text-bold(color="primary") {{'Unique'}} {{unique.classId}}
    #labels
      .row.justify-between.q-gutter-xs
        div
          .text-subtitle2.q-px-md {{'Owner'}}
          account-item(:address="unique.owner" size="1em" inherit flat shortDisplay)
        div
          .text-subtitle2.q-px-md {{'issuer'}}
          account-item(:address="unique.issuer" size="1em" inherit flat shortDisplay)
      //- .row.justify-evenly(v-for="attribute in unique.attributes")
      //-   div.col-6 {{ attribute.attribute }}
      //-   div.col-6 {{ attribute.value }}
</template>
<script>
import AccountItem from 'src/components/common/account-item.vue'
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
      this.$emit('onClickItem', this.unique)
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
