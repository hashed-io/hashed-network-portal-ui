<template lang='pug'>
#container
  #title.text-h4 {{$t('pages.marketplace.taxCredits.details.collectionTitle', { class: this.collectionData.metadata })}}
  q-chip(
    :color="collectionData.isFrozen ? 'secondary' : 'primary'"
    :label="collectionData.isFrozen ? $t('pages.marketplace.taxCredits.details.frozen') : $t('pages.marketplace.taxCredits.details.active')"
    ).text-white.text-bold
  .row.justify-between.q-col-gutter-md
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.owner')}}
        AccountItem(
          :address="collectionData.owner"
          :label="$t('pages.marketplace.taxCredits.details.admin')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.administrator')}}
        AccountItem(
          :address="collectionData.admin"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{ $t('pages.marketplace.taxCredits.details.numberItems') }}
        div {{ collectionData.items }}
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.issuer')}}
        AccountItem(
          :address="collectionData.issuer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.freezer')}}
        AccountItem(
          :address="collectionData.freezer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm.text-right
        .text-subtitle2 {{ $t('pages.marketplace.taxCredits.details.numberMetadata') }}
        div {{ collectionData.itemMetadatas }}
  #Attributes
    q-btn.q-mt-md(
      :label="$t('pages.nfts.createNFT')"
      color="primary"
      outline
      no-caps
      @click="onCreateNFT"
    )
    NFTTable(
      :uniquesList="getNFTs"
      @onClickRow="onClickNFT"
      @onClickDeleteOffer="onDeleteOffer"
      @onClickEnlistSellOffer="onOpenModal"
    )
    q-dialog(v-model="dialog.openModal")
      OfferForm(
        :collectionId="dialog.collectionId"
        :instanceId="dialog.instanceId"
        :maxWeight="'100.00%'"
        :marketOptions="marketOptions"
        @onSubmitForm="onEnlistOffer"
      )
</template>
<script>
import { mapGetters } from 'vuex'
import AccountItem from '~/components/common/account-item.vue'
import NFTTable from '~/components/marketplace/NFTs/NFT-table.vue'
import OfferForm from '~/components/marketplace/collections/OfferForm.vue'
export default {
  name: 'DetailsCollectionPage',
  components: {
    AccountItem,
    NFTTable,
    OfferForm
  },
  data () {
    return {
      collectionData: [],
      uniques: [],
      marketOptions: undefined,
      dialog: {
        openModal: false,
        collectionId: undefined,
        itemId: undefined,
        offerInput: undefined
      }
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress']),
    getNFTs () {
      return this.uniques
    }
  },
  async beforeMount () {
    await this.loadCollectionInfo()
    await this.loadMarketplacesInfo()
  },
  methods: {
    async loadMarketplacesInfo () {
      try {
        const allMarketplaces = await this.$store.$marketplaceApi.getAllMarketplaces({
          startKey: undefined,
          pageSize: undefined
        })
        this.marketOptions = allMarketplaces.map(market => {
          const { value, id } = market || {}
          return { label: value?.label, value: id }
        })
      } catch (e) {
        this.handlerError(e)
      }
    },
    async loadCollectionInfo () {
      const classId = this.$route.query?.classId
      if (classId) {
        try {
          this.showLoading({ message: this.$t('pages.nfts.loadingUniques') })
          const collectionInfo = await this.$store.$afloatApi.getAsset({
            collectionId: classId,
            instanceId: 0
          })
          this.collectionData = collectionInfo
          await this.getNFTInfo(classId)
        } catch (e) {
          this.handlerError(e)
        } finally {
          this.hideLoading()
        }
      } else {
        this.$router.push({
          name: 'NFTs'
        })
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
      const classId = this.$route.query?.classId
      this.$router.push({
        name: 'NFTDetails',
        query: {
          classId,
          instanceId: i
        }
      })
    },
    onCreateNFT () {
      this.$router.push({
        name: 'NFTCreate',
        query: {
          classId: this.$route.query?.classId
        }
      })
    },
    onOpenModal ({ collectionId, itemId }) {
      this.dialog.collectionId = collectionId
      this.dialog.instanceId = itemId
      this.dialog.openModal = true
    },
    async onEnlistOffer ({ collectionId, itemId, offer, percentage }) {
      const classId = this.$route.query?.classId
      this.dialog.openModal = false
      try {
        const marketplaceId = process.env.GATED_MARKETPLACE_ID
        const user = this.polkadotAddress
        alert(percentage)
        await this.$store.$afloatApi.enlistSellOffer({
          user,
          marketplaceId,
          collectionId,
          itemId,
          price: offer,
          percentage
        })
        this.showNotification({ message: 'Created the offer successfully' })
        await this.getNFTInfo(classId)
      } catch (error) {
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    async onDeleteOffer ({ offerId }) {
      const classId = this.$route.query?.classId
      try {
        await this.$store.$afloatApi.removeOffer({
          offerId
        })
        this.showNotification({ message: 'The offer was deleted' })
        await this.getNFTInfo(classId)
      } catch (error) {
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
