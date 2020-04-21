import { shallowMount } from '@vue/test-utils'
import Footer from '../../src/components/core/Footer.vue'

describe('Footer.vue', function () {
  it('Checking <span> tag text', function () {
    const wrapper = shallowMount(Footer)
    const span = wrapper.find('span')
    expect(span.text()).toBe('Home')
  })
})

// describe('Footer.vue Test', () => {
//   it('renders message when component is created', () => {
//     // render the component
//     const wrapper = shallowMount(Footer, {
//       propsData: {
//         title: 'Vue Project'
//       }
//     })

//     // check the name of the component
//     expect(wrapper.name()).toMatch('Footer')

//     // check that the title is rendered
//     expect(wrapper.text()).toMatch('Vue Project')
//   })
// })
