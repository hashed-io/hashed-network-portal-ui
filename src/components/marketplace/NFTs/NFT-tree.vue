<template lang='pug'>
#container
  q-card
    q-card-section
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
        @lazy-load="onLazyLoad"
      )
        template(v-slot:default-header="prop")
          .row.justify-between.full-width.items-center
            .col-4
              q-chip.text-white.text-bold(
                color="primary"
                data-testid="nft-name"
                ) {{$t('pages.nfts.element.taxCreditTitle')}} {{prop.node.instance}} {{prop.node.data || prop.node.metadata}}
            AccountItem.col-4(
              inherit
              flat
              shortDisplay
              :address="prop.node.owner"
              :label="$t('pages.marketplace.taxCredits.details.user')"
              data-testid="account-icon"
            )
            .col-4(v-if="isOnSale(prop.node.onSale)" )
              .row.q-gutter-md.justify-between
                q-chip.text-white(
                  v-if="!prop.node.onSale"
                  label="Not On Sale"
                  color="blue"
                  :ripple="false"
                  data-testid="not-on-sale-chip"
                )
                q-chip.text-white(
                  v-if="prop.node.onSale"
                  label="On Sale"
                  color="green"
                  :ripple="false"
                  data-testid="on-sale-chip"
                )
                q-icon.q-pt-xs(
                  v-if="prop.node.aproved"
                  name="verified_user"
                  color="blue"
                )
                  q-tooltip Tax credit verified
                q-chip.text-white(
                  :label="getPercentageLabel(prop.node)"
                  color="purple"
                  :ripple="false"
                  data-testid="percent_available"
                )
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
import { mapGetters } from 'vuex'
import { OfferType } from '~/const'
import { uniques } from '@polkadot/types/interfaces/definitions'
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
        isFrozen: false,
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
      selected: 'California Port Volume'
    }
  },
  computed: {
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
    }
  },
  watch: {
    selected (newSelected, prevSelected) {
      this.onClickRow(newSelected)
    }
  },
  methods: {
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
            this.$store.$afloatApi.getOffersByItem({ collectionId, classId })
          )
        })
        const resolvedChildren = await Promise.all(childrenPromises)
        const resolvedChildrenInfo = await Promise.all(childrenInfoPromises)
        const resolvedChildrenOffers = await Promise.all(childrenOffersPromises)

        const dataChild = children.map((child, i) => {
          const { collectionId, childId: classId } = child || {}
          return {
            collection: collectionId,
            instance: classId,
            ...resolvedChildren[i],
            ...resolvedChildrenInfo[i],
            onSale: resolvedChildrenOffers[i].length > 0 ? { data: true } : undefined,
            lazy: true
          }
        })
        done([...dataChild])
      } catch (error) {
        this.handlerError(error)
      }
    },
    async getFruniqueInfo ({ collectionId, classId }) {
      let fruniqueInfo
      try {
        fruniqueInfo = this.$store.$afloatApi.getFruniqueInfoByClass({
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
        uniqueInfo = this.$store.$afloatApi.getAssetInfo({
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
      return message + weight + ' of ' + parentWeight + ' parent'
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
