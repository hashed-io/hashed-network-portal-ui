const iconPath = 'img:customIcons/'
const myIcons = {
  'app:twitter': 'twitter-brands.svg'
}

export const customIcons = {
  beforeMount () {
    this.$q.iconMapFn = (iconName) => {
      const icon = myIcons[iconName]
      if (icon) {
        return { icon: iconPath + icon }
      }
      return undefined
    }
  }
}
