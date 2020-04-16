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

          <v-form @submit="postCME" ref="form" v-model="valid" lazy-validation>
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    id="title"
                    :rules="titleRules"
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
                    :rules="bodyRules"
                    placeholder="Write here"
                    required
                    :config="editorConfig">
                    </ckeditor>
                </v-flex>

                <v-flex xs12 >
                  <label for="document">Upload Image:</label>
                  <input
                    value="file"
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
                    :disabled="!valid"
                    @click="validateData(); alert=!alert; dialog1=true"
                    :loading="dialog1"
                    color="success"
                    type="submit"
                  >
                   Submit
                  </v-btn>

                  <v-dialog       
                  v-model="dialog1"
                  max-width="290" 
                  lazy>
                  <v-card>
                    <v-card-text class="text-xs-center">
                            <v-progress-circular :size="70" indeterminate class="primary--text"/>
                    </v-card-text>
                  </v-card>
                  </v-dialog>
                   

                  <v-alert
<<<<<<< HEAD
                  type="success"
                  :value="alert"
                  border="right"
                  icon = "mdi-alert"
                  dismissible
=======
                  text
                  :value="alert"
                  transition="scale-transition"
                  color = "#47a44b"
                  icon = "mdi-alert"
                  dense
>>>>>>> 1aadb5d4233ecd5644d67246c4d898b96d696347
                  >
                  <h6> {{ output.error}} {{ output.message}} </h6>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
            // The configuration of the editor.
      },
      valid: true,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      bodyRules: [
        v => !!v || 'Fill in the required text',
      ],
      dialog1: false,
      result: '',
      output: '',
      alert: false,
      title: '',
      file: '',
      showPreview: false,
      imagePreview: '',
      files: [],
    }
  },
  watch: {
      dialog1 (val) {
        if (!val) return
        setTimeout(() => (this.dialog1 = false), 4000)
      }
    },
  
  methods: {

     validateData () {
       this.$refs.form.validate()
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
      
      let allData = new FormData();
      
      // iterating over any file sent over appending the files
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        allData.append('cme_files[' + i + ']', file);
      }  
        allData.append('image_file', this.file);
        allData.append('title', this.title);
        allData.append('body', this.editorData);
      
      axios({
        method: "POST",
        url: 'resources/cmes/create',
        data: allData,
        headers: {'Content-Type': 'multipart/form-data; boundary=${form._boundary}'}
        })
        .then((response) => {
          this.output = response.data
          console.log(response)
          this.alert = true   
          this.$router.push('/cmes')
            })
          .catch(error => {
            this.output = error
            console.log(error)
            this.alert = true   
 
          })   
    },
    
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
