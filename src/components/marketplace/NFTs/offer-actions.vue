<template lang='pug'>
.container.full-width
  .row.justify-start.items-center.q-py-sm.q-gutter-sm
    // Owner
    q-btn.text-white(
      v-if="(isOwner && isSellOrder) || (isCreatorOfOrder && isBuyOrder)"
      :label="'Delete offer'"
      color="red"
      outline
      no-caps
      size="sm"
      :ripple="false"
      @click="onDeleteOffer()"
      data-testid="delete-button"
    )
    q-btn.text-white(
      v-if="isOwner && isBuyOrder"
      label="Take the buy offer"
      color="green"
      outline
      size="sm"
      :ripple="false"
      no-caps
      @click="onTakeBuyOffer()"
      data-testid="take-buy-offer-button"
    )
    // Buyer
    q-btn.text-white(
      v-if="!isOwner && isSellOrder"
      label="Take the sell offer"
      color="green"
      outline
      no-caps
      size="sm"
      :ripple="false"
      @click="onTakeSellOffer()"
      data-testid="take-offer-button"
    )

</template>
<script setup>
import {
  defineProps,
  defineEmits,
  computed,
  toRefs
} from 'vue'
import { OfferType, OfferStatus } from '~/const'
// props
const props = defineProps({
  offerInfo: {
    type: Object,
    default: () => {}
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  currentAccount: {
    type: String,
    default: undefined
  },
  rowIndex: {
    type: [Number, String],
    default: undefined
  }
})
// Emits
const emits = defineEmits(['onDeleteOffer', 'onShowBuyOffer', 'onEnlistOffer', 'onTakeSellOffer', 'onTakeBuyOffer', 'onEnlistBuyOffer'])
const { isOwner, offerInfo, currentAccount, rowIndex } = toRefs(props)
// Methods by Feature

const isSellOrder = computed(() => {
  return offerInfo.value.offerType === OfferType.SELL_ORDER
})
const isBuyOrder = computed(() => {
  return offerInfo.value.offerType === OfferType.BUY_ORDER
})
const isCreatorOfOrder = computed(() => {
  return offerInfo.value.creator === currentAccount.value
})

const onDeleteOffer = () => emits('onDeleteOffer', rowIndex.value)
const onTakeSellOffer = () => emits('onTakeSellOffer', rowIndex.value)
const onTakeBuyOffer = () => emits('onTakeBuyOffer', rowIndex.value)
</script>
<style lang='stylus' scoped>
</style>
