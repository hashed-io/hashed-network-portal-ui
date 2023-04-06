<template lang="pug">
q-card#NotBalanceCard
  q-card-section.text-center
    .text-body2.text-bold.q-mb-sm {{ $t('pages.login.hashedClubAccessibility') }}
    q-separator.q-mb-md(inset)
    .text-body2.q-mb-sm {{ $t('pages.login.yourHashedAddress') }}:
    .text-body2.text-weight-light.q-mb-sm {{ $store.$polkadotApi.parseAddressToss58(address, '9072') }}
    q-btn(
      :label="$t('pages.login.getTokens')"
      color="primary"
      no-caps
      @click="contactUs"
    )
</template>

<script setup>
import { useStore } from 'vuex'
// eslint-disable-next-line no-undef
defineProps({
  address: {
    type: String,
    required: true
  }
})

const $store = useStore()

function contactUs () {
  // window.open('https://hashed.network/contact', '_blank')
  window.open('https://enter.hashed.club', '_blank')
}
// -
</script>
