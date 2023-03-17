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

  const connectNostr = async ({ relay = 'wss://relay.rip', publicKey }) => {
    if (!hasRelays.value) {
      nostrApi.addRelay(relay)
    }
    await nostrApi.connect()

    let response
    if (publicKey && isNpub(publicKey)) {
      response = nostrApi.NpubToHex({ publicKey }) || {}
    }
    const pubkey = response?.data || await nostrApi.Nip07.getPublicKey()

    const npubKey = nostrApi.HexToNpub({ publicKey: pubkey })
    return { pubkey, npubKey }
  }
  const disconnectNostr = async () => {
    $store.commit('nostr/clearNostrAccount')
    $store.$nostrApi.disconnect()
    $store.$nostrApi.setRelay({ relay: undefined })
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

  const getContacts = async ({ publicKey }) => {
    const ndkRest = process.env.NDK_REST_URL
    const relay = encodeURIComponent(currentRelay.value.url)

    try {
      const response = await fetch(`${ndkRest}/${relay}/${publicKey}/contacts`)
      const { data: contacts, message, success } = await response.json()

      if (success) {
        for (const [key, value] of Object.entries(contacts)) {
          if (key) {
            const npubEncode = nostrApi.HexToNpub({ publicKey: key })
            value.npub = npubEncode
          }
        }

        $store.commit('nostr/setContacts', contacts)
        return { contacts }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const isNpub = (key) => {
    const npubIdentifier = 'npub'
    return key?.substring(0, npubIdentifier.length) === npubIdentifier
  }

  const extensionIsAvailable = computed(() => { return !!window.nostr })

  const isLoggedIn = computed(() => $store.getters['nostr/isLoggedInNostr'])
  const getActiveAccount = computed(() => $store.getters['nostr/getActiveAccount'])
  const currentRelay = computed(() => $store.$nostrApi.relay)
  const setRelay = ({ relay }) => nostrApi.setRelay({ relay })
  const clearRelays = () => nostrApi.clearRelays()
  return {
    connectNostr,
    getProfileMetadata,
    setNostrAccount,
    isLoggedIn,
    getActiveAccount,
    disconnectNostr,
    currentRelay,
    setRelay,
    clearRelays,
    getContacts,
    extensionIsAvailable
  }
}
