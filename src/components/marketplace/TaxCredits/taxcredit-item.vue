<template lang='pug'>
q-card.q-pa-sm(v-ripple flat bordered @click="onClickTax")
  .row.justify-center.q-py-md
    q-icon(name="account_balance" size="4.1em" color="black")
  #labels
    .row.justify-evenly(v-for="{label, value} of unique")
      div {{ label}}
      div {{ value}}
</template>
<script>
export default {
  name: 'TaxcreditItem',
  components: {

  },
  props: {
    unique: {
      type: Object,
      default: undefined,
      required: true
    }
  },
  emits: ['onClick'],
  data () {
    return {

    }
  },
  methods: {
    onClickTax () {
      this.$emit('onClick')
    }
  }
}
</script>
<style lang='styl'>

</style>
