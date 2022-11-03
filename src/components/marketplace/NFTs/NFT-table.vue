<template lang='pug'>
#container
  q-table(
    :rows="uniquesList"
    :columns="getColumnsNFT"
    class="bg-white"
    :separator="'none'"
  ).q-my-xl
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td.cursor-pointer(key="instance" :props="props" @click="onClickRow(props.rowIndex)")
          q-chip.text-white.text-bold(
            color="primary"
            ) {{$t('pages.nfts.element.title')}} {{props.row.instance}}
        q-td.cursor-pointer(key="owner" :props="props" @click="onClickRow(props.rowIndex)")
          AccountItem(
            inherit
            flat
            :address="props.row.owner"
            :label="$t('pages.marketplace.taxCredits.details.user')"
          )
        q-td(key="onSale" :props="props")
          q-chip.text-white(
            v-if="props.row.onSale"
            label="On Sale"
            color="green"
          )
          q-chip.text-white(
            v-if="props.row.onSale && isOwner(props.row.owner)"
            label="Delete offer"
            color="red"
            clickable
            @click="onDeleteOffer(props.row)"
          )
          q-chip.text-white(
            v-if="!props.row.onSale && !isOwner(props.row.owner)"
            label="Not On Sale"
            color="blue"
          )
          q-chip.text-white(
            v-if="!props.row.onSale && isOwner(props.row.owner)"
            label="Enlist sell offer"
            color="blue"
            clickable
            @click="onEnlistOffer(props.row)"
          )
</template>
<script>
import AccountItem from '~/components/common/account-item.vue'
import { mapGetters } from 'vuex'
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
        isFrozen: false,
        onSale: false
      }]
    }
  },
  emits: ['onClickRow', 'onClickDeleteOffer', 'onClickEnlistSellOffer'],
  data () {
    return {
      uniquesArray: this.uniquesList
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress']),
    getColumnsNFT () {
      return [
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
          label: 'on Sale',
          field: row => row.onSale,
          value: 'onSale',
          align: 'justify'
        }
      ]
    }
  },
  methods: {
    onClickRow (index) {
      this.$emit('onClickRow', this.uniquesList[index].instance)
    },
    isOwner (owner) {
      return owner === this.polkadotAddress
    },
    onEnlistOffer ({ collection, instance }) {
      this.$emit('onClickEnlistSellOffer', { collectionId: collection, itemId: instance })
    },
    onDeleteOffer ({ offerId = 3 }) {
      // this.$emit('onClickDeleteOffer', { offerId, collection, instance })
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
