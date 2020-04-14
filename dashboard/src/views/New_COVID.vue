<template>
<div>
>
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
          title="Create A Resource For Continuous Medical Education "
          text="Kindly fill all the required fields carefully"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              Add Continuous Medical Education Content
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>

          <v-form @submit="postCME">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    id="title"
                    :rules="[rules.required]"
                    v-model="title"
                    required
                    label="Title"
                    class="purple-input"/>
                </v-flex>

                <v-flex xs12>
                    <ckeditor
                    :editor="editor"
                    v-model="editorData"
                    id="editorData" 
                    :rules="[rules.required]"
                    placeholder="Write here"
                    required
                    :config="editorConfig">
                    </ckeditor>
                </v-flex>

                <v-flex xs12 >
                  <label for="document">Upload Image:</label>
                  <input
                    id="file"
                    ref="file"
                    accept="image/*"
                    type="file"
                    @change="handleImageChange()">

                  <img
                    v-show="showPreview"
                    :src="imagePreview">
                </v-flex>

                <v-flex xs12>
                  <label for="document">Upload Documents:</label>
                  <input
                    id="files"
                    ref="files"
                    type="file"
                    multiple
                    @change="handleFiles()">

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
                    class="mx-0 font-weight-light"
                    color="success"
                    type="submit"
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
    <v-snackbar
      :color="color"
      :bottom="bottom"
      :top="top"
      :left="left"
      :right="right"
      v-model="snackbar"
      dark
      >
      <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div> {{pre_out}} <br> {{ output.message }}<br> {{ output.errors }} </div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>

  </v-container>
</div> 
</template>

<script>

import axios from 'axios' 
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
            // The configuration of the editor.
      },

      color: null,
      colors: [
        'success',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
      result: '',
      resp: false,
      output: '',
      pre_out: '',
      title: '',
      file: '',
      showPreview: false,
      imagePreview: '',
      files: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {

    validateData () {
      if (this.title == '') {
        this.pre_out = 'Select a title to proceed'
        this.snack('top', 'center')
        return false
      } else if (this.editorData == '') {
        this.pre_out = 'Fill in the text area to proceed'
        this.snack('top', 'center')
        return false
      } else if (this.file == '') {
        this.pre_out = 'Add image to proceed'
        this.snack('top', 'center')
        return false
      } else { return true }
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
    
    postCME (e) {
      e.preventDefault()
      
      let formData = new FormData();
      
      // iterating over any file sent over appending the files
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append('cme_files[' + i + ']', file);
        formData.append('image_file', this.file);
        formData.append('title', this.title);
        formData.append('body', this.editorData);
      }
      
      if (this.validateData()) {
        axios.post('resources/cmes/create',
            formData, {
              headers: {
              "content-type": "multipart/form-data"
            }
            }).then((response) => {
            this.output = response.data
            console.log(response)
            this.resp = Boolean(response.data.success)
            this.snack('top', 'center')
              this.$router.push('/cmes')
            })
          .catch(error => {
            this.output = error
            console.log(error)
            this.snack('top', 'center')
          })
       }
    },
    snack (...args) {
        this.top = false
        this.bottom = false
        this.left = false
        this.right = false

        for (const loc of args) {
          this[loc] = true
        }
        if (this.resp) {
          this.color = this.colors[0]
        } else {
          this.color = this.colors[1]
        }
        this.snackbar = true
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
