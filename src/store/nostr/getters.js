export function getActiveAccount ({ account }) {
  return account
}
export function getRelays ({ relays }) {
  return relays
}
export function isLoggedInNostr ({ account }) {
  return Object.keys(account).length !== 0
}
