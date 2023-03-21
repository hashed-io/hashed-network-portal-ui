<template lang='pug'>
.wrapper
  q-list(
    v-if="Object.entries(_users).length > 0"
    bordered
    separator
  )
    user-item(
      v-for="user in _users"
      :user="user"
      interactive
      @onAddUser="addUserToPolicy"
      @onRemoveUser="removeUserToPolicy"
    )

</template>
<script setup>
import {
  defineProps,
  defineEmits,
  toRefs
} from 'vue'
import UserItem from './user-item.vue'
// props
const props = defineProps({
  modelValue: {
    type: [Object, Array],
    default: () => ({})
  }
})
const { modelValue: _users } = toRefs(props)

// Emits
const emits = defineEmits(['update:modelValue'])

// Methods by Feature
function addUserToPolicy (user) {
  _users.value[user.bitcoinAddress].isSelectable = true
  emits('update:modelValue', _users.value)
}

function removeUserToPolicy (user) {
  _users.value[user.bitcoinAddress].isSelectable = false
  emits('update:modelValue', _users.value)
}
</script>
<style lang='stylus' scoped>
</style>
