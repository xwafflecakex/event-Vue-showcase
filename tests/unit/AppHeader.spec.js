// testing the example component with jest
// Add jest to exsiting project via 'vue add @vue/unit-jest'
// If your component has children, shallowMount() will return a simple implementation of that component instead of a fully rendered version. 
import AppHeader from "@/components/AppHeader";
import { mount } from '@vue/test-utils'

describe('AppHeader', () => {
     test("if a user is not logged in, don't show the logout button", () => {
          const wrapper = mount(AppHeader)
          expect(wrapper.find('button').isVisible()).toBe(false)
     })
     // this test needs to async to wait for DOM updates
     test('if a user is logged in, show the logout button', async () => {
          const wrapper = mount(AppHeader)
          wrapper.setData({ loggedIn: true })
          // then wait for DOM updates from next tick
          await wrapper.vm.$nextTick()
          expect(wrapper.find('button').isVisible()).toBe(true)
     })
})
