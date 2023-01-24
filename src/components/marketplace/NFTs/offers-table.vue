<template lang='pug'>
.container
  q-table(
    :rows="offers"
    :columns="data.columns"
    class="bg-white"
    :separator="'none'"
    flat
    bordered
    dense
  )
    template(v-slot:top)
      .row.justify-start.items-center.q-gutter-md
        q-btn.text-white(
          v-if="showEnlistSellButton"
          :label="$t('pages.marketplace.offerTable.createSellOffer')"
          color="blue"
          outline
          no-caps
          size="sm"
          @click="onEnlistSellOffer()"
          data-testid="enlist-sell-button"
        )
        q-btn(
          v-if="showEnlistBuyButton"
          :label="$t('pages.marketplace.offerTable.createBuyOffer')"
          color="green"
          outline
          no-caps
          size="sm"
          @click="onEnlistBuyOffer()"
          :ripple="false"
          data-testid="enlist-buy-button"
        )
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td.cursor-pointer(key="offerType" :props="props")
          .row.justify-start.items-center
            q-chip.text-white.text-bold.text-capitalize(
              :color="props.row.offerType === OfferType.SELL_ORDER ? 'red' : 'green'"
              data-testid="offer-type"
            ) {{ props.row.offerType === OfferType.SELL_ORDER ? 'Sell Order' : 'Buy Order'}}
            q-chip.text-white.text-bold(
              color="primary"
              data-testid="market-label"
            ) {{ props.row.label }}
            q-chip.text-white.text-bold(
              color="red"
              data-testid="fee-label"
            ) fee: {{ props.row.fee }}

        q-td.cursor-pointer(key="creator" :props="props")
          AccountItem(
            inherit
            flat
            shortDisplay
            :address="props.row.creator"
            :label="$t('pages.marketplace.taxCredits.details.user')"
            data-testid="account-icon"
          )
        q-td.cursor-pointer(key="percentage" :props="props")
          q-chip.text-white.text-bold(
            color="primary"
          ) {{ props.row.percentage }}
        q-td.cursor-pointer(key="price" :props="props")
          q-chip.text-white.text-bold(
            color="primary"
          ) {{ props.row.price }}
        q-td.cursor-pointer(key="actions" :props="props")
          OfferActions(
            :offerInfo="props.row"
            :isOwner="isOwnerRow(props.row)"
            :currentAccount="polkadotAddress"
            :rowIndex="props.rowIndex"
            @onDeleteOffer="onDeleteOffer"
            @onTakeBuyOffer="onTakeBuyOffer"
            @onTakeSellOffer="onTakeSellOffer"
          )
</template>
<script setup>
import {
  defineProps,
  defineEmits,
  onBeforeMount,
  toRefs,
  computed,
  watch,
  ref,
  reactive
} from 'vue'
import AccountItem from '~/components/common/account-item.vue'
import { useNotifications } from '~/mixins/notifications'
import { OfferType, OfferStatus, RedeemStatus } from '~/const'
import OfferActions from '~/components/marketplace/NFTs/offer-actions.vue'
import { useStore } from 'vuex'
// props
const props = defineProps({
  offers: {
    type: Array,
    default: () => ([])
  },
  ownerTax: {
    type: String,
    default: undefined
  }
})

const { offers, ownerTax } = toRefs(props)
const {
  showNotification,
  showLoading,
  hideLoading
} = useNotifications()
const $store = useStore()

const data = reactive({
  offers: undefined,
  columns: [
    {
      name: 'offerType',
      label: 'Offer info',
      value: 'offerType',
      field: row => row.offerType,
      align: 'justify'
    },
    {
      name: 'creator',
      label: 'Creator of the offer',
      value: 'creator',
      field: row => row.creator,
      align: 'justify'
    },
    {
      name: 'percentage',
      label: 'Percentage to buy/sell',
      field: row => row.percentage,
      align: 'justify'
    },
    {
      name: 'price',
      label: 'Price',
      value: 'price',
      field: row => row.price,
      align: 'justify'
    },
    {
      name: 'actions',
      label: 'Actions',
      align: 'justify'
    }
  ]
})
const polkadotAddress = computed(() => $store.getters['profile/polkadotAddress'])
const hasSellOffer = computed(() => {
  return offers.value?.some(offer => {
    return offer.offerType === OfferType.SELL_ORDER
  })
})
const hasBuyOfferOfLogged = computed(() => {
  return offers.value?.some(offer => polkadotAddress.value === offer.creator)
})

// Methods by Feature
const isOwnerRow = (data) => {
  return polkadotAddress.value === data?.owner
}
const isOwner = computed(() => {
  return polkadotAddress.value === ownerTax.value
})
const showEnlistSellButton = computed(() => {
  if (offers.value.length > 0) {
    return !hasSellOffer.value
  }
  return isOwner.value
})
const showEnlistBuyButton = computed(() => {
  if (offers.value.length > 0) {
    return !hasBuyOfferOfLogged.value
  }
  return false
})
// Emits

const emits = defineEmits([
  'onDeleteOffer',
  'onTakeBuyOffer',
  'onTakeSellOffer',
  'onOpenModalSell',
  'onOpenModalBuy'
])
const getOfferId = (index) => {
  return offers.value?.[index]?.offerId
}
const onDeleteOffer = (index) => emits('onDeleteOffer', getOfferId(index))
const onTakeBuyOffer = (index) => emits('onTakeBuyOffer', getOfferId(index))
const onTakeSellOffer = (index) => emits('onTakeSellOffer', getOfferId(index))
const onEnlistSellOffer = () => emits('onOpenModalSell')
const onEnlistBuyOffer = () => emits('onOpenModalBuy')
</script>
<style lang='stylus' scoped>
</style>
