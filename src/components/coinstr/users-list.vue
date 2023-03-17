<template lang='pug'>
.wrapper
  q-list(
    v-if="Object.entries(_users).length > 0"
    bordered
    separator
  )
    UserItem(
      v-for="user in _users"
      :user="user"
    )

</template>
<script setup>
import {
  defineProps,
  toRefs
} from 'vue'
import UserItem from './user-item.vue'
// props
const props = defineProps({
  users: {
    type: [Object, Array],
    default: () => ({})
  }
})
// Emits
const { users: _users } = toRefs(props)
// Methods by Feature
</script>
<style lang='stylus' scoped>
</style>
