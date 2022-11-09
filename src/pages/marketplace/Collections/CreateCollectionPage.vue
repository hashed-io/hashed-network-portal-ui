<template lang='pug'>
#container
  CollectionForm(
    @onSubmitForm="onCreateCollection"
  )
</template>
<script>
import CollectionForm from '~/components/marketplace/collections/collection-form.vue'

export default {
  name: 'CreateUniquesPage',
  components: {
    CollectionForm
  },
  props: {
  },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
    async onCreateCollection (name) {
      try {
        await this.$store.$afloatApi.createCollection({
          description: name
        })
        this.showNotification({ message: 'Collection created successfully' })
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
