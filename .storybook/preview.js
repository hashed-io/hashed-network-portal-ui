import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/animate/fadeInUp.css'
import '@quasar/extras/animate/fadeOutDown.css'
import '@quasar/extras/animate/fadeInRight.css'
import '@quasar/extras/animate/fadeOutRight.css'

import 'quasar/dist/quasar.css'
import '~/css/app.styl'
import { app } from '@storybook/vue3'
import { Quasar } from 'quasar'
import Vuex from 'vuex'
import { createI18n } from 'vue-i18n'
import messages from '../src/i18n'
// import myStore from '../src/store'
// import messages from '../src/i18n'
import { createStore } from 'vuex'
import polkadotWallet from '../src/store/polkadotWallet'
import notifications from '~/mixins/notifications'
import errorHandler from '~/mixins/errorHandler'
import { Notify, Loading } from 'quasar'

import TInput from '~/components/common/input/t-input.vue'
import HInput from '~/components/common/input/h-input.vue'
import AccountInput from '~/components/common/account-input.vue'
import MoneyInput from '~/components/common/input/money-input.vue'
app.component('TInput', TInput)
app.component('HInput', HInput)
app.component('AccountInput', AccountInput)
app.component('MoneyInput', MoneyInput)

const store = createStore({
  modules: {
    polkadotWallet,
    profile: {
      namespaced: true,
      getters: {
        polkadotAddress () {
          return '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB'
        }
      }
    }
  },
})

app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  config: {
    notify: {},
    loading: {}
  }
})
app.use(Vuex)

const i18n = createI18n({
  locale: 'en-US',
  messages
})
app.use(i18n)

app.use(store)

// API INSTANCES
// import ConfidentialDocs from '~/services/confidential-docs/confidential-docs'
import PolkadotApi from '~/services/polkadotApi.js'
import { MarketplaceApi } from '~/services/polkadot-pallets'
import { NbvStorageApi } from '@jmgayosso/nbv-client-api'
const api = new PolkadotApi('wss://c2.hashed.network/')
api.connect().then(() => {
  const nbvStorageApi = new NbvStorageApi(api)
  const marketplaceApi = new MarketplaceApi(api)
  store['$polkadotApi'] = api
  store['$nbvStorageApi'] = nbvStorageApi
  store['$marketplaceApi'] = marketplaceApi
})


app.mixin(notifications)
app.mixin(errorHandler)

// const i18n = new VueI18n({
//   locale: 'en-us',
//   fallbackLocale: 'en-us',
//   messages
// })
// export const decorators = [
//   (story) => ({
//     components: { story },
//     template: `<div class="bg-green q-pa-md"><story /></div>`,
//     // i18n,
//     // store
//   })
// ];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true
  },
}
