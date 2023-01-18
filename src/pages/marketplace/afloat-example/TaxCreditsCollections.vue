<template lang='pug'>
#container
  #title.text-h4 {{$t('pages.marketplace.taxCredits.details.afloatCollectionTitle')}}
  q-chip(
    v-if="collectionData?.collectionInfo"
    :color="collectionData.collectionInfo.isFrozen ? 'secondary' : 'primary'"
    :label="collectionData.collectionInfo.isFrozen ? $t('pages.marketplace.taxCredits.details.frozen') : $t('pages.marketplace.taxCredits.details.active')"
    ).text-white.text-bold
  .row.justify-between.q-col-gutter-md
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.owner')}}
        AccountItem(
          v-if="collectionData?.collectionInfo"
          :address="collectionData.collectionInfo.owner"
          :label="$t('pages.marketplace.taxCredits.details.admin')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.administrator')}}
        AccountItem(
          v-if="collectionData?.collectionInfo"
          :address="collectionData.collectionInfo.admin"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{ $t('pages.marketplace.taxCredits.details.numberItems') }}
        div(v-if="collectionData?.collectionInfo") {{ collectionData.collectionInfo.items }}
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.issuer')}}
        AccountItem(
          v-if="collectionData?.collectionInfo"
          :address="collectionData.collectionInfo.issuer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.freezer')}}
        AccountItem(
          v-if="collectionData?.collectionInfo"
          :address="collectionData.collectionInfo.freezer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
  #Attributes
    .row.q-gutter-md
      q-btn.q-mt-md(
        :label="$t('pages.nfts.createTaxCredit')"
        color="primary"
        outline
        no-caps
        @click="onCreateNFT"
      )
      q-btn.q-mt-md(
        :label="'Invite to collaborate'"
        color="primary"
        outline
        no-caps
        @click="() => {dialog.show = true}"
      )
      q-dialog(v-model="dialog.show")
        q-card
          q-card-section
            q-form(ref="inviteOffer" @submit="onInviteCollaborator")
              .row.q-col-gutter-md
                .col-12.text-h6 Invite a user to become a collaborator in the collection
                AccountInput.col-12(
                  v-model="dialog.account"
                  label="Account to become a collaborator"
                  outlined
                  :rules="[rules.isValidPolkadotAddress]"
                )
              q-btn.q-pt-md(
                type="submit"
                label="Submit"
                block
                color="primary"
                no-caps
              )
    NFTTree.q-pt-md(
      :uniquesList="getNFTs"
      :isTaxCredit="true"
      @onClickRow="onClickNFT"
    )

</template>
<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import AccountInput from '~/components/common/account-input.vue'
import NFTTree from '~/components/marketplace/NFTs/NFT-tree.vue'
import OfferForm from '~/components/marketplace/collections/OfferForm.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'TaxCreditsCollections',
  components: {
    AccountItem,
    NFTTree,
    OfferForm
  },
  mixins: [validation],
  data () {
    return {
      collectionData: [],
      uniques: [],
      marketOptions: undefined,
      dialog: {
        show: false,
        account: undefined
      }
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress']),
    getNFTs () {
      const filtered = this.uniques.filter(unique => unique.parent === null)
      return filtered
    }
  },
  async beforeMount () {
    await this.loadCollectionInfo()
    // await this.loadMarketplaceInfo()
  },
  methods: {
    // async loadMarketplaceInfo () {
    //   try {
    //     const marketId = process.env.GATED_MARKETPLACE_ID
    //     const market = await this.$store.$marketplaceApi.getMarketplaceById({
    //       marketId
    //     }) || {}
    //     this.marketOptions = [
    //       {
    //         label: market?.label,
    //         description: market?.fee,
    //         value: marketId
    //       }
    //     ]
    //   } catch (error) {
    //     this.handlerError(error)
    //   }
    // },
    async onInviteCollaborator () {
      try {
        await this.$store.$afloatApi.inviteCollaboratorCollection({
          classId: process.env.AFLOAT_COLLECTION_ID || '0',
          invitee: this.dialog.account
        })
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
        this.dialog.show = false
      }
    },
    async loadCollectionInfo () {
      const classId = process.env.AFLOAT_COLLECTION_ID || '0'
      try {
        this.showLoading({ message: this.$t('pages.nfts.loadingUniques') })
        const collectionInfo = await this.$store.$afloatApi.getAsset({
          collectionId: classId,
          instanceId: 0
        })
        if (!collectionInfo?.attributes || !collectionInfo?.metadata) {
          throw new Error('The collection does not exist')
        }
        this.collectionData = collectionInfo
        await this.getNFTInfo(classId)
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    },
    async getNFTInfo (classId) {
      try {
        const offers = await this.$store.$afloatApi.getOffersByCollection({ collectionId: classId })
        const uniques = await this.$store.$afloatApi.getInstancesFromCollection({
          collectionId: classId
        })
        this.uniques = uniques.map((unique, i) => {
          const onSale = offers.find(offer => offer.instance === unique.instance)
          return {
            ...unique,
            onSale: onSale?.offerId ? onSale : undefined
          }
        })
      } catch (e) {
        this.handlerError(e)
      }
    },
    onClickNFT (i) {
      const classId = '0'
      this.$router.push({
        name: 'taxCreditDetails',
        query: {
          classId,
          instanceId: i
        }
      })
    },
    onCreateNFT () {
      this.$router.push({
        name: 'createTaxCredit',
        query: {
          classId: this.$route.query?.classId
        }
      })
    }
    // onOpenModal ({ collectionId, itemId, showMarket, weight }) {
    //   this.dialog.collectionId = collectionId
    //   this.dialog.instanceId = itemId
    //   this.dialog.openModal = true
    //   this.dialog.showMarketSelector = showMarket
    //   this.dialog.text = showMarket ? 'Create an offer for your tax credit' : 'Propose an offer'
    //   this.dialog.maxWeight = weight
    // },
    // async onCreateOffer ({ collectionId, itemId, offer, marketplace, percentage }) {
    //   if (marketplace) {
    //     await this.onEnlistSellOffer({ collectionId, itemId, offer, marketplace, percentage })
    //   }
    //   await this.onEnlistBuyOffer({ collectionId, itemId, offer, percentage })
    // },
    // async onEnlistSellOffer ({ collectionId, itemId, offer, marketplace, percentage }) {
    //   const classId = this.$route.query?.classId
    //   this.dialog.openModal = false
    //   try {
    //     const marketplaceId = marketplace
    //     const user = this.polkadotAddress

    //     await this.$store.$afloatApi.enlistSellOffer({
    //       user,
    //       marketplaceId,
    //       collectionId,
    //       itemId,
    //       price: offer,
    //       percentage
    //     })
    //     this.showNotification({ message: 'Created the offer successfully' })
    //     await this.getNFTInfo(classId)
    //   } catch (error) {
    //     this.showNotification({ message: error.message || error, color: 'negative' })
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    // async onEnlistBuyOffer ({ collectionId, itemId, offer, percentage }) {
    //   const classId = this.$route.query?.classId
    //   this.dialog.openModal = false
    //   try {
    //     const marketplaceId = '0x8260bdcc3438d65fad38db474477ef3ba6ef8038a6d50161888885c7e90f4565'

    //     await this.$store.$afloatApi.enlistBuyOffer({
    //       marketplaceId,
    //       collectionId,
    //       itemId,
    //       price: offer,
    //       percentage
    //     })
    //     this.showNotification({ message: 'Created the buy offer successfully' })
    //     await this.getNFTInfo(classId)
    //   } catch (error) {
    //     this.showNotification({ message: error.message || error, color: 'negative' })
    //   } finally {
    //     this.hideLoading()
    //   }
    // }
    // async onDeleteOffer ({ offerId }) {
    //   const classId = this.$route.query?.classId
    //   try {
    //     await this.$store.$afloatApi.removeOffer({
    //       offerId
    //     })
    //     this.showNotification({ message: 'The offer was deleted' })
    //     await this.getNFTInfo(classId)
    //   } catch (error) {
    //     this.showNotification({ message: error.message || error, color: 'negative' })
    //   } finally {
    //     this.hideLoading()
    //   }
    // }
  }
}
</script>
<style lang='stylus' scoped>

</style>
