<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md10
      >
        <material-card
          color="green"
          title="Send A New Broadcast "
          text="Kindly fill all the required fields carefully"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                >

                  <v-text-field
                    label="Date"
                    type="date"
                    class="purple-input"/>
                </v-flex>

                <!-- <div class="form-group">
                    <label>Select Country:</label>
                    <select class='form-control' v-model='country' >
                          <option value='0' >Select Country</option>
                          <option v-for='data in facilities' :value='data.id'>{{ data.name }}</option>
                        </select>

                  </div> -->

                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Facility"
                    type="text"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Date"
                    type="date"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Broadcast Title"
                    type="text"
                    class="purple-input"/>
                </v-flex>

                <v-flex xs12>
                  <ckeditor-ckeditor/>
                </v-flex>

                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
var app = new Vue({
  el: '#app',
  data: {
    facilities: 0
  },
  created: function () {
    this.getFacilities()
  },
  methods: {
    getFacilities: function () {
      axios.get('http://api/facilities', {
        params: {
          request: 'facilities'
        }
      })
        .then(response => {
          console.log(response.data)
        })
    }
  }
})
</script>
