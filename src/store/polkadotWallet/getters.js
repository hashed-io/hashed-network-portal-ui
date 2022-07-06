export function availableAccounts ({ availableAccounts }) {
  return availableAccounts
}

export function selectedAccount ({ selectedAccount }) {
  return selectedAccount
}

export function isLoggedIn ({ selectedAccount, hashedLoggedIn }) {
  return !!(selectedAccount && hashedLoggedIn)
}
