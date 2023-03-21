import {
  computed
} from 'vue'
import { useStore } from 'vuex'

export const useNostr = () => {
  // Use composables
  const $store = useStore()
  const nostrApi = $store.$nostrApi

  const connectNostr = async ({ relay = 'wss://relay.rip', publicKey }) => {
    // nostrApi.setRelay({ relay })
    // await nostrApi.connect()
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

  const setNostrAccount = ({ hex, npub, tags }) => {
    $store.commit('nostr/setNostrAccount', { hex, npub, tags })
  }
  const updateNostrAccount = (obj) => {
    console.log({ dataVuex: obj })
    $store.commit('nostr/updateNostrAccount', obj)
  }

  const getContacts = async ({ publicKey }) => {
    const ndkRest = process.env.NDK_REST_URL
    let { url } = currentRelay() || {}
    if (!url) {
      const relays = nostrApi.getRelays()
      url = relays[2]
    }
    const relay = encodeURIComponent(url)

    try {
      const response = await fetch(`${ndkRest}/${relay}/${publicKey}/contacts`)
      const { data: contacts, message, success } = await response.json()

      if (success) {
        for (const [key, value] of Object.entries(contacts)) {
          if (key) {
            const npubEncode = nostrApi.HexToNpub({ publicKey: key })
            value.npub = npubEncode
            value.bitcoinAddress = key
          }
        }

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

  const HexToNpub = (hex) => {
    const npubIdentifier = 'npub'
    if (!hex) return
    if (hex?.substring(0, npubIdentifier.length) === npubIdentifier) return hex
    nostrApi.HexToNpub({ publicKey: hex })
  }

  const NpubToHex = (npub) => {
    const npubIdentifier = 'npub'
    if (!npub) return
    if (npub?.substring(0, npubIdentifier.length) === npubIdentifier) {
      nostrApi.NpubToHex({ publicKey: npub })
    }
  }

  const extensionIsAvailable = computed(() => { return !!window.nostr })

  const isLoggedIn = computed(() => $store.getters['nostr/isLoggedInNostr'])
  const getActiveAccount = computed(() => $store.getters['nostr/getActiveAccount'])
  const currentRelay = () => nostrApi.getRelay()
  const setRelay = ({ relay }) => nostrApi.setRelay({ relay })
  const clearRelays = () => nostrApi.clearRelays()

  const connectPool = async ({ relays, hexPubKey }, subTrigger) => {
    return nostrApi.connectPool({ relays, hexPubKey }, subTrigger)
  }

  return {
    connectNostr,
    getProfileMetadata,
    setNostrAccount,
    updateNostrAccount,
    isLoggedIn,
    getActiveAccount,
    disconnectNostr,
    currentRelay,
    setRelay,
    clearRelays,
    getContacts,
    extensionIsAvailable,
    HexToNpub,
    NpubToHex,
    connectPool
  }
}
