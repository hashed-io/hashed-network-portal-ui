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
  login: {
    login: 'Iniciar Sesión',
    chooseAnAccount: 'Elija una cuenta de su extensión de polkadot',
    notHaveAccounts: 'ene cuentas en la exten',
    or: 'O',
    signinWithGoogle: 'Acceder con Google',
    logout: 'Cerrar sesión'
  },
  breadcrumb: {
    confidentialDocuments: 'Documentos confidenciales',
    NFTCollections: 'Colecciones NFT',
    detail: 'Detalles',
    create: 'create',
    marketplaces: 'Marketplaces',
    taxCredits: 'Créditos fiscales',
    proofOfReserves: 'Prueba de reservas',
    wallet: 'Cartera',
    members: 'Miembros'
  },
  layouts: {
    polkadotAddress: 'Dirección de Polkadot',
    logout: 'Salir'
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
      notEqual: 'El valor no debe ser igual al propietario',
      betweenString: 'El valor debe estar entre {min} y {max} caracteres',
      feeValid: 'La tarifa debe ser menor a {maxInPercent}%'
    }
  },
  pages: {
    hashed: {
      wallet: {
        wallet: 'Cartera',
        emptyVestingList: 'No se encontraron registros de vesting para Hashed',
        currentBlock: 'Bloque actual',
        hashPerBlock: 'HASH por bloque',
        contributions: 'Contribuciones',
        fund54: 'Fondo 54',
        fund58: 'Fondo 58',
        estimatedTime: 'Tiempo estimado para adquisición completa',
        vestedToDate: 'Adquirido hasta ahora',
        remainingToVest: 'Restante por adquirir',
        totalRewards: 'Recompensa total',
        baseRewards: 'Recompensa de base',
        bonus: 'Bonos'
      },
      members: {
        details: 'Detalles',
        hashRewardPerDot: 'Recompensa en HASH por cada DOT',
        secondTimeBonus: 'Bonos por segundo intento',
        blocksPerMinute: 'Bloques por minuto',
        blocksPerWeek: 'Bloques por semana',
        blocksForLease: 'Bloques a producir',
        filters: 'Filtros',
        search: 'Buscar',
        showEligibles: 'Mostrar solo direcciones elegibles para bonos',
        members: 'Miembros'
      }
    },
    nbv: {
      appName: 'Vaules de Bitcoin',
      mainOptions: {
        myVaults: 'Mis Baules',
        extendedKeys: 'Llaves extendidas'
      },
      breadcrumbs: {
        myVaults: 'Mis Baúles',
        vaultDetails: 'Detalles del Baúl',
        proposalDetails: 'Detalles de la propuesta',
        extendedKeys: 'Llaves extendidas'
      },
      xpub: {
        label: 'Label',
        publicKey: 'Llave Pública',
        labelDesc: 'Desactivado temporalmente',
        extendedPublicKeyInfo: 'Una clave pública extendida, o xpub, es una clave pública que puede utilizarse para derivar claves públicas secundarias como parte de un monedero determinista jerárquico (HD). Una clave pública extendida es un estándar de Bitcoin establecido por BIP 32 y se utiliza principalmente por un monedero entre bastidores para derivar claves públicas.',
        textInfo: 'Introduzca su clave pública ampliada escaneando el código QR de BlueWallet (lo más fácil) o a través del formulario de entrada.',
        textInfoHCD: 'Asociar XPUB generada por HCD.',
        masterFingerPrint: 'Huella dactilar principal',
        pubicKeyDesc: 'Por favor, inserte una clave pública extendida con el prefijo "Zpub"',
        fingerprintDesc: 'La huella digital de la clave extendida se define como los primeros 8 caracteres alfanuméricos',
        fingerprintTooltip: 'La huella digital de una clave pública se define en el BIP 32 como los 4 primeros bytes del hash RIPEMD160 del hash SHA256 de la clave pública.',
        derivationPath: 'Ruta de derivación',
        derivationPathDesc: 'Contiene información sobre la profundidad y el índice de una clave',
        xpubDesc: 'Por favor, pase o escanee su XPUB desde blue wallet',
        xpub: 'XPUB',
        xpubPlaceholder: 'Pegue o escriba su XPUB',
        managePublicKeys: 'Gestionar las claves públicas',
        removeYourXpub: 'Remueva su XPUB',
        setXpub: 'Establecer XPUB',
        useForm: 'Utilizar Formulario',
        yourXpubWasAdded: 'Tu XPUB fue añadido',
        yourXpubWasRemoved: 'Tu XPUB fue removido'
      },
      vaults: {
        manageVaults: 'Administrar Baules',
        descriptionLabel: 'Introduzca una etiqueta pública para este baúl',
        cosigners: 'Confirmantes',
        cosignersLabelDesc: 'Introduzca una dirección pública válida para cada cofirmante',
        mOfn: 'M of N',
        description: 'Descripción',
        owner: 'Propietario',
        threshold: 'Threshold',
        clickToSeeDetails: 'Click para ver detalles',
        createVault: 'Crear Baúl',
        createNewVault: 'Crear nuevo baúl',
        label: 'Etiqueta',
        accountAddress: 'Dirección de la cuenta',
        includeOwnerAsCosigner: 'Incluir al propietario como cofirmante',
        vaultCreated: 'Baúl creado',
        messageSignedAndVerified: 'Mensaje firmado y verificado',
        deleteVault: 'Borrar Baúl',
        vaultDetails: 'Detalles del Baúl',
        exportDescriptor: 'Exportar Descriptor',
        pending: 'Pendiente',
        vaultId: 'ID del Baúl',
        balance: 'Balance',
        receiveAddress: 'Dirección de recepción',
        getReceiveAddress: 'Obtener la dirección de recepción',
        refreshReceiveAddress: 'Actualizar la dirección de recepción',
        outputDescriptor: 'Descriptor de salida',
        vaultsBalanceMustBeGreaterThanZero: 'El balance de la baúl debe ser mayor que 0',
        descriptorQr: 'QR del descriptor',
        creatingDescriptor: 'Por favor, espere un momento, estamos creando el descriptor',
        accountDuplicated: 'Esta cuenta está duplicada'
      },
      proposals: {
        create_proposal: 'Crear una nueva propuesta',
        descriptionDesc: 'Escriba una breve descripción',
        recipientAddressDesc: 'Escribe una dirección BTC válida para enviar satoshis',
        amountDesc: 'Escriba la cantidad en satoshis',
        titleStep1: 'Exportar PSBT',
        titleStep2: 'Importar firma PSBT',
        titleStep3: 'Finalizar',
        signPsbtStep1: 'Por favor, escanee estos códigos qr en Blue wallet para firmar la transacción, debe utilizar la pantalla de transacciones de la bóveda',
        signPsbtStep2: 'Escanee los códigos qr que exportó desde Blue wallet después de firmar la transacción',
        signPsbtSaveDesc: 'Guarda tu psbt firmado',
        signPsbtFinalizeDesc: 'Completa la transacción, lista para emitir',
        signPsbtBroadcastDesc: 'Emitir la transacción',
        saveBtn: 'Guardar',
        finalizeBtn: 'Finalizar',
        broadcastBtn: 'Emitir',
        proposals: 'Propuestas',
        createProposal: 'Crear propuesta',
        updatingProposal: 'Actualizando Propuesta',
        proposalCreated: 'Propuesta Creada',
        proposalDetails: 'Detalles de la propuesta',
        signPSBT: 'Firmar PSBT (BW)',
        signPSBTUsingHCD: 'Firmar PSBT (HCD)',
        deleteProposal: 'Eliminar Propuesta',
        proposalId: 'Proposal Id',
        status: 'Status',
        satoshiAmount: 'Cantidad de Satoshi',
        feeInSatoshiPerVirtualByte: 'Tarifa en satoshi por byte virtual',
        toAddress: 'Para la dirección',
        tx: 'Tx',
        Proposer: 'Proponente',
        finalizeTxx: 'Finalizar Txx',
        broadcastTx: 'Broadcast Tx',
        finalizing: 'Finalizando',
        broadcasting: 'Broadcasting',
        pending: 'Pendiente',
        signThePsbtWithValidXPUB: 'Por favor, firme el PSBT con un XPUB válido',
        psbtSavedSuccessfully: 'PSBT guardado con éxito',
        creatingPSBT: 'Por favor, espere un momento, estamos creando el PSBT',
        description: 'Descripción',
        recipientAddress: 'Recipient address',
        amountInSatoshi: 'Cantidad en Satoshi',
        exitWithoutSave: 'Salir sin guardar',
        signPsbt: 'Firmar PSBT',
        signPsbtDescription: 'Click en continuar para firmar PSBT.',
        saveSignedPsbt: 'Guardar PSBT firmado',
        saveSignedPsbtDescription: 'Click en finalizar para guardar el PSBT firmado.'
        // signPsbtStep1: ''
      },
      list: {
        thereAreNotVaultsYet: 'Aun no hay baúles'
      },
      form: {
        vault: {
          createNewVault: 'Crear nuevo baúl'
        }
      },
      actions: {
        refresh: 'Actualizar',
        copyToClipboard: 'Copiar al portapapeles'
      }
    },
    marketplace: {
      appName: 'Mercados',
      marketplaceTitle: 'Marketplace',
      addMarketplaceButton: 'Añadir Marketplace',
      adminInput: 'El administrador del marketplace (Opcional)',
      mainOptions: {
        marketplaces: 'Mercados',
        marketplaceDetails: 'Detalles',
        custodian: 'Custodios',
        privacy: 'Privacidad',
        nftCollections: 'Colecciones NFT'
      },
      breadcrumbs: {
        marketplaces: 'Mercados',
        detail: 'Detalles',
        custodian: 'Custodios',
        privacy: 'Privacidad',
        create: 'Crear',
        afloat: 'Afloat Api ejemplo'
      },
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
        rejectButton: 'Rechazar',
        applicationWasSubmitted: 'La solicitud fue presentada',
        applicationApproved: 'La solicitud fue aprovada',
        applicationRejected: 'La solicitud fue rechazada'
      },
      offerTable: {
        createSellOffer: 'Crear oferta de venta',
        createBuyOffer: 'Crear oferta de compra'
      },
      applyForm: {
        title: 'Aplicar para unirse al marketplace',
        subtitle: 'Llena el formulario para aplicar a este marketplace. Cada archivo debe ser subido para ser compartido con el administrador del marketplace',
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
        feeLabel: 'Tarifa del Marketplace',
        placeholder: 'Escriba una descripción para el marketplace',
        feePlaceholder: 'Escriba la tarifa del marketplace',
        button: 'Crear una nueva tienda',
        marketplacecreatedSuccessfully: 'Mercado creado con éxito',
        loggedToCreate: 'Debe iniciar sesión para crear un mercado'
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
        title: 'Aplicantes',
        feedback: 'Feedback'
      },
      custodian: {
        gettingApplicationsWhereYouAreCustodian: 'Getting applications where you are custodian'
      },
      privacy: {
        title: 'Playground de solución de privacidad',
        uploadSection: {
          title: 'Subir archivo',
          fileInput: 'Seleccionar archivo',
          custodian: 'Dirección del custodio',
          shareFile: 'Compartir archivo con otra dirección',
          noFileToOpen: 'No hay archivo para abrir'
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
      list: {
        youDontHaveMarketplacesYet: 'Aún no tiene mercados',
        marketplacesHaveNotYetBeenCreated: 'Todavía no se han creado mercados'
      },
      actions: {
        loggedDownloadFile: 'Debe iniciar sesión para descargar un archivo'
      },
      taxCredits: {
        createCollectionFormTitle: 'Crear nueva Colección',
        createNFTFormTitle: 'Crear nuevo unique',
        title: 'Lista de NFT',
        emptyList: 'No hay NFT aún',
        emptyCollectionList: 'No hay colecciones aún',
        details: {
          collectionTitle: 'Detalles de la colección {class}',
          afloatCollectionTitle: 'Créditos fiscales de Afloat',
          NFTTitle: 'Detalles unique {class}',
          admin: 'Administrador',
          user: 'Usuario',
          frozen: 'Congelado',
          active: 'Activo',
          attribute: 'Atributo',
          value: 'Valor',
          file: 'Archivo',
          downloading: 'Descargando archivo',
          numberItems: 'Número de elementos',
          numberMetadata: 'Número de metadatos'
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
          removeAttribute: 'Eliminar atributo',
          createCollection: 'Create collection'
        },
        messages: {
          uniqueCreated: 'Unique creado'
        }
      }
    },
    collections: {
      loadingCollections: 'Cargando las colecciones...',
      element: {
        title: 'Colecciones',
        input: 'Nombre de la colección'
      }
    },
    nfts: {
      loadingUniques: 'Cargando los NFTs...',
      createNFT: 'Crear un nuevo NFT',
      createTaxCredit: 'Crear un nuevo crédito fiscal',
      deleteOffer: 'Eliminar oferta',
      enlistOffer: 'Enlistar oferta',
      details: 'Detalles del NFT',
      detailsTaxCredit: 'Detalles del crédito fiscal',
      sellingLabel: 'Ingresa el precio de venta del NFT',
      forSale: 'En venta',
      notForSale: 'No en venta',
      submitOffer: 'Enviar oferta',
      element: {
        title: 'Único',
        taxCreditTitle: 'Crédito fiscal',
        owner: 'Propietario',
        issuer: 'Editor'
      }
    },
    hcd: {
      documents: {
        addDocument: 'Añadir documento',
        myDocuments: 'Mis documentos',
        mySharedDocuments: 'Mis documentos compartidos',
        sharedWithMe: 'Compartidos conmigo',
        name: 'Nombre',
        description: 'Descripción',
        file: 'Archivo',
        shareWithOtherUser: 'Compartir con otro usuario',
        polkadotAddressToShare: 'Direccion de polkadot a la que se compartira',
        saveDocument: 'Guardar documento',
        shareDocument: 'Compartir documento',
        editDocumentMetadata: 'Editar el matadata del documento',
        thereAreNotDocumentsYet: 'Aun no hay documentos',
        from: 'De',
        to: 'Para',
        downloadFile: 'Descargar archivo',
        editMetadata: 'Editar metadata',
        remove: 'Remover',
        loadingMessage: 'Esperando la respuesta de documentos confidenciales',
        successSharedMessage: 'Documento compartido exitosamente.',
        successEditedMetadataMessage: 'Metadata fue editada exitosamente.',
        successRemovedMessage: 'Documento removido exitosamente.',
        successAddedMessage: 'Documento agregado exitosamente.',
        documents: 'Documentos'
      }
    },
    sign: {
      appName: 'Prueba de Firma'
    }
  }
}
