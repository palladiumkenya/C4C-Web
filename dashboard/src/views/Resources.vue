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
          title="Create A Resource, Guideline or Protocal "
          text="Kindly fill all the required fields carefully"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Title"
                    type="text"
                    class="purple-input"/>
                </v-flex>

                <v-flex xs12>
                  <ckeditor-ckeditor/>
                </v-flex>
<<<<<<< HEAD
=======
                <v-flex xs12>
                  <input
                    ref="excel-upload-input"
                    class="excel-upload-input"
                    type="file">
                </v-flex>
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
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
