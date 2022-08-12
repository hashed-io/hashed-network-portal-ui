<template lang="pug">
.q-pa-xs.round(flat class="bg-primary")
  q-item
    q-item-section(avatar)
      q-avatar(size="md")
        img(:src="profilePicture")
    q-item-section
        q-item-label(lines="1") {{ displayName }}
    q-item-section(avatar)
        q-icon.q-ml-sm(name="arrow_drop_down" color="white")
</template>

<script>
export default {
  name: 'SSOAccountItem',
  props: {
    displayName: {
      type: String,
      default: undefined
    },
    profilePicture: {
      type: String,
      default: undefined
    }
  }
}
</script>
