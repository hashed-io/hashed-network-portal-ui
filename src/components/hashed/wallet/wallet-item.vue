<template lang="pug">
#wallet-item
  .row
    .col-3
        .text-body2.text-bold Current Block:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm # {{ AmountUtils.formatToUSLocale(currentBlock) }}
        .text-body2.text-bold Contributions:
        .text-body2.text-weight-light.q-mt-sm Fund 54: {{ AmountUtils.formatToUSLocale(contributionFund54) }} DOT
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm Fund 58: {{ AmountUtils.formatToUSLocale(contributionFund58) }} DOT
        template(v-if="isFirstElement")
            .text-body2.text-bold Base Rewards:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(baseReward) }} HASH
        template(v-if="isFirstElement")
            .text-body2.text-bold Bonus:
            .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(bonusHash) }} HASH
    .col-3
        .text-body2.text-bold Total Rewards:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(locked) }} HASH
        .text-body2.text-bold HASH per block:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ perBlock }} HASH
        .text-body2.text-bold Vested to date:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(vestedToDate) }} HASH
        .text-body2.text-bold Remaining to vest:
        .text-body2.text-weight-light.q-mb-lg.q-mt-sm {{ AmountUtils.formatToUSLocale(remainingToVest) }} HASH
    .col-6
        .row.justify-center
            Pie.pieChart(v-bind="pieChartConfig")
</template>

<script setup>
import { defineProps, computed, toRefs } from 'vue'
import AmountUtils from '~/utils/AmountUtils'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale)

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
  return vestedToDate
})

const remainingToVest = computed(() => {
  return (locked.value - vestedToDate.value)
})

// Charts
const pieChartConfig = computed(() => {
  return {
    data: {
      labels: ['Vested to date', 'Remaining to vest'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#00D8FF'],
          data: [vestedToDate.value, remainingToVest.value]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }
})
</script>
