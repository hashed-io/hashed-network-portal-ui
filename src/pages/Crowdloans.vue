<template lang="pug">
#List.q-pa-xl
  //- q-btn(label="refresh" @click="refresh")
  q-card.q-pa-lg
    .text-bold Filters
    .row.q-col-gutter-md
      .col-3
        q-select(
          label="Filter by fund"
          v-model="selectedFilter"
          :options="funds.options"
          map-options
          emit-value
          outlined
        )
      .col-3
        q-input(outlined debounce="300" v-model="filter" placeholder="Search" label="Search")
          template(v-slot:append)
            q-icon(name="search")

  q-table.contributorsTable.q-mt-md(
    title="Contributions"
    v-if="rowsToShow.length > 0"
    :rows="rowsToShow"
    :columns="columnsToShow"
    row-key="who"
    :pagination="initialPagination"
    :filter="filter"
  )
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref, computed } from 'vue'
import { useNotifications } from '~/mixins/notifications'
import AmountUtils from '~/utils/AmountUtils'

const request = axios.create({
  baseURL: 'https://polkadot.webapi.subscan.io/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const {
  showNotification,
  showLoading,
  hideLoading
} = useNotifications()

const filter = ref(undefined)
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
  }
})

const hashPerDot = 480

onMounted(() => {
  refresh()
})

const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 100
  // rowsNumber: xx if getting data from a server
}

const rowsToShow = computed(() => {
  if (selectedFilter.value === funds.fund54Id) return funds.contributors.fund54
  else if (selectedFilter.value === funds.fund58Id) return funds.contributors.fund58
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
    field: row => row.fund54.who_display,
    format: who => who?.display ? `${who?.display} (${who.address})` : `${who.address}`,
    sortable: true
  },
  {
    name: 'contributed54',
    label: 'DOT Contributed for fund 2093-54',
    required: true,
    align: 'left',
    field: row => row.fund54.contributed,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'contributed58',
    label: 'DOT Contributed for fund 2093-58',
    required: true,
    align: 'left',
    field: row => row.fund58.contributed,
    format: val => `${AmountUtils.formatToUSLocale(val)}`,
    sortable: true
  },
  {
    name: 'rewards',
    label: 'Total Hash Rewards (Increased in 20%)',
    required: true,
    align: 'left',
    field: row => row.totalRewards,
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

const columnsToShow = computed(() => {
  if (selectedFilter.value === funds.fund54Id) return columnsForFunds
  else if (selectedFilter.value === funds.fund58Id) return columnsForFunds
  return columnsForBoth
})

async function refresh () {
  try {
    showLoading()
    const promises = [loadAllPagination({ fundId: funds.fund54Id }), loadAllPagination({ fundId: funds.fund58Id })]
    const [c54, c58] = await Promise.all(promises)
    funds.contributors.fund54 = c54
    funds.contributors.fund58 = c58
    funds.contributors.both = await getCoincidences(c54, c58)
    console.log('data', {
      c54,
      c58,
      both: funds.contributors.both
    })
    const duplicated54 = findDuplicated(c54, 'who')
    console.log('duplicated54', duplicated54)
    const duplicated58 = findDuplicated(c58, 'who')
    console.log('duplicated58', duplicated58)
    const duplicatedt = findDuplicated(columnsForBoth, 'name')
    console.log('duplicatedt', duplicatedt)
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

async function getCoincidences () {
  const contributions1 = funds.contributors.fund54
  const contributions2 = funds.contributors.fund58
  // eslint-disable-next-line consistent-return, array-callback-return
  const matches = contributions1.map(c1 => {
    const c2 = contributions2.find(v => v.who === c1.who)
    let totalContributed = parseFloat(c1.contributed)
    if (c2) totalContributed += parseFloat(c2.contributed)
    return {
      address: c1.who,
      totalContributed,
      fund54: c1,
      fund58: c2
    }
  }).filter(v => (v.fund54 && v.fund58))
  return matches.map(v => {
    return {
      ...v,
      totalRewards: (v.totalContributed * hashPerDot) * 1.2,
      increaseRewardsPerc: 20
    }
  })
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
</script>

<style lang="sass">

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
