<template lang="pug">
#List
  q-card.q-mb-md
    q-card-section
      .row.q-col-gutter-md
        .col-sm-12.col-md-6
          .text-bold.titleStyle {{ $t('pages.hashed.members.details') }}
          .text-subtitle2 {{ $t('pages.hashed.members.hashRewardPerDot') }}: {{ hashPerDot }}
          .text-subtitle2 {{ $t('pages.hashed.members.secondTimeBonus') }}: 20%
          .text-subtitle2 {{ $t('pages.hashed.members.blocksPerMinute') }}: {{ AmountUtils.formatToUSLocale(blocksPerMinute) }}
          .text-subtitle2 {{ $t('pages.hashed.members.blocksPerWeek') }}: {{ AmountUtils.formatToUSLocale(blocksPerWeek) }}
          .text-subtitle2 {{ $t('pages.hashed.members.blocksForLease') }}: {{ AmountUtils.formatToUSLocale(blocksForLease) }}
        .col-sm-12.col-md-6
          .text-bold {{ $t('pages.hashed.members.filters') }}
          q-input(outlined debounce="300" v-model="filter" :placeholder="$t('pages.hashed.members.search')" :label="$t('pages.hashed.members.search')")
            template(v-slot:append)
              q-icon(name="search")
          q-toggle(
            :label="$t('pages.hashed.members.showEligibles')"
            v-model="isShowingJustEligibles"
          )

  q-table.contributorsTable(
    :title="$t('pages.hashed.members.members')"
    v-if="rowsToShow.length > 0"
    :rows="rowsToShow"
    :columns="columnsToShow"
    row-key="who"
    :pagination="initialPagination"
    :filter="filter"
    virtual-scroll
  )
    template(v-slot:body-cell-who="props")
      q-td(:props="props") {{ `${props.value?.substr(0, 6)}...${props.value?.substr(-6)}` }}
    template(v-slot:body-cell-hashedAddress="props")
      q-td(:props="props") {{ `${props.value?.substr(0, 6)}...${props.value?.substr(-6)}` }}
  q-card(v-else)
    q-card-section
      general-table-skeleton(:rowsNumber="5" :columnsNumber="8")
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, onMounted, reactive, ref, computed } from 'vue'
import csvDownload from 'json-to-csv-export'

import { useNotifications } from '~/mixins/notifications'
import { useVesting } from '~/composables'
import { useStore } from 'vuex'

import AmountUtils from '~/utils/AmountUtils'
import GeneralTableSkeleton from '~/components/common/skeletons/general-table-skeleton'

const request = axios.create({
  baseURL: 'https://polkadot.webapi.subscan.io/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const $store = useStore()

const {
  showNotification,
  showLoading,
  hideLoading,
  copyTextToClipboard
} = useNotifications()

const {
  getSavedVestingApiData
} = useVesting()

const filter = ref(undefined)
const isShowingJustEligibles = ref(false)
const selectedFilter = ref('both')

const funds = reactive({
  options: [
    {
      label: 'Fund 2093-54',
      value: '2093-54'
    },
    {
      label: 'Fund 2093-58',
      value: '2093-58'
    },
    {
      label: 'Investors participed on both funds',
      value: 'both'
    }
  ],
  fund54Id: '2093-54',
  fund58Id: '2093-58',
  contributors: {
    fund54: [],
    fund58: [],
    both: []
  },
  participants: []
})

const blocksPerMinute = ref(5)

const hashPerDot = 480

onBeforeMount(() => {
  refresh()
})

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 0
  // rowsNumber: xx if getting data from a server
}

const rowsToShow = computed(() => {
  // if (selectedFilter.value === funds.fund54Id) return funds.contributors.fund54
  // else if (selectedFilter.value === funds.fund58Id) return funds.contributors.fund58
  // return funds.contributors.both
  if (isShowingJustEligibles.value === true) return funds.contributors.both.filter(v => v.isEligibleForBonus)
  return funds.contributors.both
})

const columnsForFunds = [
  {
    name: 'who',
    label: 'Who',
    required: true,
    align: 'left',
    field: row => row.who_display,
    format: who => who?.display ? `${who?.display} (${who.address})` : `${who.address}`,
    sortable: true
  },
  {
    name: 'hashedAddress',
    label: 'Hashed Address',
    required: true,
    align: 'left',
    field: row => row.hashedAddress,
    format: who => who?.display ? `${who?.display} (${who.address})` : `${who.address}`,
    sortable: true
  },
  {
    name: 'contributed',
    label: 'DOT Contributed',
    required: true,
    align: 'left',
    field: row => row.contributed,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'rewards',
    label: 'Hash Rewards',
    required: true,
    align: 'left',
    field: row => row.hashRewards,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  }
  // {
  //   name: 'block_timestamp',
  //   label: 'block_timestamp',
  //   required: true,
  //   align: 'left',
  //   field: row => row.block_timestamp,
  //   format: val => `${val}`,
  //   sortable: true
  // }
]

const columnsForBoth = [
  {
    name: 'who',
    label: 'Who',
    required: true,
    align: 'left',
    field: row => row.who,
    sortable: true
    // format: val => `${val.substr(0, 6)}...${val.substr(-6)}`
  },
  {
    name: 'hashedAddress',
    label: 'Hashed address',
    required: true,
    align: 'left',
    field: row => row.hashedAddress,
    sortable: true
    // format: val => `${val.substr(0, 6)}...${val.substr(-6)}`
  },
  // {
  //   name: 'who',
  //   label: 'Who',
  //   required: true,
  //   align: 'left',
  //   field: row => row.fund54.who_display,
  //   format: who => who?.display ? `${who?.display} (${who.address})` : `${who.address}`,
  //   sortable: true
  // },
  {
    name: 'round 1',
    label: 'DOT Cont. 2093-54',
    required: false,
    align: 'left',
    field: row => row.round1,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'contributed58',
    label: 'DOT Cont. 2093-58',
    required: false,
    align: 'left',
    field: row => row.round2,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'isEligible',
    label: 'Eligible for bonus',
    required: true,
    align: 'left',
    field: row => row.isEligibleForBonus,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'baseReward',
    label: 'Base Reward',
    required: true,
    align: 'left',
    field: row => row.baseReward,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'minContrib',
    label: 'Min.Contrib',
    required: true,
    align: 'left',
    field: row => row.minContribution,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'bonus',
    label: 'Bonus HASH',
    required: false,
    align: 'left',
    field: row => row.bonusHash,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'totalReward',
    label: 'Total Reward',
    required: false,
    align: 'left',
    field: row => row.totalReward,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'hashPerBlock',
    label: 'HASH per Block',
    required: false,
    align: 'left',
    field: row => row.hashPerBlock,
    format: val => `${val?.toFixed(8)}`,
    sortable: true
  }
  // {
  //   name: 'rewards',
  //   label: 'Total Hash Rewards (Increased in 20%)',
  //   required: true,
  //   align: 'left',
  //   field: row => row.totalRewards,
  //   format: val => `${AmountUtils.formatToUSLocale(val)}`,
  //   sortable: true
  // }
  // {
  //   name: 'block_timestamp',
  //   label: 'block_timestamp',
  //   required: true,
  //   align: 'left',
  //   field: row => row.block_timestamp,
  //   format: val => `${val}`,
  //   sortable: true
  // }
]

const columnsToShow = computed(() => {
  if (selectedFilter.value === funds.fund54Id) return columnsForFunds
  else if (selectedFilter.value === funds.fund58Id) return columnsForFunds
  return columnsForBoth
})

const filteredParticipants = computed(() => {
  if (isShowingJustEligibles.value === true) return funds.contributors.both.filter(v => v.isEligibleForBonus)
  return funds.contributors.both
})
async function refresh () {
  try {
    showLoading()
    // Get contributions for both funds
    // const promises = [loadAllPagination({ fundId: funds.fund54Id }), loadAllPagination({ fundId: funds.fund58Id })]
    // const [c54, c58] = await Promise.all(promises)
    const { fund54: c54, fund58: c58 } = await getSavedVestingApiData()
    funds.contributors.fund54 = c54
    funds.contributors.fund58 = c58

    // Get all diferents participants
    funds.participants = [...new Set([...c54.map(v => v.who), ...c58.map(v => v.who)])]
    // console.log('data', {
    //   c54,
    //   c58,
    //   both: funds.contributors.both,
    //   participants: funds.participants
    // })

    // Get computed Data
    funds.contributors.both = await getComputed()
    const computed = await getComputed()
    // saveInJSON(computed, 'computed.json')
    // saveInJSON(c58, 'c58.json')
    // Download Data
    // convertToCSV({ data: c54, name: 'fund_54' })
    // convertToCSV({ data: c58, name: 'fund_58' })
  } catch (e) {
    console.error(e)
  } finally {
    hideLoading()
  }
}

function findDuplicated (array, param) {
  const track = {}
  const duplicated = []

  array.forEach(item => {
    if (track[item[param]] === undefined) {
      track[item[param]] = item
    } else {
      duplicated.push(item)
    }
  })

  return duplicated
}

async function getComputed () {
  const contributions1 = funds.contributors.fund54
  const contributions2 = funds.contributors.fund58
  const participants = funds.participants

  const computed = participants.map(address => {
    const polkadotAddress = $store.$fruniquesApi.parseAddress(address)
    // Find funds
    const fund54 = contributions1.find(v => v.who === address)
    const fund58 = contributions2.find(v => v.who === address)
    // Evaluate if is eligible
    const isEligibleForBonus = !!(fund58)
    // Get data
    const round1 = fund54?.contributed | 0
    const round2 = fund58?.contributed | 0
    const display = (fund54 || fund58).who_display
    const who = display.display ? `${display?.display} (${display.address})` : `${display.address}`
    const baseReward = round2 * hashPerDot
    const minContribution = Math.min(round1, round2)
    const bonusHash = isEligibleForBonus ? minContribution * hashPerDot * 0.2 : 0
    const totalReward = baseReward + bonusHash
    const hashPerBlock = totalReward / blocksForLease.value
    const hashedAddress = $store.$polkadotApi.parseAddressToss58(display.address, '9072')

    return {
      address,
      who,
      isEligibleForBonus,
      round1,
      round2,
      baseReward,
      minContribution,
      bonusHash,
      totalReward,
      polkadotAddress,
      hashPerBlock,
      hashedAddress
      // fund54,
      // fund58
    }
  })

  return computed
}

async function loadAllPagination ({ fundId }) {
  let _hasMore = true
  let _contributors = []
  let page = 0
  while (_hasMore) {
    const { hasMore, contributors } = await getContributors({ fundId, page })
    if (contributors) _contributors = _contributors.concat(contributors)
    page = page + 1
    _hasMore = hasMore
  }
  return _contributors
}

async function getContributors ({ fundId, page }) {
  let hasMore = true
  const { data: response } = await request.post('/scan/parachain/contributes', {
    fund_id: fundId,
    row: 100,
    page,
    order: ''
  })
  const realContributors = response.data.contributes?.map(c => {
    return {
      ...c,
      contributed: (c.contributed / 10000000000),
      hashRewards: (c.contributed / 10000000000) * hashPerDot
    }
  })
  if (!realContributors) {
    hasMore = false
  }
  return {
    contributors: realContributors,
    hasMore
  }
}

function convertToCSV ({ data, name }) {
  const dataToConvert = {
    data,
    filename: name,
    delimiter: ',',
    headers: ['fund_id', 'para_id', 'who', 'contributed', 'contributing', 'block_num', 'block_timestamp', 'extrinsic_index', 'event_index', 'status', 'memo', 'who_display']
  }
  csvDownload(dataToConvert)
}

function saveInJSON (data, fileName) {
  const dataJson = JSON.stringify(data)
  copyTextToClipboard(dataJson, `copied data for ${fileName}`)
}

const blocksPerWeek = computed(() => {
  return blocksPerMinute.value * 60 * 24 * 7
})

const blocksForLease = computed(() => {
  return blocksPerWeek.value * 104
})

// -
</script>

<style lang="stylus">
.titleStyle
  text-decoration: underline

.contributorsTable
  /* height or max-height is important */
  max-height: 70vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
