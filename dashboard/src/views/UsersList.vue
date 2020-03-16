<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >

      <v-flex
        md12
      >
        <material-card
          color="green"
          flat
          full-width
          title="All Users"
        >
          <v-data-table
            hide-actions
            v-if="facilities"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template>
                <div class="loading" v-if="loading">
            Loading...
            </div>

            <div v-if="error" class="error">
                {{ error }}

              
            </div>

              {{ facilities}}
              
                <!-- <tr v-for="facility in facilities" :key="facility.id" >
                 <td> {{ facility.name }} </td>
                 <td> {{ facility.county }} </td>
                 <td> {{ facility.mfl_code }} </td> 
                 <td> {{ facility.sub_county}} </td>                      
                 <td>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-danger btn-sm"> View More </button>
                </div>
                 </td>
             </tr> -->

            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        loading: false,
        facilities: null,
        error: null,
      };
    },
    methods: {
        fetchFacilities() {
          this.error = this.facilities = null;
          this.loading = true;
         axios.
         get('https://api/facilities')
            .then((response) => {
                this.loading = false;
                this.facilities = response.data;
            });
        },
     created() {
    this.fetchFacilities ();
},
    },
};
</script>
