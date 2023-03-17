export function setNostrAccount (state, dataObj) {
  state.account = { ...dataObj }
}
export function setContacts (state, contacts) {
  state.account.contacts = contacts
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
