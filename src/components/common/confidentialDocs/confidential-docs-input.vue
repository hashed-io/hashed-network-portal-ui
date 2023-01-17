<template lang='pug'>
#container
  .row.q-col-gutter-md.items-center
    .col-6
      h-input(
        v-model="labelComponent"
        :rules="[...rulesLabel]"
        :placeholder="$t('pages.marketplace.taxCredits.placeholders.label')"
        dense
        testid="filename"
      )
    .col-6
      q-file(
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
        :rules="[...rulesValue]"
      )
        template(v-slot:prepend)
          q-icon(name="attach_file")
</template>
<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'ConfidentialDocsInput',
  components: {
  },
  mixins: [validation],
  props: {
    /**
       * Label of the attribute [Used by v-model]
       */
    label: {
      type: String,
      default: ''
    },
    /**
     * Value of the attribute [Used by v-model]
     */
    value: {
      type: [String, File],
      default: undefined
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
      /**
         * Emitted the index of the item [Used on the Form]
         */
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
</style>
