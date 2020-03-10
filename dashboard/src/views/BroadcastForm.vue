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
                    label="Cadre"
                    type="text"
                    />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    class="purple-input"
                    type="text"
                    label="County"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Sub-County"
                    type="text"
                    class="purple-input"/>
                </v-flex>
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
export default {
  //
}
</script>
