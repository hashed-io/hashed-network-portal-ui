export function availableAccounts ({ availableAccounts }) {
  return availableAccounts
}

export function selectedAccount ({ selectedAccount }) {
  return selectedAccount
}

export function isLogged ({ selectedAccount }) {
  return !!selectedAccount
}
