export function setNostrAccount (state, dataObj) {
  state.account = { ...dataObj }
}
export function setPublicKey (state, pk) {
  state.publicKey = pk
}
export function setPrivateKey (state, pv) {
  state.privatekey = pv
}

export function clearNostrAccount (state) {
  state.account = {}
}

export function updateNostrAccount (state, dataObj) {
  state.account.profile = {}
  for (const prop in dataObj) {
    state.account.profile[prop] = dataObj[prop]
  }
}

export function updateRelays (state, relays) {
  state.relays = [...relays]
}
