import {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
  nip05,
  nip19,
  validateEvent,
  verifySignature
} from 'nostr-tools'

import Nip07 from './Nip07'
import { EventKind } from '~/const'

class NostrApi {
  constructor (relays) {
    this.relays = relays || []
    this.Nip07 = Nip07
    this.relay = undefined
  }

  addRelay (relay) {
    this.relays.push(relay)
  }

  async connect () {
    const relay = await relayInit(this.relay)

    let errorFlag = false
    relay.on('error', () => {
      errorFlag = true
    })
    if (errorFlag) throw new Error({ message: `failed to connect to ${relay.url}` })

    await relay.connect()
    console.log(`connected to ${relay.url}`)

    this.relay = relay
  }

  async disconnect () {
    this.relay.close()
  }

  async queryProfile () {
    return nip05.queryProfile
  }

  async getProfileMetadata ({ publicKey }) {
    const sub = this.relay.sub([
      {
        kinds: [EventKind.METADATA],
        authors: [publicKey]
      }
    ])
    return new Promise((resolve, reject) => {
      sub.on('event', event => {
        resolve(event)
      })
      sub.on('eose', () => {
        sub.unsub()
        reject('Failed to get the metadata')
      })
    })
  }

  HexToNpub ({ publicKey }) {
    return nip19.npubEncode(publicKey)
  }

  getRelay () {
    return this.relay
  }

  getRelays () {
    return this.relays
  }

  setRelays ({ relays }) {
    this.relays = [...relays]
  }

  setRelay ({ relay }) {
    this.relay = relay
  }
}

export default NostrApi
