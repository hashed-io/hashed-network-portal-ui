<template lang='pug'>
q-card.full-width(flat bordered)
  q-card-section
    q-icon.cursor-pointer(@click="() => currentSelection = options[2]" name="arrow_back" size="sm" color="primary")
    q-form.q-pa-lg(ref="nostrForm" @submit="onSubmit")
      .text-h5.q-py-md(v-if="currentSelection === options[2]") Login methods
      q-btn.row.q-my-md.q-py-md.full-width(v-if="currentSelection === options[2] && extensionAvailable" color="primary" no-caps rounded @click="() => currentSelection = options[0]") Login with Extension
      q-btn.row.q-my-md.q-py-md.full-width(v-if="currentSelection === options[2]" color="secondary" no-caps rounded @click="() => currentSelection = options[1]") Login with Key

      #Extension(v-if="currentSelection === options[0]")
        h-input.q-py-sm(
          v-model="form.relay"
          outlined
          label="Relay to connect"

        )
      #Key(v-if="currentSelection === options[1]")
        h-input.q-py-sm(
          v-model="form.relay"
          outlined
          label="Relay to connect"
        )
        h-input.q-py-sm(
          v-model="form.address"
          outlined
          label="Publick Key of the user"
        )
      .row.justify-end
        q-btn(
          type="submit"
          label="Ok"
          color="primary"
          no-caps
        )
</template>
<script setup>
import {
  defineProps,
  defineEmits,
  reactive,
  ref
} from 'vue'
// props

const props = defineProps({
  extensionAvailable: {
    type: Boolean,
    default: false
  }
})
// Emits
const emits = defineEmits(['onSubmit'])
// Methods by Feature

const options = ['extension', 'key', 'notSelected']
const currentSelection = ref(options[2])

const form = reactive({
  relay: 'wss://relay.rip',
  address: 'npub1aff8upvht8fk3f2j2vnsg48936wkunlzaxxnqttwqxppl2tnykwsahwngp'
})

const onSubmit = () => {
  emits('onSubmit', {
    type: currentSelection.value,
    relay: form.relay,
    address: form.address
  })
}
</script>
<style lang='stylus' scoped>
</style>
