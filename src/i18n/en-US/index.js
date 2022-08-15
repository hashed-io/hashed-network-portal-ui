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
    waitingSub: 'Waiting for changes on the chain'
  },
  login: {
    login: 'Login',
    chooseAnAccount: 'Choose an account from your polkadot extension',
    notHaveAccounts: 'You do not have accounts on polkadot js extension',
    or: 'or',
    signinWithGoogle: 'Sign in with Google',
    logout: 'Logout'
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
      notOwnAccount: 'Not owner account allowed, please set this on "Include owner as cosigner" option',
      fileRequired: 'This field is required',
      greaterOrEqualThanString: 'The length must be greater than or equal to {value}',
      lessOrEqualThanString: 'The length must be less than or equal to {value}',
      notEqual: 'The value must be different to the Owner address'
    }
  },
  pages: {
    nbv: {
      appName: 'NBV',
      mainOptions: {
        myVaults: 'My Vaults',
        extendedKeys: 'Extended Keys'
      },
      breadcrumbs: {
        myVaults: 'My Vaults',
        vaultDetails: 'Vault Details',
        proposalDetails: 'Proposal Details',
        extendedKeys: 'Extended Keys'
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
        managePublicKeys: 'Manage Public Keys',
        removeYourXpub: 'Remove your XPUB',
        setXpub: 'Set XPUB',
        useForm: 'Use Form',
        yourXpubWasAdded: 'Your XPUB was added',
        yourXpubWasRemoved: 'Your XPUB was removed'
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
        createNewVault: 'Create new vault',
        label: 'Label',
        accountAddress: 'Account address',
        includeOwnerAsCosigner: 'Include owner as cosigner',
        vaultCreated: 'Vault created',
        messageSignedAndVerified: 'Message Signed and Verified',
        deleteVault: 'Delete vault',
        vaultDetails: 'Vault Details',
        exportDescriptor: 'Export descriptor',
        pending: 'Pending',
        vaultId: 'Vault Id',
        balance: 'Balance',
        receiveAddress: 'Receive Address',
        getReceiveAddress: 'Get receive address',
        refreshReceiveAddress: 'Refresh receive address',
        outputDescriptor: 'Output Descriptor',
        vaultsBalanceMustBeGreaterThanZero: 'The vault\'s balance must be greater than 0',
        descriptorQr: 'Descriptor QR',
        creatingDescriptor: 'Please await a moment, we are creating the descriptor',
        accountDuplicated: 'This account is duplicated'
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
        proposals: 'Proposals',
        createProposal: 'Create proposal',
        updatingProposal: 'Updating proposal',
        proposalCreated: 'Proposal created',
        proposalDetails: 'Proposal Details',
        signPSBT: 'Sign PSBT',
        deleteProposal: 'Delete Proposal',
        proposalId: 'Proposal Id',
        status: 'Status',
        satoshiAmount: 'Satoshi Amount',
        feeInSatoshiPerVirtualByte: 'Fee in Satoshi Per Virtual Byte',
        toAddress: 'To Address',
        tx: 'Tx',
        Proposer: 'Proposer',
        finalizeTxx: 'Finalize Txx',
        broadcastTx: 'Broadcast Tx',
        finalizing: 'Finalizing',
        broadcasting: 'Broadcasting',
        pending: 'Pending',
        signThePsbtWithValidXPUB: 'Please sign the psbt with a valid XPUB',
        psbtSavedSuccessfully: 'PSBT saved successfully',
        creatingPSBT: 'Please await a moment, we are creating the PSBT',
        description: 'Description',
        recipientAddress: 'Recipient address',
        amountInSatoshi: 'Amount in Satoshi'
        // signPsbtStep1: ''
      },
      list: {
        thereAreNotVaultsYet: 'There Are Not Vaults Yet'
      },
      actions: {
        refresh: 'refresh',
        copyToClipboard: 'Copy to clipboard'
      }
    },
    marketplace: {
      appName: 'Marketplace',
      marketplaceTitle: 'Marketplace',
      addMarketplaceButton: 'Add Marketplace',
      mainOptions: {
        marketplaces: 'Marketplaces',
        custodian: 'Custodian',
        privacy: 'Privacy'
      },
      breadcrumbs: {
        marketplaces: 'Marketplaces',
        detail: 'Detail',
        custodian: 'Custodian',
        privacy: 'Privacy'
      },
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
        rejectButton: 'Rejected',
        applicationWasSubmitted: 'Application was submitted',
        applicationApproved: 'Application approved',
        applicationRejected: 'Application rejected'
      },
      applyForm: {
        title: 'Apply for Marketplace',
        subtitle: 'Fill in the form to apply for the Marketplace',
        custodian: {
          label: 'Custodian',
          placeholder: 'Custodian address',
          infoLabel: 'Add a third-party custodian (optional)'
        },
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
        button: 'Create marketplace',
        marketplacecreatedSuccessfully: 'Marketplace created successfully',
        loggedToCreate: 'You must be logged in to create a marketplace'
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
        title: 'Applicants',
        feedback: 'Feedback'
      },
      custodian: {
        gettingApplicationsWhereYouAreCustodian: 'Getting applications where you are custodian'
      },
      privacy: {
        title: 'Privacy solution playground',
        uploadSection: {
          title: 'Upload file',
          fileInput: 'Choose file',
          custodian: 'Address of the custodian',
          shareFile: 'Share file with other addresses',
          noFileToOpen: 'No file to open'
        },
        downloadSection: {
          title: 'Download file',
          cidInput: 'Download file by CID or ID',
          isShareData: 'The data is shared?'
        },
        buttons: {
          save: 'Save',
          clear: 'Clear',
          download: 'Download',
          openFile: 'Open file'
        },
        query: 'Query: ',
        response: 'Response: '
      },
      list: {
        youDontHaveMarketplacesYet: 'You don\'t have marketplaces yet',
        marketplacesHaveNotYetBeenCreated: 'Marketplaces have not yet been created'
      },
      actions: {
        loggedDownloadFile: 'You need to be logged in to download a file'
      }
    },
    sign: {
      appName: 'Sign Test'
    }
  }
}
