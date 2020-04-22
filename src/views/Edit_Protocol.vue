<template>
  <div id="ScrollableDiv">
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
          md11
        >
          <v-card>

            <v-card-text>
              <div/>
              <p class="display-1 text--primary">

                Edit Facility Resource
              </p>

            </v-card-text>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit="editProtocal">
              <v-container py-0>
                <v-layout wrap>

                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      id="title"
                      :rules="titleRules"
                      v-model="protocol.title"
                      required
                      label="Title"
                      class="purple-input"/>
                  </v-flex>
<!-- 
                   <v-flex
                    xs12
                    md8>
                    <label>Facility:</label>
                    <v-chip
                      class="ma-2"
                      x-large
                    >
                      {{ user.hcw.facility.name }}
                    </v-chip>
                  </v-flex>  -->

                  <v-flex xs12>
                    <ckeditor
                      id="editorData"
                      :editor="editor"
                      v-model="protocol.body"
                      rules="bodyRules"/>
                  </v-flex>

                  <v-flex xs12 >

                    <label for="document">Upload Image:</label>
                    <input
                      id="file"
                      ref="file"
                      value="file"
                      accept="image/*"
                      type="file"
                      @change="handleImageChange()">

                    <v-img
                      :src="protocol.file"
                      class="white--text align-end"
                      max-height="400px"
                    />

                  </v-flex>
                  <v-flex xs12>
                    <img
                      v-show="showPreview"
                      :src="imagePreview">
                  </v-flex>

                  <v-flex>
                    <label for="document">Upload Documents:</label>
                    <input
                      id="files"
                      ref="files"
                      value="files"
                      type="file"
                      multiple
                      @change="handleFiles()">

                    <v-list
                      v-for="file in protocol.files"
                      :key="file"
                      class="file-listing"> {{ file.file_name }}
                      <span
                        class="remove-file"
                        @click="removeFile(key)"> Remove </span>
                    </v-list>

                    <v-card
                      v-for="(file, key) in files"
                      :key="file.id"
                      class="file-listing">{{ file.name }}
                      <span
                        class="remove-file"
                        @click="removeFile(key)"> Remove </span> </v-card>
                  </v-flex>

                  <v-flex
                    xs12
                    text-xs-right
                  >
                    <v-btn
                      :disabled="!valid"
                      :loading="dialog1"
                      class="mx-0 font-weight-light"
                      color="success"
                      type="submit"
                      @click="validateData(); alert=!alert; dialog1=true"
                    >
                      Save
                    </v-btn>

                    <v-dialog
                      v-model="dialog1"
                      max-width="290"
                      lazy>
                      <v-card>
                        <v-card-text class="text-xs-center">
                          <v-progress-circular
                            :size="70"
                            indeterminate
                            class="primary--text"/>
                        </v-card-text>
                      </v-card>
                    </v-dialog>

                    <v-alert
                      :value="alert"
                      text
                      dismissible
                      transition="scale-transition"
                      color = "#47a44b"
                      icon = "mdi-alert"
                      dense
                    >
                      <h6> {{ output.error }} {{ output.message }} </h6>
                    </v-alert>

                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>

          </v-card>
        </v-flex>

      </v-layout>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {

  data () {
    return {
      editor: ClassicEditor,
      body: '',
      editorConfig: { },
      items: [],
      alert: false,
      valid: true,
      titleRules: [
        v => !!v || 'Title is required'
      ],
      bodyRules: [
        v => !!v || 'Fill in the required text'
      ],
      dialog1: false,
      result: '',
      all_facilities: [],
      facility: 'null',
      facility_id: '',
      title: '',
      file: '',
      showPreview: false,
      imagePreview: '',
      files: [],
      output: '',
      protocol: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  watch: {
    dialog1 (val) {
      if (!val) return
      setTimeout(() => (this.dialog1 = false), 4000)
    }
  },
  created () {
    this.getFacilities()
    this.getProtocol()
  },
  methods: {
    validateData () {
      this.$refs.form.validate()
    },

    handleFiles () {
      let uploadedFiles = this.$refs.files.files

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },

    handleImageChange (e) {
      this.file = this.$refs.file.files[0]

      let reader = new FileReader()

      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false)

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },

    removeFile (key) {
      this.files.splice(key, 1)
    },

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },

    getProtocol () {
      var id = this.$route.params.id
      axios.get('resources/protocols/details/' + id)
        .then((response) => {
          this.protocol = response.data.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    editProtocal (e) {
      e.preventDefault()

      let allData = new FormData()

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]

        allData.append('protocal_files[' + i + ']', file)
      }
      allData.append('image_file', this.file)
      allData.append('title', this.title)
      allData.append('body', this.body)
      allData.append('facility_id', this.user.hcw.facility.id)

      var id = this.$route.params.id

      axios({
        method: 'POST',
        url: 'resources/protocols/update/' +id,
        data: allData,
        headers: {
          'content-type': 'multipart/form-data' }
      })
        .then((response) => {
          console.log(response)
          this.output = response.data
          this.alert = true
          this.$router.push('/protocals')
        })
        .catch(error => {
          this.output = error
          console.log(error)
          this.alert = true
        })
    }
  }
}

</script>
<style>
span.remove-file{
  color:red;
  cursor: pointer;
}

</style>
