<template>
  <v-container
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md6
        lg2
      >

        <template>
 <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="county"
                    :items="all_counties"
                    :search-input.sync="search"
                    item-text="county"
                    item-value="id"
                    multiple
                    chips
                    label="Select County"
                    required
                  />
                </v-flex>

        </template>

      </v-flex>

      <!-- second select -->

      <v-flex
        md6
        lg3
      >

        <template>
     <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    :search-input.sync="search"
                    item-text="sub_county"
                    item-value="id"
                    multiple
                    chips
                    label="Select Sub-County"
                    required
                  />
                </v-flex>
        </template>

      </v-flex>

      <!-- third select -->
      <v-flex
        md6
        lg2
      >

        <template>
    <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    :search-input.sync="search"
                    item-text="partner"
                    item-value="id"
                    multiple
                    chips
                    label="Select Partner"
                    required
                  />
                </v-flex>
        </template>

      </v-flex>

      <v-flex
        md6
        lg2
      >

        <template>
         <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    :search-input.sync="search"
                    item-text="name"
                    item-value="id"
                    multiple
                    chips
                    label="Select Facility Level"
                    required
                  />
                </v-flex>
        </template>

      </v-flex>

      <v-flex
        md6
        lg3
      >

        <template>
          <v-flex
                  xs12
                >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    :search-input.sync="search"
                    item-text="name"
                    item-value="id"
                    multiple
                    chips
                    label="Select Facility"
                    required
                  />
                </v-flex>

        </template>

      </v-flex>

      <!-- Fourth select -->

      <template>

        <v-flex
          md6
          lg6
        >
          <core-DatePicker/>

        </v-flex>

        <v-flex
          md6
          lg6
        >
          <v-btn
            :loading="loading2"
            :disabled="loading2"
            block
            color="success"
            @click="loader = 'loading2'"
          >
            Filter
            <template v-slot:loader/>
          </v-btn>
        </v-flex>

      </template>

    </v-layout>
  </v-container>

</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapState} from 'vuex'
export default {
  data () {
      return {
          facility: '',
          county: '',
          all_counties: [],
          all_facilities: []
      }
  },

  created() {
    this.getFacilities ()

  },

  methods: {
     getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
            this.all_counties = facilities.data.data
            if (facilities.data.links.next !=null){
                this.link = facilities.data,links.next
                this.loopT(this.link)

            }
        })
        .catch(error => console.log(error.message))
    },
     getCounty (name){
         var count =0
         for(var c in this.facilities){
             if(this.facilities(c).county === name){
                 count ++
             }

         }
            return counter
     }
  }
}
</script>
