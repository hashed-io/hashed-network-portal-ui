<template lang='pug'>
#container
  q-card
    q-card-section
      .row.justify-start
        h-input.col-4(
          label="Search Tax Credit"
          v-model="filter"
          outlined
          dense
          testid="search-input"
          debounce="400"
        )
    q-card-section
      .row.justify-center.full-width.items-center
        .col-4.q-pl-lg.text-subtitle2 Tax Credit
        .col-4.q-pl-lg.text-subtitle2 Creator
        .col-4.q-px-md.text-subtitle2
          .row.q-gutter-md.justify-center
            div {{ isTaxCredit ? 'Tax credit Information' : 'NFT Information' }}
      q-tree(
        v-model:selected="selected"
        :nodes="getUniqueList"
        node-key="instance"
        label-key="data"
        children-key="children"
        no-transition
        no-selection-unset
        icon="arrow_forward_ios"
        selected-color="green"
        :filter="filter"
        :filter-method="getTaxCredit"
        @lazy-load="onLazyLoad"
      )
        template(v-slot:default-header="prop")
          .row.justify-between.full-width.items-center
            .col-4(data-testid="node")
              q-chip.text-white.text-bold(
                color="primary"
                data-testid="nft-name"
                ) {{prop.node.data || prop.node.metadata}}
            AccountItem.col-4(
              inherit
              flat
              shortDisplay
              :address="prop.node.owner"
              :label="$t('pages.marketplace.taxCredits.details.user')"
              data-testid="account-icon"
            )
            .col-4
              .row.q-gutter-md.justify-start
                q-chip.text-white(
                  v-if="!prop.node.onSale"
                  :label="$t('pages.nfts.notForSale')"
                  color="blue"
                  :ripple="false"
                  data-testid="not-on-sale-chip"
                )
                q-chip.text-white(
                  v-if="prop.node.onSale"
                  :label="$t('pages.nfts.forSale')"
                  color="green"
                  :ripple="false"
                  data-testid="on-sale-chip"
                )
                q-icon.q-pt-xs(
                  v-if="prop.node.approved"
                  name="verified_user"
                  color="blue"
                )
                  q-tooltip Tax credit verified
                q-chip.text-white.q-pt-xs(
                  v-if="prop.node.frozen"
                  color="info"
                  label="Frozen"
                )
                q-chip.text-white(
                  :label="getPercentageLabel(prop.node)"
                  color="purple"
                  :ripple="false"
                  data-testid="percent_available"
                )
                q-chip.text-white.q-pt-xs(
                  v-if="prop.node.askingForRedemption && (isAdmin || isOwner(prop.node.owner))"
                  color="red"
                  label="Asking for Redemption"
                )
                q-chip.text-white.q-pt-xs(
                  v-if="prop.node.redeemed"
                  color="secondary"
                  label="Redeemed"
                )
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
import { mapGetters } from 'vuex'
import { OfferType } from '~/const'
import { uniques } from '@polkadot/types/interfaces/definitions'
import { onMounted } from 'vue'
export default {
  name: 'NFTTree',
  components: {
    AccountItem
  },
  props: {
    uniquesList: {
      type: Array,
      default: () => [{
        collection: '0',
        instance: '0',
        owner: undefined,
        approved: null,
        frozen: false,
        onSale: false
      }]
    },
    isTaxCredit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onClickRow', 'onClickDeleteOffer', 'onClickEnlistSellOffer', 'onClickEnlistBuyOffer'],
  data () {
    return {
      offerType: OfferType,
      selected: 'initial',
      filter: undefined,
      adminInfo: undefined,
      redemptionsIds: []
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress']),
    getUniqueList: {
      get () {
        return this.uniquesList.map((unique, i) => {
          const { children } = unique || {}
          const { parent } = unique || {}
          if (!parent) {
            unique.lazy = true
          }
          if (children) {
            unique.children.lazy = true
          }
          return unique
        })
      },
      set () {

      }
    },
    isAdmin () {
      return this.polkadotAddress === this.adminInfo?.address
    }
  },
  watch: {
    selected (newSelected, prevSelected) {
      this.onClickRow(newSelected)
    }
  },
  async mounted () {
    await this.getAdminMarket()
  },
  methods: {
    isOwner (nodeOwner) {
      return this.polkadotAddress === nodeOwner
    },
    async getAdminMarket () {
      const adminType = 'Admin'
      try {
        const response = await this.$store?.$afloatApi?.getAuthoritiesByMarketplace({
          marketId: process.env.GATED_MARKETPLACE_ID,
          palletId: process.env.GATED_PALLET_ID
        })
        const adminInfo = response?.find(authority => authority.type === adminType)
        this.adminInfo = adminInfo || undefined
      } catch (error) {
        this.handlerError(error)
      } finally {
        this.hideLoading()
      }
    },
    onClickRow (index) {
      this.$emit('onClickRow', index)
    },
    isOnSale (obj) {
      return JSON.stringify(obj) !== '{}'
    },
    async onLazyLoad ({ node, key, done, fail }) {
      try {
        const { children } = node || {}

        if (!children) { done() }
        if (this.redemptionsIds.length === 0) {
          await this.getRedemptionsRequested()
        }
        const childrenPromises = []
        const childrenInfoPromises = []
        const childrenOffersPromises = []
        children.forEach(child => {
          const { collectionId, childId: classId } = child || {}
          childrenPromises.push(
            this.getFruniqueInfo({ collectionId, classId })
          )
          childrenInfoPromises.push(
            this.getUniqueInfo({ collectionId, classId })
          )
          childrenOffersPromises.push(
            this.$store.$afloatApi?.getOffersByItem({ collectionId, classId })
          )
        })
        const resolvedChildren = await Promise.all(childrenPromises)
        const resolvedChildrenInfo = await Promise.all(childrenInfoPromises)
        const resolvedChildrenOffers = await Promise.all(childrenOffersPromises)

        const dataChild = children.map((child, i) => {
          const { collectionId, childId: classId } = child || {}
          const instance = child?.childId
          const inRedemptionArray = this.redemptionsIds.find(el => {
            const { itemId, isRedeemed } = el || {}
            return itemId === instance && !isRedeemed
          })
          return {
            collection: collectionId,
            instance: classId,
            ...resolvedChildren[i],
            ...resolvedChildrenInfo[i],
            onSale: resolvedChildrenOffers[i].length > 0 ? { data: true } : undefined,
            // TODO: Delete when the backend is already [Only redeem]
            // redeem: true,
            data: resolvedChildren[i]?.metadata + ' ' + classId,
            askingForRedemption: !!inRedemptionArray,
            lazy: true
          }
        })
        done([...dataChild])
      } catch (error) {
        this.handlerError(error)
        fail(error)
      }
    },
    async getFruniqueInfo ({ collectionId, classId }) {
      let fruniqueInfo
      try {
        fruniqueInfo = this.$store.$afloatApi?.getFruniqueInfoByClass({
          collectionId,
          classId
        })
      } catch (error) {
        this.handlerError(error)
      } finally {
        this.hideLoading()
      }
      return fruniqueInfo
    },
    async getUniqueInfo ({ collectionId, classId }) {
      let uniqueInfo
      try {
        uniqueInfo = this.$store.$afloatApi?.getAssetInfo({
          collectionId,
          classId
        })
      } catch (error) {
        this.handlerError(error)
      } finally {
        this.hideLoading()
      }
      return uniqueInfo
    },
    getPercentageLabel (node) {
      const message = 'Available: '
      const { parent, weight } = node || {}
      if (parent === null) {
        return message + node.weight
      }
      const { parentWeight } = parent || {}
      return message + weight + ' of parent\'s ' + parentWeight
    },
    getTaxCredit (node, filter) {
      const filt = filter.toLowerCase()
      return node.data && node.data.toLowerCase().indexOf(filt) > -1
    },
    async getRedemptionsRequested () {
      const collectionId = process.env.AFLOAT_COLLECTION_ID || '0'
      try {
        const response = await this.$store.$afloatApi?.askingForRedemption({
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
