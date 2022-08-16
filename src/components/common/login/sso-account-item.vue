<template lang="pug">
.q-pa-xs.round(flat class="bg-primary")
  q-item
    q-item-section(avatar)
      q-avatar(size="md")
        img(:src="profilePicture")
    q-item-section
        q-item-label.text-white(lines="1") {{ displayName }}
    q-item-section(avatar)
        q-icon.q-ml-sm(name="arrow_drop_down" color="white")
</template>

<script>
/**
 * Component used to render sso account info logged
 */
export default {
  name: 'SSOAccountItem',
  props: {
    /**
     * Display name
     */
    displayName: {
      type: String,
      default: undefined
    },
    /**
     * Profile picture url
     */
    profilePicture: {
      type: String,
      default: undefined
    }
  }
}
</script>
