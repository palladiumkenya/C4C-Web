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
          <v-alert
            :value="alert"
            type="info"
            dark
            border="top"
            transition="scale-transition"
          >
<<<<<<< HEAD
            {{output.message}} {{output.error}} {{output}}
=======
            {{ output.message }} {{ output.error }}
>>>>>>> a2ff7661b9e623359c379bed5a03d2103a84cd3c
          </v-alert>

          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="postCME">
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
                  <v-textarea
                    id="body"
                    v-model="body"
                    :rules="[rules.required]"
                    placeholder="Write here"
                    required
                    rows="12"
                  />
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
                    :disabled="!valid"
                    class="mx-0 font-weight-light"
                    color="success"
                    type="submit"
                    @click="validate(); alert = !alert; "
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
import axios from 'axios'

export default {

  data () {
    return {
      alert: false,
      valid: true,
      output: '',
      title: '',
      body: '',
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

    validate () {
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
       //iterating over any file sent over appending the files
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        allData.append('cme_files[' + i +']', file);
        allData.append('image_file', this.file);
        allData.append("title", this.title);
        allData.append("body", this.body);

        let currentObj = this
          
          axios.post('resources/cmes/create',
            allData, {
              headers: {
              "content-type": "multipart/form-data"}
            })
          .then(function(data) {
            this.$router.push('/cmes');
              alert("Data Added Successfully")
                console.log('success');
          }.bind(this)).catch(function(data) {
              alert("Something went wrong, please retry")
                  console.log('error');
            });
      }   
    }
  }
}; 

</script>
<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
    min-height: 300px;
    display: flex;
    flex-flow: column nowrap;
}
span.remove-file{
  color:red;
  cursor: pointer;
}

</style>
