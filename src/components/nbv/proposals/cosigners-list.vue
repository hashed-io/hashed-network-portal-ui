<template lang="pug">
#container.q-gutter-y-sm
  q-card(v-for="cosigner in cosigners")
    account-item.full-width(:address="cosigner.address")
        q-item-section(avatar)
            q-chip(v-if="cosigner.signed" label="Signed" color="primary" text-color="white")
            q-chip(v-else label="Waiting for signature" color="primary" text-color="white")
</template>

<script>
import { AccountItem } from '~/components/common'

/**
 * This component handler the events for cosigners list
 */
export default {
  name: 'CosignersList',
  components: { AccountItem },
  props: {
    /**
     * Cosigners Array [{ address, signed }]
     */
    cosigners: {
      type: Array,
      default: () => []
    }
  }
}
</script>
