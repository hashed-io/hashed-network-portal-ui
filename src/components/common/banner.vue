<template lang="pug">
q-banner.text-white(rounded :class="{ 'bg-negative': error, 'bg-warning': loading, 'bg-primary': normal, 'bg-blue': frozen }")
  //- template(v-slot:avatar v-if="status")
  q-item(dense)
    q-item-section(avatar v-if="status")
      q-spinner-tail(v-if="loading" color="white" size="md")
      q-icon(v-else-if="error" name="notification_important" color="white" size="md")
      q-icon(v-else-if="frozen" name="ac_unit" color="white" size="md")
    q-item-section
      .text-body2 {{ message }}
</template>

<script>
/**
 * This component show a banner with message
 */
export default {
  name: 'Banner',
  props: {
    /**
     * Message to show
     */
    message: {
      type: String,
      default: 'Banner message'
    },
    /**
     * Switch to show loading, error or success icon
     */
    status: {
      type: String,
      default: undefined
    }
  },
  computed: {
    error () {
      return !!(this.status && this.status.toLowerCase() === 'error')
    },
    loading () {
      return !!(this.status && this.status.toLowerCase() === 'loading')
    },
    frozen () {
      return !!(this.status && this.status.toLowerCase() === 'frozen')
    },
    normal () {
      return !!(!this.status || this.status.toLowerCase() === '')
    }
  }
}
</script>
