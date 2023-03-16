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
          @click="prompt"
          no-caps
        )
          .text-white Connect with Extension
        div(v-else)
          .row.items-center.q-gutter-md
            .text-white.text-weight-bold connected to: {{ currentRelay.url }}
            q-btn(color="secondary" rounded)
              q-avatar.q-mx-sm(size="lg")
                img(:src="getActiveAccount?.profile?.picture")
              .text-white.text-capitalize {{ getActiveAccount?.profile?.name }}
              q-menu(fit)
                q-list
                  q-item(clickable v-close-popup @click="onLogout")
                    q-item-section Logout
    q-page-container
      .row.justify-center
        .col-12
          q-page.q-py-md.q-px-lg
            router-view
</template>
<script setup>
import {
  ref
} from 'vue'
import { useStore } from 'vuex'
import { useNostr } from '~/composables'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from '~/mixins/errorHandler'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const $store = useStore()

const { showNotification, showLoading, hideLoading } = useNotifications()
const { handlerError } = useErrorHandler()

const {
  connectNostr, disconnectNostr,
  getProfileMetadata, setNostrAccount,
  isLoggedIn, getActiveAccount,
  currentRelay, setRelay
} = useNostr()

const relayInput = ref(undefined)

const onLoginNostr = async ({ relay }) => {
  const nostrApi = $store.$nostrApi
  try {
    showLoading()
    setRelay({ relay })
    const { pubkey, npubKey } = await connectNostr({ relay })
    const { content, tags } = await getProfileMetadata({ pubkey })
    setNostrAccount({ hex: pubkey, npub: npubKey, profile: JSON.parse(content), tags })
    showNotification({ message: `Connected to ${currentRelay.value.url}`, color: 'green' })
  } catch (error) {
    handlerError(error)
  } finally {
    hideLoading()
  }
}
const prompt = async () => {
  $q.dialog({
    title: 'Relay to connect',
    message: 'Enter the relay to connect',
    prompt: {
      model: 'wss://relay.rip',
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    onLoginNostr({ relay: data })
  }).onCancel(() => {
    showNotification({ message: 'Unable to connect to nostr', color: 'negative' })
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const onLogout = () => disconnectNostr()
</script>
<style lang="stylus" scoped>
.containerLayout
  height: 100vh

</style>
