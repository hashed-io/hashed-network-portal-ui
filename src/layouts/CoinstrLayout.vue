<template lang="pug">
q-layout.containerLayout(container view="hHh lpR fFf")
    q-header
      q-toolbar
        q-toolbar-title
          q-item
            q-item-section
              q-item-label Policies
        q-btn(
          v-if="!isLoggedIn"
          color="primary"
          @click="() => dialog = true"
          no-caps
        )
          .text-white Connect to Nostr
        div(v-else)
          .row.items-center.q-gutter-md
            .text-white.text-weight-bold connected to: {{ getCurrentRelay() }}
            .row
              UserItem.q-mx-md.cursor-pointer.text-white(
                :user="getUserInfo"
              )
              q-menu(fit)
                q-list
                  q-item(clickable v-close-popup @click="onLogout")
                    q-item-section Logout
    q-page-container
      .row.justify-center
        .col-8
          q-page.q-py-md.q-px-lg
            router-view
        .col-4
          q-page.q-py-md.q-px-lg
            UsersList(:users="contacts")
    q-dialog(v-model="dialog")
      NostrForm(
        :extensionAvailable="extensionIsAvailable"
        @onSubmit="onLoginNostr"
      )
</template>
<script setup>
import {
  ref,
  computed
} from 'vue'
import { useStore } from 'vuex'
import { useNostr } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from '~/mixins/errorHandler'
import { useQuasar } from 'quasar'
import UsersList from '~/components/coinstr/users-list.vue'
import UserItem from '~/components/coinstr/user-item.vue'
import NostrForm from '~/components/coinstr/nostr-form.vue'

const $q = useQuasar()

const $store = useStore()

const { showNotification, showLoading, hideLoading } = useNotifications()
const { handlerError } = useErrorHandler()

const {
  connectNostr, disconnectNostr,
  getProfileMetadata, setNostrAccount, updateNostrAccount,
  isLoggedIn, getActiveAccount,
  currentRelay, setRelay, clearRelays,
  getContacts, extensionIsAvailable,
  connectPool
} = useNostr()

const relayInput = ref(undefined)
const contacts = ref(undefined)
const dialog = ref(false)
let unsubscribe

const onLoginNostr = async ({ type, relay, address }) => {
  const nostrApi = $store.$nostrApi
  try {
    showLoading()

    clearRelays()
    setRelay({ relay })
    const { pubkey, npubKey } = await connectNostr({ relay, publicKey: type === 'key' ? address : undefined })

    const { unsub } = await connectPool({ relays: ['wss://relay.rip', 'wss://relay.snort.social', 'wss://relay.damus.io'], hexPubKey: pubkey }, updateData)
    unsubscribe = unsub
    setNostrAccount({ hex: pubkey, npub: npubKey })

    // const { content, tags } = await getProfileMetadata({ pubkey })

    // setNostrAccount({ hex: pubkey, npub: npubKey, profile: JSON.parse(content), tags })

    showNotification({ message: `Connected to ${getCurrentRelay()}`, color: 'green' })

    const data = await getContacts({ publicKey: pubkey })
    contacts.value = data.contacts
  } catch (error) {
    handlerError(error)
  } finally {
    hideLoading()
    dialog.value = false
  }
}
const updateData = (event) => {
  const {
    content,
    kind
  } = event || {}
  const obj = JSON.parse(content)
  updateNostrAccount(obj)
}
const getUserInfo = computed(() => {
  return {
    displayName: getActiveAccount.value?.profile?.display_name,
    name: getActiveAccount.value?.profile?.name,
    picture: getActiveAccount.value?.profile?.picture,
    npub: getActiveAccount.value?.npub,
    about: getActiveAccount.value?.profile?.about,
    nip05: getActiveAccount.value?.profile?.nip05,
    banner: getActiveAccount.value?.profile?.banner,
    lud06: getActiveAccount.value?.profile?.lud06,
    lud16: getActiveAccount.value?.profile?.lud16
  }
})
const onLogout = () => {
  contacts.value = undefined
  disconnectNostr()
}
const getCurrentRelay = () => {
  const { url } = currentRelay() || {}
  return url
}
</script>
<style lang="stylus" scoped>
.containerLayout
  height: 100vh

</style>
