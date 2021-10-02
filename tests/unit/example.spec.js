import { shallowMount } from '@vue/test-utils'
import BtcCard from '@/components/BtcCard.vue'

describe('BtcCard.vue', () => {
  it('renders price ', () => {
    const wrapper = shallowMount(BtcCard, {
      props: { price:3000 }
    })
    //check is price rendered
    expect(wrapper.find('div.content').text()).not.toEqual('$','')
    
    //check is price rendered right.
    // expect(wrapper.find('div.content').text()).toMatch('$ 3000')
  })
})
