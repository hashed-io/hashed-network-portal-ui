<template lang='pug'>
q-card
  q-card-section
    TaxCreditDetails(
      v-if="uniquesData.data"
      :uniquesData="uniquesData.data",
      :isLoading="isLoadingFile"
      :file="taxFile"
    )
    offers-table(
      :offers="offers.data"
      :ownerTax="getOwnerTax"
      @onDeleteOffer="onDeleteOffer"
      @onTakeSellOffer="onTakeSellOffer"
      @onTakeBuyOffer="onTakeBuyOffer"
      @openModalSell="onOpenModal('sell')"
      @openModalBuy="onOpenModal('buy')"
    )
  q-dialog(v-model="dialog.openModal")
    OfferForm(
      :labelText="dialog.text"
      :collectionId="dialog.collectionId"
      :instanceId="dialog.instanceId"
      :showMarketSelect="dialog.showMarketSelector"
      :maxWeight="dialog.maxWeight"
      :taxCredit="dialog.taxCredit"
      :marketOptions="marketOptions.data"
      @onSubmitForm="onEnlistOffer"
    )
</template>
<script setup>
import {
  reactive,
  onBeforeMount,
  ref,
  computed,
  onMounted
} from 'vue'
import TaxCreditDetails from '~/components/marketplace/taxCredit/TaxCreditDetails.vue'
import OffersTable from '~/components/marketplace/NFTs/offers-table.vue'
import OfferForm from '~/components/marketplace/collections/OfferForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useNotifications } from '~/mixins/notifications'
import { useErrorHandler } from 'src/mixins/errorHandler'
import { useI18n } from 'vue-i18n'

const $store = useStore()
const $router = useRouter()
const $route = useRoute()
// props

// Emits

// Methods by Feature
const collectionId = $route.query?.classId || '0'
const classId = $route.query?.instanceId
const { handlerError } = useErrorHandler()
const {
  showNotification,
  showLoading,
  hideLoading,
  handleError
} = useNotifications()
const { t } = useI18n({})

onBeforeMount(async () => {
  await getFruniqueData()
  await loadMarketplaceInfo()
  await getOfferData()
})

const dialog = reactive({
  text: '',
  openModal: false,
  collectionId: undefined,
  itemId: undefined,
  offerInput: undefined,
  showMarketSelector: true,
  maxWeight: '100.00%',
  taxCredit: undefined,
  offerType: undefined

})
const offers = reactive({
  data: undefined
})

const marketOptions = reactive({
  data: undefined
})
const isLoadingFile = ref(undefined)
const taxFile = ref(undefined)
const uniquesData = reactive({
  data: undefined
})
const getOwnerTax = computed(() => {
  return uniquesData.data?.owner
})
const getOfferData = async () => {
  // Bug: Creator of the offer is the owner of the Tax credit
  try {
    const offersId = await $store.$afloatApi.getOffersByItem({
      collectionId,
      classId
    })

    const promises = []
    offersId.forEach(offerId => {
      promises.push(
        $store.$afloatApi.getOfferInfo({ offerId })
      )
    })

    const resolvedOffers = await Promise.all(promises)
    const marketIds = []
    const uniquesInfo = []
    const offersArray = offersId.map((offerId, i) => {
      const { marketplaceId: marketId, itemId: classId, collectionId } = resolvedOffers[i] || {}

      if (marketId) {
        marketIds.push($store.$afloatApi.getMarketplaceInfo({ marketplaceId: marketId }))
      }
      if (classId) {
        uniquesInfo.push($store.$afloatApi.getAssetInfo({ collectionId, classId }))
      }
      return {
        offerId,
        ...resolvedOffers[i]
      }
    })
    const marketsResolved = await Promise.all(marketIds)
    const uniquesResolved = await Promise.all(uniquesInfo)

    const offersInfo = offersArray.map((offer, i) => {
      return {
        ...offer,
        ...marketsResolved[i],
        owner: uniquesResolved[i]?.owner,
        creator: offer?.creator,
        verified: uniquesResolved[i]?.approved
      }
    })
    offers.data = offersInfo
  } catch (error) {
    console.error(error)
    showNotification({ message: error.message || error, color: 'negative' })
  } finally {
    hideLoading()
  }
}
const getFruniqueData = async () => {
  try {
    const classId = $route.query?.classId || '0'
    const instanceId = $route.query?.instanceId
    if (!classId || !instanceId) {
      $router.push({
        name: 'NFTs'
      })
    }
    showLoading({ message: t('pages.nfts.loadingUniques') })
    const response = await $store.$afloatApi.getUniqueFruniqueInfo({
      collectionId: classId,
      classId: instanceId,
      withAttributes: true
    })
    console.log({ response, instanceId })
    let flag = response?.parent !== null || response?.parent?.isHierarchical
    const parentAttributes = []
    let { collectionId, parentId } = response?.parent || {}
    while (flag) {
      const response = await $store.$afloatApi.getUniqueFruniqueInfo({
        collectionId,
        classId: parentId,
        withAttributes: true
      })
      const { attributes } = response
      parentAttributes.push(...attributes)
      flag = response?.parent !== null || response?.parent?.isHierarchical
      collectionId = response?.parent?.collectionId
      parentId = response?.parent?.parentId
    }
    if (parentAttributes.length > 0) {
      response.attributes.push(...parentAttributes)
    }
    const index = response.attributes.findIndex((attr) => attr.label === 'taxCredit')
    if (index > -1) {
      const cid = response.attributes[index].value.slice(4)
      const file = await getTaxFile(cid)
      taxFile.value = file || undefined
    }
    uniquesData.data = response
  } catch (e) {
    console.error(e)
    showNotification({ message: e.message || e, color: 'negative' })
  } finally {
    hideLoading()
  }
}
const getTaxFile = async (cid) => {
  let taxFile
  try {
    isLoadingFile.value = true
    const response = await $store.$hcd.viewSharedDataByCID(cid)
    const blob = new Blob([response.payload], { type: 'application/pdf' })
    const blobURL = URL.createObjectURL(blob)
    taxFile = blobURL
  } catch (error) {
    console.error(error)
    taxFile = undefined
  } finally {
    isLoadingFile.value = false
  }

  return taxFile
}
const loadMarketplaceInfo = async () => {
  try {
    const marketId = process.env.GATED_MARKETPLACE_ID
    const market = await $store.$marketplaceApi.getMarketplaceById({
      marketId
    }) || {}
    marketOptions.data = [
      {
        label: market?.label,
        description: market?.fee,
        value: marketId
      }
    ]
  } catch (e) {
    console.error(e)
    showNotification({ message: e.message || e, color: 'negative' })
  }
}

const onDeleteOffer = async (offerId) => {
  try {
    await $store.$afloatApi.removeOffer({
      offerId
    })
    showNotification({ message: 'The offer was deleted' })
  } catch (error) {
    console.error(error)
    showNotification({ message: error.message || error, color: 'negative' })
  } finally {
    hideLoading()
    await getOfferData()
  }
}
const onTakeBuyOffer = async (offerId) => {
  try {
    await $store.$afloatApi.takeBuyOffer({
      offerId
    })
    showNotification({ message: 'The buy offer was accepted' })
  } catch (error) {
    console.error(error)
    showNotification({ message: error.message || error, color: 'negative' })
  } finally {
    hideLoading()
    await getOfferData()
  }
}
const onTakeSellOffer = async (offerId) => {
  try {
    await $store.$afloatApi.takeSellOffer({
      offerId
    })
    showNotification({ message: 'The sell offer was accepted' })
  } catch (error) {
    console.error(error)
    showNotification({ message: error.message || error, color: 'negative' })
  } finally {
    hideLoading()
    await getOfferData()
  }
}
const onOpenModal = (type) => {
  dialog.collectionId = collectionId
  dialog.instanceId = classId
  dialog.openModal = true
  dialog.showMarketSelector = true
  dialog.text = type === 'buy' ? 'Create an offer for your tax credit' : 'Propose an offer'
  dialog.maxWeight = uniquesData.data.weight
  dialog.offerType = type
  dialog.taxCredit = undefined
}
const onEnlistOffer = async ({ collectionId, itemId, offer, marketplace, percentage }) => {
  try {
    const marketplaceId = marketplace
    if (dialog.offerType === 'sell') {
      await $store.$afloatApi.enlistSellOffer({
        marketplaceId,
        collectionId,
        itemId,
        price: offer,
        percentage
      })
    } else {
      await $store.$afloatApi.enlistBuyOffer({
        marketplaceId,
        collectionId,
        itemId,
        price: offer,
        percentage
      })
    }
    showNotification({ message: 'Created the offer successfully' })
    offers.data = []
    await getOfferData()
    dialog.openModal = false
  } catch (error) {
    handlerError(error)
  } finally {
    hideLoading()
  }
}
</script>
<style lang='stylus' scoped>
</style>
