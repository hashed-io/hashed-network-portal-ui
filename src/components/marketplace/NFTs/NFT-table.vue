<template lang='pug'>
#container
  q-table(
    :rows="uniquesList"
    :columns="columns"
    class="bg-white"
    :separator="'none'"
  ).q-my-xl
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td.cursor-pointer(key="instance" :props="props" @click="onClickRow(props.rowIndex)")
          q-chip.text-white.text-bold(
            color="primary"
            data-testid="nft-name"
            ) {{isTaxCredit ? $t('pages.nfts.element.taxCreditTitle') : $t('pages.nfts.element.title')}} {{props.row.instance}} {{props.row.data}}

        q-td.cursor-pointer(key="owner" :props="props" @click="onClickRow(props.rowIndex)")
          AccountItem(
            inherit
            flat
            shortDisplay
            :address="props.row.owner"
            :label="$t('pages.marketplace.taxCredits.details.user')"
            data-testid="account-icon"
          )
        q-td(key="onSale" :props="props")
          div(v-if="isOnSale(props.row.onSale)" )
            q-chip.text-white(
              v-if="!props.row.onSale"
              :label="$t('pages.nfts.notForSale')"
              color="blue"
              :ripple="false"
              data-testid="not-on-sale-chip"
            )
            q-chip.text-white(
              v-if="props.row.onSale"
              :label="$t('pages.nfts.forSale')"
              color="green"
              :ripple="false"
              data-testid="on-sale-chip"
            )
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
import { mapGetters } from 'vuex'
import { OfferType } from '~/const'
export default {
  name: 'NFTTable',
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
      columns: [
        {
          name: 'instance',
          label: 'Instance',
          value: 'instance',
          field: row => row.instance,
          align: 'left'
        },
        {
          name: 'owner',
          label: 'Owner',
          field: row => row.owner,
          value: 'owner',
          align: 'justify'
        },
        {
          name: 'onSale',
          label: 'On Sale',
          field: row => row.onSale,
          value: 'onSale',
          align: 'justify'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress'])
  },
  methods: {
    onClickRow (index) {
      this.$emit('onClickRow', this.uniquesList[index].instance)
    },
    isOwner (owner) {
      return owner === this.polkadotAddress
    },
    onEnlistOffer ({ collection, instance, weight }) {
      this.$emit('onClickEnlistSellOffer', { collectionId: collection, itemId: instance, showMarket: true, weight })
    },
    onDeleteOffer ({ onSale, collection, instance }) {
      this.$emit('onClickDeleteOffer', { offerId: onSale.offerId, collection, instance })
    },
    async onTakeSellOffer (row) {
      const { offerInfo } = row || {}
      const { offerId } = offerInfo || {}
      try {
        const response = await this.$store.$afloatApi.takeSellOffer({
          offerId
        })
      } catch (error) {
        console.error(error)
        this.showNotification({ message: error.message || error, color: 'negative' })
      } finally {
        this.hideLoading()
      }
    },
    onEnlistBuyOffer ({ collection, instance, weight }) {
      this.$emit('onClickEnlistBuyOffer', { collectionId: collection, itemId: instance, showMarket: false, weight })
    },
    isOnSale (obj) {
      return JSON.stringify(obj) !== '{}'
    }

  }
}
</script>
<style lang='stylus' scoped>

</style>
