
import { shallowMount } from '@vue/test-utils'
import Drawer from '../../src/components/core/Drawer.vue'


describe('Drawer.vue Test', () => {
  it('renders props.msg when passed', () => {
    // render the component
    const msg = 'Test is successful'
    const wrapper = shallowMount(Drawer, {
      propsData: { msg }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch(msg)
  })
})
