<template>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    onBeforeMount(async () => {
      const langKey = localStorage.getItem('hashed-langKey')
      if (langKey) {
        locale.value = langKey // change!
      }
    })
  }
})
</script>
