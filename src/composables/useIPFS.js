import { ref, readonly } from 'vue'
import { BrowserIpfs } from '~/services'

export const useIpfs = () => {
  const loading = ref(false)
  const image = ref(undefined)

  const saveOnIpfs = (payload) => {
    return BrowserIpfs.store(payload)
  }

  const getImage = async (cid) => {
    loading.value = true
    try {
      if (isHttpUrl(cid)) {
        image.value = cid
      } else {
        const file = await BrowserIpfs.retrieve(cid)
        image.value = URL.createObjectURL(file.payload)
      }
      return image.value
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  const getFile = async (cid) => {
    loading.value = true
    try {
      return await BrowserIpfs.retrieve(cid)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  const openFile = async (cid) => {
    const file = await getFile(cid)
    const url = URL.createObjectURL(file.payload)
    window.open(url, '_blank')
  }

  const isHttpUrl = (string) => {
    try {
      const url = new URL(string)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (_) {
      return false
    }
  }

  return {
    loading: readonly(loading),
    image: readonly(image),
    getImage,
    saveOnIpfs,
    getFile,
    openFile
  }
}
