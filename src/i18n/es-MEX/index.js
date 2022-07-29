// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  lang: {
    'en-US': 'Ingles',
    'es-MEX': 'Español'
  },
  general: {
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    loremShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    waitingWeb3: 'Waiting for polkadot web3 extension',
    waitingSub: 'Waiting for changes on the chain'
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
      fileRequired: 'El archivo es requerido',
      greaterOrEqualThanString: 'La longitud debe ser mayor o igual a {value}'
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
        manageVaults: 'Administrar Baules',
        descriptionLabel: 'Enter a public label for this vault',
        cosigners: 'Cosigners',
        cosignersLabelDesc: 'Enter a valid public address for each cosigner',
        mOfn: 'M of N',
        description: 'Descripción',
        owner: 'Propietario',
        threshold: 'Threshold',
        clickToSeeDetails: 'Click para ver detalles',
        createVault: 'Crear Baúl'
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
      addMarketplaceButton: 'Añadir Marketplace',
      tabs: {
        myMarketplaces: 'Mis Marketplaces',
        allMarketplaces: 'Todos los marketplaces',
        marketInfo: 'Información del marketplace',
        enrollmentRequest: 'Solictudes de inscripción'
      },
      details: {
        participantsTitle: 'Participantes',
        noParticipants: 'No hay participantes aún',
        numberPaparticipantsTitle: 'Número de participantes',
        applicantsTitle: 'Aplicantes',
        noApplicants: 'No hay aplicantes aún',
        pending: 'Tu aplicación está pendiente de aprobación',
        noMarketplaces: 'Todavía no hay marketplaces',
        notesTitle: 'Notas',
        filesTitle: 'Archivos',
        enrollButton: 'Inscribir',
        rejectButton: 'Rechazar'
      },
      applyForm: {
        title: 'Aplicar para unirse al marketplace',
        subtitle: 'Llena el formulario para aplicar a este marketplace',
        custodian: {
          label: 'Custodio',
          placeholder: 'Dirección del custodio',
          infoLabel: 'Añadir un custodia de tus archivos (opcional)'
        },
        filesTitle: 'Cargar archivos',
        addFilesButton: 'Añadir archivos',
        notes: {
          label: 'Notas',
          placeholder: 'Notas acerca de la solicitud'
        },
        submitButton: 'Enviar'
      },
      createForm: {
        title: 'Crear un nuevo Marketplace',
        label: 'Etiqueta',
        placeholder: 'Escriba una descripción para el marketplace',
        button: 'Crear una nueva tienda'
      },
      searchInput: {
        label: 'Buscar',
        placeholder: 'Escribe una búsqueda'
      },
      role: {
        administrator: 'Administrador',
        owner: 'Propietario'
      },
      applicants: {
        title: 'Aplicantes'
      },
      privacy: {
        title: 'Playground de solución de privacidad',
        uploadSection: {
          title: 'Subir archivo',
          fileInput: 'Seleccionar archivo',
          custodian: 'Dirección del custodio',
          shareFile: 'Compartir archivo con otra dirección'
        },
        downloadSection: {
          title: 'Descargar archivo',
          cidInput: 'Descargar archivo por CID o ID',
          isShareData: '¿Los datos son compartidos?'
        },
        buttons: {
          save: 'Guardar',
          clear: 'Limpiar',
          download: 'Descargar',
          openFile: 'Abrir archivo'
        },
        query: 'Petición: ',
        response: 'Respuesta: '
      }
    }
  }
}
