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
      redemptionsIds: [],
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
      return this.uniques.map(unique => {
        const instance = unique?.instance
        const inRedemptionArray = this.redemptionsIds.find(el => {
          return el === instance
        })
        return {
          ...unique,
          data: unique?.data + ' ' + unique?.instance,
          // TODO: Delete the line below when the Backend is already
          redeem: false,
          askingForRedemption: !!inRedemptionArray
        }
      })
    }
  },
  async beforeMount () {
    await this.loadCollectionInfo()
    await this.getRedemptionsRequested()
  },
  methods: {
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

        const uniques = await this.$store.$afloatApi.getFruniqueRoots({
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
    },
    async getRedemptionsRequested () {
      const collectionId = process.env.AFLOAT_COLLECTION_ID || '0'
      try {
        const response = await this.$store.$afloatApi.askingForRedemption({
          marketplaceId: process.env.GATED_MARKETPLACE_ID,
          collectionId
        })
        this.redemptionsIds = [...response]
      } catch (error) {
        this.handlerError(error)
      } finally {
        this.hideLoading()
      }
    }
  }
}

</script>
<style lang='stylus' scoped>

</style>
