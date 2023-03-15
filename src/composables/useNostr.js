import {
  computed
} from 'vue'
import { useStore } from 'vuex'

export const useNostr = () => {
  // Use composables
  const $store = useStore()
  const nostrApi = $store.$nostrApi

  const hasRelays = computed(() => {
    const relays = nostrApi.getRelays
    return relays.length > 0
  })

  const connectNostr = async ({ relay = 'wss://relay.rip' }) => {
    if (!hasRelays.value) {
      nostrApi.addRelay(relay)
    }
    await nostrApi.connect()

    const pubkey = await nostrApi.Nip07.getPublicKey()
    const npubKey = nostrApi.HexToNpub({ publicKey: pubkey })
    return { pubkey, npubKey }
  }
  const disconnectNostr = async () => {
    $store.$nostrApi.disconnect()
    $store.commit('nostr/clearNostrAccount')
  }
  const getProfileMetadata = async ({ pubkey }) => {
    const { content, tags } = await nostrApi.getProfileMetadata({ publicKey: pubkey })
    if (!content) {
      const [currentRelay] = nostrApi.getRelays() || []
      if (!currentRelay) throw new Error('Failed to get the profille from the relay ')
    }
    return { content, tags }
  }

  const setNostrAccount = ({ hex, npub, profile, tags }) => {
    $store.commit('nostr/setNostrAccount', { hex, npub, profile, tags })
  }

  const isLoggedIn = computed(() => $store.getters['nostr/isLoggedInNostr'])
  const getActiveAccount = computed(() => $store.getters['nostr/getActiveAccount'])
  const currentRelay = computed(() => $store.$nostrApi.relay)
  const setRelay = ({ relay }) => nostrApi.setRelay({ relay })
  return {
    connectNostr,
    getProfileMetadata,
    setNostrAccount,
    isLoggedIn,
    getActiveAccount,
    disconnectNostr,
    currentRelay,
    setRelay
  }
}
