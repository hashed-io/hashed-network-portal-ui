<template lang='pug'>
#container
  .row.q-gutter-md
    TaxcreditItem(
      class="col-4"
      v-for="unique of uniquesList"
      :key="unique.label"
      :unique="unique"
    )
</template>
<script>
import TaxcreditItem from '~/components/marketplace/TaxCredits/taxcredit-item.vue'
export default {
  name: 'TaxcreditList',
  components: {
    TaxcreditItem
  },
  props: {
    uniquesList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang='stylus' scoped>

</style>
