<template lang="pug">
.row.q-col-gutter-md
  .col(v-for="n in props.columnsNumber")
    q-skeleton(type="text" width="50%" height="50px" data-testid="header")
.row.q-col-gutter-md(v-for="n in props.rowsNumber")
  .col.q-my-sm(v-for="n in props.columnsNumber")
      q-skeleton(type="QChip" width="100%" height="45px" data-testid="input")
</template>
<script setup>
import {
  defineComponent,
  defineProps
} from 'vue'
defineComponent({
  name: 'GeneralTableSkeleton'
})
const props = defineProps({
  rowsNumber: {
    type: Number,
    default: 5
  },
  columnsNumber: {
    type: Number,
    default: 4
  }
})
// props
// Emits
// Methods by Feature
</script>
<style lang='stylus' scoped>
</style>
