<template lang="pug">
#container
  #empty(v-if="!vaults || vaults.length === 0")
    .text-body2.text-center {{ $t('pages.nbv.list.thereAreNotVaultsYet') }}
  #list.q-gutter-y-sm(v-else)
    vault-item.animated-item(v-for="vault in vaults" v-bind="vault")
</template>

<script>
import VaultItem from '~/components/nbv/vaults/vault-item.vue'

export default {
  name: 'VaultList',
  components: {
    VaultItem
  },
  props: {
    vaults: {
      type: Array,
      default: () => []
    }
  }
}
</script>
