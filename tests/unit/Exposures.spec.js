import axios from "axios";
import Vuex from 'vuex'
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

import { shallowMount } from "@vue/test-utils";
import ExposuresList from '../../src/views/ExposuresList.vue'
import { getters } from '../../src/store/auth'


describe("ExposuresList", () => {
    afterAll(() => mock.restore());
    beforeEach(() => mock.reset());
  
    it("loads exposures", async () => {
      mock
        
        .onGet("http://c4ctest.mhealthkenya.org/api/exposures/all/", {params: [{user: 'embuadmin'},{role_id: '4'}]})
        .reply(200, [{ user: "name" }, { name: "bar" }, { name: "baz" }]);
  
      const wrapper = shallowMount(ExposuresList);
      await wrapper.vm.loadExposures();
      const listItems = wrapper.findAll("li");
      expect(listItems).toHaveLength(3);
    });
  });