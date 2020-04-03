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
        <v-card>

        <v-card-text>
            <div></div>
            <p class="display-1 text--primary">
              Add A New Protocal
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>

        <v-alert
            :value="alert"
            type="error"
            dark
            border="top"
            transition="scale-transition">
            {{output.message}} {{output.error}}
          </v-alert> 

          <v-form v-model="valid" ref="form" v-on:submit.prevent="postProtocal">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    id="title"
                    :rules="[rules.required]"
                    required
                    v-model="title"
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
                  {{user.hcw.facility.name}}
                </v-chip>
              </v-flex>
                <v-flex xs12>
                  <v-textarea
                    id="body"
                    v-model="body"
                    :rules="[rules.required]"
                    label="Write Here"
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

                <img v-bind:src="imagePreview" v-show="showPreview"/> 
                </v-flex>

                <v-flex>
                    <label for="document">Upload Documents:</label>
                    <input
                      id="image_file"
                      hint="Add image" persistent-hint
                      ref="files"
                      type="file"
                      multiple
                      @change="handleFiles()">
                </v-flex>

                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    :disabled="!valid"
                    @click="validate(); alert();"
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
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      valid:true,
      items: [],
      alert: false,
      all_facilities: [],
      facility: 'null',
      facility_id: '',
      title: '',
      body: '',
      file: '',
      showPreview: false,
      imagePreview: '',
      files: [],
      output: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  created () {
    this.getFacilities()
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    validate () {
        this.$refs.form.validate()
      },

    handleFiles () {
      let uploadedFiles = this.$refs.files.files

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      this.getImagePreviews()
    },

    handleImageChange(e) {
      this.file = this.$refs.file.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", function(){
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);

      if(this.file){
        if ( /\.(jpe?g|png|gif)$/i.test(this.file.name)) {
            reader.readAsDataURL(this.file);
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
      e.preventDefault()
      
    let allData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
    let file = this.files[i];

    allData.append('protocal_files[' + i +']', file);
    allData.append('image_file', this.files[i]);
    allData.append("title", this.title);
    allData.append("body", this.body);
    allData.append("facility_id", this.user.hcw.facility.id);

    let currentObj = this
    
    axios.post('resources/protocols/create',
      allData, {
        headers: {
        "content-type": "multipart/form-data"}
      })
    .then(function(data) {
        alert("Data Added Successfully")
        this.$router.push('/protocals')
        console.log('success');
    }.bind(this)).catch(function(data) {
        alert("Something went wrong, please retry")
        console.log('error');
        });
    }
  }
}
}

</script>
<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
    min-height: 300px;
    display: flex;
    flex-flow: column nowrap;
}

</style>
