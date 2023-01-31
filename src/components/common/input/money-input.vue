<template lang='pug'>
#wrappe
  .p-text-body1.text-dark-grey-4.text-uppercase.p-mb-10(v-if="labelText") {{labelText}}
  q-input.p-input(
    v-model="value"
    v-bind="$attrs"
    :data-testid="testId"
    :class="{ 'p-input__empty': !value, 'p-input__onlyread': justRead }"
    :readonly="justRead"
    outlined
    debounce="1"
    v-if="!isMoney"
    )
      template(
        v-for="slot in ['prepend', 'append']"
        v-slot:[slot]
      )
        slot(:name="slot")
  q-field.p-input(
    v-model.lazy="value"
    lazy-rules
    v-bind="$attrs"
    :class="{ 'p-input__empty': !value, 'p-input__onlyread': justRead }"
    :readonly="justRead"
    outlined
    debounce="1"
    v-else
    )
      template(v-slot:control="{ id, floatingLabel, modelValue, emitValue }")
        Money3Component(:id="id" debounce="1" class="q-field__input text-left p-input" :model-value="modelValue" @update:model-value="debounceEmit" v-bind="moneyConfig" :data-testid="testId" v-show="floatingLabel")
      template(
        v-for="slot in ['prepend', 'append']"
        v-slot:[slot]
      )
        slot(:name="slot")
  </template>

<script setup>
import { Money3Component } from 'v-money3'
import { debounce } from 'quasar'

import {
  defineComponent,
  defineProps,
  defineEmits,
  computed,
  toRef
} from 'vue'
const props = defineProps({
  /**
     * The value of the input
     * @type {String}
     * @default ''
     * @required
     */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /**
     * The label of the input
     * @type {String}
     * @default 'empty string'
     * @required
     */
  labelText: {
    type: String,
    default: ''
  },

  /**
     * Used by Storybook
     */
  testId: {
    type: String,
    default: 'HInput'
  },
  justRead: {
    type: Boolean,
    default: false
  },
  isMoney: {
    type: Boolean,
    default: false
  },
  moneyConfig: {
    type: Object,
    default: (props) => ({
      disabled: props.justRead,
      thousands: ',',
      decimal: '.',
      precision: 0
    })
  }
})
const emits = defineEmits([
  'update:modelValue'
])
// v-model
const modelValue = toRef(props, 'modelValue')
const justRead = toRef(props, 'justRead')
const value = computed({
  get () {
    return modelValue.value
  },
  set (value) {
    emits('update:modelValue', value)
  }
})

const debounceEmit = debounce((value) => emits('update:modelValue', value), 400)

</script>

<style lang="stylus"  scoped>
</style>
