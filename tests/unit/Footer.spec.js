import { shallowMount } from '@vue/test-utils'
import Footer from '../../src/components/core/Footer.vue'


describe('Footer.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Footer, {
      propsData: {
        title: 'Our C4C Project'
      }
    })

    // check the name of the component
    expect(wrapper.name()).toMatch('Footer')

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Our C4C Project')
  })
})