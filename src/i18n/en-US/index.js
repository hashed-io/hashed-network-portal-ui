// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  lang: {
    'en-US': 'English',
    'es-MEX': 'Spanish'
  },
  general: {
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    waitingWeb3: 'Waiting for polkadot web3 extension',
    waitingSub: 'Waiting for changes on the chain',
    finish: 'Finish',
    continue: 'Continue',
    back: 'Back',
    refresh: 'Refresh'
  },
  forms: {
    errors: {
      required: 'This field is required',
      isNotValidXpub: 'This is not a valid XPUB',
      isNotValidFingerprint: 'This is not a valid fingerprint',
      isNotValidDerivationPath: 'This is not a valid derivation path',
      positiveInteger: 'This field must contain a positive integer number',
      greaterOrEqualThan: 'The value must be greater than or equal to {value}',
      lessOrEqualThan: 'The value must be less than or equal to {value}',
      containAtLeastCosigners: 'This field must contain at least {value} cosigners address',
      containLessThanCosigners: 'This field must contain at less than {value} cosigners address',
      isNotValidMainetBTC: 'This field must contain a valid mainet BTC address',
      isNotValidPolkadotAddress: 'Is not a valid polkadot address',
      notOwnAccount: 'Not owner account allowed, please set this on "Include owner as cosigner" option'
    }
  },
  common: {
    chooseAnAccount: 'Choose an account',
    fileName: 'Name of the file',
    enterKeyToEncrypt: 'Enter key to encrypt and decrypt your data',
    insertYourKey: 'Insert your key'
  },
  pages: {
    nbv: {
      common: {
        description: 'Description',
        recipientAddress: 'Recipient address',
        amountInSats: 'Amount in Satoshi',
        status: 'Status',
        Threshold: 'Threshold'
      },
      xpub: {
        label: 'Label',
        publicKey: 'Public Key',
        labelDesc: 'Disabled temporally',
        extendedPublicKeyInfo: 'An extended public key, or xpub, is a public key which can be used to derive child public keys as part of a Hierarchical Deterministic (HD) wallet. An extended public key is a Bitcoin standard established by BIP 32 and is mainly used by a wallet behind the scenes in order to derive public keys.',
        textInfo: 'Enter your extended public key by scanning the QR code from BlueWallet (easiest) or via the input form.',
        masterFingerPrint: 'Master fingerprint',
        pubicKeyDesc: 'Please Insert an extended public key with "Zpub" prefix',
        fingerprintDesc: 'The extended key fingerprint is defined as the first 8 alphanumeric characters',
        fingerprintTooltip: 'The fingerprint of a public key is defined in BIP 32 as the first 4 bytes of the RIPEMD160 hash of the SHA256 hash of the public key.',
        derivationPath: 'Derivation Path',
        derivationPathDesc: 'Contains information about a key’s depth and index',
        xpubDesc: 'Please pase or scan your XPUB from blue wallet',
        xpub: 'XPUB',
        xpubPlaceholder: 'Paste or write your XPUB',
        permissionNotGranted: 'Permission not granted',
        pleaseAllowCameraPermission: 'Please allow camera permission to scan your XPUB',
        pleaseScanYourXpubFromBlueWallet: 'Please Scan your XPUB from Blue Wallet',
        useForm: 'Use form',
        setXPUB: 'Set XPUB'
      },
      vaults: {
        manageVaults: 'Manage Vaults',
        descriptionLabel: 'Enter a public label for this vault',
        cosigners: 'Cosigners',
        cosignersLabelDesc: 'Enter a valid public address for each cosigner',
        mOfn: 'M of N',
        description: 'Description',
        owner: 'Owner',
        threshold: 'Threshold',
        clickToSeeDetails: 'Click to see details',
        createVault: 'Create vault',
        label: 'Label',
        accountAddress: 'Account address',
        thereAreNotVaultsYet: 'There are not vaults yet',
        vaultId: 'Vault Id'
      },
      proposals: {
        create_proposal: 'Create new proposal',
        descriptionDesc: 'Write a brief description',
        recipientAddressDesc: 'Write a valid BTC address to send satoshis',
        amountDesc: 'Write amount in satoshis',
        titleStep1: 'Export PSBT',
        titleStep2: 'Import signed PSBT',
        titleStep3: 'Finalize',
        signPsbtStep1: "Please scan these qr codes on Blue wallet to sign the transaction, you must use the vault's transaction screen",
        signPsbtStep2: 'Scan the qr codes you exported from Blue wallet after you signed the transaction',
        signPsbtSaveDesc: 'Save your signed psbt',
        signPsbtFinalizeDesc: 'Complete the transaction, ready to broadcast',
        signPsbtBroadcastDesc: 'Broadcast the transaction',
        saveBtn: 'Save',
        finalizeBtn: 'Finalize',
        broadcastBtn: 'Broadcast',
        feePerVB: 'Fee Per Virtual Byte',
        toAddress: 'To Address',
        proposer: 'Proposer',
        thereAreNotProposalsYet: 'There are not proposals yet',
        notValidPSBT: 'PSBT not valid, please try again',
        youAlreadySigned: 'You already signed',
        alreadyFinalized: 'Already finalized',
        alreadyBroadcasted: 'Already broadcasted',
        proposalDetails: 'Proposal Details',
        signPSBT: 'Sign PSBT',
        deleteProposal: 'Delete Proposal',
        proposalId: 'Proposal Id',
        tx: 'Tx',
        finalizeTx: 'Finalize Tx',
        broadcastTx: 'Broadcast Tx',
        finalizing: 'Finalizing',
        broadcasting: 'Broadcasting',
        pending: 'Pending',
        pleaseAwaitOffchain: 'Please await a moment, we are creating the PSBT'
        // signPsbtStep1: ''
      }
    },
    marketplace: {
      marketplaceTitle: 'Marketplace',
      addMarketplaceButton: 'Add Marketplace',
      tabs: {
        myMarketplaces: 'My marketplaces',
        allMarketplaces: 'All marketplaces',
        marketInfo: 'Market information',
        enrollmentRequest: 'Enrollment requests'
      },
      details: {
        participantsTitle: 'Participants',
        noParticipants: 'No participants yet',
        numberPaparticipantsTitle: 'Number of participants',
        applicantsTitle: 'Applicants',
        noApplicants: 'No applicants yet',
        pending: 'Your application is under review',
        noMarketplaces: 'No markets yet',
        notesTitle: 'Notes',
        filesTitle: 'Files',
        enrollButton: 'Enroll',
        rejectButton: 'Rejected'
      },
      applyForm: {
        title: 'Apply for Marketplace',
        subtitle: 'Fill in the form to apply for the Marketplace',
        filesTitle: 'Upload files',
        addFilesButton: 'Add Files',
        notes: {
          label: 'Notes',
          placeholder: 'Notes about your application'
        },
        submitButton: 'Submit'
      },
      createForm: {
        title: 'Create new marketplace',
        label: 'Label',
        placeholder: 'Please write a description',
        button: 'Create marketplace'
      },
      searchInput: {
        label: 'Search',
        placeholder: 'Please write a keyword'
      },
      role: {
        administrator: 'Administrator',
        owner: 'Owner'
      },
      applicants: {
        title: 'Applicants'
      }
    }
  }
}
