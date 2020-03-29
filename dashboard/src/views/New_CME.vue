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
          title="Create A Resource For Continuous Medical Education "
          text="Kindly fill all the required fields carefully"
        >
          <v-form @submit="postCME">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Title"
                    id="title"
                    :rules="[rules.required]"
                    v-model="title"
                    class="purple-input"/>
                </v-flex>

                <v-flex xs12>
                    <v-textarea
                    label="Write Here"
                    v-model="body"
                    :rules="[rules.required]"
                    id="body"
                    rows="12"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 >
                  <input
                   type="file"
                   id="image_file" 
                   ref="files" 
                   multiple 
                   v-on:change="handleFiles()"/>
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
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  
  data () {
    return{
      title: '',
      body: '',
      files: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    handleFiles() {
    let uploadedFiles = this.$refs.files.files;

    for(var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
    }
    this.getImagePreviews();
    },

    getImagePreviews(){
    for( let i = 0; i < this.files.length; i++ ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
            let reader = new FileReader();
            reader.addEventListener("load", function(){
                this.$refs['preview'+parseInt(i)][0].src = reader.result;
            }.bind(this), false);
            reader.readAsDataURL( this.files[i] );
        }else{
            this.$nextTick(function(){
                this.$refs['preview'+parseInt(i)][0].src = '/img/generic.png';
            });
        }
    }
  },

  removeFile( key ){
    this.files.splice( key, 1 );
    this.getImagePreviews();
  },

  postCME (e) {
    e.preventDefault();
    for( let i = 0; i < this.files.length; i++ ){
        if(this.files[i].id) {
            continue;
        }
      
    let allData = new FormData();
    // dict of all elements
    allData.append('image_file', this.files[i]);
    allData.append("title", this.title);
    allData.append("body", this.body);

    let currentObj = this
    
    axios.post('resources/cmes/create',
      allData, {
        headers: {
        "content-type": "multipart/form-data"}
      })
    .then(function(data) {
        
        this.$router.push('/cmes')
        console.log('success');
    }.bind(this)).catch(function(data) {
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