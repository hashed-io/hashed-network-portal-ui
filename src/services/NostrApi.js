import {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
  nip05,
  nip19,
  validateEvent,
  verifySignature,
  SimplePool
} from 'nostr-tools'

import Nip07 from './Nip07'
import { EventKind } from '~/const'

class NostrApi {
  constructor (relays) {
    this.relays = relays || []
    this.Nip07 = Nip07
    this.relay = undefined
    this.pool = undefined
  }

  addRelay (relay) {
    this.relays.push(relay)
  }

  clearRelays () {
    this.relays = []
  }

  // async connect () {
  //   let relay
  //   try {
  //     relay = relayInit(this.relay)
  //     relay.on('connect', () => {
  //       console.log(`connected to ${relay.url}`)
  //     })
  //     relay.on('error', () => {
  //       console.log(`failed to connect to ${relay.url}`)
  //     })
  //     await relay.connect()
  //     this.relay = relay
  //   } catch (error) {
  //     throw new Error(`failed to connect to ${relay.url}`)
  //   }
  // }

  async connectPool ({ relays, hexPubKey }, subTrigger) {
    if (!relays) throw new Error('Provide relays to connect')
    const pool = new SimplePool()

    const sub = pool.sub(
      [...relays],
      [
        {
          authors: [hexPubKey],
          kinds: [EventKind.METADATA]
        }
      ]
    )
    this.relays = [...relays]
    sub.on('event', event => {
      subTrigger(event)
    })
    return sub
  }

  async disconnect () {
    this.relay.close()
  }

  async queryProfile () {
    return nip05.queryProfile(('_@coinstr.app'))
  }

  async getProfileMetadata ({ publicKey }) {
    // retornar sub (useProofOfReserves)
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
        reject('Failed to get the metadata')
      })
    })
  }

  HexToNpub ({ publicKey }) {
    return nip19.npubEncode(publicKey)
  }

  NpubToHex ({ publicKey }) {
    const { type, data } = nip19.decode(publicKey)
    return { type, data }
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
