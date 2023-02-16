<template lang="pug">
#List.q-pa-md
  q-btn(label="refresh" @click="refresh")
  p Total of contributors {{ contributors.length }}
  q-card.q-pa-md.q-my-sm(v-for="(contributor, index) in contributors")
    p {{ contributor }}
    p Index: {{ index }}
    p Fund Id: {{ contributor.fund_id }}
    p contributed: {{ contributor.contributed }}
    p Who: {{ contributor.who_display.address }}
</template>

<script>
import axios from 'axios'

export default {
  name: 'Crowdloans',
  data () {
    return {
      contributors: [],
      page: 0,
      hasMore: true
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.contributors = []
      this.page = 0
      this.hasMore = true
      this.loadAllPagination()
    },
    async loadAllPagination () {
      await this.getContributors()
      this.page = this.page + 1
      if (!this.hasMore) return
      this.loadAllPagination()
    },
    async getContributors () {
      if (!this.hasMore) return
      const request = axios.create({
        baseURL: 'https://polkadot.webapi.subscan.io/api',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { data: response } = await request.post('/scan/parachain/contributes', {
        // fund_id: '2093-54',
        fund_id: '2093-58',
        row: 100,
        page: this.page,
        order: ''
      })
      const realContributors = response.data.contributes
      if (realContributors) {
        this.contributors = this.contributors.concat(realContributors)
      } else {
        this.hasMore = false
      }
    }
  }
}
</script>
