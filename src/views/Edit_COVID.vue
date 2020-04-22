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
        md11
      >
        <material-card
          color="green"
          title="Edit COVID 19 Resource "
          text="Kindly fill all the required fields carefully"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              Edit COVID 19 Resource
            </p>
          </v-card-text>

          <v-form
           ref="form"
            v-model="valid"
            lazy-validation
            @submit="editCovid19">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    id="title"
                    :rules="titleRules"
                    v-model="covid19.title"
                    required
                    label="Title"
                    class="purple-input">
                  </v-text-field>
                </v-flex>

                <v-flex xs12>
                  <ckeditor
                    id="editorData"
                    :editor="editor"
                    v-model="covid19.body"
                    :rules="bodyRules"
                    :config="editorConfig"
                    placeholder="Write here"
                    required>
                  </ckeditor>  
                </v-flex>

                <v-flex xs12 >
                  <label for="document">Upload Image:</label>
                  <input
                    id="file"
                    ref="file"
                    value="covid19.file"
                    accept="image/*"
                    type="file"
                    @change="handleImageChange()">

                  <v-img
                    :src="covid19.file"
                    class="white--text align-end"
                    height="400px"
                  />                                      

                </v-flex>

                <v-flex xs12>
                  <img
                    v-show="showPreview"
                    :src="imagePreview">
                </v-flex>

                <v-flex xs12>
                  <label for="document">Upload Documents:</label>
                  <input
                    value="covid19.files"
                    id="files"
                    ref="files"
                    type="file"
                    multiple
                    @change="handleFiles()">

                  <v-list
                      v-for="file in covid19.files"
                      :key="file"
                      class="file-listing"> {{file.file_name}}
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
                    @click="validateData(); alert=!alert; "
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
                    head
                    type="success"
                    border="right"
                    icon = "mdi-alert"
                    dismissible
                    text
                    transition="scale-transition"
                    color = "#47a44b"
                    dense
                  >
                    <h6> {{ output.error }} {{ output.message }} {{resp}} </h6>
                  </v-alert>

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

import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      titleRules: [
        v => !!v || 'Title is required'
      ],
      bodyRules: [
        v => !!v || 'Fill in the required text'
      ],
      dialog1: false,
      result: '',
      valid: true,
      output: '',
      alert: false,
      covid19: {
              body: '',
              title: '',
      },
      file: '',
      files: [],
      showPreview: false,
      imagePreview: '',
      covid19: '',
      resp: ''
    }
  },
  watch: {
    dialog1 (val) {
      if (!val) return
      setTimeout(() => (this.dialog1 = false), 4000)
    }
  },

  created() {
       this.getCovid()
    },

  methods: {
    validateData () {
      this.$refs.form.validate()
    },

    handleImageChange (e) {
      this.file = this.$refs.file.files[0]

    console.log(event.target.covid19.files[0].name) //here is the original name

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

    handleFiles () {
      let uploadedFiles = this.$refs.files.files

      // add uploaded files to an array
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },

    removeFile (key) {
      this.files.splice(key, 1)
    },

    getCovid () {
      var id = this.$route.params.id
       axios.get('resources/special/' + id)
        .then((resource) => {
        this.covid19 = resource.data.data 
        console.log(resource.data)

        }).catch((error) => {
        console.log(error.message)
        })
    },

    editCovid19 (e) {
      e.preventDefault()

      let allData = new FormData()

      // iterating over any file sent over appending the files
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]

        allData.append('resource_files[' + i + ']', file)
      }
      allData.append('image_file', this.file)
      allData.append('title', this.covid19.title)
      allData.append('body', this.covid19.body)
      allData.append('special_resource_id', this.covid19.id)

      axios({
        method: 'POST',
        url: 'resources/special/update',
        data: allData,
        headers: { 'Content-Type': `multipart/form-data` }
      })
        .then((response) => {
          this.output = response.data
          console.log(response)
          this.alert = true

          this.resp = 'COVID 19 Resource Successfully Added'

          this.$router.push('covid19_resources')
        })
        .catch(error => {
          this.output = error
          console.log(error)
          this.alert = true

          this.resp = 'Failed, please try again'

        })
    }

  }
}

</script>

<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
    min-height: 400px;
    display: flex;
    flex-flow: column nowrap;
}
span.remove-file{
  color:red;
  cursor: pointer;
}

</style>
