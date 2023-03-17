<template lang='pug'>
q-item(v-if="hasMetadata")
  q-item-section(top avatar)
    q-img.img(:src="_user.picture" width="50px" height="50px")
  q-item-section(top no-wrap)
      q-item-label(lines="5")
        .row.q-gutter-xs
          .text-weight-bold {{ _user.name || _user.displayName }}
          q-icon(v-if="_user.nip05" name="verified" color="pink" size="1rem")
            q-tooltip NIP05 verified
          q-item-label(v-if="_user.nip05") {{ getNip05 }}
      q-item-label(lines="2")
        .npub.cursor-pointer(@click="copyTextToClipboard(getNpub.raw)")
          span.text-overline npub
          span.text-body2 {{ getNpub.display }}
q-item(v-else)
  q-item-section(top)
    q-item-label
      .npub.cursor-pointer(@click="copyTextToClipboard(getNpub.raw)")
        span.text-overline npub
        span.text-body2 {{ getNpub.display }}
</template>
<script setup>
import {
  defineProps,
  toRefs,
  computed
} from 'vue'
import { useNotifications } from '~/mixins/notifications'
// props
const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      about: 'Water well',
      name: 'Amanda',
      nip05: 'amanda@waterwell.ngo',
      npub: 'npub1phvpqfd8hq7x7set0tlpty2p0fq8fvhxfwvzfxg2fatsn66kvvsq2tag8v',
      picture: 'https://waterwell.ngo/profiles/amanda.png',
      banner: 'https://nostr.build/i/nostr.build_e34050e635c540aa737baef0ae9637b90469b8b5c7102209e95de6eb32e4b7a1.jpeg'
    })
  }
})
// Emits

// Methods by Feature
const { copyTextToClipboard } = useNotifications()
const { user: _user } = toRefs(props)
const hasMetadata = computed(() => {
  const hasNpub = Object.prototype.hasOwnProperty.call(_user.value, 'npub')
  const hasPicture = Object.prototype.hasOwnProperty.call(_user.value, 'picture')
  const hasName = Object.prototype.hasOwnProperty.call(_user.value, 'name')
  return hasPicture && hasName && hasNpub
})
const getNpub = computed(() => {
  const npub = _user.value.npub
  const prefix = 'npub'
  return {
    raw: npub,
    display: npub.substring(prefix.length, 9) + '...' + npub.substring(npub.length - 5)
  }
})
const getNip05 = computed(() => {
  const identifier = '@'
  const [name, organization] = _user.value.nip05.split('@')
  return organization
})
</script>
<style lang='stylus' scoped>
.img
  border-radius: 50%
.npub:hover
  text-decoration: underline
</style>
