import { expect } from '@storybook/jest'
import MarketInfoCard from '~/components/marketplace/details/market-info-card.vue'
import { within } from '@storybook/testing-library'
// import { mapMutations } from 'vuex'
export default {
  title: 'Marketplace/MarketInfoCard',
  component: MarketInfoCard
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MarketInfoCard },
  methods: {
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    // Story args can be spread into the returned object
    return { args }
  },
  // Then, the spread values can be accessed directly in the template
  template: '<MarketInfoCard v-bind="args" />'
})

export const BaseComponent = Template.bind({})
BaseComponent.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    label: 'Lorem Ipsum Marketplace'
  },
  participants: [
    '5DJQPW84Lbd4X9xyL9xsLoRYK8ojaRr1XbEoyGMraCSpNZmG',
    '5HGZfBpqUUqGY7uRCYA6aRwnRHJVhrikn8to31GcfNcifkym'
  ]
}
BaseComponent.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const marketLabel = await canvas.getByTestId('market_label')
  await expect(marketLabel).toBeInTheDocument()

  const numberParticipants = await canvas.getByTestId('number_participants')
  await expect(numberParticipants).toBeInTheDocument()

  const adminAccount = await canvas.getByTestId('admin_account')
  await expect(adminAccount).toBeInTheDocument()

  const ownerAccount = await canvas.getByTestId('owner_account')
  await expect(ownerAccount).toBeInTheDocument()

  const noParticipants = await canvas.getByTestId('no_participants')
  await expect(noParticipants).not.toBeInTheDocument()

  const participantsArray = await canvas.getAllByTestId('participant_item')
  await expect({ numberParticipants: participantsArray.length }).toEqual({ numberParticipants: 2 })
}

export const WithoutParticipants = Template.bind({})
WithoutParticipants.args = {
  market: {
    admin: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    owner: { address: '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S' },
    label: 'Lorem Ipsum Marketplace'
  },
  participants: []
}
WithoutParticipants.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const marketLabel = await canvas.getByTestId('market_label')
  await expect(marketLabel).toBeInTheDocument()

  const numberParticipants = await canvas.getByTestId('number_participants')
  await expect(numberParticipants).toBeInTheDocument()
  await expect({ numberInDOM: numberParticipants.innerText }).toEqual({ numberInDOM: '0' })

  const adminAccount = await canvas.getByTestId('admin_account')
  await expect(adminAccount).toBeInTheDocument()

  const ownerAccount = await canvas.getByTestId('owner_account')
  await expect(ownerAccount).toBeInTheDocument()

  const noParticipants = await canvas.getByTestId('no_participants')
  await expect(noParticipants).toBeInTheDocument()

  const participantsItems = await canvas.queryByTestId('participant_item')
  await expect(participantsItems).not.toBeInTheDocument()
}
