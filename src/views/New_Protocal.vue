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
              Add A New Protocal
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>

          <v-form @submit="postProtocal">
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
                </v-flex>
                <v-flex xs12>
                    <ckeditor :editor="editor" id="editorData" v-model="editorData"></ckeditor>
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

                <v-flex>
                  <label for="document">Upload Documents:</label>
                  <input
                    value="files"
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

        </v-card>
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
      <div> {{pre_out}} {{ output.message }}<br> {{ output.errors }} </div>
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
import { mapGetters } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: { },
      items: [],
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
      all_facilities: [],
      facility: 'null',
      facility_id: '',
      title: '',
      file: '',
      showPreview: false,
      imagePreview: '',
      files: [],
      output: '',
      pre_out: '',
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
  created () {
    this.getFacilities()
  },
  methods: {
    validateData () {
      if (this.title == '') {
        this.pre_out = 'Enter your title to proceed'
        this.snack('top', 'center')
        return false
      } else if (this.editorData == '') {
        this.pre_out = 'Provide the information to proceed'
        this.snack('top', 'center')
        return false
      } else if (this.file == '') {
        this.pre_out = 'You will be redirected shortly'
        this.snack('top', 'center')
        return true
      }  else if (this.files== '') {
        this.pre_out = 'You will be redirected shortly'
        this.snack('top', 'center')
        return true
      }       
      else { return true }
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

    postProtocal (e) {
      e.preventDefault();

      let allData = new FormData()

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]

        allData.append('protocal_files[' + i + ']', file)
      }  
        allData.append('image_file', this.file)
        allData.append('title', this.title)
        allData.append('body', this.editorData)
        allData.append('facility_id', this.user.hcw.facility.id)

       if (this.validateData()) {
       axios({
          method: "POST",
          url : 'resources/protocols/create',
          data: allData,
          headers: {
              'content-type': 'multipart/form-data; boundary=${form._boundary'}
          })
         .then((response) => {
           console.log(response)
          this.output = response.data
          this.resp = Boolean(response.data.success)
          this.snack('top', 'center')
          this.$router.push('/protocals')

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
span.remove-file{
  color:red;
  cursor: pointer;
}

</style>
