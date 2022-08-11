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
      notOwnAccount: 'No se permite la cuenta del propietario, por favor, configúrelo en la opción "Incluir al propietario como cofirmante"',
      fileRequired: 'El archivo es requerido',
      greaterOrEqualThanString: 'La longitud debe ser mayor o igual a {value}',
      lessOrEqualThanString: 'La longitud debe ser menor o igual a {value}',
      notEqual: 'El valor no debe ser igual al propietario'
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
        owner: 'Propietario',
        issuer: 'Emisor',
        freezer: 'Congelador'
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
      },
      taxCredits: {
        createForm: 'Create new Unique',
        title: 'Lista de créditos de impuestos',
        emptyList: 'No hay créditos de impuestos aún',
        details: {
          title: 'Detalles unique {class}',
          frozen: 'Frozen',
          active: 'Active'

        },
        labels: {
          attributeLabel: 'Atributo',
          isFile: 'Cargar Archivo'

        },
        placeholders: {
          label: 'Etiqueta',
          value: 'Valor'
        },
        buttons: {
          addAttribute: 'Añadir atributo',
          createUnique: 'Crear unique',
          removeAttribute: 'Eliminar atributo'
        },
        messages: {
          uniqueCreated: 'Unique creado'
        }
      }
    }
  }
}
