<template lang='pug'>
#container
  #title.text-h4 {{$t('pages.marketplace.taxCredits.details.title', { class: this.uniqueData.classId })}}
  q-chip(
    :color="uniqueData.isFrozen ? 'secondary' : 'primary'"
    :label="uniqueData.isFrozen ? $t('pages.marketplace.taxCredits.details.frozen') : $t('pages.marketplace.taxCredits.details.active')"
    ).text-white.text-bold
  .row.justify-between.q-col-gutter-md
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.owner')}}
        AccountItem(
          :address="uniqueData.owner"
          :label="$t('pages.marketplace.taxCredits.details.admin')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.administrator')}}
        AccountItem(
          :address="uniqueData.admin"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{ 'Number of items' }}
        div {{ uniqueData.items }}
    .col-6
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.issuer')}}
        AccountItem(
          :address="uniqueData.issuer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm
        .text-subtitle2 {{$t('pages.marketplace.role.freezer')}}
        AccountItem(
          :address="uniqueData.freezer"
          :label="$t('pages.marketplace.taxCredits.details.user')"
        )
      div.q-py-sm.text-right
        .text-subtitle2 {{ 'Number of Metadata' }}
        div {{ uniqueData.itemMetadatas }}
  #Attributes
    q-table(
      :rows="getAttributes"
      class="bg-inherit"
      dense
      :separator="'none'"
      flat
      hide-pagination
    ).q-my-xl
    //- .row.justify-between.q-col-gutter-md(v-for="attribute in getAttributes")
    //-   .text-left.q-py-xl {{ attribute.attribute }}
    //-   .text-right.q-py-xl {{ attribute.value }}

  //- #RawData
  //-   pre {{uniqueData}}

</template>
<script>
import AccountItem from '~/components/common/account-item.vue'

export default {
  name: 'DetailsUniquesPage',
  components: {
    AccountItem
  },
  props: {
    unique: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      uniqueData: undefined
    }
  },
  computed: {
    getAttributes () {
      return this.uniqueData.attributes.filter(attribute => attribute.attribute !== '$num_value')
    }
  },
  created () {
    if (!this.unique) {
      this.$router.push({
        name: 'NFTs'
      })
    }
    this.uniqueData = JSON.parse(this.unique)
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>

</style>
