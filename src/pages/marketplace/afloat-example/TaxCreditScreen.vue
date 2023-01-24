<template lang='pug'>
q-card
  q-card-section
    .text-h5.q-pa-md {{$t('pages.nfts.detailsTaxCredit')}}
      |
      .text-italic {{ uniquesData?.data?.metadata }}
    RedeemInfo.q-px-md(
      v-if="getRole !== Roles.OTHER"
      :status="getRedeemStatus"
      :role="getRole"
      @onRequestRedeem="onRequestRedeem"
      @onApproveRedeem="onApproveRedeem"
      @onFreezeCredit="onFreezeTaxCredit"
    )
    banner.q-mx-md.q-my-md(v-if="isFrozen" message="Tax Credit frozen" :status="'frozen'")
    TaxCreditDetails(
      v-if="uniquesData.data"
      :uniquesData="uniquesData.data",
      :isLoading="isLoadingFile"
      :file="taxFile"
    )
    offers-table.q-mx-md(
      v-if="!isFrozen"
      :offers="offers.data"
      :ownerTax="getOwnerTax"
      @onDeleteOffer="onDeleteOffer"
      @onTakeSellOffer="onTakeSellOffer"
      @onTakeBuyOffer="onTakeBuyOffer"
      @onOpenModalSell="onOpenModal('sell')"
      @onOpenModalBuy="onOpenModal('buy')"
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
import RedeemInfo from '~/components/marketplace/taxCredit/redeem-info.vue'
import { RedeemStatus, Roles } from '~/const'
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
  await getRedemptionsRequested()
  await getFruniqueData()
  await loadMarketplaceInfo()
  await getOfferData()
  await getAdminMarket()
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
const redemptionsIds = ref([])
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
const getAdminMarketComputed = computed(() => {
  return uniquesData?.data?.adminInfo?.address
})
const getRedeemStatus = computed(() => {
  let redeemValue
  const redeem = uniquesData?.data?.redeem
  const askingForRedemption = uniquesData?.data?.askingForRedemption
  if (askingForRedemption) {
    redeemValue = redeem
      ? undefined
      : RedeemStatus.REDEEM_REQUESTED
  } else {
    redeemValue = redeem
      ? RedeemStatus.REDEEM_APPROVED
      : RedeemStatus.REDEEM_NOT_REQUESTED
  }

  return redeemValue
})
const getAdminMarket = async () => {
  const adminType = 'Admin'
  try {
    const response = await $store.$afloatApi.getAuthoritiesByMarketplace({
      marketId: process.env.GATED_MARKETPLACE_ID,
      palletId: process.env.GATED_PALLET_ID
    })
    const adminInfo = response.find(authority => authority.type === adminType)
    uniquesData.data.adminInfo = adminInfo
  } catch (error) {
    handlerError(error)
  } finally {
    hideLoading()
  }
}
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
    const inRedemptionArray = redemptionsIds.value.find(el => el === instanceId)
    uniquesData.data = response
    // TODO: Delete the hardcoded data [Redeem property]
    uniquesData.data.redeem = false
    uniquesData.data.askingForRedemption = !!inRedemptionArray
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

// Redeem
const onRequestRedeem = async () => {
  try {
    await $store.$afloatApi.requestRedeem({
      collectionId,
      instanceId: classId
    })
  } catch (error) {
    handlerError(error)
  }
}
const onApproveRedeem = async () => {
  try {
    await $store.$afloatApi.approveRedeem({
      collectionId,
      instanceId: classId
    })
  } catch (error) {
    handlerError(error)
  }
}
const onFreezeTaxCredit = async () => {
  try {
    await $store.$afloatApi.freezeFrunique({
      collectionId,
      instanceId: classId
    })
  } catch (error) {
    handlerError(error)
  }
}
const getRedemptionsRequested = async () => {
  const collectionId = process.env.AFLOAT_COLLECTION_ID || '0'
  try {
    const response = await $store.$afloatApi.askingForRedemption({
      marketplaceId: process.env.GATED_MARKETPLACE_ID,
      collectionId
    })
    redemptionsIds.value = [...response]
  } catch (error) {
    handlerError(error)
  } finally {
    hideLoading()
  }
}

const redeemButtons = computed(() => {
  return {
    canRequest: canRequestRedemption.value,
    canApprove: canApproveRedemption.value,
    canLock: canLockTax.value
  }
})

const polkadotAddress = computed(() => $store.getters['profile/polkadotAddress'])

const canLockTax = computed(() => {
  return true
})
const canApproveRedemption = computed(() => {
  return true
})
const canRequestRedemption = computed(() => {
  return getOwnerTax.value === polkadotAddress.value
  // return getOwnerTax.value === polkadotAddress.value && redemptionStatus === NULL
})
const getRole = computed(() => {
  const ownerRole = 'owner'
  const adminRole = 'admin'
  const isAdmin = getAdminMarketComputed.value === polkadotAddress.value
  const isOwner = getOwnerTax.value === polkadotAddress.value

  if (isAdmin && isOwner) {
    return 'admin'
  } else if (isAdmin) {
    return 'admin'
  } else if (isOwner) {
    return 'owner'
  }
  return 'other'
})

const isFrozen = computed(() => {
  return uniquesData?.data?.isFrozen
})
const redeemInProgress = computed(() => {
  // return uniquesData?.data?.redeem === 'IN_PROGRESS'
  return false
})
</script>
<style lang='stylus' scoped>
</style>
