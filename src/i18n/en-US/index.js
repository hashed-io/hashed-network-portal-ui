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
  breadcrumb: {
    confidentialDocuments: 'Hashed Confidential Documents',
    NFTCollections: 'NFT Collections',
    detail: 'Detail',
    myVaults: 'My Vaults',
    extendedKeys: 'Extended Keys',
    vaultDetails: 'Vault Details',
    createAsset: 'Create Asset',
    getAllAssets: 'Get All Assets',
    proposalDetails: 'Proposal Details',
    create: 'create',
    marketplaces: 'Marketplaces',
    taxCredits: 'Tax Credits',
    proofOfReserves: 'Proof of Reserves',
    wallet: 'Wallet',
    members: 'Members'
  },
  layouts: {
    polkadotAddress: 'Polkadot Address',
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
      notEqual: 'The value must be different to the Owner address',
      password: 'The password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
      betweenString: 'The length must be between {min} and {max} letters',
      feeValid: 'The fee must be less than {maxInPercent}%'
    }
  },
  pages: {
    hashed: {
      wallet: {
        wallet: 'Wallet',
        emptyVestingList: "You don't have Hashed vesting",
        currentBlock: 'Current block',
        hashPerBlock: 'HASH per block',
        contributions: 'Contributions',
        fund54: 'Fund 54',
        fund58: 'Fund 58',
        estimatedTime: 'Estimated time to fully vest',
        vestedToDate: 'Vested to date',
        remainingToVest: 'Remaining to vest',
        totalRewards: 'Total rewards',
        baseRewards: 'Base rewards',
        bonus: 'Bonus'
      },
      members: {
        details: 'Calculations Parameters',
        hashRewardPerDot: 'HASH reward per DOT',
        secondTimeBonus: 'Repeat participants reward (leaser of two)',
        blocksPerMinute: 'Blocks per minute',
        blocksPerWeek: 'Blocks per week',
        blocksForLease: 'Blocks for the lease term',
        filters: 'Filters',
        search: 'Search',
        showEligibles: 'Show just eligibles for bonus',
        members: 'Members'
      }
    },
    login: {
      googleDriveError: 'An error has occurred trying to get access to Google Drive',
      hashedClubAccessibility: 'Hashed Club is only accessible to those that hold HASH. Contact to join.',
      yourHashedAddress: 'Your HASHED address',
      contactUs: 'Contact us',
      getTokens: 'Get HASH token'
    },
    nbv: {
      appName: 'Bitcoin Vaults',
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
        textInfo: 'Create a new extended public key and self custody your seed.',
        textInfoHCD: 'Link XPUB generated from HCD.',
        textInfoIHaveAnXpub: 'Enter your extended public key by scanning the QR code from BlueWallet (easiest) or via the input form.',
        masterFingerPrint: 'Master fingerprint',
        pubicKeyDesc: 'Please Insert an extended public key with "Zpub" prefix',
        fingerprintDesc: 'The extended key fingerprint is defined as the first 8 alphanumeric characters',
        fingerprintTooltip: 'The fingerprint of a public key is defined in BIP 32 as the first 4 bytes of the RIPEMD160 hash of the SHA256 hash of the public key.',
        derivationPath: 'Derivation Path',
        derivationPathDesc: 'Contains information about a key’s depth and index',
        xpubDesc: 'Scan XPUB from blue wallet',
        xpub: 'XPUB',
        xpubPlaceholder: 'Paste or write your XPUB',
        managePublicKeys: 'Manage Public Keys',
        removeYourXpub: 'Remove your XPUB',
        setXpub: 'Set XPUB',
        useForm: 'Use Form to import manually your multi signature XPUB.',
        yourXpubWasAdded: 'Your XPUB was added',
        yourXpubWasRemoved: 'Your XPUB was removed',
        scanXpub: 'Scan XPUB from Blue Wallet'
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
        creatingDescriptor: 'We are creating the descriptor',
        accountDuplicated: 'This account is duplicated',
        refreshAndCopyAddress: 'Refresh and copy',
        refreshAndShowQrAddress: 'Refresh and show qr'
      },
      proposals: {
        create_proposal: 'Create new proposal',
        descriptionDesc: 'Write a brief description',
        recipientAddressDesc: 'Write or scan a valid BTC address to send satoshis',
        amountDesc: 'Write amount you want to send',
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
        signPSBT: 'Sign PSBT (BW)',
        signPSBTUsingHCD: 'Sign PSBT (HCD)',
        deleteProposal: 'Delete Proposal',
        proposalId: 'Proposal Id',
        status: 'Status',
        satoshiAmount: 'Amount',
        feeInSatoshiPerVirtualByte: 'Fee in Satoshi Per Virtual Byte',
        toAddress: 'To Address',
        tx: 'See Transaction Details',
        proposer: 'Proposer',
        finalizeTxx: 'Finalize Txx',
        broadcastTx: 'Broadcast Tx',
        finalizing: 'Finalizing',
        broadcasting: 'Broadcasting',
        pending: 'Pending',
        signThePsbtWithValidXPUB: 'Please sign the psbt with a valid XPUB',
        psbtSavedSuccessfully: 'PSBT saved successfully',
        creatingPSBT: 'We are creating the PSBT',
        description: 'Description',
        recipientAddress: 'Recipient address',
        amountInSatoshi: 'Amount',
        pendingStatus: 'Waiting on signatures',
        finalizedStatus: 'Finalized, waiting for broadcast',
        broadcastedStatus: 'Broadcasted',
        readyToFinalize: 'Ready to finalize',
        exitWithoutSave: 'Exit without save',
        signPsbt: 'Sign PSBT',
        signPsbtDescription: 'Click continue to sign PSBT.',
        saveSignedPsbt: 'Save signed PSBT',
        saveSignedPsbtDescription: 'Click finish to save signed PSBT.'
        // signPsbtStep1: ''
      },
      list: {
        thereAreNotVaultsYet: 'There are no vaults yet'
      },
      actions: {
        refresh: 'refresh',
        copyToClipboard: 'Copy to clipboard'
      },
      proofOfReserves: {
        proofOfReserves: 'Proof of reserves',
        goToProofOfReserves: 'Test',
        status: 'Status',
        message: 'Message',
        psbt: 'PSBT',
        emptyProofOfReserves: 'Have not been created a Proof of reserves for this vault.',
        createProofOfReserves: 'Create proof of reserves',
        verifyProofOfReserves: 'Verify proof',
        downloadPsbt: 'Download PSBT',
        proofOfReservesResponse: 'Proof of reserves response',
        createdProofOfReservesSuccessfully: 'Proof of reserves was created successfully',
        psbtSavedSuccessfully: 'Proof of reserves was signed and saves successfully',
        finalizedProofOfReservesSuccessfully: 'Finalize Proof',
        downloadedProofOfReservesSuccessfully: 'Download PSBT'
      }
    },
    marketplace: {
      appName: 'Marketplace',
      marketplaceTitle: 'Marketplace',
      addMarketplaceButton: 'Add Marketplace',
      adminInput: 'The administrator of the marketplace (optional)',
      mainOptions: {
        marketplaces: 'Marketplaces',
        marketplaceDetails: 'Details',
        custodian: 'Custodian',
        privacy: 'Privacy',
        nftCollections: 'NFT Collections',
        afloat: 'Afloat'
      },
      breadcrumbs: {
        marketplaces: 'Marketplaces',
        custodian: 'Custodian',
        privacy: 'Privacy',
        create: 'Create',
        afloat: 'Afloat Api example'
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
      offerTable: {
        createSellOffer: 'Create a new sell offer',
        createBuyOffer: 'Create a new buy offer'
      },
      applyForm: {
        title: 'Apply for Marketplace',
        subtitle: 'Fill in the form to apply for the Marketplace. Each document must be uploaded to share with the administrator of the Marketplace',
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
        feeLabel: 'Fee of the Marketplace',
        placeholder: 'Please write a description',
        feePlaceholder: 'Please write the fee for the marketplace',
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
        owner: 'Owner',
        issuer: 'Issuer',
        freezer: 'Freezer'
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
      },
      taxCredits: {
        createCollectionFormTitle: 'Create new collection',
        createNFTFormTitle: 'Create new Unique',
        title: 'NFT collections',
        emptyList: 'No NFT yet',
        emptyCollectionList: 'No Collections yet',
        details: {
          collectionTitle: 'Details of the collection {class}',
          afloatCollectionTitle: 'Afloat tax credits',
          NFTTitle: 'Detalles NFT {class}',
          admin: 'Administator',
          user: 'User',
          frozen: 'Frozen',
          active: 'Active',
          attribute: 'Attribute',
          value: 'Value',
          file: 'File',
          downloading: 'Downloading file',
          numberItems: 'Number of items',
          numberMetadata: 'Number of metadata'
        },
        labels: {
          attributeLabel: 'Attribute',
          isFile: 'Upload file'
        },
        placeholders: {
          label: 'Label',
          value: 'Value'
        },
        buttons: {
          addAttribute: 'Add attribute',
          createUnique: 'Create unique',
          removeAttribute: 'Remove attribute',
          createCollection: 'Create collection'
        },
        messages: {
          uniqueCreated: 'Unique created'
        }
      }
    },
    collections: {
      loadingCollections: 'Loading the Collection(s)...',
      element: {
        title: 'Collection',
        input: 'Collection\'s Name'
      }
    },
    nfts: {
      loadingUniques: 'Loading the NFT(s)...',
      createNFT: 'Create a new NFT',
      createTaxCredit: 'Create a new Tax Credit',
      deleteOffer: 'Delete offer',
      enlistOffer: 'Enlist offer',
      details: 'Details of the NFT',
      detailsTaxCredit: 'Details of the Tax Credit',
      sellingLabel: 'Enter the selling price of the NFT',
      submitOffer: 'Submit offer',
      forSale: 'For sale',
      notForSale: 'Not for sale',
      element: {
        title: 'Unique',
        taxCreditTitle: 'Tax Credit',
        owner: 'Owner',
        issuer: 'Issuer'
      }
    },
    hcd: {
      documents: {
        addDocument: 'Add document',
        myDocuments: 'My documents',
        mySharedDocuments: 'My shared documents',
        sharedWithMe: 'Shared with me',
        name: 'Name',
        description: 'Description',
        file: 'File',
        shareWithOtherUser: 'Share with other user',
        polkadotAddressToShare: 'Polkadot address to share',
        saveDocument: 'Save document',
        shareDocument: 'Share document',
        editDocumentMetadata: 'Edit document metadata',
        thereAreNotDocumentsYet: 'There are not documents yet',
        from: 'From',
        to: 'To',
        downloadFile: 'Download file',
        editMetadata: 'Edit metadata',
        remove: 'Remove',
        loadingMessage: 'Waiting for Hashed Confidential Documents',
        successSharedMessage: 'Document shared successfully',
        successEditedMetadataMessage: 'Metadata edited successfully',
        successRemovedMessage: 'Document removed successfully',
        successAddedMessage: 'Document added successfully',
        documents: 'Documents'
      },
      afloat: {
        tab: 'Create Asset',
        createAsset: 'Playground',
        tabGetAllAssets: 'Get All Assets'
      }
    },
    sign: {
      appName: 'Sign Test'
    }
  }
}
