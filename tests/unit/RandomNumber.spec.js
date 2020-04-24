// example for testing Props and User Interaction
import RandomNumber from "@/components/RandomNumber";
import { mount, shallowMount } from "@vue/test-utils";

describe("RandomNumber", () => {
     test("By default, randomNumber data value should be 0", () => {
          const wrapper = mount(RandomNumber)
          expect(wrapper.html()).toContain('<span>0</span>');
     });

     test("If button is clicked, randomNumber should be between 1 and 10", async () => {
          const wrapper = mount(RandomNumber)
          wrapper.find('button').trigger('click')
          // need to wait for DOM update tick
          await wrapper.vm.$nextTick();
          const randomNumber = parseInt(wrapper.find('span').element.textContent)
          // number between our props 1 -> 10
          expect(randomNumber).toBeGreaterThanOrEqual(1);
          expect(randomNumber).toBeLessThanOrEqual(10);
     });

     test("If button is clicked, randomNumber should be between 200 and 300", async () => {
          // mount with the testing props data
          const wrapper = shallowMount(RandomNumber, {
               propsData: {
                    min: 200,
                    max: 300
               }
          })
          wrapper.find('button').trigger('click')
          // need to wait for DOM update tick
          await wrapper.vm.$nextTick();
          const randomNumber = parseInt(wrapper.find('span').element.textContent)
          // number between our props 200 -> 300
          expect(randomNumber).toBeGreaterThanOrEqual(200);
          expect(randomNumber).toBeLessThanOrEqual(300);
     });
});
