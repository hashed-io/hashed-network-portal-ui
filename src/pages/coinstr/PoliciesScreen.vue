<template lang="pug">
#PoliciesScreen
  .row
    .col-8
      coinstr-blockly(
        ref="blocklyRef"
        @onChangedPolicy="validatePolicy"
        :eligiblesKeys="eligiblesContacts"
      )
    .col.q-pa-md
      .box
        .text-body2.text-bold Policy code:
        .text-body2.text-weight-light {{ policy }}
      users-list(v-model="contacts" v-if="contacts")
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import CoinstrBlockly from '~/components/coinstr/coinstr-blockly'
import UsersList from '~/components/coinstr/users-list.vue'
import { useNostr } from '~/composables'
import { useStore } from 'vuex'

const $store = useStore()
const {
  getContacts
} = useNostr()

const blocklyRef = ref(undefined)
const policy = ref(undefined)
const contacts = ref(undefined)

const isLoggedInNostr = computed(() => $store.getters['nostr/isLoggedInNostr'])

watch(isLoggedInNostr, function (v) {
  try {
    console.log('isLoggedInNostr', v)
    loadContacts()
  } catch (e) {
    console.error(e)
  }
})

onMounted(() => {
  try {
    loadContacts()
  } catch (e) {
    console.error(e)
  }
})

async function loadContacts () {
  const pubkey = $store.getters['nostr/getActiveAccount']
  if (isLoggedInNostr.value) {
    const data = await getContacts({ publicKey: pubkey.hex })
    contacts.value = data?.contacts
  }
}

function generateCode () {
  const result = blocklyRef.value.generateCode()
  policy.value = result
}

function validatePolicy (code) {
  console.log('validatingPolicy', code)
  policy.value = code
}

const eligiblesContacts = computed(() => {
  if (!contacts.value) return []
  return Object.entries(contacts.value).map(v => v[1]).filter(user => user.isSelectable)
})

watch(eligiblesContacts, function (v) {
  try {
    console.log('eligiblesContacts changed', v)
  } catch (e) {
    console.error(e)
  }
})
</script>

<style lang="stylus" scoped>
.box {
    inline-size: 150px;
    overflow-wrap: break-word;
}
</style>
