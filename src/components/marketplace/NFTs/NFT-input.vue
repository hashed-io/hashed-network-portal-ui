<template lang='pug'>
#container
  .row.q-col-gutter-sm
    .col-9
      .row
        .col-6
          h-input(
            :rules="[...rulesLabel, isFile ? rules.betweenLengthString(5, 20) : rules.betweenLengthString(1, 100)]"
            v-model="labelComponent"
            :label="$t('pages.marketplace.taxCredits.labels.attributeLabel')"
            :placeholder="$t('pages.marketplace.taxCredits.placeholders.label')"
            filled
            dense
          )
        .col-6.padding-top
          q-file(
            v-if="isFile"
            outlined
            dense
            counter
            v-model="valueComponent"
            :label="$t('pages.marketplace.taxCredits.placeholders.value')"
            :filled="false"
            :readonly="false"
            ref="qFile"
            data-cy="qFile"
            data-testid="qFile"
          )
            template(v-slot:prepend)
              q-icon(name="attach_file")
          h-input(
            v-if="!isFile"
            v-model="valueComponent"
            :placeholder="$t('pages.marketplace.taxCredits.placeholders.value')"
            filled
            dense
            :rules="[...rulesValue]"
          )
      .row
        .col-6
        .col-6
          q-toggle(
            v-model="isFile"
            size="md"
            keep-color
            color="primary"
            :label="$t('pages.marketplace.taxCredits.labels.isFile')"
            unchecked-icon="text_fields"
            checked-icon="attach_file"
          )
    .col-3.margin-top
      q-btn(
        :label="$t('pages.marketplace.taxCredits.buttons.removeAttribute')"
        color="primary"
        rounded
        no-caps
        icon="delete"
        @click="onRemoveItem"
      )
</template>
<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'NFTInput',
  components: {
  },
  mixins: [validation],
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
      isFile: false
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
    },
    validFile (file) {
      if (file != null && this.loading) return true
      else if (!this.loading && this.initWithString) return true
      else if (!this.loading && typeof file === 'object') return true
      return this.$t('forms.errors.fileRequired')
    }
    // async updateModel (e) {
    //   this.file = e
    //   console.log('Update model', e)
    //   const data = {
    //     label: this.tagFile,
    //     file: e
    //   }
    //   this.$emit('update:modelValue', data)
    // }
  }
}
</script>
<style lang='stylus' scoped>
.padding-top
  padding-top 21px
.margin-top
  margin-top 22px
</style>
