<template lang='pug'>
#container
  .row.q-col-gutter-sm
    .col-10
      .row
        .col-6
          h-input(
            :rules="[...rulesLabel]"
            v-model="labelComponent"
            label="Attributes label"
            placeholder="Label"
            filled
            dense
          )
        .col-6
          h-input(
            class="padding-top"
            v-model="valueComponent"
            placeholder="Value"
            filled
            dense
            :rules="[...rulesValue]"
          )
    .col-2
      q-btn(
        class="margin-top"
        label="Remove"
        color="primary"
        no-caps
        @click="onRemoveItem"
      )
</template>
<script>
export default {
  name: 'TaxcreditInput',
  components: {

  },
  props: {
    /**
     * Label of the attribute
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Value of the attribute
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * Index of the attribute
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * rules of the label input
     */
    rulesLabel: {
      type: Array,
      default: () => []
    },
    /**
     * rules of the value input (it depends of the service used)
     */
    rulesValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:label', 'update:value', 'onRemoveAttribute'],
  data () {
    return {
    }
  },
  computed: {
    labelComponent: {
      get () {
        return this.label
      },
      set (value) {
        this.$emit('update:label', value)
      }
    },
    valueComponent: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  },
  methods: {
    onRemoveItem () {
      this.$emit('onRemoveAttribute', this.index)
    }
  }
}
</script>
<style lang='stylus' scoped>
.padding-top
  padding-top 21px
.margin-top
  margin-top 22px
</style>
