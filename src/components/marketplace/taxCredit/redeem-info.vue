<template lang='pug'>
.container
  .row
    banner.q-my-md(
      v-if="status === RedeemStatus.REDEEM_REQUESTED && role === Roles.OWNER"
      message="The redemption was sent. Waiting for the admin confirmation"
      :status="'loading'"
    )
    banner.q-my-md(
      v-if="status === RedeemStatus.REDEEM_REQUESTED && role === Roles.ADMIN"
      message="The owner requested the redeem of this element"
      :status="'loading'"
    )
  .row.q-gutter-md.justify-start
    q-btn(
      v-if="status === RedeemStatus.REDEEM_NOT_REQUESTED && role === Roles.OWNER"
      :label="'Request redemption'", color="green"
      :ripple="false", outline
      no-caps, size="md"
      data-testid="request-redeem-button"
      @click="onRequestRedeem()"
    )
    q-btn(
      v-if="status === RedeemStatus.REDEEM_REQUESTED && role === Roles.ADMIN"
      :label="'Approve redemption'", color="green"
      :ripple="false", outline
      no-caps, size="md"
      data-testid="approve-redeem-button"
      @click="onApproveRedeem()"
    )
</template>
<script setup>
import {
  defineProps,
  defineEmits,
  toRefs
} from 'vue'
import Banner from '~/components/common/banner.vue'
import { RedeemStatus, Roles } from '~/const'

// props
const props = defineProps({
  status: {
    type: String,
    default: undefined
  },
  role: {
    type: String,
    default: undefined
  }
})
// Emits
const emits = defineEmits(['onRequestRedeem', 'onApproveRedeem', 'onFreezeCredit'])

const { status, role } = toRefs(props)
const onRequestRedeem = () => emits('onRequestRedeem')
const onApproveRedeem = () => emits('onApproveRedeem')
const onFreezeCredit = () => emits('onFreezeCredit')
</script>
<style lang='stylus' scoped>
</style>
