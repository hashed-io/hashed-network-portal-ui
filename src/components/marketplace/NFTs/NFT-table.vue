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
            ) {{$t('pages.nfts.element.title')}} {{props.row.instance}} {{props.row.data}}
        q-td.cursor-pointer(key="owner" :props="props" @click="onClickRow(props.rowIndex)")
          AccountItem(
            inherit
            flat
            :address="props.row.owner"
            :label="$t('pages.marketplace.taxCredits.details.user')"
            data-testid="account-icon"
          )
        q-td(key="onSale" :props="props")
          q-chip.text-white(
            v-if="props.row.onSale"
            label="On Sale"
            color="green"
            :ripple="false"
            data-testid="on-sale-chip"
          )
          q-chip.text-white(
            v-if="!props.row.onSale"
            label="Not On Sale"
            color="blue"
            :ripple="false"
            data-testid="not-on-sale-chip"
          )
        q-td(key="actions" :props="props")
          q-btn.text-white(
            v-if="props.row.onSale && isOwner(props.row.owner)"
            :label="$t('pages.nfts.deleteOffer')"
            color="red"
            outline
            size="sm"
            :ripple="false"
            @click="onDeleteOffer(props.row)"
            data-testid="delete-button"
          )
          q-btn.text-white(
            v-if="!props.row.onSale && isOwner(props.row.owner)"
            :label="$t('pages.nfts.enlistOffer')"
            color="blue"
            outline
            size="sm"
            @click="onEnlistOffer(props.row)"
            data-testid="enlist-button"
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
  watch: {
    uniquesList: {
      handler (newVal) {
        const atLeastOneOwner = this.uniquesList.some((unique) => {
          return unique.owner === this.polkadotAddress
        })
        const length = this.columns.length
        if (this.columns[length - 1].name === 'actions') this.columns.pop()
        if (atLeastOneOwner) {
          this.columns.push({
            name: 'actions',
            label: 'Actions',
            value: 'actions',
            align: 'justify'
          })
        }
      },
      immediate: true
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
    onDeleteOffer ({ onSale, collection, instance }) {
      this.$emit('onClickDeleteOffer', { offerId: onSale.offerId, collection, instance })
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
