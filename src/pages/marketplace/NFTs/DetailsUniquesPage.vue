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
        .text-subtitle2 {{ $t('pages.marketplace.taxCredits.details.numberItems') }}
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
        .text-subtitle2 {{ $t('pages.marketplace.taxCredits.details.numberMetadata') }}
        div {{ uniqueData.itemMetadatas }}
  #Attributes
    q-table(
      :rows="getAttributes"
      :columns="getColumnsi18n"
      class="bg-inherit"
      dense
      :separator="'none'"
      flat
      hide-pagination
    ).q-my-xl
      template(v-slot:body-cell="props")
        q-td(:props="props")
          q-chip(
            v-if="props.value.includes(fileIdentifier)"
            clickable
            @click="downloadFile(props.value)"
            icon-right="download"
            text-color="white"
            color="primary"
          ).animated-item.text-bold
            | {{ $t('pages.marketplace.taxCredits.details.file') }}
          div(v-else).text-subtitle2 {{ props.value }}

</template>
<script>
import AccountItem from '~/components/common/account-item.vue'

export default {
  name: 'DetailsUniquesPage',
  components: {
    AccountItem
  },
  // props: {
  //   unique: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data () {
    return {
      uniqueData: [],
      fileIdentifier: 'File:',
      columns: [
      ]
    }
  },
  computed: {
    getAttributes () {
      return this.uniqueData?.attributes?.filter(attribute => attribute.label !== '$num_value')
    },
    getColumnsi18n () {
      return [
        {
          name: 'attribute',
          label: this.$t('pages.marketplace.taxCredits.details.attribute'),
          value: 'attribute',
          field: row => row.label,
          align: 'left',
          width: '50%'
        },
        {
          name: 'value',
          label: this.$t('pages.marketplace.taxCredits.details.value'),
          field: row => row.value,
          value: 'value',
          align: 'right',
          width: '50%'
        }
      ]
    }
  },
  async beforeMount () {
    const classId = this.$route.query?.classId
    if (classId) {
      try {
        this.showLoading({ message: this.$t('pages.nfts.loadingUniques') })
        const response = await this.$store.$afloatApi.getAsset({
          collectionId: classId,
          instanceId: 0
        })
        this.uniqueData = response
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    } else {
      this.$router.push({
        name: 'NFTs'
      })
    }
  },
  methods: {
    async downloadFile (file) {
      try {
        this.showLoading({ message: this.$t('pages.marketplace.taxCredits.details.downloading') })
        const CID = file.split(this.fileIdentifier)[1]
        const response = await this.$store.$hashedPrivateApi.sharedViewByCID(CID)
        const blob = new Blob([response.payload], { type: response.payload.type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        window.open(link.href)
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
