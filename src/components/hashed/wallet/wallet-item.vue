<template lang="pug">
#wallet-item
  .row
    .col
        .text-body2.text-bold {{ $t('pages.hashed.wallet.currentBlock') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm # {{ AmountUtils.formatToUSLocale(currentBlock) }}
        .text-body2.text-bold {{ $t('pages.hashed.wallet.hashPerBlock') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ perBlock?.toFixed(8) }} HASH
        .text-body2.text-bold {{ $t('pages.hashed.wallet.contributions') }}:
        .text-body2.text-weight-light.q-mt-sm {{ $t('pages.hashed.wallet.fund54') }}: {{ AmountUtils.formatToUSLocale(contributionFund54) }} DOT
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ $t('pages.hashed.wallet.fund58') }}: {{ AmountUtils.formatToUSLocale(contributionFund58) }} DOT
    .col
        .text-body2.text-bold {{ $t('pages.hashed.wallet.estimatedTime') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ estimatedTime }}
        .text-body2.text-bold {{ $t('pages.hashed.wallet.vestedToDate') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(vestedToDate) }} HASH
        .text-body2.text-bold {{ $t('pages.hashed.wallet.remainingToVest') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(remainingToVest) }} HASH
    .col
        .text-body2.text-bold {{ $t('pages.hashed.wallet.totalRewards') }}:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(locked) }} HASH
        template(v-if="isFirstElement")
            .text-body2.text-bold {{ $t('pages.hashed.wallet.baseRewards') }}:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(baseReward) }} HASH
        template(v-if="isFirstElement")
            .text-body2.text-bold {{ $t('pages.hashed.wallet.bonus') }}:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(bonusHash) }} HASH
  .row.justify-center
    Bar.pieChart(v-bind="pieChartConfig")
</template>

<script setup>
import { defineProps, computed, toRefs } from 'vue'
import AmountUtils from '~/utils/AmountUtils'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  perBlock: {
    type: Number,
    required: true
  },
  startingBlock: {
    type: Number,
    required: true
  },
  locked: {
    type: Number,
    required: true
  },
  currentBlock: {
    type: Number,
    required: true
  },
  contributionFund54: {
    type: Number,
    required: true
  },
  contributionFund58: {
    type: Number,
    required: true
  },
  baseReward: {
    type: Number,
    required: true
  },
  bonusHash: {
    type: Number,
    required: true
  },
  isFirstElement: {
    type: Boolean,
    default: false
  }
})

const { perBlock, startingBlock, locked, currentBlock, contributionFund54, contributionFund58 } = toRefs(props)

const vestedToDate = computed(() => {
  const vestedToDate = (currentBlock.value - startingBlock.value) * perBlock.value
  if (vestedToDate >= locked.value) return locked.value
  return vestedToDate?.toFixed(2)
})

const remainingToVest = computed(() => {
  return (locked.value - vestedToDate.value)?.toFixed(2)
})

// Charts
const pieChartConfig = computed(() => {
  return {
    data: {
      labels: ['Vested to date', 'Remaining to vest'],
      datasets: [
        {
          label: 'HASH',
          backgroundColor: ['#41B883', '#51aab5'],
          data: [vestedToDate.value, remainingToVest.value]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          min: 0,
          max: locked.value
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
})

const estimatedTime = computed(() => {
  const seconds = remainingToVest.value / perBlock.value * 12
  const days = Math.floor(seconds / (24 * 60 * 60))
  const minutes = Math.floor((seconds % (24 * 60 * 60)) / 60)
  return `${days} days, ${minutes} minutes`
//   return time
})
</script>
