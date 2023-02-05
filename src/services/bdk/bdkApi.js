import axios from 'axios'

class BdkApi {
  constructor (baseUrl) {
    this.baseUrl = baseUrl || process.env.BDK_SERVICES_URL
    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * @name getMultisig
   * @description Get Multisig Wallet from the an output descriptor
   * @param {String} descriptor Output descriptor
   */
  async getMultisig ({ descriptor }) {
    try {
      const { data } = await this.request.post('/get_multisig', {
        descriptor
      })
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @description Generate an address for an output descriptor.
   * @param {String} descriptor Output descriptor
   */
  async getNewAddress ({ descriptor }) {
    try {
      const { data } = await this.request.post('/gen_new_address', {
        descriptor
      })
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @description Get balance
   * @param {String} descriptor Get Balance in sats for a wallets output descriptor
   * @param {String} changeDescriptor Change descriptor
   */
  async getBalance ({ descriptor, changeDescriptor }) {
    try {
      const { data } = await this.request.post('/get_balance', {
        descriptor,
        change_descriptor: changeDescriptor
      })
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @description Gets a list of xpubs who signed a psbt, the psbt and wallet descriptors should be provided
   * @param {String} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @param {String} psbt Change descriptor
   */
  async getListSigner ({ descriptors, psbt }) {
    try {
      const { data } = await this.request.post('/list_signers', {
        descriptors,
        psbt
      })
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * @name generatePSBT
   * @description Generate a PSBT from the output descriptors and transaction details, it returns a base64 encoded psbt
   * @param {Object} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @returns PSBT in string format
   */
  async generatePSBT ({ descriptors, toAddress, amount, feeSatPerVb }) {
    return this.request.post('/gen_psbt', {
      descriptors,
      to_address: toAddress,
      amount,
      fee_sat_per_vb: feeSatPerVb
    })
  }

  /**
   * @name finalizeTransaction
   * @param {Object} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @param {Array} psbts Array of psbt in text format
   * @returns Transaction Id
   */
  async finalizeTransaction ({ descriptors, psbts }) {
    return this.request.post('/finalize_trx', {
      descriptors,
      psbts
    })
  }

  /**
   * @name createProofOfReserves
   * @description Generates a non spendable PSBT that serves as proof of reserves for the specified vault
   * @param {Object} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @param {Array} psbts Array of psbt in text format
   * @returns Transaction Id
   */
  async createProofOfReserves ({ descriptors, message }) {
    return this.request.post('/create_proof', {
      descriptors,
      message
    })
  }

  /**
   * @name finalizeProofOfReserves
   * @description Takes in the signed proof of reserves by the vault owners and finalizes the proof which can then be verified
   * @param {Object} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @param {Array} psbts Array of psbt in text format
   * @returns Transaction Id
   */
  async finalizeProofOfReserves ({ descriptors, psbts }) {
    return this.request.post('/finalize_proof', {
      descriptors,
      psbts
    })
  }

  /**
   * @name verifyProofOfReserves
   * @description Takes in the finalized proof of reserves validates it and returns the amount contained in the vault
   * @param {Object} descriptors Descriptors - the psbt and wallet descriptors should be provided
   * @param {Array} psbts Array of psbt in text format
   * @returns Transaction Id
   */
  async verifyProofOfReserves ({ descriptors, message, psbt }) {
    return this.request.post('/verify_proof', {
      descriptors,
      message,
      psbt
    })
  }

  /**
   * @name getListTransactions
   * @description Gets a list of transactions for an output descriptor.
   * @param {Object} descriptor Descriptors - the psbt and wallet descriptors should be provided
   * @returns List of transactions
   */
  async getListTransactions ({ descriptors, message, psbt }) {
    return this.request.post('/list_trxs', {
      descriptors,
      message,
      psbt
    })
  }
}

export default BdkApi
