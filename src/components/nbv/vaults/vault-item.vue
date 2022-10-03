<template lang="pug">
q-card.q-pa-sm(@click="goToVaultDetails")
  q-item
    q-item-section.q-gutter-y-xs
      .title.text-subtitle2.text-overline {{ description }}
      .row.items-center
        q-icon.q-mr-md(name="people" size="sm" color="secondary")
        .span.text-body2 {{ `${threshold} of ${cosigners.length} Multisignature Vault` }}
        //- .text-subtitle2 {{ $t('pages.nbv.vaults.threshold') }}:
        //-   span.text-body2.q-ml-sm {{ threshold }}:
      .text-subtitle2 {{ $t('pages.nbv.vaults.owner') }}:
      account-item.full-width(:address="owner" flat inherit)
    q-item-section.gt-sm(avatar)
      .text-subtitle2.text-primary.hoverView {{ $t('pages.nbv.vaults.clickToSeeDetails') }}
</template>

<script>
import { AccountItem } from '~/components/common'

/**
 * This component show vault item info
 */
export default {
  name: 'VaultItem',
  components: { AccountItem },
  props: {
    /**
     * Vault Id
     */
    vaultId: {
      type: String,
      default: undefined
    },
    /**
     * Array of vault cosigners (address values)
     */
    cosigners: {
      type: Array,
      default: () => []
    },
    /**
     * Vault Description
     */
    description: {
      type: String,
      default: undefined
    },
    /**
     * Vault Descriptor
     */
    descriptors: {
      type: Object,
      default: () => {}
    },
    /**
     * Vault Owner
     */
    owner: {
      type: String,
      default: undefined
    },
    /**
     * Vault Threshold
     */
    threshold: {
      type: [String, Number],
      default: undefined
    },
    /**
     * Offchain Statis
     */
    offchainStatus: {
      type: [Object, String],
      default: () => undefined
    }
  },
  methods: {
    goToVaultDetails () {
      const vault = {
        vaultId: this.vaultId,
        cosigners: this.cosigners,
        description: this.description,
        descriptors: this.descriptors,
        outputDescriptor: this.descriptors.outputDescriptor,
        changeDescriptor: this.descriptors.changeDescriptor,
        owner: this.owner,
        threshold: this.threshold,
        offchainStatus: this.offchainStatus
      }
      this.$router.push({
        name: 'vaultDetails',
        params: { vault: JSON.stringify(vault) }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hoverView
  display: none

.animated-item:hover .hoverView
  display: block

.title
  font-size: 20px
</style>
