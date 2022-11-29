<template lang='pug'>
#container
  .text-h5 {{$t('pages.nfts.details')}}
  q-card
    q-table(
      :rows="getAttributes"
      :columns="getColumnsi18n"
      class="bg-inherit"
      :separator="'none'"
    ).q-my-xl
      template(v-slot:body-cell="props")
        q-td(:props="props")
          q-chip(
            v-if="isFile(props)"
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
export default {
  name: 'DetailsNFTPage',
  components: {

  },
  data () {
    return {
      uniqueData: undefined,
      identifiers: ['IPFS:', 'HCD:']

    }
  },
  computed: {
    getAttributes () {
      return this.uniqueData?.attributes?.filter(attribute => attribute.label !== '$num_value') || []
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
    const classId = this.$route.query?.classId || '0'
    const instanceId = this.$route.query?.instanceId
    if (classId) {
      try {
        this.showLoading({ message: this.$t('pages.nfts.loadingUniques') })
        const response = await this.$store.$afloatApi.getAsset({
          collectionId: classId,
          instanceId
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
    isFile (props) {
      if (!props.value || typeof props.value === 'object') return true
      else if (typeof props.value === 'string') return this.identifiers.some(identifier => props.value.includes(identifier))
      return false
    },
    async downloadFile (file) {
      try {
        this.showLoading({ message: this.$t('pages.marketplace.taxCredits.details.downloading') })
        const isFile = file?.payload instanceof File
        const isIPFS = typeof file === 'string' ? file.includes(this.identifiers[0]) : false
        let isBlob = false
        let blob
        if (isIPFS) {
          const stringSplittedArray = file.split(this.identifiers[0])
          const { type, payload } = await this.$store.$afloatApi.getFromIPFS(stringSplittedArray[1])
          blob = new Blob([payload], { type: type })
          isBlob = true
        }
        if (isFile) {
          blob = new Blob([file.payload], { type: file.type })
          isBlob = true
        }
        if (isBlob) {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          window.open(link.href)

          return
        }
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
      const isHCD = typeof file === 'string' ? file.includes(this.identifiers[1]) : false
      const stringSplittedArray = file.split(this.identifiers[1])
      const cid = stringSplittedArray[1]
      let response
      try {
        if (isHCD) {
          response = await this.$store.$hcd.viewSharedDataByCID(cid)
          console.log({ response })
        }
      } catch (error) {
        response = await this.$store.$hcd.viewOwnedDataByCID(cid)
        console.log({ response })
      } finally {
        if (response) {
          const blob = new Blob([response.payload], { type: response.payload.type })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          window.open(link.href)
        }
      }
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
