// import { expect } from '@storybook/jest'
import TaxCreditDetails from '~/components/marketplace/taxCredit/TaxCreditDetails.vue'
import { within, userEvent } from '@storybook/testing-library'
import { ref } from 'vue'
// import { expect } from '@storybook/jest'
export default {
  title: 'TaxCredits/TaxCreditDetails',
  component: TaxCreditDetails
}
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TaxCreditDetails },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<TaxCreditDetails v-bind="args"/>'
})

export const BaseInput = Template.bind({})
BaseInput.args = {
  uniquesData: {
    owner: '5ChSU9uHtrePYHfwUgdcQ6MFaAK6ACc9GQYMthgyiMovvGDG',
    approved: null,
    isFrozen: false,
    deposit: '3,333,333,300',
    collectionInfo: { owner: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB', issuer: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB', admin: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB', freezer: '5HeCZWDcdSrsV4YPVg9vDLBjV1nHDrzXb79UdA7DytiiZPVB', totalDeposit: '436,666,662,300', freeHolding: false, items: '2', itemMetadatas: '2', attributes: '14', isFrozen: false },
    attributes: [{ label: 'initialAmount', value: '5000' }, { label: 'typeCredit', value: 'California Film Production Credit' }, { label: 'expirationDate', value: '2030' }, { label: 'SMLLC', value: 'true' }, { label: 'streetAddress', value: 'Lorem' }, { label: 'creditHolderIDNumber', value: 'C5675786' }, { label: 'CFCTaxCreditCertificate', value: 'Lorem' }, { label: 'CASecretaryNumber', value: '193453745745' }, { label: 'taxCredit', value: 'HCD:QmXVvAekUZU4xgH8y2LkSgzsmmyZcgnwjMZXXKrkdY1wfQ' }, { label: 'LLCTreatedAs', value: 'corporation' }, { label: 'state', value: 'California' }, { label: 'currentBalance', value: '3000' }, { label: 'zipCode', value: '45645' }, { label: 'city', value: 'Los Angeles' }],
    metadata: 'California Port Volume',
    weight: '100.00%',
    parent: { collectionId: '0', parentId: '0', parentWeight: '15.00%', isHierarchical: true },
    children: null
  },
  isLoading: false,
  file: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf'

}
