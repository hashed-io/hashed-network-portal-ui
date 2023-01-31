import { Notify } from 'quasar'

const errorMaps = [
  {
    message: 'Work in progress!',
    code: 'NotYetImplemented'
  },
  {
    message: "Xpub shouldn't be empty",
    code: 'NoneValue'
  },
  {
    message: 'The xpub has already been uploaded and taken by an account',
    code: 'XPubAlreadyTaken'
  },
  {
    message: "The Account doesn't have an xpub",
    code: 'XPubNotFound'
  },
  {
    message: 'The user already has an xpub, try to remove it first',
    code: 'UserAlreadyHasXpub'
  },
  {
    message: 'The Xpub cant be removed/changed because a vault needs it',
    code: 'XpubLinkedToVault'
  },
  {
    message: "The generated Hashes aren't the same",
    code: 'HashingError'
  },
  {
    message: 'Found Invalid name on an additional field',
    code: 'InvalidAdditionalField'
  },
  {
    message: 'The vault threshold cannot be greater than the number of vault participants',
    code: 'InvalidVaultThreshold'
  },
  {
    message: 'A defined cosigner reached its vault limit',
    code: 'SignerVaultLimit'
  },
  {
    message: 'Too many cosigners',
    code: 'ExceedMaxCosignersPerVault'
  },
  {
    message: 'Vault not found',
    code: 'VaultNotFound'
  },
  {
    message: 'A vault needs at least 1 cosigner',
    code: 'NotEnoughCosigners'
  },
  {
    message: 'Only the owner of this vault can do this transaction',
    code: 'VaultOwnerPermissionsNeeded'
  },
  {
    message: 'Vault members cannot be duplicate',
    code: 'DuplicateVaultMembers'
  },
  {
    message: 'The account must participate in the vault to make a proposal or sign',
    code: 'SignerPermissionsNeeded'
  },
  {
    message: 'The vault has too many proposals',
    code: 'ExceedMaxProposalsPerVault'
  },
  {
    message: 'Proposal not found (id)',
    code: 'ProposalNotFound'
  },
  {
    message: 'The account must be the proposer to remove it',
    code: 'ProposerPermissionsNeeded'
  },
  {
    message: 'An identical proposal exists in storage',
    code: 'AlreadyProposed'
  },
  {
    message: 'The proposal was already signed by the user',
    code: 'AlreadySigned'
  },
  {
    message: 'The proposal is already finalized or broadcasted',
    code: 'PendingProposalRequired'
  },
  {
    message: "The proposal signatures need to surpass the vault's threshold",
    code: 'NotEnoughSignatures'
  },
  {
    message: 'The proposal has structural failures',
    code: 'InvalidProposal'
  },
  {
    message: 'This vault cant take proposals due to structural failures',
    code: 'InvalidVault'
  },
  {
    message: 'The item is not for sale',
    code: 'ItemNotForSale'
  },
  {
    message: 'Your user do not have the specified role for the transaction',
    code: 'NotAuthorized'
  }
]

const handlerError = (error) => {
  const message = error.message || error
  const isErrorOnMaps = errorMaps.find(e => message.includes(e.code))
  let errorMessage = message
  if (isErrorOnMaps) {
    errorMessage = isErrorOnMaps.message
  }
  console.error('handlingError:', errorMessage, error)
  Notify.create({
    message: errorMessage,
    color: 'negative',
    position: 'bottom',
    timeout: 10000,
    actions: [
      { icon: 'notification_important', color: 'white', handler: () => { /* ... */ } }
    ]
  })
}

export default {
  methods: {
    handlerError
  }
}

export function useErrorHandler () {
  return {
    handlerError
  }
}
