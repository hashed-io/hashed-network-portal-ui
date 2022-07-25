// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'La acción a fallida',
  success: 'La acción tuvo éxito',
  lang: {
    'en-US': 'Ingles',
    'es-MEX': 'Español'
  },
  general: {
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    waitingWeb3: 'Esperando la extensión de polkadot web3',
    waitingSub: 'Esperando cambios en la cadena'
  },
  forms: {
    errors: {
      required: 'Este campo es obligatorio',
      isNotValidXpub: 'Este no es un XPUB válido',
      isNotValidFingerprint: 'Esta no es una huella dactilar válida',
      isNotValidDerivationPath: 'Esta no es una ruta de derivación válida',
      positiveInteger: 'Este campo debe contener un número entero positivo',
      greaterOrEqualThan: 'El valor debe ser mayor o igual a {value}',
      lessOrEqualThan: 'El valor debe ser menor o igual a {value}',
      containAtLeastCosigners: 'Este campo debe contener al menos la dirección de {value} cofirmantes',
      containLessThanCosigners: 'Este campo debe contener menos de {value} direcciones de cosignatarios',
      isNotValidMainetBTC: 'Este campo debe contener una dirección BTC válida de mainet',
      isNotValidPolkadotAddress: 'No es una dirección de polkadot válida',
      notOwnAccount: 'No se permite la cuenta del propietario, por favor, configúrelo en la opción "Incluir al propietario como cofirmante"'
    }
  },
  pages: {
    nbv: {
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
        xpubPlaceholder: 'Paste or write your XPUB'
      },
      vaults: {
        manageVaults: 'Administrar Vaules',
        descriptionLabel: 'Enter a public label for this vault',
        cosigners: 'Cosigners',
        cosignersLabelDesc: 'Enter a valid public address for each cosigner',
        mOfn: 'M of N',
        description: 'Descripción',
        owner: 'Propietario',
        threshold: 'Threshold',
        clickToSeeDetails: 'Click para ver detalles',
        createVault: 'Crear vaul'
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
        broadcastBtn: 'Broadcast'
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
