import { shallowMount } from '@vue/test-utils'
import Footer from '../../src/components/core/Footer.vue'

describe('Footer.vue Test', () => {
  it('renders props.msg when passed', () => {
    // render the component
    const msg = 'Test is successful'
    const wrapper = shallowMount(Footer, {
      propsData: { msg }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch(msg)
  })
})
