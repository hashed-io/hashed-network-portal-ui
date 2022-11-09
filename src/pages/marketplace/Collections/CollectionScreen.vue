<template lang='pug'>
#container
  .row.q-gutter-md.justify-between
    #Title
      .text-h4 {{$t('pages.marketplace.taxCredits.title')}}
    q-btn(
      :label="$t('pages.marketplace.taxCredits.buttons.createCollection')"
      color="primary"
      outline
      no-caps
      @click="onCreateCollection"
    )
  CollectionList.q-py-md(
    :collectionList="collections"
    @onClickCollection="onClickCollection"
  )
</template>
<script>
import { mapGetters } from 'vuex'
import CollectionList from '~/components/marketplace/collections/collection-list.vue'
export default {
  name: 'Index',
  components: {
    CollectionList
  },
  data () {
    return {
      collections: undefined,
      lastClass: undefined,
      lastInstance: undefined
    }
  },
  computed: {
    ...mapGetters('profile', ['polkadotAddress'])
  },
  async beforeMount () {
    await this.getListCollections()
  },
  methods: {
    onCreateCollection () {
      this.$router.push({
        name: 'collectionCreate',
        params: {
          class: parseInt(this.lastClass) + 1,
          instance: this.lastInstance
        }
      })
    },
    async getListCollections () {
      this.showLoading({ message: this.$t('pages.collections.loadingCollections') })
      try {
        const response = await this.$store.$afloatApi.getCollections()
        const collectionsLength = response.length
        this.lastClass = collectionsLength > 0 ? parseInt(response[collectionsLength - 1].classId) : 0
        this.lastInstance = 0
        this.collections = response
      } catch (e) {
        this.handlerError(e)
      } finally {
        this.hideLoading()
      }
    },
    onClickCollection (classId) {
      this.$router.push({
        name: 'collectionDetails',
        query: {
          classId: classId
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.dialogClass
  width: 70vw
  margin-left: 15vw
</style>
